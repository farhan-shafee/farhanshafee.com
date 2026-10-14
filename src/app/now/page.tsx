import { TextLink } from "@/components/ui";
import { now } from "@/data/now";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Now",
  "Farhan Shafee's current public engineering work: AegisGraph, CreditOps AI, TradeFlow, and evidence-driven security validation.",
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
              <div className="editorial-inline-links">
                {section.links.map((link) => (
                  <TextLink
                    href={link.href}
                    external={link.external}
                    key={link.href}
                  >
                    {link.label}
                  </TextLink>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
      <nav className="editorial-context-links" aria-label="Related notes">
        <TextLink href="/writing">Engineering notes</TextLink>
        <TextLink href="/about">Background & approach</TextLink>
      </nav>
    </div>
  );
}
