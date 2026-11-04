import type { Project } from "./projects";

export const tradeflowProject: Project = {
  title: "TradeFlow",
  slug: "tradeflow",
  status: "Active",
  year: "2026",
  category: "Fintech systems / Test engineering",
  kind: "personal",
  description:
    "A synthetic trading SDET lab with PostgreSQL financial workflows, independent verification and offline FIX conformance, alongside a bounded public equities demo.",
  sourceVisibility: "public",
  website: "https://tradeflow.farhan-shafee.com",
  inspection: {
    summary:
      "Explore the accepted local/CI financial and FIX milestones in public source, and the separately pinned equities demo. Phase 3C0 is merged; a running FIX session engine remains unimplemented.",
    links: [
      {
        label: "Live demo",
        href: "https://tradeflow.farhan-shafee.com",
        featured: true,
      },
      {
        label: "View source",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab",
        featured: true,
      },
      {
        label: "Current state and evidence",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/CURRENT_STATE.md",
      },
      {
        label: "Local RFQ workstation",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/FIXED_INCOME_RFQ.md",
      },
      {
        label: "Controlled FIX application",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/FIX44_APPLICATION.md",
      },
      {
        label: "Offline session conformance",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/FIX44_SESSION.md",
      },
      {
        label: "Hosting and operations",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/RAILWAY_PRODUCTION.md",
      },
      {
        label: "Test strategy",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/TEST_STRATEGY.md",
      },
      {
        label: "Five-minute demo guide",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/INTERVIEW_DEMO.md",
      },
      {
        label: "Main quality checkpoint",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/41914340404",
      },
      {
        label: "Main database/workstation checkpoint",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/41914340173",
      },
      {
        label: "CI history",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/workflows/quality.yml?query=branch%3Amain",
      },
    ],
    facts: [
      {
        label: "Stack",
        value:
          "TypeScript, Node.js, Playwright, PostgreSQL, Python, SQL, OpenAPI and bounded FIX 4.4 tooling.",
      },
      {
        label: "Source milestone",
        value:
          "Phase 3C0 accepted at f31f6e2 on November 4; all eight post-merge checks passed on attempt 1.",
      },
      {
        label: "Public demo",
        value:
          "Railway/Cloudflare equities slice pinned to 265c9e0; ephemeral books and no application database.",
      },
      {
        label: "Local/CI boundary",
        value:
          "PostgreSQL workflow defaults OFF. Offline session conformance does not implement transport, a runtime session engine or peer interoperability.",
      },
    ],
  },
  caseStudy: {
    overview: {
      paragraphs: [
        "TradeFlow makes quality engineering inspectable through synthetic trading workflows. Public source now includes fixed-income analytics, opt-in local PostgreSQL RFQ acceptance, order/execution and reconciliation workflows, controlled FIX application and Phase 3C0 offline session conformance. Every credential, quote, order and execution is synthetic.",
        "The public Railway demo is a separately pinned equities slice at 265c9e0. Its session-owned books remain ephemeral, positions and quotes are fixed read models, and it has no application database. The accepted source checkpoint f31f6e2 does not imply that those later capabilities were deployed to the public demo.",
      ],
    },
    problem: {
      paragraphs: [
        "A passing click says little if a test inspects the wrong record, shares mutable state or accepts an arbitrary error. Financial retries also need evidence that they preserve the original operation instead of manufacturing a second effect. TradeFlow binds rules to owned records, exact outcomes and independently checked evidence.",
      ],
    },
    system: {
      title: "From rule to executable evidence",
      steps: [
        "Business rule",
        "Owned synthetic session",
        "Action through API or local SDK",
        "Status, contract and retained-state checks",
        "Independent financial/protocol verification",
        "Human review",
      ],
      paragraphs: [
        "The public demo exposes Overview, Orders, Positions and Activity, exact-record inspection and trader/viewer authorization. Public order submission creates a NEW order; it does not simulate an execution. Browser Activity clears on reload or logout.",
        "The separate opt-in local PostgreSQL workstation exercises invited dealer quotes, atomic RFQ acceptance, controlled acknowledgments/fills/cancellations, execution-derived cash/positions and historical reconciliation. Phase 3C0 classifies reviewed administrative-message transcripts offline; its reports keep peer interoperability, delivery, financial application and external completeness unverified.",
      ],
    },
    architecture: {
      paragraphs: [
        "The public demo uses a Railway Node.js HTTP app behind a separate cloudflared service and Cloudflare HTTPS. Its release is pinned, with no application database or persistent volume. Test-scoped API sessions and in-memory browser storage state isolate each default equities book.",
        "Accepted local/CI source adds opt-in PostgreSQL workflows with scoped roles, forced RLS, immutable receipts and execution evidence, original-key recovery and finite capacity. Independent Python and SQL verification check financial and retained-protocol evidence. This database workflow defaults OFF and is not part of the public equities release.",
        "The bounded FIX application-message codec and explicitly opted-in server-side application SDK are separate from the offline A/0/1/5 session classifier. No running session engine, socket transport, durable session store or independent peer is implemented by Phase 3C0. Zod/runtime schemas and an independent OpenAPI/AJV oracle remain part of the API test architecture.",
      ],
    },
    whatIBuilt: {
      paragraphs: [
        "API/UI integration tests follow exact owned order IDs and reject malformed HTTP 200 bodies. Delayed-response regressions prevent an older request from overwriting a newer session or accepted mutation. Real PostgreSQL tests add concurrency, authorization, transactional recovery, corruption detection, protected reservation accounting and cleanup checks.",
        "The offline session pack contains 59 literal expected reports and 57 raw SOH fixtures, with an independent Python evaluator and explicit invalid, incomplete and out-of-scope outcomes. Corpus admission, reference pins and bounds fail closed. The existing application codec continues rejecting administrative messages, and the new checker never calls the financial SDK.",
      ],
    },
    engineeringDecisions: {
      bullets: [
        "Separate the pinned public demo from later accepted local/CI source. A source merge or green CI does not update the public application pin.",
        "Keep financial rules, authorization and immutable operation identities authoritative across retries; use independent Python/SQL evidence rather than deriving expected outcomes from the implementation under test.",
        "Run API/contract cases once and browser workflows in Chromium, Firefox and WebKit. Preserve owned resources, deadlines, cleanup and first-failure evidence; keep intentional failure demos separate.",
        "Define executable offline session rules before introducing a runtime engine or real peer. Expected INVALID/OUT_OF_SCOPE matches are successful oracle comparisons, not successful session interoperability.",
      ],
    },
    validation: {
      paragraphs: [
        "November 4, 2026 Phase 3C0 checkpoint f31f6e2 was merged in PR #29 with a GitHub Verified signature and the exact reviewed tree. Main quality run 41914340404 and persistence run 41914340173 completed on attempt 1, with all eight checks successful. Quality/regression each passed 966 Node units, 117 independent financial Python tests, 78 session Python tests, 59 expected transcript reports and 230 baseline/460 repeated API/browser cases.",
        "Both post-merge PostgreSQL executions passed 455/455, preserving 247 financial executions and 44 rotations per execution. All three workload phases stayed below the unchanged 30-second deadline. The three-browser workstation passed 99 baseline and 198 repeated cases; retained capacity returned to zero. Counts belong to that exact source checkpoint; documentation-only revisions may follow it.",
        "The public equities release remains 265c9e0, rechecked in provider metadata on November 4. Its October 25 maintenance evidence recorded 54 unit checks and 211 Playwright executions, a 422-case local repeat and 20 public acceptance checks. Those historical deployed-release results are separate from current source/CI evidence. Earlier lifecycle and timeout incidents remain disclosed; later green runs do not establish their causal resolution.",
      ],
    },
    lessonsConstraints: {
      paragraphs: [
        "This is an active personal engineering lab with a completed Phase 3C0 milestone. The pinned public equities demo has ephemeral books and static positions. Durable RFQ/execution/reconciliation behavior belongs to the explicitly opted-in local/CI workflow, not that public deployment.",
        "All data is synthetic. There is no live brokerage/exchange or market feed, matching, real-money P&L, settlement or production-trading claim. Phase 3C0 does not implement a running FIX session engine, transport, heartbeat scheduling, durable session state, real recovery or independent-peer interoperability. Reconciliation is a historical assessment, not financial repair or proof of external completeness. No employer/customer material is used; availability and capacity are not certified.",
      ],
    },
  },
  technicalHighlights: [
    "Test-owned sessions connect exact-record UI assertions with independently validated API state.",
    "Local PostgreSQL workflows exercise financial idempotency, concurrency, retained evidence and independently verified recovery.",
    "Phase 3C0 turns selected FIX session rules into 59 reviewed offline transcript expectations with explicit claim boundaries.",
  ],
  screenshots: [
    {
      src: "/projects/tradeflow/orders-workstation.jpg",
      alt: "TradeFlow synthetic order blotter with server-side filters, lifecycle states, and a LIMIT order ticket.",
      width: 1425,
      height: 1167,
      caption:
        "Public equities-slice capture: session-owned synthetic book and LIMIT ticket. Submission creates a NEW order without simulating execution; this image does not show later PostgreSQL/FIX source milestones.",
    },
    {
      src: "/projects/tradeflow/order-details.jpg",
      alt: "Exact synthetic AAPL LIMIT order details showing quantity one million, price 0.001, and NEW status.",
      width: 1425,
      height: 891,
      caption:
        "Details preserve the exact generated order ID and accepted sub-cent LIMIT price. The state summary records creation time and current status.",
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
