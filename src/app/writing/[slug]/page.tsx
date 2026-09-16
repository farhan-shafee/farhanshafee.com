import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { SectionHeading, TextLink } from "@/components/ui";
import { WritingList } from "@/components/writing-list";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import {
  formatArticleDate,
  getArticle,
  getPublishedArticles,
  getRelatedArticles,
  getTableOfContents,
} from "@/lib/writing";

type Props = { params: Promise<{ slug: string }> };

// Unknown paths reach the published-only guard, avoiding Next's NoFallbackError
// path for empty static inventories while keeping generated responses static.
export const dynamic = "force-static";
export const dynamicParams = true;

export function generateStaticParams() {
  return getPublishedArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const url = article.canonical ?? `${siteConfig.url}/writing/${article.slug}`;
  const base = pageMetadata(
    article.title,
    article.description,
    `/writing/${article.slug}`,
  );
  return {
    ...base,
    alternates: { ...base.alternates, canonical: url },
    authors: [{ name: siteConfig.name, url: `${siteConfig.url}/about` }],
    openGraph: {
      ...base.openGraph,
      type: "article",
      url,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [siteConfig.name],
      tags: article.tags,
      ...(article.ogImage
        ? { images: [{ url: article.ogImage, alt: article.title }] }
        : {}),
    },
    twitter: {
      ...base.twitter,
      ...(article.ogImage ? { images: [article.ogImage] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const headings = getTableOfContents(article.body);
  const related = getRelatedArticles(article);
  const localUrl = `${siteConfig.url}/writing/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${localUrl}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        author: {
          "@type": "Person",
          "@id": `${siteConfig.url}/#person`,
          name: siteConfig.name,
          url: `${siteConfig.url}/about`,
        },
        mainEntityOfPage: article.canonical ?? localUrl,
        url: localUrl,
        ...(article.ogImage
          ? { image: new URL(article.ogImage, siteConfig.url).toString() }
          : {}),
        keywords: article.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Writing",
            item: `${siteConfig.url}/writing`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: localUrl,
          },
        ],
      },
    ],
  };

  return (
    <article className="page-shell narrow">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="article-header">
        <TextLink href="/writing">All writing</TextLink>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <div className="article-meta">
          <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
          <span title="Estimated at 200 words and 40 lines of code per minute">
            ~{article.readingMinutes} min read
          </span>
          {article.updated && article.updated !== article.date ? (
            <span>
              Updated{" "}
              <time dateTime={article.updated}>
                {formatArticleDate(article.updated)}
              </time>
            </span>
          ) : null}
        </div>
        <ul className="tags" aria-label="Article topics">
          {article.tags.map((tag) => (
            <li key={tag}>
              <Link href={`/writing/tag/${tag}`}>
                {tag.replaceAll("-", " ")}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      {headings.length >= 3 ? (
        <nav className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ul>
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={heading.depth === 3 ? "toc-item-sub" : undefined}
              >
                <a href={`#${heading.id}`}>{heading.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      <ArticleBody body={article.body} />
      <footer className="article-footer">
        <TextLink href="/writing">Back to writing</TextLink>
        <TextLink href="/rss.xml">Subscribe via RSS</TextLink>
      </footer>
      {related.length > 0 ? (
        <section aria-label="More writing">
          <SectionHeading title="Keep reading" />
          <WritingList articles={related} />
        </section>
      ) : null}
    </article>
  );
}
