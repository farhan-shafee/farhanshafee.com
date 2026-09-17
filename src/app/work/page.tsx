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
  const flagships = projects.filter((project) =>
    ["aegisgraph", "cyberbit-solutions"].includes(project.slug),
  );
  const supporting = projects.filter((project) => !flagships.includes(project));

  return (
    <div className="page-shell work-index-page">
      <PageIntro
        eyebrow="Work / Systems & projects"
        title="Systems and engineering work."
        description="Evidence-grounded security investigation, cybersecurity products, and supporting systems work."
      />
      {flagships.length > 0 && (
        <section
          className="work-index-group"
          aria-labelledby="work-systems-heading"
        >
          <div className="work-index-heading">
            <h2 id="work-systems-heading">Selected systems</h2>
            <span>Security / AI / Product engineering</span>
          </div>
          {flagships.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              variant={project.slug === "aegisgraph" ? "primary" : "flagship"}
            />
          ))}
        </section>
      )}
      {supporting.length > 0 && (
        <section
          className="work-index-group"
          aria-labelledby="work-labs-heading"
        >
          <div className="work-index-heading">
            <h2 id="work-labs-heading">Supporting engineering</h2>
            <span>Workflows / Labs / Investigations</span>
          </div>
          {supporting.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={projects.indexOf(project)}
              variant={project.kind === "lab" ? "supporting" : "secondary"}
            />
          ))}
        </section>
      )}
    </div>
  );
}
