import Link from "next/link";
import { ArrowIcon } from "@/components/ui";
import { formatArticleDate, type Article } from "@/lib/writing";

export function WritingList({ articles }: { articles: Article[] }) {
  return (
    <ul className="writing-list">
      {articles.map((article) => (
        <li className="writing-row" key={article.slug}>
          <div className="writing-row-meta">
            <time dateTime={article.date}>
              {formatArticleDate(article.date)}
            </time>
            <span>~{article.readingMinutes} min read</span>
          </div>
          <div>
            <h2 className="writing-row-title">
              <Link href={`/writing/${article.slug}`}>
                {article.title}
                <ArrowIcon />
              </Link>
            </h2>
            <p>{article.description}</p>
            <ul className="tags" aria-label="Article topics">
              {article.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/writing/tag/${tag}`}>
                    {tag.replaceAll("-", " ")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function WritingTags({
  tags,
  current,
}: {
  tags: string[];
  current?: string;
}) {
  if (tags.length === 0) return null;
  return (
    <nav className="tag-filter" aria-label="Filter writing by topic">
      <Link href="/writing" aria-current={current ? undefined : "page"}>
        All writing
      </Link>
      {tags.map((tag) => (
        <Link
          href={`/writing/tag/${tag}`}
          key={tag}
          aria-current={current === tag ? "page" : undefined}
        >
          {tag.replaceAll("-", " ")}
        </Link>
      ))}
    </nav>
  );
}
