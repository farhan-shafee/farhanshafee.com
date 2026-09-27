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
 * The repository is public: record evidence requests here, never confidential data.
 * Draft article headings and prompts are not implementation evidence.
 */
export const projectEvidenceBacklog: Record<string, ProjectEvidenceReview> = {
  aegisgraph: {
    sources: [
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
  "cyberbit-solutions": {
    sources: [
      {
        path: "docs/flagship-evidence-review.md",
        supports:
          "Claims C01-C21 distinguish owner attribution, source-confirmed capabilities, public website evidence, and deployment/provider-state limits. Source inspection was read-only against the existing working tree.",
      },
      {
        path: "src/config/site.ts",
        supports: "The verified public CyberBit website link.",
      },
      {
        path: "public/projects/cyberbit-solutions/free-security-check.png",
        supports:
          "Reviewed capture of a completed public DNS/HTTP check of the owner's farhan-shafee.com on 2026-09-16, with all 11 controls completed. A point-in-time result, not a security guarantee.",
      },
      {
        path: "public/projects/cyberbit-solutions/risk-snapshot-report.png",
        supports:
          "Reviewed capture of the real public Snapshot sample-report layout using explicitly fictional Harbor & Pine Dental / harborpinedental.example data. Not a generated or reviewed client artifact.",
      },
      {
        url: "https://cyberbitsolutions.com",
        supports:
          "September 27, 2026 public-page and committed-source review confirms Business Security Baseline, Microsoft 365 or Google Workspace reviews, scoped remediation, and external oversight as the current service context. Implemented public-check, Snapshot, payment, and reporting workflows remain supported. Separately inspected September 23 CI passed Core checks and Production readiness. Instant Signal Brief availability is configuration-gated; no checkout or provider integration was exercised in this review.",
      },
      {
        url: "https://cyberbitsolutions.com/web-application-penetration-testing",
        supports:
          "September 27, 2026 scope review distinguishes limited public-signal checks and Snapshot reporting from authorized account reviews, agreed remediation, and separately scoped active application testing. Nonintrusive public-tool limits must not be generalized to every CyberBit service. Published offerings do not establish completed client engagements or security outcomes.",
      },
    ],
    statusReview: {
      status: "Active",
      reason:
        "Owner-supplied active business/project, implemented source, and reachable public website. Keep Active rather than implying every inspected workflow has verified production operation.",
    },
    todos: [
      {
        area: "approved-visual-evidence",
        prompt:
          "TODO: Supply an actual generated/reviewed report, a sanitized admin/report-preparation view, and the paid Brief experience. The public sample layout does not establish a reviewed client artifact; the admin capture remains blocked. No customer records or private operational details.",
      },
      {
        area: "deployment-provider-state",
        prompt:
          "TODO: Confirm the deployed revision and operating state of the documented integrations before adding production-operation claims. Source and deployment documentation do not establish live provider health.",
      },
      {
        area: "measured-outcomes",
        prompt:
          "TODO: Add outcomes only with an approved measurement method and evidence; no security, revenue, conversion, or time-saving metrics are currently established.",
      },
    ],
  },
  "ai-job-intelligence-engine": {
    sources: [
      {
        path: "docs/flagship-evidence-review.md",
        supports:
          "Claims J01-J18 record read-only source validation of the runtime, evidence model, discovery, matching, templates, resume review, tracking, and Graph integration, including qualifications.",
      },
    ],
    statusReview: {
      status: "Active",
      reason:
        "Implemented personal system supported by source inspection and owner-provided current-use context. No public SaaS, external adoption, or verified production-operation claim.",
    },
    todos: [
      {
        area: "approved-visual-evidence",
        prompt:
          "TODO: Supply reviewed Top Matches, scoring detail, Resume Lab, and tracker captures with safe demonstration data. Do not publish career facts, correspondence, private URLs, or application history.",
      },
      {
        area: "runtime-integrations",
        prompt:
          "TODO: Confirm live deployment and provider consent/operation before adding operational claims. The code requests Microsoft Graph Mail.Read; tenant consent and successful discovery were not exercised in this review.",
      },
      {
        area: "repository-demo-links",
        prompt:
          "TODO: Add a verified public repository or demonstration link only if Farhan chooses to publish one. The source review does not authorize exposing private repository contents.",
      },
      {
        area: "measured-outcomes",
        prompt:
          "TODO: Supply an evaluation method and approved data before claiming matching accuracy, time savings, or application outcomes.",
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
          "September 7, 2026 CI at f6864cf passed 141 tests in each of three Ubuntu/Windows jobs. The separate same-revision Security Pipeline run 34161990375 succeeded in all eight jobs and recorded WARN/REVIEW. These dated runs were inspected September 27; they are not new scanner executions.",
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
          "September 7, 2026 CI at 222bc7a passed all four Ubuntu/Windows and Python 3.11/3.14 jobs: 28 tests and 51/51 fixture assertions per job, with reviewed-report comparison and security checks. Fixture counts are regression evidence, not population detection effectiveness or production false-positive rates.",
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
          "September 7, 2026 CI at 44dda01 passed 212 tests in each of four Ubuntu/Windows and Python 3.11/3.14 jobs, plus lint, configuration checks, and byte comparisons of 13 synthetic-demo and 11 captured-scan artifacts. No new scan or production integration is established by the September 27 review.",
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
          "September 23, 2026 CI at ae125e1 passed all six jobs, including 190 tests on each of four Ubuntu/Windows and Python 3.11/3.14 combinations. Other checks include lint, typing, static security, dependencies, secrets, builds, and byte comparison of ten reports. Entirely synthetic fixtures establish no effective AWS permissions, live exposure, log delivery, or production detection quality.",
      },
    ],
    statusReview: {
      status: "Completed",
      reason:
        "The credential-free posture, event-review, and reassessment lab is implemented and validated against its synthetic contracts. No AWS deployment or homelab implementation is inferred.",
    },
    todos: [
      {
        area: "live-cloud-evidence",
        prompt:
          "TODO: Add separately authorized cloud capture and reassessment evidence before claiming effective permissions, actual exposure, log delivery, or deployed remediation. Retain the current synthetic results as a distinct evidence class.",
      },
    ],
  },
  "secure-infrastructure-homelab": {
    sources: [
      {
        path: "src/data/projects.ts",
        supports:
          "A personal infrastructure lab scope; no particular system, product, or implemented configuration is documented.",
      },
      {
        path: "src/data/lab.ts",
        supports:
          "Isolation, access boundaries, and maintainability are stated topics, without evidence of particular implemented controls.",
      },
      {
        path: "content/writing/designing-a-secure-remote-access-homelab.mdx",
        supports:
          "Draft explicitly asserts no hardware, network design, access product, or implemented control; its prompts require verification.",
      },
    ],
    statusReview: {
      status: "Exploring",
      reason:
        "Existing content establishes a subject and draft outline, without implementation or operation evidence. Confirm the environment before advancing the status.",
    },
    todos: [
      {
        area: "what-exists",
        prompt:
          "TODO: Confirm which lab systems and services actually exist, their current state, and relevant technologies without exposing private infrastructure details.",
      },
      {
        area: "what-was-engineered",
        prompt:
          "TODO: Identify Farhan's actual design, configuration, and automation work, distinguishing implemented boundaries from planned controls.",
      },
      {
        area: "technical-problem",
        prompt:
          "TODO: Describe the actual infrastructure, access, or maintenance problem, design choices, constraints, and observed behavior.",
      },
      {
        area: "evidence",
        prompt:
          "TODO: Supply reviewed diagrams, interface captures, or configuration excerpts that support the case study without revealing addresses, hostnames, credentials, or sensitive topology.",
      },
    ],
  },
};
