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
 * These are questions to resolve, not claims that a feature or system exists.
 * The repository is public: record evidence requests here, never confidential data.
 * Draft article headings and prompts are not implementation evidence.
 */
export const projectEvidenceBacklog: Record<string, ProjectEvidenceReview> = {
  "cyberbit-solutions": {
    sources: [
      {
        path: "src/app/about/page.tsx",
        supports:
          "Farhan created CyberBit Solutions to develop cybersecurity tools and services for businesses.",
      },
      {
        path: "src/data/now.ts",
        supports:
          "CyberBit is current work. The original Building entry supports Active, without establishing deployment or production operation.",
      },
      {
        path: "src/config/site.ts",
        supports: "The existing public CyberBit website URL.",
      },
    ],
    statusReview: {
      status: "Active",
      reason:
        "Existing current-work content establishes ongoing work. No repository evidence establishes production deployment, customers, usage, or outcomes.",
    },
    todos: [
      {
        area: "problem",
        prompt:
          "TODO: Describe the actual problem and intended users, with a concrete input, task, and output. Confirm Farhan's responsibility without implying customer adoption.",
      },
      {
        area: "architecture",
        prompt:
          "TODO: Provide a reviewed high-level system architecture, distinguish implemented components from plans, and supply a sanitized diagram if available.",
      },
      {
        area: "components",
        prompt:
          "TODO: Identify the major components that exist, what Farhan built, their responsibilities, and the evidence supporting each description.",
      },
      {
        area: "application-workflows",
        prompt:
          "TODO: Document an implemented application workflow from input to output, including review boundaries and failure behavior where supported.",
      },
      {
        area: "security",
        prompt:
          "TODO: Explain verified security and privacy decisions, their threat assumptions, and limits. Do not infer controls from the company category.",
      },
      {
        area: "reporting-tooling",
        prompt:
          "TODO: Confirm whether reporting or tooling pipelines exist; if so, document their actual inputs, processing, outputs, and review steps.",
      },
      {
        area: "payments-access",
        prompt:
          "TODO: Confirm whether payments or access-management systems exist; if so, describe their architecture and authorization boundaries without inferring a provider.",
      },
      {
        area: "admin-crm",
        prompt:
          "TODO: Confirm whether admin or CRM workflows exist; if so, identify the actual workflow, data boundaries, and Farhan's implementation work.",
      },
      {
        area: "transactional-email",
        prompt:
          "TODO: Confirm whether transactional email exists; if so, document verified triggers, delivery handling, and privacy decisions without guessing an integration.",
      },
      {
        area: "deployment",
        prompt:
          "TODO: Confirm the deployment architecture and operating state from project evidence before using Production or naming hosting, storage, or delivery infrastructure.",
      },
      {
        area: "screenshots",
        prompt:
          "TODO: Supply real, publication-approved screenshots with descriptive alt text, intrinsic dimensions, and captions; remove private records and sensitive configuration.",
      },
      {
        area: "technologies",
        prompt:
          "TODO: List technologies verified in CyberBit's implementation. Farhan's general skills and this portfolio's stack do not establish the CyberBit stack.",
      },
      {
        area: "engineering-decisions-lessons",
        prompt:
          "TODO: Record actual engineering decisions, alternatives considered, constraints, and lessons with supporting examples; omit unsupported outcome or effectiveness claims.",
      },
    ],
  },
  "ai-job-intelligence-engine": {
    sources: [
      {
        path: "src/data/projects.ts",
        supports:
          "Personal project scope: job discovery, scoring, tracking, application workflow automation, and application intelligence. No implemented feature is verified.",
      },
      {
        path: "content/writing/how-i-built-an-ai-job-intelligence-engine.mdx",
        supports:
          "Explicitly provisional draft outline requiring verification of the title, implementation, and experience claims; not evidence of a completed system.",
      },
    ],
    statusReview: {
      status: "Exploring",
      reason:
        "The repository provides scope and an unverified draft outline, without code, deployment evidence, assets, or a confirmed current implementation. Retain the conservative existing status until reviewed.",
    },
    todos: [
      {
        area: "problem-ownership",
        prompt:
          "TODO: Describe the actual manual workflow that motivated the project and what Farhan implemented, supported by a sanitized example.",
      },
      {
        area: "architecture",
        prompt:
          "TODO: Document the verified architecture and data flow; distinguish existing stages from proposed ones and supply a reviewed diagram if available.",
      },
      {
        area: "job-source-adapters",
        prompt:
          "TODO: Confirm whether source adapters exist, identify the sources actually used and permitted access methods, and document normalization and provenance only where implemented.",
      },
      {
        area: "scoring-pipeline",
        prompt:
          "TODO: Confirm whether a scoring pipeline exists; document actual inputs, scoring rules or model contracts, checks, and limitations without implying measured accuracy.",
      },
      {
        area: "workflow-automation",
        prompt:
          "TODO: Verify which workflow steps are automated and which require human review. Do not imply automatic application submission without verified evidence.",
      },
      {
        area: "data-model",
        prompt:
          "TODO: Describe the implemented data model, retained records, relationships, and lifecycle if they exist; provide a sanitized schema rather than personal application history.",
      },
      {
        area: "integrations-technologies",
        prompt:
          "TODO: Confirm actual integrations, languages, storage, and model providers from project evidence; do not infer them from this portfolio or Farhan's general experience.",
      },
      {
        area: "screenshots",
        prompt:
          "TODO: Supply real, reviewed interface captures with alt text, dimensions, and captions. Remove personal records, employer correspondence, private endpoints, and tokens.",
      },
      {
        area: "privacy-security",
        prompt:
          "TODO: Document verified data handling, retention, permissions, and human approval boundaries, and distinguish implemented safeguards from proposals.",
      },
      {
        area: "repository-demo-links",
        prompt:
          "TODO: Add verified public repository or demo links only when appropriate to publish and confirmed to belong to this project.",
      },
      {
        area: "current-state",
        prompt:
          "TODO: Confirm what runs today and which capabilities remain planned; update status only with supporting implementation or operating evidence.",
      },
      {
        area: "engineering-decisions-lessons",
        prompt:
          "TODO: Provide concrete decisions, failure cases, constraints, and lessons from the actual implementation. Any time-saving or accuracy claim requires a measurement method and data.",
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
