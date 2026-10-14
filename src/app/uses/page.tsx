import { PageIntro, TextLink } from "@/components/ui";
import { usesCategories } from "@/data/uses";
import { getProjectBySlug } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Uses",
  "Verified technology stacks from Farhan Shafee's projects. Personal tooling notes have not yet been published.",
  "/uses",
);

export default function UsesPage() {
  const categories = usesCategories.filter(
    (category) => category.items.length > 0,
  );
  const documentedProjects = ["aegisgraph", "tradeflow"]
    .map(getProjectBySlug)
    .filter((project) => project !== undefined);
  return (
    <div className="page-shell editorial-page editorial-compact">
      <PageIntro
        eyebrow="Uses / Tools & working environment"
        title="Tools & working environment."
        description={
          categories.length > 0
            ? "Personal notes on software, infrastructure, and hardware."
            : "Personal tooling notes are not published yet. These case studies document the software used in my projects."
        }
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
        <div className="editorial-tooling" aria-label="Verified project stacks">
          {documentedProjects.map((project) => (
            <section className="editorial-tooling-category" key={project.slug}>
              <h2>{project.title}</h2>
              <div>
                <p>{project.technologies.join(" · ")}</p>
                <div className="editorial-inline-links">
                  <TextLink href={`/work/${project.slug}`}>
                    Implementation & decisions
                  </TextLink>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
