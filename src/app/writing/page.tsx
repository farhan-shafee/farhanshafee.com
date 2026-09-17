import Link from "next/link";
import { PageIntro, TextLink } from "@/components/ui";
import { WritingList, WritingTags } from "@/components/writing-list";
import { pageMetadata } from "@/lib/seo";
import {
  formatArticleDate,
  getArticleTags,
  getPublishedArticles,
} from "@/lib/writing";

export const metadata = pageMetadata(
  "Writing",
  "Technical notes on security engineering, automation, and financial systems. Evidence, implementation decisions, and lessons from building.",
  "/writing",
);

export default function WritingPage() {
  const articles = getPublishedArticles();
  const featured = articles.find((article) => article.featured);
  const archive = featured
    ? articles.filter((article) => article.slug !== featured.slug)
    : articles;
  return (
    <div className="page-shell editorial-page editorial-writing">
      <PageIntro
        eyebrow="Writing"
        title="Engineering notes."
        description="Security engineering, automation, and financial systems. Implementation decisions, constraints, and lessons from the work."
      >
        <TextLink href="/rss.xml">Subscribe via RSS</TextLink>
      </PageIntro>
      <WritingTags tags={getArticleTags()} />
      {articles.length > 0 ? (
        <>
          {featured && (
            <article
              className="editorial-featured-writing"
              aria-labelledby="featured-article-title"
            >
              <p className="editorial-label">Selected article</p>
              <h2 id="featured-article-title">
                <Link href={`/writing/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className="editorial-featured-description">
                {featured.description}
              </p>
              <div className="editorial-article-meta">
                <time dateTime={featured.date}>
                  {formatArticleDate(featured.date)}
                </time>
                <span>~{featured.readingMinutes} min read</span>
              </div>
              {featured.tags.length > 0 && (
                <ul
                  className="editorial-writing-topics"
                  aria-label="Article topics"
                >
                  {featured.tags.map((tag) => (
                    <li key={tag}>
                      <Link href={`/writing/tag/${tag}`}>
                        {tag.replaceAll("-", " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          )}
          {archive.length > 0 && (
            <section
              className="editorial-writing-archive"
              aria-label="Article archive"
            >
              {featured && <p className="editorial-label">Archive</p>}
              <WritingList articles={archive} />
            </section>
          )}
        </>
      ) : (
        <section
          className="editorial-publication-note"
          aria-labelledby="writing-in-progress"
        >
          <h2 id="writing-in-progress">Technical writing in progress.</h2>
          <p>
            Articles are being prepared for review. The project case studies
            document current engineering work.
          </p>
          <TextLink href="/work">Read the case studies</TextLink>
        </section>
      )}
    </div>
  );
}
