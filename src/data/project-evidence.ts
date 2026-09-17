import type { ProjectStatus } from "./projects";

type EvidenceTodo = {
  area: string;
  prompt: `TODO: ${string}`;
};

type ProjectEvidenceReview = {
  sources: { path: string; supports: string }[];
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
          "Read-only review at source revision 7293c515d47178405df6fcf93feeeadac067cf64 supports the synthetic investigation architecture, deterministic correlation, bounded providers, citation/support validation, recorded test results, and explicit production limitations.",
      },
    ],
    statusReview: {
      status: "Active",
      reason:
        "Implemented and hardened engineering demonstration with reviewed synthetic-data interfaces and dated validation records. Active describes the project, not production SOC operation.",
    },
    todos: [
      {
        area: "public-source-and-current-ci",
        prompt:
          "TODO: Verify public repository visibility and the latest hosted CI result before adding source links or current hosted-run claims. The inspected validation document records the initial implementation's CI separately from local hardening results.",
      },
      {
        area: "repeated-live-evaluation",
        prompt:
          "TODO: Add separately recorded repeated live-model trials before making broader provider-quality claims; retain availability failures and distinguish application-boundary fixtures from model behavior.",
      },
      {
        area: "future-technical-article",
        prompt:
          "TODO: Develop Building an Evidence-Grounded AI Security Investigation System from the reviewed implementation evidence. Keep any future article draft true until its prose and evidence have been reviewed; do not publish an outline as an article.",
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
  "detection-security-lab": {
    sources: [
      {
        path: "src/data/projects.ts",
        supports:
          "Scope includes detection engineering, security signals, observability, and security automation; no specific experiment or result is documented.",
      },
      {
        path: "src/data/lab.ts",
        supports:
          "Detection engineering is a lab topic, with no technologies, dated experiment, or result attached.",
      },
    ],
    statusReview: {
      status: "Exploring",
      reason:
        "Only subject scope is documented. No specific engineered system, configuration, or experimental evidence justifies a more advanced status.",
    },
    todos: [
      {
        area: "what-exists",
        prompt:
          "TODO: Identify a real lab experiment or system, its current state, and the evidence showing what exists.",
      },
      {
        area: "what-was-engineered",
        prompt:
          "TODO: Describe what Farhan configured or implemented, using reviewed defensive examples and verified technology names.",
      },
      {
        area: "technical-problem",
        prompt:
          "TODO: State the actual detection or visibility problem and explain how the experiment addresses it, including limitations.",
      },
      {
        area: "evidence",
        prompt:
          "TODO: Supply sanitized configurations, diagrams, screenshots, or recorded observations with context and publication permission; do not invent detections or results.",
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
