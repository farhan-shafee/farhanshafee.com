import type { Project } from "./projects";

/** Presentation evidence is limited to the public profile and showcase. */
export const creditopsProject: Project = {
  title: "CreditOps AI",
  slug: "creditops-ai",
  status: "Completed",
  year: "2026",
  category: "Fintech investigation / AI systems",
  kind: "personal",
  description:
    "Recorded investigations of synthetic trading incidents, connecting diagnostic evidence with RFQ/order impact, assessment review, and human handoffs.",
  inspection: {
    summary:
      "Explore three recorded model-assisted investigations. Public playback uses synthetic data and makes no fresh model or MCP diagnostic calls; human review remains necessary.",
    links: [
      {
        label: "Public showcase",
        href: "https://creditops.farhan-shafee.com",
        featured: true,
      },
      {
        label: "Recorded investigations",
        href: "https://creditops.farhan-shafee.com/investigator",
      },
      {
        label: "Public architecture",
        href: "https://creditops.farhan-shafee.com/architecture",
      },
      {
        label: "Scope and limitations",
        href: "https://creditops.farhan-shafee.com/about",
      },
    ],
    facts: [
      {
        label: "Publicly described stack",
        value:
          "Python / FastAPI, read-only MCP tools, Next.js, and PostgreSQL.",
      },
      {
        label: "Playback",
        value:
          "Recorded synthetic investigations; no fresh model or diagnostic calls.",
      },
      { label: "Source", value: "Private." },
    ],
  },
  caseStudy: {
    overview: {
      paragraphs: [
        "CreditOps AI explores trading incident investigation through three recorded model-assisted cases. The public showcase connects synthetic technical observations to fictional RFQs and orders, then exposes the assessment, its evidence, and its limitations for human review. Source remains private; this page describes only the publicly presented scope.",
      ],
    },
    problem: {
      paragraphs: [
        "Trading incidents cross several systems before their impact becomes understandable. Consumer backlog can surface as stale quotes, session instability can leave acknowledgements uncertain, and database waits can become RFQ processing timeouts. An engineer needs to distinguish observed symptoms and supported failure conditions from an unconfirmed initiating cause.",
      ],
    },
    system: {
      title: "Three recorded investigations",
      bullets: [
        "Pricing backlog: Kafka consumer-lag observations, quote freshness, and recorded RFQ expiry.",
        "FIX session instability: reconnects, sequence gaps, delayed acknowledgements, and unresolved order outcomes.",
        "Database-pool exhaustion: saturation, database waits, timeout logs, and RFQ processing events.",
      ],
      paragraphs: [
        "The linked evidence view preserves discrete UTC observations and gaps. Filters change the display without rerunning the investigation. Request journeys use returned identity fields; a retransmitted FIX message remains tied to the same economic order. Pending or uncertain acknowledgement requires reconciliation before resubmission.",
      ],
    },
    architecture: {
      title: "Public technical scope",
      paragraphs: [
        "The public profile describes Python/FastAPI, read-only MCP tools, Next.js, and PostgreSQL. The public showcase is a recorded inspection surface. Fresh MCP diagnostics are a separate mode, and the source repository is private.",
      ],
    },
    whatIBuilt: {
      title: "Assessment review and handoff",
      paragraphs: [
        "The workspace retains the original model proposal alongside the recorded advisory and validation notes. In the pool-exhaustion example, observations support saturation and timeouts, while the advisory leaves the confirmed cause unset. Why saturation began remains unconfirmed.",
        "Technical and stakeholder handoff templates prepare local drafts with source references, proposed checks, and material uncertainty. Preparation does not execute an operational action or replace review before sharing.",
      ],
    },
    aiGrounding: {
      title: "Recorded AI, explicit boundaries",
      paragraphs: [
        "Public playback loads completed synthetic investigation recordings. It makes no fresh model or MCP diagnostic calls and does not demonstrate model-directed diagnostic follow-ups. The recorded comparison makes causal overstatements and rule-authored normalization inspectable rather than presenting the model proposal as a confirmed conclusion.",
      ],
    },
    lessonsConstraints: {
      title: "Limits of the public evidence",
      paragraphs: [
        "Initiating causes remain unconfirmed and human review is required. Domain-specific checks, valid references, and conservative normalization do not establish arbitrary claim truth; support scores are uncalibrated. Sampled observations do not prove continuous health, confirmed fills, financial loss, or recovery.",
        "The showcase uses fictional services and trading records. It does not demonstrate live financial-system access, production root-cause confirmation, autonomous resolution, general model accuracy, or production outcomes.",
      ],
    },
  },
  technicalHighlights: [
    "Recorded playback makes no fresh model or MCP diagnostic calls; accepted assessments remain advisory and require human review.",
  ],
  technologies: ["Python", "FastAPI", "MCP", "Next.js", "PostgreSQL"],
  website: "https://creditops.farhan-shafee.com",
  sourceVisibility: "private",
  featured: true,
  visibility: "public",
};
