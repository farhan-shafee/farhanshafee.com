import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/writing";
import { getProjectBySlug } from "@/data/projects";

export const dynamic = "force-static";

export function GET() {
  const articles = getPublishedArticles();
  const aegisgraph = getProjectBySlug("aegisgraph");
  const text = `# ${siteConfig.name}

> Security engineering, AI automation, and fintech systems.

${siteConfig.name} builds security tools, automation systems, and technical infrastructure. His professional experience includes fintech software engineering, test automation, and backend financial systems. This is his personal professional website.

## Important resources

- [About](${absoluteUrl("/about")}): Professional background and technical focus.
- [Work](${absoluteUrl("/work")}): Business systems, personal engineering projects, and labs. Each entry distinguishes its status and type; unverified implementation details and outcomes are omitted.
- [Writing](${absoluteUrl("/writing")}): Published technical articles. Draft outlines are not public.
- [Lab](${absoluteUrl("/lab")}): Investigation topics covering detection signals, human review in AI-assisted workflows, and infrastructure access boundaries. Detailed experiments and results are not yet published.
- [Now](${absoluteUrl("/now")}): Current building, learning, and investigation priorities.
- [Uses](${absoluteUrl("/uses")}): Engineering tools, organized by category. Specific products are listed only when confirmed.
- [Contact](${absoluteUrl("/contact")}): Professional contact paths.

## AegisGraph

[AegisGraph](${absoluteUrl("/work/aegisgraph")}) is an evidence-grounded security investigation application for a synthetic fintech environment. Deterministic detection and correlation establish incident evidence before bounded AI analysis. The application validates structured findings, evidence citations, and claim support outside the model; analyst actions remain authoritative. It is a local engineering demonstration, not a production SOC deployment. Production authentication, tenant authorization, multi-tenancy, streaming ingestion, broader live-model evaluation, and stronger evidence/audit protections remain future work.
${aegisgraph?.github ? `\n[Public source](${aegisgraph.github}): Threat model, architecture decision records, detection rules, evaluation harness, validation documentation, and CI workflow.\n` : ""}

## CyberBit Solutions

${siteConfig.name} created [CyberBit Solutions](${siteConfig.cyberbit}), which develops cybersecurity tools and services primarily for businesses. This personal site also covers his automation projects, security labs, and financial systems background.

## Profiles and feeds

- [GitHub](${siteConfig.github})
${siteConfig.linkedin ? `- [LinkedIn](${siteConfig.linkedin})\n` : ""}- [RSS](${absoluteUrl("/rss.xml")}): Published writing.
- [Sitemap](${absoluteUrl("/sitemap.xml")}): Public canonical site routes.
${articles.length > 0 ? `\n## Published writing\n\n${articles.map((article) => `- [${article.title}](${absoluteUrl(`/writing/${article.slug}`)}): ${article.description}`).join("\n")}\n` : ""}`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
