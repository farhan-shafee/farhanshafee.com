import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/writing";

export const dynamic = "force-static";

export function GET() {
  const articles = getPublishedArticles();
  const text = `# ${siteConfig.name}

> Security engineering, AI automation, and fintech systems.

${siteConfig.name} builds security tools, automation systems, and technical infrastructure. His professional experience includes fintech software engineering, test automation, and backend financial systems. This is his personal professional website.

## Important resources

- [About](${absoluteUrl("/about")}): Professional background and technical focus.
- [Work](${absoluteUrl("/work")}): Business systems, personal engineering projects, and labs. Each entry distinguishes its status and type; unverified implementation details and outcomes are omitted.
- [Writing](${absoluteUrl("/writing")}): Published technical articles. Draft outlines are not public.
- [Lab](${absoluteUrl("/lab")}): Experiments, prototypes, and areas of technical exploration.
- [Now](${absoluteUrl("/now")}): Current building, learning, and investigation priorities.
- [Uses](${absoluteUrl("/uses")}): Engineering tools, organized by category. Specific products are listed only when confirmed.
- [Contact](${absoluteUrl("/contact")}): Professional contact paths.

## CyberBit Solutions

${siteConfig.name} created [CyberBit Solutions](${siteConfig.cyberbit}), which develops cybersecurity tools and services primarily for businesses. CyberBit is a separate business; this site describes Farhan's broader engineering work and interests.

## Profiles and feeds

- [GitHub](${siteConfig.github})
${siteConfig.linkedin ? `- [LinkedIn](${siteConfig.linkedin})\n` : ""}- [RSS](${absoluteUrl("/rss.xml")}): Published writing.
- [Sitemap](${absoluteUrl("/sitemap.xml")}): Public canonical site routes.
${articles.length > 0 ? `\n## Published writing\n\n${articles.map((article) => `- [${article.title}](${absoluteUrl(`/writing/${article.slug}`)}): ${article.description}`).join("\n")}\n` : ""}`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
