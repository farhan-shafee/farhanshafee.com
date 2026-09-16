import { PageIntro, TextLink } from "@/components/ui";
import { labEntries } from "@/data/lab";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Lab",
  "Farhan Shafee's engineering notebook for security experiments, AI-assisted automation, detection, and infrastructure exploration.",
  "/lab",
);

export default function LabPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Lab / An engineering notebook"
        title="Questions worth investigating."
        description="A place for security experiments, prototypes, and infrastructure notes. These are current areas of exploration; detailed results will follow as the work develops."
      />
      <div className="row-list section">
        {labEntries.map((entry, index) => (
          <article className="lab-entry" key={entry.title}>
            <div className="lab-entry-meta">
              <span className="project-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="eyebrow">{entry.category}</span>
            </div>
            <div className="lab-entry-body">
              <h2>{entry.title}</h2>
              <p>{entry.description}</p>
              {entry.technologies.length > 0 && (
                <ul className="project-tags" aria-label="Technologies">
                  {entry.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              )}
              {(entry.repository || entry.writeup || entry.demo) && (
                <div className="inline-links">
                  {entry.repository && (
                    <TextLink href={entry.repository} external>
                      Repository
                    </TextLink>
                  )}
                  {entry.writeup && (
                    <TextLink href={entry.writeup}>Project overview</TextLink>
                  )}
                  {entry.demo && (
                    <TextLink href={entry.demo} external>
                      Demo
                    </TextLink>
                  )}
                </div>
              )}
            </div>
            <div className="lab-entry-status">
              <span className="status">{entry.status}</span>
              {entry.date && <time dateTime={entry.date}>{entry.date}</time>}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
