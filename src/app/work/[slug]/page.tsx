import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageIntro, TextLink } from "@/components/ui";
import {
  getProjectBySlug,
  getPublicProjects,
  projectKinds,
} from "@/data/projects";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return getPublicProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return pageMetadata(project.title, project.description, `/work/${slug}`);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    { title: "Problem", text: project.problem },
    { title: "Approach", text: project.approach },
    { title: "Outcome", text: project.outcome },
  ].filter((section) => section.text);
  const links = [
    ...(project.website
      ? [{ label: "Visit website", href: project.website }]
      : []),
    ...(project.github
      ? [{ label: "View source on GitHub", href: project.github }]
      : []),
    ...(project.links ?? []),
  ];

  return (
    <div className="page-shell">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Work",
              item: absoluteUrl("/work"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: project.title,
              item: absoluteUrl(`/work/${slug}`),
            },
          ],
        }}
      />
      <PageIntro
        eyebrow={project.category}
        title={project.title}
        description={project.description}
      >
        <TextLink href="/work">All work</TextLink>
      </PageIntro>
      <div className="split-layout section">
        <aside aria-label="Project details">
          <dl className="row-list project-details">
            <div className="detail-row">
              <dt className="side-label">Type</dt>
              <dd>{projectKinds[project.kind]}</dd>
            </div>
            <div className="detail-row">
              <dt className="side-label">Status</dt>
              <dd>
                <span className="status">{project.status}</span>
              </dd>
            </div>
            {project.year && (
              <div className="detail-row">
                <dt className="side-label">Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            {project.technologies.length > 0 && (
              <div className="detail-row">
                <dt className="side-label">Technologies</dt>
                <dd>{project.technologies.join(" / ")}</dd>
              </div>
            )}
          </dl>
        </aside>
        <div className="prose">
          <h2>Overview</h2>
          <p>{project.longDescription ?? project.description}</p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          {links.length > 0 && (
            <div className="inline-links">
              {links.map((link) => (
                <TextLink
                  href={link.href}
                  key={link.href}
                  external={link.href.startsWith("https://")}
                >
                  {link.label}
                </TextLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
