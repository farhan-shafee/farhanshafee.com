import { ProjectCard } from "@/components/project-card";
import { PageIntro, TextLink } from "@/components/ui";
import { getPublicProjects, getSecurityProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Work",
  "Security investigation, recorded trading-incident analysis, fintech test engineering, and supporting security projects by Farhan Shafee.",
  "/work",
);

export default function WorkPage() {
  const projects = getPublicProjects();
  const flagships = projects.filter((project) =>
    ["aegisgraph", "creditops-ai", "tradeflow", "creditflow-qe"].includes(
      project.slug,
    ),
  );
  const securityProjects = getSecurityProjects();

  return (
    <div className="page-shell work-index-page">
      <PageIntro
        eyebrow="Work / Systems & projects"
        title="Systems and engineering work."
        description="AegisGraph makes security investigation inspectable. CreditOps AI presents recorded trading-incident analysis. TradeFlow makes trading-workflow tests and their evidence visible. CreditFlow QE connects a banking simulator to independent Java API automation."
      />
      {flagships.length > 0 && (
        <section
          className="work-index-group"
          aria-labelledby="work-systems-heading"
        >
          <div className="work-index-heading">
            <h2 id="work-systems-heading">Selected systems</h2>
            <span>Security / AI / Fintech test engineering</span>
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
          <h2 id="work-security-heading">Supporting security engineering</h2>
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
      <section
        className="work-index-group"
        aria-labelledby="work-material-heading"
      >
        <div className="work-index-heading">
          <h2 id="work-material-heading">Additional public material</h2>
          <span>Response / Hunting</span>
        </div>
        <div className="inline-links">
          <TextLink
            href="https://github.com/farhan-shafee/incident-response-playbooks"
            external
          >
            Incident Response Playbooks
          </TextLink>
          <TextLink
            href="https://github.com/farhan-shafee/threat-hunting-playbooks"
            external
          >
            Threat Hunting Playbooks
          </TextLink>
        </div>
      </section>
    </div>
  );
}
