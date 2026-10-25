import type { ProjectStatus } from "./projects";

type EvidenceTodo = {
  area: string;
  prompt: `TODO: ${string}`;
};

type EvidenceSource = (
  { path: string; url?: never } | { url: string; path?: never }
) & { supports: string };

type ProjectEvidenceReview = {
  sources: EvidenceSource[];
  statusReview: { status: ProjectStatus; reason: string };
  todos: EvidenceTodo[];
};

/**
 * Source-only editorial backlog. Never import this module into application code
 * or serialize it into public project records, pages, metadata, feeds, or bundles.
 * Sources record reviewed evidence; TODOs are unresolved questions, not claims.
 * Keep evidence requests safe to share, never confidential data or private source.
 * Draft article headings and prompts are not implementation evidence.
 */
export const projectEvidenceBacklog: Record<string, ProjectEvidenceReview> = {
  aegisgraph: {
    sources: [
      {
        url: "https://github.com/farhan-shafee/aegisgraph/blob/main/docs/DEPLOYMENT.md",
        supports:
          "October 24–25, 2026 provider/configuration and completion review confirms Railway Next.js, FastAPI and PostgreSQL, required TLS, restricted SELECT-only aegisgraph_app authority, off-volume pgBackRest/WAL backups and an actual isolated restore of the production full. Vercel is retained as a patched rollback host. Earlier Vercel topology and source/test observations below remain dated history, not current deployment claims.",
      },
      {
        path: "docs/aegisgraph-evidence-review.md",
        supports:
          "Read-only review at source revision 7293c515d47178405df6fcf93feeeadac067cf64 supports the synthetic investigation architecture, deterministic correlation, bounded providers, citation/support validation, and production limitations. The September 17, 2026 UTC follow-up verifies public source availability, MIT licensing at inspected main c95afa6, and successful backend/frontend/browser CI run 35179396463 at 534679eac4a04ee0298fe6f35d1422fa63a4fe90. That deterministic run makes no live OpenAI calls and does not establish success for later revisions. The linked release record documents 146 backend, 25 frontend, 13 browser, and 28 deterministic checks, preserving the historical 23-frontend-test hardening result separately.",
      },
      {
        path: "docs/proof-density-audit.md",
        supports:
          "September 17 hosted-demo review: public runtime reports read-only deterministic mode; source revision 1670ca4 and CI run 35251887304 support the public/local boundary. Vercel frontend and Railway FastAPI/PostgreSQL topology is owner-confirmed. The reviewed engineering article is now published and linked from the case study.",
      },
      {
        url: "https://github.com/farhan-shafee/aegisgraph/blob/f61618506d846844da46f18d86df7c6637231b9e/docs/FINAL_EXCELLENCE_REVIEW.md",
        supports:
          "September 27, 2026 review at f61618506d846844da46f18d86df7c6637231b9e supports inspectable correlation decisions, positive and negative receipts, and stable ordering. Current validation records 695 backend tests, 129 frontend tests, 27 browser checks (20 local and seven public), 28 original evaluations, and 145 V2 benchmark obligations. These remain synthetic application checks, not new live-model trials.",
      },
      {
        url: "https://github.com/farhan-shafee/aegisgraph/actions/runs/36348207961",
        supports:
          "September 27, 2026 CI completed successfully in all three backend, frontend, and browser jobs for f61618506d846844da46f18d86df7c6637231b9e. Earlier September 17 and September 23 results remain historical evidence for their named revisions.",
      },
      {
        url: "https://aegisgraph.farhan-shafee.com",
        supports:
          "September 27, 2026 deployment and public-runtime checks confirmed f616185 on both the Vercel frontend and Railway API, including successful Railway deployment at 21:28 UTC. Public responses exposed the new decision receipts while retaining deterministic analysis and read-only behavior. This does not establish production SOC operation or authenticated tenant access.",
      },
      {
        url: "https://aegisgraph.farhan-shafee.com/api/runtime",
        supports:
          "October 14, 2026 remote review found main unchanged at f61618506d846844da46f18d86df7c6637231b9e and rechecked successful CI 36348207961 and its separate September 27 test/evaluation counts. Fresh public GETs returned read-only deterministic runtime, Atlas and approved-administration decision receipts, and the fixed APP-002 BLOCK comparison. All three guided routes returned HTTP 200. These reads are availability and behavior checks, not new test-suite or live-provider executions; the runtime does not disclose a current deployment SHA.",
      },
    ],
    statusReview: {
      status: "Active",
      reason:
        "Implemented and hardened engineering demonstration with reviewed synthetic-data interfaces and dated validation records. Active describes the project, not production SOC operation.",
    },
    todos: [
      {
        area: "repeated-live-evaluation",
        prompt:
          "TODO: Add separately recorded repeated live-model trials before making broader provider-quality claims; retain availability failures and distinguish application-boundary fixtures from model behavior.",
      },
    ],
  },
  "creditops-ai": {
    sources: [
      {
        url: "https://github.com/farhan-shafee/creditops-ai/blob/main/docs/DEPLOYMENT.md",
        supports:
          "October 25, 2026 GitHub metadata confirms public source. Railway configuration and cutover/release records confirm Next.js, FastAPI and PostgreSQL with TLS, a restricted application role, off-volume backups and tested production-backup recovery. Both application services follow main without a commit pin; observed checkSuites=false does not provide a CI wait gate. Public recorded playback and human-review limitations remain unchanged. Earlier private-source observations below are historical.",
      },
      {
        url: "https://github.com/farhan-shafee/farhan-shafee/blob/51fb4c6ba552ee622b019eca0752413e99c38361/README.md",
        supports:
          "October 20, 2026 reviewed public profile continues to present CreditOps AI second and labels its source private. Approved public scope covers synthetic pricing/Kafka backlog, FIX instability, database-pool exhaustion, RFQ/order impact, linked diagnostic evidence, original-versus-validated assessments, and technical/stakeholder handoffs. Published technology is Python/FastAPI, read-only MCP tools, Next.js, and PostgreSQL. Recorded model-assisted showcase playback makes no fresh model or MCP diagnostic calls; recordings do not demonstrate model-directed follow-ups, initiating causes remain unconfirmed, and human review is required.",
      },
      {
        url: "https://creditops.farhan-shafee.com",
        supports:
          "October 20, 2026 the branded showcase home, investigator, architecture, and about routes returned HTTP 200 and explicitly labeled its trading environment synthetic, its diagnostic tools read-only, and operational authority human-controlled. Reachable presentation is distinct from fresh authorized diagnostics or production operation. The public profile supplies the recorded-playback qualification; no private repository, implementation, credential, or internal architecture was inspected or linked for this site record.",
      },
    ],
    statusReview: {
      status: "Completed",
      reason:
        "Completed describes the publicly approved recorded synthetic showcase, not production incident investigation, confirmed initiating root causes, or autonomous resolution. Source is now public; the earlier private-source observations remain historical.",
    },
    todos: [
      {
        area: "additional-public-evidence",
        prompt:
          "TODO: Use only explicitly approved public documentation or reviewed synthetic showcase captures for future additions; retain recorded-playback, unconfirmed-cause, and human-review boundaries; source links must match the verified public repository.",
      },
    ],
  },
  tradeflow: {
    sources: [
      {
        url: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/main/docs/RAILWAY_PRODUCTION.md",
        supports:
          "October 25, 2026 provider review confirms the Railway Node app pinned to 7b125f63198b0eb38a2e7140aba0d83d2e7fcdc1, a separate cloudflared service, canonical Cloudflare HTTPS ingress and no database or volume. It is independent of the owner's computer; synthetic sessions and orders reset on app restart. Public website/health monitoring is separate from empty Railway ingress metrics and historical source-bound tests.",
      },
      {
        url: "https://tradeflow.farhan-shafee.com",
        supports:
          "October 20, 2026 HTTPS reachability returned 200. Does not prove exact deployed SHA, platform configuration, uptime, or live trading.",
      },
      {
        url: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/dc8ac09d5eea4f1a51b0cc32248d7a205fc67221/docs/TEST_STRATEGY.md",
        supports:
          "October 14, 2026 current public main dc8ac09d5eea4f1a51b0cc32248d7a205fc67221 supports the synthetic local trading workstation, authenticated order operations, session-isolated fixtures, strict TypeScript, unit/API/contract/integration/browser layers, runtime/OpenAPI validation, failure triage, and Chromium/Firefox/WebKit execution. Public documentation distinguishes human-reviewed AI assistance from deterministic test oracles and excludes live brokerage, exchange execution, matching, real P&L, employer systems, and proprietary data.",
      },
      {
        url: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/actions/runs/38339620878",
        supports:
          "The exact-main October 13, 2026 UTC CI run for dc8ac09d5eea4f1a51b0cc32248d7a205fc67221 passed 34 unit checks and 205 Playwright executions as distinct categories. These are dated synthetic application and workflow checks, not production trading suitability, live-market execution, or broader coverage metrics.",
      },
      {
        url: "https://github.com/farhan-shafee/institutional-trading-sdet-lab/blob/dc8ac09d5eea4f1a51b0cc32248d7a205fc67221/docs/INTERVIEW_DEMO.md",
        supports:
          "The public interview guide documents local workstation inspection and reproducible test/failure evidence. It establishes a locally run demonstration, not a hosted public trading service.",
      },
      {
        path: "public/projects/tradeflow/orders-workstation.jpg",
        supports:
          "Reviewed synthetic workstation image copied from the public revision's docs/screenshots/premium/tradeflow-orders-1440.jpg. It illustrates the implemented order interface without introducing generated UI, real trading records, private data, or a hosted-demo claim.",
      },
      {
        path: "public/projects/tradeflow/order-details.jpg",
        supports:
          "Reviewed synthetic order detail image copied from the public revision's docs/screenshots/premium/tradeflow-details-1440.jpg. Displayed order state and events belong to the local demonstration, not live exchange execution or financial outcomes.",
      },
    ],
    statusReview: {
      status: "Completed",
      reason:
        "The synthetic workstation, Railway public hosting and reproducible quality-engineering deliverable are implemented and validated within their documented scope. Completed does not describe a production trading platform or live financial integration.",
    },
    todos: [
      {
        area: "new-validation-evidence",
        prompt:
          "TODO: Bind future validation claims to exact source revisions and executed CI categories; keep historical records and synthetic/local scope visible.",
      },
    ],
  },
  "creditflow-qe": {
    sources: [
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/railway-production.md",
        supports:
          "October 25, 2026 production cutover and provider configuration review confirms Railway web/API/PostgreSQL, private verify-full TLS with dedicated CA and restricted runtime authority, disabled runtime Flyway, off-volume pgBackRest/WAL backups and isolated recovery evidence. API remains pinned to20c91f5; web to7a16b50. API sleep is disabled; web sleep remains enabled. First scheduled daily-backup verification and resource retirement remain pending; historical Vercel/Neon tests below retain their original scope.",
      },
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/architecture/core-design.md",
        supports:
          "Public source documents exact BigDecimal monetary rules, PostgreSQL row locking and uniqueness constraints, account-scoped idempotency and original receipt replay, independent HTTP automation, and an isolated test-database rollback failure. These are bounded implementation and test facts, not real banking or general concurrency guarantees.",
      },
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/interview-guide/five-minute-walkthrough.md",
        supports:
          "Source-backed five-minute interview walkthrough covers the synthetic transaction, exact-money rules, atomic ledger/idempotency, independent Cucumber testing, dated reports and deployment limitations.",
      },
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/actions/runs/38820309474",
        supports:
          "October 15, 2026 GitHub Actions at main commit 631948a85f54e00f9fc8fae7fa844807e643847a completed successfully for both core and browser jobs. This was current-main evidence reviewed October 20, separate from earlier hosted-release and local Jenkins records.",
      },
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/evidence/STATUS.md",
        supports:
          "Public main retains dated evidence distinguishing the hosted banking release, isolated local Jenkins execution, portfolio dependency remediation, and subsequent maintenance verification. These point-in-time receipts do not establish sustained-load or production banking assurances.",
      },
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/blob/a90df14c6d82f90b81cafeb8f5db00d3ef0b762b/docs/evidence/custom-domain.md",
        supports:
          "October 15, 2026 custom-domain release receipt binds frontend 39e1728 and API 20c91f5 to the Vercel, Railway and isolated Neon deployment. Trusted HTTPS, 5 cold-start checks, 10 banking checks and the complete 11-test Java UI/BFF module passed against the actual hosted path. The synthetic $50 payment screenshot has SHA-256 8ebe78c28fa161da2737c0c5a97eae410ee3d4a63eef29c3eae1b078a41aba4d. The single cold-start sample is not an SLA.",
      },
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/actions/runs/38682147631",
        supports:
          "Successful source-39e1728 CI for the deployed frontend: 31 unit, 18 PostgreSQL integration and 31 Cucumber scenarios / 154 steps in each private/public mode; independent TestNG, Selenium, Playwright, BFF, Bruno and frontend checks. The final documentation head a90df14 also passed run 38770426780 after one unchanged-source retry of a pre-test dependency-fetch failure; original failure evidence was preserved. This Actions run is not Jenkins execution proof. No production-banking claim.",
      },
      {
        url: "https://github.com/farhan-shafee/creditflow-qe/blob/main/docs/evidence/jenkins-execution.md",
        supports:
          "October 15, 2026 Jenkins 2.580.1 local job creditflow-qe-verify build 1 executed pinned source 47984ef34e444268d9315d4aa596fb6b8be8590d on an isolated local controller. Published 123 cases: 31 unit, 18 PostgreSQL integration, 31 private and 31 public Cucumber scenarios, and 12 TestNG tests. The separate evidence framework passed 32 tests. All 13 archived JUnit-format reports had zero failures, errors or skips; all 147 report/log hashes matched across the core, public-demo and quality-framework scope manifests. Browser, web and Bruno execution remain separate GitHub Actions evidence. This receipt does not establish Jenkins execution for later source revisions, a permanent/public Jenkins service, sustained-load behavior, availability/SLA or production banking.",
      },
      {
        path: "public/projects/creditflow-qe/payment.png",
        supports:
          "Reviewed actual Playwright capture from the custom hostname. Synthetic $50 payment leaves $200 outstanding, $800 available and one committed payment; no real cards, funds or credentials.",
      },
    ],
    statusReview: {
      status: "Active",
      reason:
        "Implemented, tested and publicly deployed synthetic engineering demonstration. Active does not mean a real bank, production financial service, regulatory compliance or proven availability.",
    },
    todos: [
      {
        area: "remaining-runtime-validation",
        prompt:
          "TODO: Record sustained-load evidence before making those claims; preserve exact source provenance and AI-assistance disclosure.",
      },
    ],
  },
  "devsecops-pipeline": {
    sources: [
      {
        url: "https://github.com/farhan-shafee/devsecops-pipeline/blob/f6864cfdfed672f8ce927436740da1b3f8f0c63c/docs/pipeline-overview.md",
        supports:
          "September 27, 2026 review at f6864cfdfed672f8ce927436740da1b3f8f0c63c confirms the synthetic Flask API, raw scanner evidence validation, deterministic policy, scoped exceptions, and failure handling. The offline fixture demonstration returns BLOCK, PASS, and operational-failure BLOCK without running scanners. Live profiles reject fixture evidence.",
      },
      {
        url: "https://github.com/farhan-shafee/devsecops-pipeline/actions/runs/34161990404",
        supports:
          "September 7, 2026 CI at f6864cf passed 141 tests in each of three Ubuntu/Windows jobs. The separate same-revision Security Pipeline run 34161990375 succeeded in all eight jobs and recorded WARN/REVIEW. These dated runs were inspected September 27; they are not new scanner executions. October 14 remote main remains f6864cfdfed672f8ce927436740da1b3f8f0c63c; current run status and exact test/policy log results were rechecked without rerunning scanners.",
      },
      {
        url: "https://github.com/farhan-shafee/devsecops-pipeline/blob/f6864cfdfed672f8ce927436740da1b3f8f0c63c/reports/real-ci/34161489096/README.md",
        supports:
          "Retained September 7 scanner evidence belongs to b8ccf34: WARN/REVIEW with 250 findings, 162 requiring review, zero blockers or evidence errors, and a 106-component SBOM. Real image remediation changed BLOCK to WARN/REVIEW. Passive ZAP covers local responses; inventory and successful workflow status do not establish exploitability, release approval, or absence of vulnerabilities.",
      },
    ],
    statusReview: {
      status: "Completed",
      reason:
        "The reproducible application and security-gate lab is implemented and validated. Completed describes that scoped deliverable, not a production payment system or vulnerability-free release.",
    },
    todos: [
      {
        area: "new-scanner-evidence",
        prompt:
          "TODO: Record new scanner executions with exact revision, tool versions, scope, and retained reports before updating point-in-time inventory claims. Preserve the distinction between fixture PASS and real WARN/REVIEW.",
      },
    ],
  },
  "detection-security-lab": {
    sources: [
      {
        url: "https://github.com/farhan-shafee/detection-engineering-lab/blob/222bc7aea11d6a325ba49959de3a20064de01189/docs/handoff.md",
        supports:
          "September 27, 2026 review at 222bc7aea11d6a325ba49959de3a20064de01189 confirms five detection contracts, six Sigma rules, Python authentication correlation, six evidence-linked investigations, and a bounded tuning lifecycle. Sixteen before/after comparisons remove one authored noise case while retaining nine intended positives. Telemetry is synthetic and analyst decisions are simulated; no live Wazuh capture is committed.",
      },
      {
        url: "https://github.com/farhan-shafee/detection-engineering-lab/actions/runs/34150107552",
        supports:
          "September 7, 2026 CI at 222bc7a passed all four Ubuntu/Windows and Python 3.11/3.14 jobs: 28 tests and 51/51 fixture assertions per job, with reviewed-report comparison and security checks. Fixture counts are regression evidence, not population detection effectiveness or production false-positive rates. October 14 remote main remains 222bc7aea11d6a325ba49959de3a20064de01189; run status and recorded count/fixture logs were rechecked, not re-executed.",
      },
    ],
    statusReview: {
      status: "Completed",
      reason:
        "The executable offline detection, investigation, and tuning lab is complete within its documented scope. Optional live Wazuh collection and production operation remain unverified.",
    },
    todos: [
      {
        area: "live-telemetry-evidence",
        prompt:
          "TODO: Record authorized endpoint capture, agent receipt, decoder behavior, and indexed alerts before describing the optional Wazuh path as demonstrated live. Keep actual captures separate from deterministic fixtures and simulated approvals.",
      },
      {
        area: "representative-evaluation",
        prompt:
          "TODO: Use representative labeled telemetry and a defined measurement method before making operational detection-quality or false-positive-reduction claims.",
      },
    ],
  },
  "vulnerability-management": {
    sources: [
      {
        url: "https://github.com/farhan-shafee/vulnerability-management-project/blob/44dda015727ff3cf319f4ab563ce1c7018e5abd7/docs/methodology.md",
        supports:
          "September 27, 2026 review at 44dda015727ff3cf319f4ab563ce1c7018e5abd7 confirms CSV, Trivy JSON, and Nessus XML normalization; stable identities; contextual priority and calendar-day SLAs; reviewed dispositions; and reopening. Closure requires recorded remediation and a strictly later complete rescan with matching scanner, scope, and asset coverage.",
      },
      {
        url: "https://github.com/farhan-shafee/vulnerability-management-project/blob/44dda015727ff3cf319f4ab563ce1c7018e5abd7/lab/evidence/manifest.json",
        supports:
          "The retained September 7, 2026 real Trivy dependency-manifest capture records five vulnerabilities before a Requests update and zero afterward, supporting five closures. The inert manifest was not an installed or running application; this is separate from the six-finding synthetic workflow and its simulated ownership and approvals.",
      },
      {
        url: "https://github.com/farhan-shafee/vulnerability-management-project/actions/runs/34147859541",
        supports:
          "September 7, 2026 CI at 44dda01 passed 212 tests in each of four Ubuntu/Windows and Python 3.11/3.14 jobs, plus lint, configuration checks, and byte comparisons of 13 synthetic-demo and 11 captured-scan artifacts. No new scan or production integration is established by the September 27 review. October 14 remote main remains 44dda015727ff3cf319f4ab563ce1c7018e5abd7; the exact validation run and test logs were rechecked. Later dependency-update runs do not establish new application validation.",
      },
    ],
    statusReview: {
      status: "Completed",
      reason:
        "The local normalization, prioritization, remediation, and closure-verification lab is implemented with reproducible synthetic and captured-scan evidence. This status does not imply production patching or authenticated enterprise workflows.",
    },
    todos: [
      {
        area: "operational-validation",
        prompt:
          "TODO: Obtain separately reviewed integration and operating-environment evidence before claiming production remediation, live Nessus operation, authenticated ownership, or ticketing/CMDB integration.",
      },
    ],
  },
  "cloud-security": {
    sources: [
      {
        url: "https://github.com/farhan-shafee/cloud-security-lab/blob/ae125e119f77bdfb8088955f1bf94c2e566efa93/README.md",
        supports:
          "September 27, 2026 review at ae125e119f77bdfb8088955f1bf94c2e566efa93 confirms 14 posture controls, six event detections, and one ordered same-account/principal correlation within 15 minutes. Forty-one synthetic source scenarios drive reproducible reports; closure requires a later compatible snapshot and PASS for the same resource/control. The demo verifies 17 authored finding closures, not deployed AWS changes.",
      },
      {
        url: "https://github.com/farhan-shafee/cloud-security-lab/actions/runs/35914497691",
        supports:
          "September 23, 2026 CI at ae125e1 passed all six jobs, including 190 tests on each of four Ubuntu/Windows and Python 3.11/3.14 combinations. Other checks include lint, typing, static security, dependencies, secrets, builds, and byte comparison of ten reports. Entirely synthetic fixtures establish no effective AWS permissions, live exposure, log delivery, or production detection quality. October 14 remote main remains ae125e119f77bdfb8088955f1bf94c2e566efa93; current run status, dated test counts, and synthetic demo results were rechecked from existing CI logs.",
      },
    ],
    statusReview: {
      status: "Completed",
      reason:
        "The credential-free posture, event-review, and reassessment lab is implemented and validated against its synthetic contracts. No AWS deployment is inferred.",
    },
    todos: [
      {
        area: "live-cloud-evidence",
        prompt:
          "TODO: Add separately authorized cloud capture and reassessment evidence before claiming effective permissions, actual exposure, log delivery, or deployed remediation. Retain the current synthetic results as a distinct evidence class.",
      },
    ],
  },
};
