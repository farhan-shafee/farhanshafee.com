import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { renderToReadableStream, renderToStaticMarkup } from "react-dom/server";
import { ArticleBody } from "../src/components/article-body";
import ArticlePage, {
  dynamic,
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "../src/app/writing/[slug]/page";
import WritingTagPage, {
  dynamic as tagDynamic,
  dynamicParams as tagDynamicParams,
  generateMetadata as generateTagMetadata,
} from "../src/app/writing/tag/[tag]/page";
import { GET as getRss } from "../src/app/rss.xml/route";
import sitemap from "../src/app/sitemap";
import {
  escapeXml,
  estimateReadingTime,
  filterPublishedArticles,
  formatArticleDate,
  getArticleTags,
  getPublishedArticles,
  getTableOfContents,
  parseArticle,
} from "../src/lib/writing";

function source(
  overrides: Record<string, unknown> = {},
  body = "## A useful heading\n\nA short article.",
) {
  const data = {
    title: "An example",
    description: "An example description.",
    date: "2026-01-02",
    slug: "an-example",
    tags: ["engineering"],
    draft: true,
    ...overrides,
  };
  return `---\n${Object.entries(data)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n")}\n---\n${body}`;
}

test("publication requires an explicit boolean false", () => {
  assert.equal(parseArticle(source(), "an-example.mdx").draft, true);
  assert.equal(
    parseArticle(source({ draft: undefined }), "an-example.mdx").draft,
    true,
  );
  assert.equal(
    parseArticle(source({ draft: false }), "an-example.mdx").draft,
    false,
  );
  assert.throws(
    () => parseArticle(source({ draft: "false" }), "an-example.mdx"),
    /draft must be an unquoted boolean/,
  );
});

test("frontmatter rejects invalid dates, unsafe slugs, and inconsistent metadata", () => {
  assert.throws(
    () => parseArticle(source({ date: "2026-02-30" }), "an-example.mdx"),
    /valid calendar date/,
  );
  assert.throws(
    () => parseArticle(source({ slug: "..\/private" }), "an-example.mdx"),
    /slug must contain/,
  );
  assert.throws(
    () => parseArticle(source(), "different-name.mdx"),
    /match the filename/,
  );
  assert.throws(
    () => parseArticle(source({ updated: "2025-01-01" }), "an-example.mdx"),
    /updated cannot precede/,
  );
  assert.throws(
    () => parseArticle(source({ title: " " }), "an-example.mdx"),
    /title must be/,
  );
  assert.throws(
    () => parseArticle(source({ tags: ["bad tag"] }), "an-example.mdx"),
    /tags must be/,
  );
  assert.throws(
    () =>
      parseArticle(
        source({ canonical: "javascript:alert(1)" }),
        "an-example.mdx",
      ),
    /HTTPS URL/,
  );
  assert.throws(
    () =>
      parseArticle(
        source({ ogImage: "//external.example/image.png" }),
        "an-example.mdx",
      ),
    /HTTPS URL/,
  );
  assert.throws(
    () => parseArticle(source({ draft: false }, ""), "an-example.mdx"),
    /published article must have a body/,
  );
});

test("publication policy excludes drafts, omitted flags, and future publications", () => {
  const fixtures = [
    ["published", { draft: false }],
    ["draft", { draft: true }],
    ["omitted", { draft: undefined }],
    ["future", { draft: false, date: "2099-01-01" }],
  ] as const;
  const parsed = fixtures.map(([slug, values]) =>
    parseArticle(source({ ...values, slug }), `${slug}.mdx`),
  );
  const articles = filterPublishedArticles(
    parsed,
    new Date("2026-09-16T12:00:00Z"),
  );
  assert.deepEqual(
    articles.map((article) => article.slug),
    ["published"],
  );
  assert.deepEqual(articles[0].tags, ["engineering"]);
});

test("publication dates validate exact calendar values and use UTC day boundaries", () => {
  assert.throws(
    () => parseArticle(source({ date: "2025-02-29" }), "an-example.mdx"),
    /valid calendar date/,
  );
  assert.equal(
    parseArticle(source({ date: "2024-02-29" }), "an-example.mdx").date,
    "2024-02-29",
  );
  assert.throws(
    () =>
      parseArticle(
        source().replace('date: "2026-01-02"', "date: 2026-02-30"),
        "an-example.mdx",
      ),
    /quoted YYYY-MM-DD/,
  );
  const article = parseArticle(
    source({
      date: "2026-09-16",
      draft: false,
      tags: ["security", "security", "ai"],
    }),
    "an-example.mdx",
  );
  assert.deepEqual(article.tags, ["security", "ai"]);
  assert.equal(
    filterPublishedArticles([article], new Date("2026-09-15T23:59:59Z")).length,
    0,
  );
  assert.equal(
    filterPublishedArticles([article], new Date("2026-09-16T00:00:00Z")).length,
    1,
  );
  assert.equal(formatArticleDate("2026-09-16"), "Sep 16, 2026");
  assert.throws(
    () => filterPublishedArticles([article], new Date("invalid")),
    /Publication date must be valid/,
  );
});

test("TOC matches GitHub heading slugs, including repeated and formatted headings", () => {
  const toc = getTableOfContents(
    "## First *section*\n\n### Code `sample`\n\n## First section\n\n#### Too deep",
  );
  assert.deepEqual(toc, [
    { id: "first-section", title: "First section", depth: 2 },
    { id: "code-sample", title: "Code sample", depth: 3 },
    { id: "first-section-1", title: "First section", depth: 2 },
  ]);
});

test("reading estimates count prose and code separately, excluding Markdown URLs", () => {
  assert.equal(estimateReadingTime("word ".repeat(200)), 1);
  assert.equal(estimateReadingTime("word ".repeat(201)), 2);
  assert.equal(
    estimateReadingTime(`\`\`\`ts\n${"const value = 1;\n".repeat(80)}\`\`\``),
    2,
  );
  assert.equal(
    estimateReadingTime(
      `[link](https://example.com/${"long-path-".repeat(500)})`,
    ),
    1,
  );
  assert.equal(
    estimateReadingTime(
      "{/* This invisible comment should never count toward reading time. */}",
    ),
    1,
  );
});

test("RSS text escapes markup and quoted characters", () => {
  assert.equal(
    escapeXml("R&D <systems> \"quoted\" 'text'"),
    "R&amp;D &lt;systems&gt; &quot;quoted&quot; &apos;text&apos;",
  );
});

test("published article metadata, schema, RSS, and sitemap use the canonical domain", async (t) => {
  const origin = "https://farhan-shafee.com";
  const slug = "domain-regression-fixture";
  const directory = path.resolve("content", "writing");
  const filename = path.join(directory, `${slug}.mdx`);
  const articleSource = source({ slug, draft: false, date: "2000-01-02" });
  const readDirectory = fs.readdirSync;
  const readFile = fs.readFileSync;

  // In-memory content only: no fixture is ever written to the public content tree.
  // The test context restores these filesystem methods when the test finishes.
  t.mock.method(fs, "readdirSync", (...args: unknown[]) => {
    if (args[0] === directory)
      return [{ name: `${slug}.mdx`, isFile: () => true }];
    return Reflect.apply(readDirectory, fs, args);
  });
  t.mock.method(fs, "readFileSync", (...args: unknown[]) => {
    if (args[0] === filename) return articleSource;
    return Reflect.apply(readFile, fs, args);
  });

  const url = `${origin}/writing/${slug}`;
  const props = { params: Promise.resolve({ slug }) };
  const metadata = await generateMetadata(props);
  assert.equal(metadata.alternates?.canonical, url);
  assert.equal(metadata.openGraph?.url, url);
  assert.deepEqual(metadata.authors, [
    { name: "Farhan Shafee", url: `${origin}/about` },
  ]);
  assert.ok(
    JSON.stringify(metadata.openGraph?.images).includes(
      `${origin}/opengraph-image`,
    ),
  );
  assert.ok(
    JSON.stringify(metadata.twitter?.images).includes(
      `${origin}/opengraph-image`,
    ),
  );

  const html = await new Response(
    await renderToReadableStream(await ArticlePage(props)),
  ).text();
  const script = html.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s,
  );
  assert.ok(script, "Published articles must emit structured data");
  const graph = JSON.parse(script[1])["@graph"];
  const article = graph.find(
    (entry: { "@type": string }) => entry["@type"] === "BlogPosting",
  );
  assert.ok(article);
  assert.equal(article["@id"], `${url}#article`);
  assert.equal(article.url, url);
  assert.equal(article.mainEntityOfPage, url);
  assert.equal(article.author["@id"], `${origin}/#person`);
  assert.equal(article.author.url, `${origin}/about`);
  const breadcrumbs = graph.find(
    (entry: { "@type": string }) => entry["@type"] === "BreadcrumbList",
  );
  assert.deepEqual(
    breadcrumbs.itemListElement.map((entry: { item: string }) => entry.item),
    [origin, `${origin}/writing`, url],
  );
  const rss = await getRss().text();
  assert.ok(rss.includes(`<link>${url}</link>`));
  assert.ok(rss.includes(`<guid isPermaLink="true">${url}</guid>`));
  assert.ok(sitemap().some((entry) => entry.url === url));
  for (const output of [
    JSON.stringify(metadata),
    html,
    rss,
    JSON.stringify(sitemap()),
  ])
    assert.doesNotMatch(output, /https?:\/\/(?:www\.)?farhanshafee\.com\b/i);
});

test("trusted local MDX renders highlighted code, tables, and copy-link headings", async () => {
  const body =
    "## A useful heading\n\n| Input | Output |\n| --- | --- |\n| 1 | 2 |\n\n```ts\nconst answer = 42;\n```";
  const html = renderToStaticMarkup(await ArticleBody({ body }));
  assert.match(html, /id="a-useful-heading"/);
  assert.match(html, /href="#a-useful-heading"/);
  assert.match(html, /class="heading-anchor"/);
  assert.match(html, /aria-label="Copy link to section: A useful heading"/);
  assert.doesNotMatch(html, /aria-hidden="true"|tabindex="-1"/);
  assert.match(html, /<table>/);
  assert.match(
    html,
    /<pre[^>]*tabindex="0"[^>]*role="region"[^>]*aria-label="Code example"/,
  );
  assert.match(html, /data-language="ts"/);
  assert.match(html, /--shiki-light/);
  assert.match(html, /--shiki-dark/);
});

test("actual draft content has no public route, metadata, feed item, or sitemap entry", async () => {
  const directory = path.join(process.cwd(), "content", "writing");
  const today = new Date().toISOString().slice(0, 10);
  const unpublished = fs
    .readdirSync(directory)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) =>
      parseArticle(fs.readFileSync(path.join(directory, name), "utf8"), name),
    )
    .filter((article) => article.draft || article.date > today);
  const generated = generateStaticParams().map(({ slug }) => slug);
  const rss = await getRss().text();
  const sitemapUrls = sitemap().map(({ url }) => url);
  const published = getPublishedArticles();
  for (const tag of getArticleTags()) {
    assert.ok(published.some((article) => article.tags.includes(tag)));
  }
  assert.equal(dynamic, "force-static");
  assert.equal(dynamicParams, true);
  for (const article of unpublished) {
    assert.ok(!generated.includes(article.slug));
    assert.ok(!rss.includes(`/writing/${article.slug}`));
    assert.ok(
      !sitemapUrls.some((url) => url.endsWith(`/writing/${article.slug}`)),
    );
    const props = { params: Promise.resolve({ slug: article.slug }) };
    const isNotFound = (error: unknown) =>
      error instanceof Error &&
      "digest" in error &&
      error.digest === "NEXT_HTTP_ERROR_FALLBACK;404";
    await assert.rejects(() => ArticlePage(props), isNotFound);
    await assert.rejects(() => generateMetadata(props), isNotFound);
  }
});

test("unknown tag paths remain static and return a normal not-found result", async () => {
  assert.equal(tagDynamic, "force-static");
  assert.equal(tagDynamicParams, true);
  const props = { params: Promise.resolve({ tag: "unknown-test-only-topic" }) };
  assert.ok(!getArticleTags().includes("unknown-test-only-topic"));
  const isNotFound = (error: unknown) =>
    error instanceof Error &&
    "digest" in error &&
    error.digest === "NEXT_HTTP_ERROR_FALLBACK;404";
  await assert.rejects(() => WritingTagPage(props), isNotFound);
  await assert.rejects(() => generateTagMetadata(props), isNotFound);
});
