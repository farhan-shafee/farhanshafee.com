import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/writing";
import { getProjectBySlug, getSecurityProjects } from "@/data/projects";

export const dynamic = "force-static";

export function GET() {
  const articles = getPublishedArticles();
  const aegisgraph = getProjectBySlug("aegisgraph");
  const securityProjects = getSecurityProjects();
  const text = `# ${siteConfig.name}

> Security engineering, AI automation, and fintech systems.

${siteConfig.name} builds security tools, automation systems, and technical infrastructure. His professional experience includes fintech software engineering, test automation, and backend financial systems. This is his personal professional website.

## Important resources

- [About](${absoluteUrl("/about")}): Professional background and technical focus.
- [Work](${absoluteUrl("/work")}): Business systems, personal engineering projects, and labs. Each entry distinguishes its status and type; unverified implementation details and outcomes are omitted.
- [Writing](${absoluteUrl("/writing")}): Published technical articles. Draft outlines are not public.
- [Lab](${absoluteUrl("/lab")}): Open questions in detection, AI-assisted investigation, and infrastructure. Implemented supporting security projects and their validation are documented under Work.
- [Now](${absoluteUrl("/now")}): Current building, studying, and investigation priorities.
- [Uses](${absoluteUrl("/uses")}): Verified project stacks; personal tooling notes are not yet published.
- [Contact](${absoluteUrl("/contact")}): Professional contact paths.

## AegisGraph

[AegisGraph](${absoluteUrl("/work/aegisgraph")}) V2 connects causal replay, cited evidence, working hypotheses, detection-rule comparisons, and hash-verifiable investigation exports in a simulated fintech environment. Eight synthetic scenarios include suspicious, benign, ambiguous, and conflicting context. Decision receipts expose the distinct rules, rule families, anchored time window, and unmet conditions behind both positive and negative correlation decisions. Atlas is the persisted canonical case; other scenario projections remain ephemeral. Hypothesis support stays separate from human acceptance. The application validates typed AI claims, exact-context citations, and evidence support outside the model. Rule comparisons and deterministic evaluations measure named fixture obligations, not production detection accuracy or general model safety. Export verification checks exact content against an unsigned, replaceable SHA-256 manifest; it does not authenticate the source or prove telemetry truth.

The hosted public demo is read-only and deterministic, with fixed rule comparisons and no live OpenAI calls. Local mode adds saved hypothesis reviews, bounded rule proposals and approvals, and optional OpenAI analysis. Historical live-provider results remain separate evidence. The stack is Next.js on Vercel, FastAPI on Railway, and Railway PostgreSQL. This is not a production SOC deployment. Authenticated case access, tenant isolation, production ingestion, independent evidence retention, and broader live-model evaluation remain future work.
${aegisgraph?.inspection ? `\n${aegisgraph.inspection.links.map((link) => `- [${link.label}](${absoluteUrl(link.href)})`).join("\n")}\n` : ""}
${aegisgraph?.inspection?.guidedLinks?.length ? `\nGuided inspection:\n\n${aegisgraph.inspection.guidedLinks.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n` : ""}

## CyberBit Solutions

${siteConfig.name} created [CyberBit Solutions](${siteConfig.cyberbit}), a cybersecurity services business whose application connects public tools, intake, reporting, Stripe, transactional email, and admin workflows. Authorized workspace reviews and remediation have separate service scopes from the public checks and human-reviewed Snapshot. The implemented Instant Signal Brief workflow is available according to its configuration. The [case study](${absoluteUrl("/work/cyberbit-solutions")}) links public methodology and an explicitly fictional sample report. Public checks do not guarantee security.

## Supporting security engineering

These are reproducible engineering labs, with source and dated validation linked from each case study. Synthetic demonstrations and retained real scanner evidence are distinguished; none establishes production security or compliance.

${securityProjects.map((project) => `- [${project.title}](${absoluteUrl(`/work/${project.slug}`)}): ${project.description} [Source](${project.github}).`).join("\n")}

## Profiles and feeds

- [GitHub](${siteConfig.github})
${siteConfig.linkedin ? `- [LinkedIn](${siteConfig.linkedin})\n` : ""}- [RSS](${absoluteUrl("/rss.xml")}): Published writing.
- [Sitemap](${absoluteUrl("/sitemap.xml")}): Public canonical site routes.
${articles.length > 0 ? `\n## Published writing\n\n${articles.map((article) => `- [${article.title}](${absoluteUrl(`/writing/${article.slug}`)}): ${article.description}`).join("\n")}\n` : ""}`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
