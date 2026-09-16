import fs from "node:fs";
import path from "node:path";
import { createProcessor } from "@mdx-js/mdx";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";

export interface Article {
  title: string;
  description: string;
  date: string;
  updated?: string;
  slug: string;
  tags: string[];
  draft: boolean;
  featured: boolean;
  canonical?: string;
  ogImage?: string;
  body: string;
  readingMinutes: number;
}

export interface TocItem {
  id: string;
  title: string;
  depth: number;
}

interface ContentNode {
  type: string;
  value?: string;
  depth?: number;
  children?: ContentNode[];
}

const contentDirectory = path.join(process.cwd(), "content", "writing");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function requiredText(value: unknown, field: string, filename: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${filename}: ${field} must be a non-empty string.`);
  }
  return value.trim();
}

function validDate(value: unknown, field: string, filename: string): string {
  // Quoted dates preserve the author's input. YAML Date objects can silently
  // normalize an impossible unquoted date before calendar validation runs.
  const date = value;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(
      `${filename}: ${field} must use a quoted YYYY-MM-DD string.`,
    );
  }
  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date
  ) {
    throw new Error(`${filename}: ${field} is not a valid calendar date.`);
  }
  return date;
}

function optionalUrl(
  value: unknown,
  field: string,
  filename: string,
  allowLocal = false,
) {
  if (value === undefined) return undefined;
  const url = requiredText(value, field, filename);
  if (allowLocal && url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" && !parsed.username && !parsed.password)
      return url;
  } catch {
    // Report the field and source instead of a low-level URL parsing error.
  }
  throw new Error(
    `${filename}: ${field} must be an HTTPS URL${allowLocal ? " or root-relative path" : ""}.`,
  );
}

function parseBody(body: string): ContentNode {
  return createProcessor({ remarkPlugins: [remarkGfm] }).parse(
    body,
  ) as ContentNode;
}

function visit(node: ContentNode, visitor: (node: ContentNode) => void) {
  visitor(node);
  node.children?.forEach((child) => visit(child, visitor));
}

function plainText(node: ContentNode): string {
  if (node.type === "text" || node.type === "inlineCode")
    return node.value ?? "";
  return node.children?.map(plainText).join("") ?? "";
}

/** Estimate: 200 prose words/minute plus 40 non-empty code lines/minute. */
export function estimateReadingTime(body: string): number {
  let wordCount = 0;
  let codeLines = 0;
  visit(parseBody(body), (node) => {
    if (node.type === "text" || node.type === "inlineCode") {
      wordCount +=
        node.value?.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ??
        0;
    }
    if (node.type === "code") {
      codeLines +=
        node.value?.split("\n").filter((line) => line.trim()).length ?? 0;
    }
  });
  return Math.max(1, Math.ceil(wordCount / 200 + codeLines / 40));
}

export function getTableOfContents(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const headings: TocItem[] = [];
  visit(parseBody(body), (node) => {
    if (node.type !== "heading") return;
    const title = plainText(node);
    const id = slugger.slug(title);
    if (node.depth === 2 || node.depth === 3) {
      headings.push({ id, title, depth: node.depth });
    }
  });
  return headings;
}

/** Only trusted, repository-authored MDX is accepted; never pass remote/user input. */
export function parseArticle(source: string, filename: string): Article {
  const { data, content } = matter(source);
  const title = requiredText(data.title, "title", filename);
  const description = requiredText(data.description, "description", filename);
  const slug = requiredText(data.slug, "slug", filename);
  if (!slugPattern.test(slug)) {
    throw new Error(
      `${filename}: slug must contain lowercase words separated by hyphens.`,
    );
  }
  if (path.basename(filename, ".mdx") !== slug) {
    throw new Error(`${filename}: slug must match the filename.`);
  }
  const date = validDate(data.date, "date", filename);
  const updated =
    data.updated === undefined
      ? undefined
      : validDate(data.updated, "updated", filename);
  if (updated && updated < date)
    throw new Error(`${filename}: updated cannot precede date.`);
  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    throw new Error(`${filename}: draft must be an unquoted boolean.`);
  }
  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    throw new Error(`${filename}: featured must be an unquoted boolean.`);
  }
  if (data.draft === false && !content.trim()) {
    throw new Error(`${filename}: a published article must have a body.`);
  }
  if (
    !Array.isArray(data.tags) ||
    data.tags.some(
      (tag: unknown) => typeof tag !== "string" || !slugPattern.test(tag),
    )
  ) {
    throw new Error(
      `${filename}: tags must be a list of lowercase, hyphen-separated tags.`,
    );
  }
  return {
    title,
    description,
    date,
    updated,
    slug,
    tags: [...new Set<string>(data.tags)],
    // Omission never publishes a draft. Publishing requires an explicit false.
    draft: data.draft !== false,
    featured: data.featured === true,
    canonical: optionalUrl(data.canonical, "canonical", filename),
    ogImage: optionalUrl(data.ogImage, "ogImage", filename, true),
    body: content.trim(),
    readingMinutes: estimateReadingTime(content),
  };
}

/** The only filesystem reader is statically scoped to the local content tree. */
export function getPublishedArticles(): Article[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const articles = fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith(".mdx"))
    .map((file) =>
      parseArticle(
        fs.readFileSync(path.join(contentDirectory, file.name), "utf8"),
        file.name,
      ),
    );
  return filterPublishedArticles(articles);
}

/** Pure publication policy, shared by the production reader and fixture tests. */
export function filterPublishedArticles(
  articles: readonly Article[],
  now = new Date(),
): Article[] {
  if (!Number.isFinite(now.getTime()))
    throw new Error("Publication date must be valid.");
  const today = now.toISOString().slice(0, 10);
  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.slug))
      throw new Error(`Duplicate writing slug: ${article.slug}`);
    slugs.add(article.slug);
  }
  return articles
    .filter((article) => !article.draft && article.date <= today)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

export function getArticle(slug: string): Article | undefined {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getArticleTags(): string[] {
  return [
    ...new Set(getPublishedArticles().flatMap((article) => article.tags)),
  ].sort();
}

export function getRelatedArticles(article: Article, limit = 2): Article[] {
  return getPublishedArticles()
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => ({
      article: candidate,
      score: candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .sort(
      (a, b) =>
        b.score - a.score || b.article.date.localeCompare(a.article.date),
    )
    .slice(0, limit)
    .map((candidate) => candidate.article);
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function escapeXml(value: string): string {
  return value.replace(
    /[<>&"']/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );
}
