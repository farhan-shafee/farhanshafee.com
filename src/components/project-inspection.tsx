import { EvidenceLinks, evidenceLinks } from "@/components/evidence-links";
import type { Project } from "@/data/projects";

export function ProjectInspection({ project }: { project: Project }) {
  const inspection = project.inspection;
  if (!inspection) return null;
  const links = evidenceLinks(inspection.links);
  const guidedLinks = evidenceLinks(inspection.guidedLinks ?? []);
  const facts = inspection.facts.filter(
    ({ label, value }) => label.trim() && value.trim(),
  );
  if (
    !inspection.summary.trim() &&
    !links.length &&
    !guidedLinks.length &&
    !facts.length
  )
    return null;

  return (
    <section className="project-inspection" aria-labelledby="inspect-heading">
      <div className="inspection-intro">
        <h2 id="inspect-heading">Inspect the system</h2>
        {inspection.summary.trim() && <p>{inspection.summary}</p>}
      </div>
      <EvidenceLinks links={links} label={`${project.title} evidence`} />
      {guidedLinks.length > 0 && (
        <div className="inspection-guided">
          <h3>Guided inspection</h3>
          <EvidenceLinks
            links={guidedLinks}
            label={`${project.title} guided inspection`}
          />
        </div>
      )}
      {facts.length > 0 && (
        <dl className="inspection-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
