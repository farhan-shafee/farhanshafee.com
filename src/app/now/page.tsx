import { TextLink } from "@/components/ui";
import { now } from "@/data/now";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Now",
  "What Farhan Shafee is building, learning, and investigating across security engineering and AI-assisted automation.",
  "/now",
);

export default function NowPage() {
  const updated = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${now.updated}T00:00:00Z`));

  return (
    <div className="page-shell editorial-page editorial-compact">
      <header className="page-intro editorial-compact-intro">
        <p className="eyebrow">Now</p>
        <h1>Current focus.</h1>
        <p className="editorial-updated">
          Updated <time dateTime={now.updated}>{updated}</time>
        </p>
      </header>
      <div className="editorial-focus-list">
        {now.sections.map((section) => (
          <section className="editorial-focus-row" key={section.title}>
            <h2>{section.title}</h2>
            <div>
              <p>{section.text}</p>
              {section.link && (
                <TextLink href={section.link.href} external>
                  {section.link.label}
                </TextLink>
              )}
            </div>
          </section>
        ))}
      </div>
      <nav className="editorial-context-links" aria-label="Related notes">
        <TextLink href="/lab">Lab notebook</TextLink>
        <TextLink href="/uses">Tooling notes</TextLink>
      </nav>
    </div>
  );
}
