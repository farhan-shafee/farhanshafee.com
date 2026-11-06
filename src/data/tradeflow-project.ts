import type { Project } from "./projects";

export const tradeflowProject: Project = {
  title: "TradeFlow",
  slug: "tradeflow",
  status: "Active",
  year: "2026",
  category: "Fintech systems / Test engineering",
  kind: "personal",
  description:
    "A public synthetic institutional-trading workstation with private RFQ workflows, exact execution accounting, PostgreSQL persistence and independent SDET verification.",
  sourceVisibility: "public",
  website: "https://tradeflow.farhan-shafee.com",
  inspection: {
    summary:
      "Sign in with the published fake credentials, calculate bond analytics, start a private workspace and follow a dealer quote through partial execution, cancellation and reconciliation. Inspect exact source and verification separately.",
    links: [
      {
        label: "Live institutional demo",
        href: "https://tradeflow.farhan-shafee.com",
        featured: true,
      },
      {
        label: "View source",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab",
        featured: true,
      },
      {
        label: "Verified public release",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/33e7587c1a5294a7075a5bfc3f30f90bfbbd86f9/docs/PUBLIC_WORKFLOW_RELEASE_2026-11-06.md",
      },
      {
        label: "Current state and evidence",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/CURRENT_STATE.md",
      },
      {
        label: "RFQ and execution contract",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/b0216022cb8ff18de904efea9279c91b3977d55f/docs/FIXED_INCOME_RFQ.md",
      },
      {
        label: "Independent reconciliation",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/b0216022cb8ff18de904efea9279c91b3977d55f/docs/FIXED_INCOME_RECONCILIATION.md",
      },
      {
        label: "Offline FIX session conformance",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/b0216022cb8ff18de904efea9279c91b3977d55f/docs/FIX44_SESSION.md",
      },
      {
        label: "Hosting and operations",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/RAILWAY_PRODUCTION.md",
      },
      {
        label: "Test strategy",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/b0216022cb8ff18de904efea9279c91b3977d55f/docs/TEST_STRATEGY.md",
      },
      {
        label: "Interview rehearsal guide",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/b0216022cb8ff18de904efea9279c91b3977d55f/docs/INTERVIEW_DEMO.md",
      },
      {
        label: "Release quality CI",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/42221089925",
      },
      {
        label: "Release database/workstation CI",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/42221090065",
      },
    ],
    facts: [
      {
        label: "Stack",
        value:
          "TypeScript, Node.js, Playwright, PostgreSQL, Python, SQL, OpenAPI and bounded FIX 4.4 tooling.",
      },
      {
        label: "Public release",
        value:
          "Accepted PR #32; pinned b021602 deployed November 6. All eight main checks passed on first attempts.",
      },
      {
        label: "Observed workflow",
        value:
          "Three browsers checked a 100.00 par order, 40.00 fill, 4002-cent consideration, remainder cancellation and clean reconciliation.",
      },
      {
        label: "Public ownership",
        value:
          "Private original-session access; 30-minute writes and cleanup eligibility after 60 minutes. No public recovery.",
      },
    ],
  },
  caseStudy: {
    overview: {
      paragraphs: [
        "TradeFlow makes institutional-trading test engineering inspectable through a working public synthetic workstation. Sign in with qa.user / Password123! or use qa.viewer for read-only inspection. The November 6 public release adds fictional bond analytics, private dealer RFQ workflows, simulated executions and historical reconciliation alongside the original equities book.",
        "The app is pinned to accepted source b021602 and runs independently of the owner's computer. Dedicated PostgreSQL persistence uses separate restricted roles and verified TLS. Every credential, quote, order and execution is synthetic; the project is a personal engineering demonstration.",
      ],
    },
    problem: {
      paragraphs: [
        "A passing click says little if a test inspects the wrong record, shares mutable data or accepts an arbitrary error. Financial retries need evidence that they preserve the original operation instead of creating a second effect. TradeFlow binds rules to owned records, exact monetary outcomes and independently checked evidence.",
      ],
    },
    system: {
      title: "From quote to independently checked evidence",
      steps: [
        "Private visitor workspace",
        "Fictional dealer quote",
        "Atomic quotation acceptance",
        "Acknowledgment, partial fill and cancellation",
        "Execution ledger and historical reconciliation",
        "Source-bound test evidence",
      ],
      paragraphs: [
        "Calculate clean/dirty bond prices and accrued interest, then start a private workspace. Send a 100.00 par RFQ, accept the ATLAS quotation 100.050000000123, acknowledge the order, execute 40.00 par and cancel the remaining 60.00. The verified journey records 4002 consideration cents and signed cash -4002 cents.",
        "Reconciliation returns a historical assessment with source/tree/CLEAN provenance and explicit completeness boundaries. A viewer has a separate read-only workspace; cross-visitor reads are denied. The original equities book remains session-owned, and its static positions do not imply fills.",
      ],
    },
    architecture: {
      paragraphs: [
        "Cloudflare HTTPS enters through a separate Railway cloudflared service to the private native Node.js app. A dedicated PostgreSQL 17.10 database stores short-lived institutional records over certificate/hostname-verified TLS. App, reconciler and maintenance roles use separate restricted credentials; admin and migration credentials are absent from the app.",
        "Public workspace ownership stays server-side and ends with the original synthetic session, logout or app restart. Workspace writes last 30 minutes; records become cleanup-eligible after 60 minutes subject to lease and infrastructure rules. Database record retention does not provide post-session access or public capability recovery. Local durable ownership retains its separate contract.",
        "Independent Python and SQL verification check financial and retained protocol evidence. Bounded FIX application-message tooling and the explicitly opted-in local server SDK remain separate from the Phase 3C0 offline A/0/1/5 session classifier. No running FIX session engine, socket transport, persistent session store or independent peer is implemented.",
      ],
    },
    whatIBuilt: {
      paragraphs: [
        "The tests follow exact owned records across API, database and browser layers, with runtime Zod validation and an independently interpreted OpenAPI/AJV oracle. Controlled malformed-200 and stale-response regressions check failures that click-only automation would miss.",
        "The public profile adds private bootstrap, finite retention/capacity, least-privilege TLS configuration and native Git provenance. The owner-authorized database restart preserved the synthetic financial fixture, schema identity, role properties and certificates before public activation.",
      ],
    },
    engineeringDecisions: {
      bullets: [
        "Use immutable execution receipts and exact integer cents; reconcile historical snapshots with independent checks rather than repairing financial state.",
        "Separate API/contract coverage from Chromium, Firefox and WebKit journeys. Preserve owned-resource cleanup, existing deadlines, assertions and first-failure evidence.",
        "Keep public session ownership ephemeral even when records survive a database restart; use a short-lived demonstration policy instead of exposing native recovery capabilities.",
        "Define executable offline FIX rules before introducing a runtime engine or real peer. Expected INVALID/OUT_OF_SCOPE fixture reports do not establish interoperability.",
      ],
    },
    validation: {
      paragraphs: [
        "Release merge b021602 passed all eight main jobs on first attempts: quality run 42221089925 and persistence run 42221090065. Both complete PostgreSQL executions passed 455/455 with zero failures/cancellations/skips, 247 financial executions, 44 rotations and retained capacity returned to zero.",
        "Exact-candidate local qualification passed 994 Node units, 230 baseline/460 repeated API/browser cases, two 455-case PostgreSQL runs, 99/198 workstation cases, the real public image and a bounded interview journey. Named command results are separate categories; documentation-only commits may follow the pinned release.",
        "Actual production-domain Chromium, Firefox and WebKit journeys verified analytics, quote acceptance, acknowledgment, 40.00 par execution, 4002-cent consideration, cancellation and COMPLETED_CLEAN reconciliation. Reload, viewer/cross-visitor boundaries, genuine Git provenance and 320 px layout passed. All three runtime roles independently verified TLS 1.3 from the deployed app.",
      ],
    },
    lessonsConstraints: {
      paragraphs: [
        "This is a bounded synthetic engineering lab. Public sessions and equities books reset on app restart; institutional records have separate short retention and no public recovery. Reconciliation is a historical assessment, not financial repair or external completeness proof. Old equities screenshots below retain their original scope.",
        "There is no live broker/exchange or market feed, matching engine, real-money P&L, settlement, running FIX session engine or peer interoperability. Finite browser/database checks do not establish sustained capacity, availability, regulated-trading suitability or generalized resolution of historical intermittent failures. No employer or customer material is used.",
      ],
    },
  },
  technicalHighlights: [
    "A public RFQ-to-execution journey exposes exact monetary effects and independently assessed reconciliation.",
    "Private visitor workspaces combine session ownership with restricted-role PostgreSQL over verified TLS.",
    "Source-bound three-browser evidence and offline FIX conformance keep observed behavior separate from unimplemented peer claims.",
  ],
  screenshots: [
    {
      src: "/projects/tradeflow/orders-workstation.jpg",
      alt: "TradeFlow synthetic equities order blotter with filters, lifecycle states and a LIMIT ticket.",
      width: 1425,
      height: 1167,
      caption:
        "Historical equities-view capture. Submission creates a NEW order; this image does not show the later public institutional RFQ/execution workflow.",
    },
    {
      src: "/projects/tradeflow/order-details.jpg",
      alt: "Exact synthetic AAPL LIMIT details with quantity one million, price 0.001 and NEW status.",
      width: 1425,
      height: 891,
      caption:
        "Historical equities detail capture preserves the exact generated order ID and accepted sub-cent LIMIT price.",
    },
  ],
  technologies: [
    "TypeScript",
    "Node.js",
    "Playwright",
    "PostgreSQL",
    "Python",
    "SQL",
    "FIX 4.4",
    "Zod",
    "OpenAPI",
    "AJV",
    "GitHub Actions",
  ],
  github: "https://github.com/farhan-shafee/institutional-trading-sdet-lab",
  featured: true,
  visibility: "public",
};
