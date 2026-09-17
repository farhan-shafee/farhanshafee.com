import { PageIntro, TextLink } from "@/components/ui";
import { usesCategories } from "@/data/uses";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Uses",
  "An evolving reference for Farhan Shafee's engineering tools, software, infrastructure, and hardware. Tooling notes are being documented.",
  "/uses",
);

export default function UsesPage() {
  const categories = usesCategories.filter(
    (category) => category.items.length > 0,
  );
  return (
    <div className="page-shell editorial-page editorial-compact">
      <PageIntro
        eyebrow="Uses / Tools & working environment"
        title="Tools & working environment."
        description="Software, infrastructure, and hardware behind the work."
      />
      {categories.length > 0 ? (
        <div className="editorial-tooling">
          {categories.map((category) => (
            <section
              className="editorial-tooling-category"
              key={category.title}
            >
              <h2>{category.title}</h2>
              <div>
                <p>{category.description}</p>
                <ul className="editorial-tooling-items">
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
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="editorial-publication-note">
          <p>
            Personal tooling notes are not published yet. The project case
            studies include their verified technology stacks.
          </p>
          <TextLink href="/work">Explore the systems</TextLink>
        </div>
      )}
    </div>
  );
}
