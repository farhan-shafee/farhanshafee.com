import type { Project } from "./projects";

export const tradeflowProject: Project = {
  title: "TradeFlow",
  slug: "tradeflow",
  status: "Completed",
  year: "2026",
  category: "Fintech systems / Test engineering",
  kind: "personal",
  description:
    "A synthetic trading workstation that makes test ownership, API contracts, and three-browser workflow validation inspectable.",
  sourceVisibility: "public",
  website: "https://tradeflow.farhan-shafee.com",
  inspection: {
    summary:
      "Inspect the reachable synthetic workstation and the completed SDET lab: isolated fixtures, independent contract checks, and cross-browser evidence.",
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
        label: "Hosting and operations",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/RAILWAY_PRODUCTION.md",
      },
      {
        label: "Dependency maintenance",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/SECURITY_MAINTENANCE_2026-10-25.md",
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
        label: "CI",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/workflows/quality.yml?query=branch%3Amain",
      },
      {
        label: "Patch CI",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/40214510996",
      },
      {
        label: "Historical CI",
        href: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/39537782961",
      },
    ],
    facts: [
      {
        label: "Stack",
        value: "TypeScript, Node.js, Playwright, Zod, OpenAPI, and AJV.",
      },
      {
        label: "Execution",
        value:
          "API and contract checks once; browser journeys on three engines.",
      },
      {
        label: "Maintenance",
        value:
          "October 25 compatible dependency patch released; full and production npm audits are blocking quality gates.",
      },
      {
        label: "Boundary",
        value:
          "Railway app behind Cloudflare Tunnel; ephemeral sessions, no database or financial connectivity.",
      },
    ],
  },
  caseStudy: {
    overview: {
      paragraphs: [
        "I built TradeFlow to make test engineering inspectable through a small trading workstation. Its order workflow gives unit, API, contract, integration, and browser tests concrete behavior to check. Every credential, order, position, and quote is synthetic. The public demo runs independently on Railway behind Cloudflare Tunnel; session books remain process-local and ephemeral and reset when the app restarts.",
      ],
    },
    problem: {
      paragraphs: [
        "A passing interaction says little if a test inspects the wrong record, shares mutable state, or accepts any error as the intended rejection. The lab makes the rule, ownership, and observable outcome explicit. Canceling a FILLED order must return HTTP 409 with ORDER_NOT_CANCELABLE, and a subsequent read must still show FILLED.",
      ],
    },
    system: {
      title: "From rule to executable evidence",
      steps: [
        "Business rule",
        "Owned synthetic session",
        "Action through API or UI",
        "Status, contract, and state checks",
        "Trace and report",
        "Human review",
      ],
      paragraphs: [
        "Overview summarizes the full session book. Orders supports server-side filters, MARKET/LIMIT submission, exact-record details, and eligible cancellation. Positions and quotes are fixed synthetic read models. Activity records actions observed by the current browser session and clears on reload or logout. A viewer can inspect orders while the API rejects mutations with HTTP 403.",
      ],
    },
    architecture: {
      paragraphs: [
        "A Railway Node.js HTTP server owns authentication, authorization, input validation, and order transitions. A separate Railway cloudflared service carries Cloudflare HTTPS traffic to the private app. The app has no database or persistent volume, and its reviewed application release remains pinned. The TypeScript browser interface displays validated server responses. Each login receives a cloned order book; test-scoped fixtures supply an authenticated API context and in-memory browser storage state for that same session. Teardown revokes the session. Workers share only immutable health metadata, allowing parallel tests to reuse reference symbols without sharing created records.",
        "Zod checks response bodies at runtime. A separate AJV validator reads the published OpenAPI specification, providing an independently interpreted wire contract alongside application types and runtime schemas.",
      ],
    },
    whatIBuilt: {
      paragraphs: [
        "Integration tests follow the exact owned order ID across API creation, browser inspection, cancellation, and API readback. Another regression intercepts an HTTP 200 response containing malformed order data: both validators reject it, and the UI displays the contract error. Controlled delayed-response tests check that an older request cannot overwrite a newer session or accepted mutation.",
      ],
    },
    engineeringDecisions: {
      bullets: [
        "Run API and contract checks once in a browser-free service project; run UI and integration journeys in Chromium, Firefox, and WebKit. Projects define coverage, while workers control concurrency.",
        "Keep intentional UI and contract failures in separate commands and output directories. Their traces, screenshots, videos, and reports support diagnosis without replacing normal results. AI-assisted test proposals remain subject to human review and deterministic gates.",
      ],
    },
    validation: {
      paragraphs: [
        "October 25 dependency maintenance at 265c9e0 updated Zod to 4.6.7, Undici to 8.12.3 and fast-uri to 3.1.9 within compatible ranges. CI run 40214510996 passed both audits, 54 unit checks and 211 Playwright executions; the local twice-repeated suite passed 422 executions. Railway released that exact patch, followed by 20 public checks covering matching assets, login, viewer restrictions and session-owned order workflows. The maintenance record retains an earlier isolated Firefox timeout and its later clean diagnostic/full runs. Zero known audit findings is dated evidence, not a guarantee against unknown or future vulnerabilities.",
        "October 13, 2026 hosted CI at dc8ac09 passed 34 unit checks and 205 Playwright executions: 42 API, 22 contract, and 47 on each of Chromium, Firefox, and WebKit. Compiler, lint, formatting, OpenAPI, and workflow-structure gates also passed. CI rejects flaky results even when a diagnostic retry passes. These are historical, revision-specific results.",
        "A subsequent October 15 deployment-readiness revision (8c228d8) expanded the documented suite to 54 unit checks and 211 Playwright executions, including browser-free hosted-boundary cases; CI run 38673501021 passed. The October 21 documentation commit 284a474 also passed CI run 39537782961. These finite synthetic checks do not establish production trading, sustained capacity, or current uptime. The initial October 25 provider review identified the earlier Railway pin 7b125f6; the later maintenance release is pinned to 265c9e0 and verified separately.",
      ],
    },
    lessonsConstraints: {
      paragraphs: [
        "This completed lab uses one process with ephemeral in-memory sessions and books. The branded public demo is reachable, without an uptime or capacity guarantee. There is no broker or exchange connection, live market feed, matching engine, execution simulation, persistence, reconciliation, or P&L. Positions remain static after submission. Browser activity is not a durable audit trail. Production identity, distributed resilience, and trading capacity are outside the implemented scope; no employer or customer data is used.",
      ],
    },
  },
  technicalHighlights: [
    "Test-owned sessions connect exact-record UI assertions with API state checks.",
    "Runtime schemas and an independent OpenAPI oracle reject malformed HTTP 200 responses.",
  ],
  screenshots: [
    {
      src: "/projects/tradeflow/orders-workstation.jpg",
      alt: "TradeFlow synthetic order blotter with server-side filters, lifecycle states, and a LIMIT order ticket.",
      width: 1425,
      height: 1167,
      caption:
        "Synthetic order book and LIMIT ticket. Each session owns its records; submission creates a NEW order without simulating execution.",
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
    "Zod",
    "OpenAPI",
    "AJV",
    "GitHub Actions",
  ],
  github: "https://github.com/farhan-shafee/institutional-trading-sdet-lab",
  featured: true,
  visibility: "public",
};
