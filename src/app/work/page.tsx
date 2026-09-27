import { ProjectCard } from "@/components/project-card";
import { PageIntro } from "@/components/ui";
import { getPublicProjects, getSecurityProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Work",
  "Security investigation, product engineering, DevSecOps, detection, vulnerability management, and cloud security projects by Farhan Shafee.",
  "/work",
);

export default function WorkPage() {
  const projects = getPublicProjects();
  const flagships = projects.filter((project) =>
    ["aegisgraph", "cyberbit-solutions"].includes(project.slug),
  );
  const securityProjects = getSecurityProjects();
  const supporting = projects.filter(
    (project) =>
      !flagships.includes(project) && !securityProjects.includes(project),
  );

  return (
    <div className="page-shell work-index-page">
      <PageIntro
        eyebrow="Work / Systems & projects"
        title="Systems and engineering work."
        description="AegisGraph explores security investigation and bounded AI. CyberBit connects security tools to business workflows. Inspect the systems, then follow the decisions behind them."
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
      <section
        className="work-index-group"
        id="security-engineering"
        aria-labelledby="work-security-heading"
      >
        <div className="work-index-heading">
          <h2 id="work-security-heading">Security engineering</h2>
          <span>Application / Detection / Remediation / Cloud</span>
        </div>
        {securityProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
            variant="secondary"
          />
        ))}
      </section>
      {supporting.length > 0 && (
        <section
          className="work-index-group"
          aria-labelledby="work-labs-heading"
        >
          <div className="work-index-heading">
            <h2 id="work-labs-heading">Other systems &amp; exploration</h2>
            <span>Workflows / Infrastructure</span>
          </div>
          {supporting.map((project) => (
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
