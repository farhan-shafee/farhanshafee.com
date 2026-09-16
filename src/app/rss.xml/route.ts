import { siteConfig } from "@/config/site";
import { escapeXml, getPublishedArticles } from "@/lib/writing";

export const dynamic = "force-static";

export function GET() {
  const articles = getPublishedArticles();
  const items = articles
    .map((article) => {
      const url = `${siteConfig.url}/writing/${article.slug}`;
      return `<item><title>${escapeXml(article.title)}</title><link>${escapeXml(url)}</link><guid isPermaLink="true">${escapeXml(url)}</guid><description>${escapeXml(article.description)}</description><pubDate>${new Date(`${article.date}T00:00:00Z`).toUTCString()}</pubDate>${article.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}</item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${escapeXml(siteConfig.name)} — Writing</title>
<link>${escapeXml(siteConfig.url)}/writing</link>
<description>${escapeXml(siteConfig.description)}</description>
<language>en-us</language>
<atom:link href="${escapeXml(siteConfig.url)}/rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel></rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
