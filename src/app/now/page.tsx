import { PageIntro, TextLink } from "@/components/ui";
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
    <div className="page-shell">
      <PageIntro
        eyebrow="Now / Current focus"
        title="A short working update."
        description="What has my attention right now."
      >
        <p className="eyebrow">
          Updated <time dateTime={now.updated}>{updated}</time>
        </p>
      </PageIntro>
      <div className="row-list section now-list">
        {now.sections.map((section) => (
          <section className="detail-row" key={section.title}>
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
    </div>
  );
}
