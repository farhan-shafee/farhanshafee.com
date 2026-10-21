import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";
import { getPublishedArticles } from "@/lib/writing";
import { getProjectBySlug, getSecurityProjects } from "@/data/projects";

export const dynamic = "force-static";

export function GET() {
  const articles = getPublishedArticles();
  const aegisgraph = getProjectBySlug("aegisgraph");
  const creditops = getProjectBySlug("creditops-ai");
  const tradeflow = getProjectBySlug("tradeflow");
  const securityProjects = getSecurityProjects();
  const text = `# ${siteConfig.name}

> Security engineering, AI automation, and fintech systems.

${siteConfig.name} builds security tools, automation systems, and technical infrastructure. His professional experience includes fintech software engineering, test automation, and backend financial systems. This is his personal professional website.

## Important resources

- [About](${absoluteUrl("/about")}): Professional background and technical focus.
- [Work](${absoluteUrl("/work")}): AegisGraph, CreditOps AI, TradeFlow, CreditFlow QE, and four supporting public security projects. Each entry identifies its evidence and limitations.
- [Writing](${absoluteUrl("/writing")}): Published technical articles. Draft outlines are not public.
- [Lab](${absoluteUrl("/lab")}): Public-evidence questions in detection, AI-assisted investigation, and test isolation. Implemented security projects and their validation are documented under Work.
- [Now](${absoluteUrl("/now")}): Current building, studying, and investigation priorities.
- [Uses](${absoluteUrl("/uses")}): Verified project stacks; personal tooling notes are not yet published.
- [Contact](${absoluteUrl("/contact")}): Professional contact paths.

## AegisGraph

[AegisGraph](${absoluteUrl("/work/aegisgraph")}) V2 connects causal replay, cited evidence, working hypotheses, detection-rule comparisons, and hash-verifiable investigation exports in a simulated fintech environment. Eight synthetic scenarios include suspicious, benign, ambiguous, and conflicting context. Decision receipts expose the distinct rules, rule families, anchored time window, and unmet conditions behind both positive and negative correlation decisions. Atlas is the persisted canonical case; other scenario projections remain ephemeral. Hypothesis support stays separate from human acceptance. The application validates typed AI claims, exact-context citations, and evidence support outside the model. Rule comparisons and deterministic evaluations measure named fixture obligations, not production detection accuracy or general model safety. Export verification checks exact content against an unsigned, replaceable SHA-256 manifest; it does not authenticate the source or prove telemetry truth.

The hosted public demo is read-only and deterministic, with fixed rule comparisons and no live OpenAI calls. Local mode adds saved hypothesis reviews, bounded rule proposals and approvals, and optional OpenAI analysis. Historical live-provider results remain separate evidence. The stack is Next.js on Vercel, FastAPI on Railway, and Railway PostgreSQL. This is not a production SOC deployment. Authenticated case access, tenant isolation, production ingestion, independent evidence retention, and broader live-model evaluation remain future work.
${aegisgraph?.inspection ? `\n${aegisgraph.inspection.links.map((link) => `- [${link.label}](${absoluteUrl(link.href)})`).join("\n")}\n` : ""}
${aegisgraph?.inspection?.guidedLinks?.length ? `\nGuided inspection:\n\n${aegisgraph.inspection.guidedLinks.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n` : ""}

## CreditOps AI

[CreditOps AI](${absoluteUrl("/work/creditops-ai")}): ${creditops?.description}

Source private. The public showcase plays recorded model-assisted investigations with synthetic pricing/Kafka, FIX-session, database-pool, and RFQ/order evidence. Playback makes no fresh model or MCP diagnostic calls. Original proposals, recorded advisories, and draft handoffs require human review; initiating causes remain unconfirmed. The recordings do not establish model-directed follow-ups or production incident resolution. Python/FastAPI, read-only MCP tools, Next.js, and PostgreSQL are publicly described.
${creditops?.inspection ? `\n${creditops.inspection.links.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n` : ""}

## TradeFlow

[TradeFlow](${absoluteUrl("/work/tradeflow")}): ${tradeflow?.description}

A reachable public synthetic trading workstation at https://tradeflow.farhan-shafee.com with in-memory sessions and strict TypeScript, a Node.js server, test-owned sessions and records, runtime schemas, independently interpreted OpenAPI contracts, and Playwright UI/API/contract/integration coverage. Chromium, Firefox, and WebKit check the browser workflows. Documented AI assistance remains human-reviewed; deterministic checks decide acceptance. There is no live brokerage, exchange execution, matching engine, real P&L, or employer data. Browser activity is not a durable audit history.
${tradeflow?.inspection ? `\n${tradeflow.inspection.links.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n` : ""}

## CreditFlow QE

[CreditFlow QE](https://farhan-shafee.com/work/creditflow-qe): A transactional credit-card simulator with independent Java, Cucumber and REST Assured automation, plus executed CI and browser-test evidence.

An AI-assisted synthetic banking application with exact monetary values, transactional PostgreSQL state, original payment receipt replay and independent Java API/browser automation. Public accounts are isolated and expire after 30 minutes; quotas are conservative and idle services can take time to wake. No real cards, funds, settlement or regulatory-compliance claim. A dated isolated local Jenkins execution is documented separately from current GitHub CI; sustained-load behavior and availability/SLA remain unverified.

- [Live demo](https://creditflow.farhan-shafee.com)
- [View source](https://github.com/farhan-shafee/creditflow-qe)
- [Verified CI](https://github.com/farhan-shafee/creditflow-qe/actions/runs/38820309474)
- [Validation history](https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/evidence/STATUS.md)
- [Local Jenkins execution](https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/evidence/jenkins-execution.md)

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
