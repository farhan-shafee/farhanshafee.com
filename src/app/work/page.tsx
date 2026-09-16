import { ProjectCard } from "@/components/project-card";
import { PageIntro, SectionHeading } from "@/components/ui";
import { getPublicProjects, projectKinds } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Work",
  "Selected business systems, personal engineering projects, and security labs by Farhan Shafee.",
  "/work",
);

export default function WorkPage() {
  const projects = getPublicProjects();

  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Work / Systems & projects"
        title="Systems, projects, and engineering notes."
        description="Business systems, personal engineering, and experiments across security, automation, and infrastructure."
      />
      {Object.entries(projectKinds).map(([kind, title]) => {
        const items = projects.filter((project) => project.kind === kind);
        if (items.length === 0) return null;

        return (
          <section className="section" key={kind} aria-label={title}>
            <SectionHeading title={title}>
              <span className="eyebrow">
                {String(items.length).padStart(2, "0")}
              </span>
            </SectionHeading>
            <div className="project-grid">
              {items.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={projects.indexOf(project)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
