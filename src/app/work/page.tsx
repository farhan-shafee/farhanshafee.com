import { ProjectCard } from "@/components/project-card";
import { PageIntro } from "@/components/ui";
import { getPublicProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Work",
  "Selected business systems, personal engineering projects, and security labs by Farhan Shafee.",
  "/work",
);

export default function WorkPage() {
  const projects = getPublicProjects();
  const systems = projects.filter((project) => project.kind !== "lab");
  const labs = projects.filter((project) => project.kind === "lab");

  return (
    <div className="page-shell work-index-page">
      <PageIntro
        eyebrow="Work / Systems & projects"
        title="Systems and engineering work."
        description="Security products, workflow automation, and supporting lab work."
      />
      {systems.length > 0 && (
        <section
          className="work-index-group"
          aria-labelledby="work-systems-heading"
        >
          <div className="work-index-heading">
            <h2 id="work-systems-heading">Selected systems</h2>
            <span>Security / Automation</span>
          </div>
          {systems.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              variant={
                project.slug === "cyberbit-solutions" ? "primary" : "secondary"
              }
            />
          ))}
        </section>
      )}
      {labs.length > 0 && (
        <section
          className="work-index-group"
          aria-labelledby="work-labs-heading"
        >
          <div className="work-index-heading">
            <h2 id="work-labs-heading">Labs & investigations</h2>
            <span>Supporting work</span>
          </div>
          {labs.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              variant="supporting"
            />
          ))}
        </section>
      )}
    </div>
  );
}
