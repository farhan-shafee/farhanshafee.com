import { PageIntro, TextLink } from "@/components/ui";
import { usesCategories } from "@/data/uses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Uses",
  "An evolving reference for Farhan Shafee's engineering tools, software, infrastructure, and hardware. Tooling notes are being documented.",
  "/uses",
);

export default function UsesPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Uses / Tools & working environment"
        title="The setup behind the work."
        description="A reference for the tools I use and why. I am still documenting this list; specific software and hardware details will be added here."
      />
      <div className="row-list section uses-list">
        {usesCategories.map((category) => (
          <section className="detail-row" key={category.title}>
            <h2>{category.title}</h2>
            <div>
              <p>{category.description}</p>
              {category.items.length > 0 ? (
                <ul className="uses-items">
                  {category.items.map((item) => (
                    <li key={item.name}>
                      <h3>
                        {item.url ? (
                          <TextLink href={item.url} external>
                            {item.name}
                          </TextLink>
                        ) : (
                          item.name
                        )}
                      </h3>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="eyebrow uses-pending">Notes to follow</span>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
