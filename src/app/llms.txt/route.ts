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

The hosted public demo is read-only and deterministic, with fixed rule comparisons and no live OpenAI calls. Local mode adds saved hypothesis reviews, bounded rule proposals and approvals, and optional OpenAI analysis. Historical live-provider results remain separate evidence. Railway hosts Next.js, FastAPI and PostgreSQL, with TLS, a restricted SELECT-only API database role and tested off-volume backup recovery. This is not a production SOC deployment. Authenticated case access, tenant isolation, production ingestion, independent evidence retention, and broader live-model evaluation remain future work.
${aegisgraph?.inspection ? `\n${aegisgraph.inspection.links.map((link) => `- [${link.label}](${absoluteUrl(link.href)})`).join("\n")}\n` : ""}
${aegisgraph?.inspection?.guidedLinks?.length ? `\nGuided inspection:\n\n${aegisgraph.inspection.guidedLinks.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n` : ""}

## CreditOps AI

[CreditOps AI](${absoluteUrl("/work/creditops-ai")}): ${creditops?.description}

[Public source](https://github.com/farhan-shafee/creditops-ai). Railway hosts the Next.js console, FastAPI API and PostgreSQL database with TLS and tested backup recovery. The public showcase plays recorded model-assisted investigations with synthetic pricing/Kafka, FIX-session, database-pool, and RFQ/order evidence. Playback makes no fresh model or MCP diagnostic calls. Original proposals, recorded advisories, and draft handoffs require human review; initiating causes remain unconfirmed. The recordings do not establish model-directed follow-ups or production incident resolution. Python/FastAPI, read-only MCP tools, Next.js, and PostgreSQL are publicly described.
${creditops?.inspection ? `\n${creditops.inspection.links.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n` : ""}

## TradeFlow

[TradeFlow](${absoluteUrl("/work/tradeflow")}): ${tradeflow?.description}

TradeFlow's public institutional workflow was released November 6 at pinned b021602, accepted in PR #32. All eight release-merge checks passed on first attempts; both PostgreSQL runs passed 455/455 with cleanup. Chromium, Firefox and WebKit completed the actual canonical-domain analytics, RFQ, quote acceptance, acknowledgment, 40.00 par execution, 4002-cent consideration, remainder cancellation and COMPLETED_CLEAN reconciliation journey. Viewer/cross-visitor boundaries, reload, 320 px layout and genuine clean source provenance passed.

Railway's private Node.js app uses dedicated PostgreSQL 17.10, separate restricted roles and verified CA/hostname TLS. Public workspace ownership stays server-side and ends with the original session, logout or app restart. Writes last 30 minutes; records become cleanup-eligible after 60 minutes, subject to leases/failure rules. Retention does not provide public recovery. Equities books remain ephemeral. Independent Python/SQL and bounded Phase 3C0 offline FIX conformance remain source-backed verification tools. There is no real broker/exchange, live feed, settlement, real-money P&L, runtime FIX session engine, transport or peer interoperability. Counts and historical screenshots retain their revision scope; finite checks do not establish uptime, sustained capacity or the cause of historical intermittent failures.
${tradeflow?.inspection ? `\n${tradeflow.inspection.links.map((link) => `- [${link.label}](${link.href})`).join("\n")}\n` : ""}

## CreditFlow QE

[CreditFlow QE](https://farhan-shafee.com/work/creditflow-qe): A Java/PostgreSQL credit-card simulator with independent Cucumber and REST Assured automation, inspectable transaction receipts and four real correctness demos.

An AI-assisted synthetic banking application with exact monetary values, transactional PostgreSQL state, original payment receipt replay and independent Java API/browser automation. The workspace exposes sanitized transaction receipts and four isolated correctness demonstrations backed by observed HTTP responses and saved ledger state. The web, API and live PostgreSQL run on Railway with private verify-full TLS and pinned application releases. Public accounts are isolated and expire after 30 minutes; quotas are conservative. API sleep is disabled; the frontend may wake from idle. The first scheduled daily-backup/stabilization gate passed October 26; five rehearsal service instances were retired October 29 with protected volumes/archive storage retained. The archive-monitor recovery rollout completed October 31 with two scheduled executions verified. The November 4 frontend evidence release d7658be passed main CI and a separate read-only public check; its snapshot preserves earlier b286242 financial acceptance. Further resource retirement and future recovery assurances remain separate operational questions. No real cards, funds, settlement or regulatory-compliance claim. A dated isolated local Jenkins execution is documented separately from current GitHub CI; sustained-load behavior and availability/SLA remain unverified.

- [Live demo](https://creditflow.farhan-shafee.com)
- [Five-minute walkthrough](https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/interview-guide/five-minute-walkthrough.md)
- [View source](https://github.com/farhan-shafee/creditflow-qe)
- [CI history](https://github.com/farhan-shafee/creditflow-qe/actions/workflows/verify.yml)
- [Workspace CI (November 4)](https://github.com/farhan-shafee/creditflow-qe/actions/runs/41886196621)
- [Workspace acceptance (November 4)](https://github.com/farhan-shafee/creditflow-qe/blob/4fac13ac84565296281fed72ae6e1b1dd9b3be55/docs/evidence/financial-workspace-20261104.md)
- [Evidence release CI (November 4)](https://github.com/farhan-shafee/creditflow-qe/actions/runs/41899735083)
- [Current release index](https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/current-state.md)
- [Deployment and recovery](https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/railway-production.md)
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
