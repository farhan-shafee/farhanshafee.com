import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ProjectCaseStudy } from "@/components/project-case-study";
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

  return (
    <div className="page-shell case-study-page">
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
        <div className="inline-links">
          <TextLink href="/work">All work</TextLink>
          {project.github && (
            <TextLink href={project.github} external>
              View source
            </TextLink>
          )}
          {project.website && (
            <TextLink href={project.website} external>
              Visit {project.title}
            </TextLink>
          )}
        </div>
      </PageIntro>
      <div className="case-study-layout">
        <dl className="case-metadata" aria-label="Project details">
          <div className="case-metadata-item">
            <dt>Type</dt>
            <dd>{projectKinds[project.kind]}</dd>
          </div>
          <div className="case-metadata-item">
            <dt>Status</dt>
            <dd>{project.status}</dd>
          </div>
          {project.year && (
            <div className="case-metadata-item">
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
          )}
          {project.technologies.length > 0 && (
            <div className="case-metadata-item case-metadata-technologies">
              <dt>Technologies</dt>
              <dd>
                <ul>
                  {project.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
        <ProjectCaseStudy project={project} />
      </div>
    </div>
  );
}
