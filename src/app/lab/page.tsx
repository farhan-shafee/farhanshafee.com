import { PageIntro, TextLink } from "@/components/ui";
import { labEntries } from "@/data/lab";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Lab",
  "Farhan Shafee's engineering notebook on detection signals, AI-assisted security workflows, and infrastructure access boundaries.",
  "/lab",
);

export default function LabPage() {
  return (
    <div className="page-shell editorial-page editorial-lab">
      <PageIntro
        eyebrow="Lab / An engineering notebook"
        title="The engineering notebook."
        description="Questions under investigation, the implementation evidence available, and what remains untested. These topics are exploratory."
      />
      <ol className="editorial-notebook">
        {labEntries.map((entry, index) => (
          <li className="editorial-notebook-entry" key={entry.title}>
            <span className="editorial-entry-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <article>
              <header className="editorial-entry-header">
                <div>
                  <p className="editorial-label">{entry.category}</p>
                  <h2>{entry.title}</h2>
                </div>
                <div className="editorial-entry-status">
                  <span>{entry.status}</span>
                  {entry.date && (
                    <time dateTime={entry.date}>{entry.date}</time>
                  )}
                </div>
              </header>
              <p>{entry.description}</p>
              <p>
                <strong>Evidence: </strong>
                {entry.evidence}
              </p>
              <p>
                <strong>Open question: </strong>
                {entry.openQuestion}
              </p>
              {entry.technologies.length > 0 && (
                <ul
                  className="editorial-writing-topics"
                  aria-label="Technologies"
                >
                  {entry.technologies.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              )}
              {(entry.repository ||
                entry.writeup ||
                entry.demo ||
                Boolean(entry.related?.length)) && (
                <div className="editorial-inline-links">
                  {entry.repository && (
                    <TextLink href={entry.repository} external>
                      Repository
                    </TextLink>
                  )}
                  {entry.writeup && (
                    <TextLink href={entry.writeup}>Lab scope</TextLink>
                  )}
                  {entry.demo && (
                    <TextLink href={entry.demo} external>
                      Demo
                    </TextLink>
                  )}
                  {entry.related?.map((link) => (
                    <TextLink href={link.href} key={link.href}>
                      {link.label}
                    </TextLink>
                  ))}
                </div>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
