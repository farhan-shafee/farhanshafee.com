import { siteConfig } from "@/config/site";
import { applicationSecurityProjects } from "./security-projects-core";
import { verificationSecurityProjects } from "./security-projects-verification";

export const projectStatuses = [
  "Active",
  "Production",
  "Completed",
  "Exploring",
  "Archived",
] as const;

export type ProjectStatus = (typeof projectStatuses)[number];

/** Reviewed prose only. Unanswered research prompts belong in project-evidence.ts. */
export type CaseStudySection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
};

export type ProjectCaseStudy = {
  overview?: CaseStudySection;
  problem?: CaseStudySection;
  system?: CaseStudySection;
  demoScenario?: CaseStudySection;
  architecture?: CaseStudySection;
  detectionCorrelation?: CaseStudySection;
  whatIBuilt?: CaseStudySection;
  aiGrounding?: CaseStudySection;
  detectionRegression?: CaseStudySection;
  evidenceExport?: CaseStudySection;
  engineeringDecisions?: CaseStudySection;
  securityPrivacy?: CaseStudySection;
  validation?: CaseStudySection;
  lessonsConstraints?: CaseStudySection;
  currentState?: CaseStudySection;
};

/** Real, reviewed assets under public/. Dimensions are the intrinsic pixel size. */
export type ProjectImage = {
  src: `/${string}`;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type ProjectEvidenceLink = {
  label: string;
  href: string;
  featured?: boolean;
};

/**
 * Public project records. Add evidence before adding implementation details,
 * dates, technologies, or outcomes. Private records never receive public routes.
 */
export type Project = {
  title: string;
  slug: string;
  status: ProjectStatus;
  year?: string;
  category: string;
  kind: "business" | "personal" | "lab";
  description: string;
  technologies: string[];
  inspection?: {
    summary: string;
    links: ProjectEvidenceLink[];
    guidedLinks?: ProjectEvidenceLink[];
    facts: { label: string; value: string }[];
  };
  caseStudy?: ProjectCaseStudy;
  technicalHighlights?: string[];
  screenshots?: ProjectImage[];
  architectureDiagrams?: ProjectImage[];
  links?: { label: string; href: string }[];
  github?: string;
  website?: string;
  featured: boolean;
  visibility: "public" | "private";
};

export const projectKinds = {
  business: "Business systems",
  personal: "Personal engineering",
  lab: "Labs & experiments",
} as const;

export const projects: Project[] = [
  {
    title: "AegisGraph",
    slug: "aegisgraph",
    status: "Active",
    category: "Security engineering / AI systems",
    kind: "personal",
    description:
      "A security investigation engineering platform for synthetic fintech telemetry: scenario replay, evidence-grounded AI, hypothesis tracking, and detection regression.",
    inspection: {
      summary:
        "V2 is live as a read-only, deterministic synthetic fintech investigation environment. Inspect the workflow and its boundaries; this is not a production SOC deployment.",
      links: [
        {
          label: "Live demo",
          href: "https://aegisgraph.farhan-shafee.com",
          featured: true,
        },
        {
          label: "View source",
          href: "https://github.com/farhan-shafee/aegisgraph",
          featured: true,
        },
        {
          label: "Architecture",
          href: "https://github.com/farhan-shafee/aegisgraph/blob/main/docs/architecture/SYSTEM.md",
        },
        {
          label: "Threat model",
          href: "https://github.com/farhan-shafee/aegisgraph/blob/main/docs/threat-model/THREAT_MODEL.md",
        },
        {
          label: "ADRs",
          href: "https://github.com/farhan-shafee/aegisgraph/tree/main/docs/adr",
        },
        {
          label: "Evaluations",
          href: "https://github.com/farhan-shafee/aegisgraph/blob/main/docs/evaluations/BENCHMARK.md",
        },
        {
          label: "Latest validation",
          href: "https://github.com/farhan-shafee/aegisgraph/blob/main/docs/FINAL_EXCELLENCE_REVIEW.md",
        },
        {
          label: "CI",
          href: "https://github.com/farhan-shafee/aegisgraph/actions/workflows/ci.yml",
        },
        {
          label: "September 27 CI",
          href: "https://github.com/farhan-shafee/aegisgraph/actions/runs/36348207961",
        },
        {
          label: "Engineering article",
          href: "/writing/building-an-evidence-grounded-ai-security-investigation-system",
          featured: true,
        },
      ],
      guidedLinks: [
        {
          label: "Why an incident forms",
          href: "https://aegisgraph.farhan-shafee.com/replay?scenario=atlas-compromise",
        },
        {
          label: "Why one does not",
          href: "https://aegisgraph.farhan-shafee.com/replay?scenario=approved-admin",
        },
        {
          label: "Why a rule change is blocked",
          href: "https://aegisgraph.farhan-shafee.com/detections/APP-002?comparison=miss-service-access",
        },
      ],
      facts: [
        {
          label: "System",
          value:
            "Next.js / TypeScript, FastAPI, PostgreSQL, SQLAlchemy, and Alembic.",
        },
        {
          label: "Investigation",
          value:
            "Eight synthetic scenarios, causal replay, deterministic detections and correlation receipts, evidence timeline, and hypothesis ledger.",
        },
        {
          label: "Validation",
          value:
            "Full-corpus rule comparison, regression gates, deterministic analyst benchmark, and SHA-256 export verification.",
        },
        {
          label: "AI boundary",
          value:
            "Bounded evidence, typed claims, exact-context citations, support predicates, and explicit insufficient evidence.",
        },
        {
          label: "Public demo",
          value:
            "Read-only replay and fixed comparisons; two deterministic analyst questions. No live OpenAI calls, spend, or saved reviews.",
        },
        {
          label: "Local/interview mode",
          value:
            "Saved rule and hypothesis reviews, case workflow, and optional OpenAI analysis. Persistent decisions remain human-controlled.",
        },
        {
          label: "Hosting",
          value: "Vercel frontend; Railway API and PostgreSQL.",
        },
      ],
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "I built AegisGraph to make the path from a security observation to an analyst decision inspectable. V1 established one deep Atlas investigation; V2 tests the reasoning against a wider synthetic corpus and connects it to replay, hypothesis review, detection tuning, and evidence export. It remains a synthetic/demo environment, not a production SOC deployment.",
        ],
      },
      problem: {
        paragraphs: [
          "A suspicious login, role change, or resource request can mean little in isolation. A plausible model answer can misuse a real citation, and a threshold change can suppress a useful signal along with a benign one. I wanted to expose both the evidence behind an interpretation and the consequences of changing the rules.",
        ],
      },
      system: {
        title: "Investigation loop",
        steps: [
          "Scenario",
          "Telemetry",
          "Normalization",
          "Detection",
          "Correlation",
          "Incident",
          "Evidence",
          "Hypothesis",
          "Bounded AI analysis",
          "Analyst decision",
          "Detection tuning",
          "Replay",
          "Regression validation",
        ],
        paragraphs: [
          "This is an investigation and review loop, not an autonomous pipeline. Schema, citation, and claim-support checks sit between AI proposals and rendered findings. Human review remains separate from automated evidence assessment; saving decisions and approving rule revisions belong to local mode.",
        ],
      },
      demoScenario: {
        title: "Scenario corpus",
        paragraphs: [
          "Eight versioned scenarios contain 4,098 synthetic events. The original Atlas case retains 4,026 events, ten alerts, and 26 evidence items. Additional scenarios include authentication pressure, service-principal access, approved administration, bulk automation, an isolated anomaly, and conflicting context. They provide known conditions for testing both useful signals and uncertainty.",
          "Atlas follows unfamiliar authentication, MFA acceptance, privilege assignment, API enumeration, sensitive-resource access, abnormal volume, related anomalous activity, and privilege reversion. The sequence does not establish who operated the account, a malware family, exfiltration, or financial loss. Synthetic ground truth and evaluation-only expectations stay separate from analyst-visible observations; an answer key never becomes model evidence.",
        ],
      },
      architecture: {
        paragraphs: [
          "One Next.js/TypeScript frontend connects to FastAPI, with Pydantic validation, SQLAlchemy, Alembic, and PostgreSQL. The hosted path is Vercel → Railway FastAPI → Railway PostgreSQL; SQLite supports lightweight local runs and tests. Only the canonical Atlas case is persisted. Other scenario projections remain ephemeral, including those that form an incident during replay.",
          "Four adapters normalize identity, API gateway, endpoint, and Atlas application telemetry into a canonical event model with timestamps, actors, targets, outcomes, network/device/session context, bounded attributes, and synthetic source references. The workspace connects source records, a timeline, and relational entity links. Local annotations, findings, workflow, and report approvals remain separate from source observations.",
        ],
      },
      detectionCorrelation: {
        title: "Replay, detection & correlation",
        paragraphs: [
          "The API computes bounded causal frames from arrived observations; the browser cursor controls which frame is visible. Atlas initializes 4,000 background observations before playing the 26 investigation observations. Start, pause, step, and replay speed expose when signals emerge. Source-time gaps are compressed and disclosed. This is finite telemetry replay, not production streaming ingestion.",
          "Ten rules emit source-cited alerts. Correlation separately requires three distinct rules across two families for one principal within 30 minutes of the first alert. A scenario below that threshold stays an observation scope. Replay creates no stored case, workflow record, or per-visitor server session; opening the canonical Atlas case returns to its preserved investigation.",
          "Each reached principal and alert window has a decision receipt: matched rules and families, configured minimums, time bounds, and the incident or unmet conditions. The same function produces the receipt and decides whether an incident forms. Stable rule and signal ordering makes equal-time input permutations produce the same decision and incident identity.",
          "Atlas finishes with nine distinct rules across five families over 22 minutes and one incident. Approved administration produces two rules from one family over nine minutes, below both diversity minimums. Its approval evidence is separate counterevidence, not a correlation veto; no incident does not prove there was no compromise.",
        ],
      },
      whatIBuilt: {
        title: "Hypothesis ledger",
        paragraphs: [
          "The ledger separates observation, supported claim, and working hypothesis. Four fixed hypothesis types expose supporting citations, narrow counterevidence, typed missing evidence, and evidence-derived status. Conditional guidance identifies what would help confirm or reject an interpretation without inventing a future observation.",
          "Human acceptance is a separate review: accepting a partially supported hypothesis does not make its evidence conclusive. Changed context makes a prior local review stale. The ledger can inspect richer approval/job counterevidence than the narrower analyst projection; it does not give the model authority to accept a hypothesis or mutate a case.",
        ],
      },
      aiGrounding: {
        paragraphs: [
          "A provider interface supports credential-free deterministic testing and optional OpenAI analysis in local/interview mode. Both use the same validation boundary. The public demo forces deterministic analysis for two curated questions without persisted answers or OpenAI spend. The application selects bounded, allowlisted evidence; evaluator expectations and untrusted free text are excluded.",
          "The provider selects typed claim candidates and exact evidence references, rather than writing unrestricted factual prose. Server-side checks enforce the output schema, evidence existence, incident membership, inclusion in the actual bounded context, and support for the proposed claim. Fixed templates render accepted findings and their cited summary. One invalid claim rejects the entire answer, including any otherwise valid subset.",
          "In historical V1 local live OpenAI validation, “What most likely happened?” returned ten supported findings with 13 citation references from 26 supplied evidence rows. “What malware family was used?” produced insufficient evidence and no invented malware attribution. These are recorded provider observations, not new V2 live-model trials. The provider has no database connection, retrieval tools, or incident-mutation authority.",
        ],
      },
      detectionRegression: {
        paragraphs: [
          "Eight of the ten rule definitions expose bounded typed parameters. The local workbench saves append-only proposals, full-corpus comparisons, and explicit reviews. Approval independently recomputes the comparison and rejects a stale baseline. Approved revisions affect future replay projections without rewriting historical Atlas alerts or evidence.",
          "For APP-002, raising the threshold from 1,000 to 1,500 records removes the benign reconciliation signal while retaining the required Atlas and service-access signals: PASS. A 1,100-record comparison leaves fixture outcomes unchanged: WARN. At 2,200, a required service signal and its correlated incident disappear: BLOCK. A blocking change cannot be approved; a warning requires deliberate review. Public visitors inspect these three fixed comparisons without saving or approving changes.",
          "These are synthetic fixture measurements, not production precision or recall. TP/FN count two required scenarios; FP/TN count two explicitly benign scenarios. Four other scenarios still participate in full-rule and correlation gates. The workbench exposes those populations and before/after outcomes instead of reducing them to one flattering accuracy score.",
        ],
      },
      evidenceExport: {
        paragraphs: [
          "A hash-verifiable investigation export captures a bounded, consistent committed snapshot as exact UTF-8 logical files in a JSON container with a SHA-256 manifest. Browser and offline verification check membership, lengths, and hashes without extracting paths. Public exports omit human workflow material.",
          "VALID means agreement with the supplied manifest; changing a file without updating it is detected. The manifest is unsigned and replaceable, so replacing both content and hashes defeats any authenticity inference. Verification does not establish source telemetry truth, cryptographic source provenance, privileged database integrity, or legal/forensic chain-of-custody compliance.",
        ],
      },
      engineeringDecisions: {
        bullets: [
          "Retain one relational store for evidence joins and transactional reviews. Neither Elasticsearch nor a graph database is justified by the measured fixture workload.",
          "Use bounded JSON replay frames and a browser cursor; a finite demonstration does not require Kafka, WebSockets, or a distributed replay service.",
          "Separate detection, incident correlation, hypothesis support, and human approval so each decision can be inspected and tested independently.",
          "Constrain rule proposals and model claims to explicit types. Arbitrary code editing and unrestricted factual prose would need different validation boundaries.",
        ],
      },
      securityPrivacy: {
        paragraphs: [
          "Telemetry is untrusted data. In the historical tested telemetry-injection fixture, free text was excluded before the live model call; accepted output remained evidence-grounded and case state stayed unchanged. This validates that fixture's projection and output boundaries, not universal prompt-injection resistance. V2's deterministic benchmark adds named containment and counterevidence obligations without claiming general model safety.",
          "Boundary checks reject foreign-case input, nonexistent citations, cross-incident citations, and current-case citations omitted from bounded context. Public mode denies persistent writes. Local actor labels are not authenticated identities; case scoping is not tenant authorization. Database triggers reject ordinary event and audit edits, but a privileged owner can remove those protections. Replay, comparison, and export work is bounded; caches and abuse controls remain process-local.",
        ],
      },
      validation: {
        paragraphs: [
          "The September 27, 2026 refinement passed 695 backend tests, 129 frontend tests, and 27 browser tests: 20 local plus seven public-mode HTTPS checks. The original 28 deterministic evaluations and 145 V2 benchmark obligations are separate suites. The benchmark's eight metric populations overlap; these are application-boundary checks, not live-model accuracy samples. This is validation coverage, not proof of production security.",
          "The September 27 CI run passed backend, frontend, and browser jobs for source revision f616185, the documentation follow-up to application revision 72647c7. It includes PostgreSQL clean/populated migration checks, dependency audits, and a production build. Both hosted services were verified at f616185; fresh public reads confirmed the correlation receipts and fixed APP-002 BLOCK comparison. That point-in-time check is separate from the earlier complete V2 hosted smoke.",
          "Historical V1 evidence remains dated: the September 17 release review at c95afa6 records 146 backend tests, 25 frontend tests, 13 browser tests, and 28 deterministic evaluation cases. Its live OpenAI record retains three earlier HTTP 429 failures as well as successful scenarios. Neither V2's deterministic benchmark nor its public hosted checks extend that small live-provider sample.",
        ],
      },
      lessonsConstraints: {
        paragraphs: [
          "Synthetic ground truth is useful for repeatability, not evidence of real-world detection effectiveness. Bounded context and finite claim predicates can omit useful observations or interpretations. Supported findings can still be incomplete, and matching export hashes do not establish source truth. Human review and honest insufficiency remain necessary.",
          "Production work includes authenticated identities, case and tenant authorization, multi-tenancy, authenticated streaming-scale ingestion, multi-instance rule rollout, broader repeated live-model evaluation, and stronger independently retained evidence and audit protections. The hosted V2 demo and local review workflow are implemented; production ingestion, access control, retention, and operating-scale measurements are not.",
        ],
      },
    },
    technicalHighlights: [
      "The model is not the system of record. Typed claims require validated evidence; persistent review decisions remain human-controlled.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Pydantic",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "SQLite",
      "OpenAI",
    ],
    screenshots: [
      {
        src: "/projects/aegisgraph/v2-replay.png",
        alt: "AegisGraph V2 synthetic Atlas replay paused with three alerts, the first correlated incident, and causal processing stages.",
        width: 1440,
        height: 1100,
        caption:
          "Synthetic Atlas replay connects observations to alerts and correlation, with compressed source-time gaps disclosed. Recorded in the September 23 public-mode rehearsal.",
      },
      {
        src: "/projects/aegisgraph/v2-detection-regression.png",
        alt: "AegisGraph APP-002 threshold comparison from 1,000 to 1,500 records with a PASS gate and before-and-after synthetic scenario measurements.",
        width: 1440,
        height: 1100,
        caption:
          "The computed APP-002 comparison exposes a parameter change, scenario outcomes, and a PASS gate. Synthetic fixture populations are shown; this is not production detection accuracy.",
      },
      {
        src: "/projects/aegisgraph/v2-hypotheses.png",
        alt: "AegisGraph synthetic Atlas hypothesis ledger showing supporting citations, partial support, investigation gaps, and separate human review.",
        width: 1440,
        height: 1100,
        caption:
          "Synthetic-case support, citations, and missing evidence remain distinct from human acceptance. A working hypothesis is not automatically a confirmed conclusion.",
      },
      {
        src: "/projects/aegisgraph/v2-bundle-verification.png",
        alt: "AegisGraph synthetic investigation export showing VALID, 35 declared files checked, and an unsigned SHA-256 manifest.",
        width: 1440,
        height: 1100,
        caption:
          "The synthetic investigation bundle matches its supplied hashes. VALID does not authenticate the source: the manifest is unsigned and replaceable.",
      },
      {
        src: "/projects/aegisgraph/v2-evaluations.png",
        alt: "AegisGraph deterministic benchmark showing 145 passed synthetic obligations and named metric populations.",
        width: 1440,
        height: 1100,
        caption:
          "Named deterministic obligations show expected and observed behavior on synthetic fixtures. These are application checks, not live-model accuracy measurements.",
      },
    ],
    website: "https://aegisgraph.farhan-shafee.com",
    github: "https://github.com/farhan-shafee/aegisgraph",
    links: [
      {
        label: "Seven-minute walkthrough",
        href: "https://github.com/farhan-shafee/aegisgraph/blob/main/docs/DEMO.md",
      },
      { label: "Discuss this project", href: "/contact" },
    ],
    featured: true,
    visibility: "public",
  },
  {
    title: "CyberBit Solutions",
    slug: "cyberbit-solutions",
    status: "Active",
    category: "Security engineering / Product",
    kind: "business",
    description:
      "Cybersecurity services and business engineering for small businesses: scoped reviews, remediation, public security checks, and reporting workflows.",
    inspection: {
      summary:
        "Inspect the public tools, methodology, and reporting format. The sample Snapshot uses a fictional business and findings; it is not a client assessment.",
      links: [
        { label: "Product", href: siteConfig.cyberbit, featured: true },
        {
          label: "Free security check",
          href: `${siteConfig.cyberbit}/free-scan`,
        },
        {
          label: "Methodology",
          href: `${siteConfig.cyberbit}/methodology`,
        },
        {
          label: "Sample Snapshot (fictional)",
          href: `${siteConfig.cyberbit}/sample-report`,
        },
      ],
      facts: [
        {
          label: "Services",
          value:
            "Business Security Baseline reviews for Microsoft 365 or Google Workspace, scoped remediation, and external security oversight.",
        },
        {
          label: "Public tools",
          value: "Website, email, and domain checks with defined scope.",
        },
        {
          label: "Snapshot",
          value: "Intake, admin report preparation, and human review.",
        },
        {
          label: "Paid Brief",
          value:
            "Implemented reporting from eligible checks, with Stripe checkout and paid access; availability depends on configuration.",
        },
        {
          label: "Operations",
          value:
            "Admin/report tooling, service records, and transactional email.",
        },
        {
          label: "Scope",
          value:
            "Public checks and the Snapshot use nonintrusive signals; neither guarantees security.",
        },
      ],
    },
    caseStudy: {
      overview: {
        paragraphs: [
          "I built CyberBit Solutions to connect public security signals with assessment, reporting, and business operations. The application includes free checks, a human-reviewed Snapshot, and a separate Instant Signal Brief workflow.",
          "The business now leads with a Business Security Baseline for Microsoft 365 or Google Workspace, alongside scoped remediation and external security oversight. Public checks, intake, reporting, and business workflows support the service offering; reviews and remediation are separately scoped engagements.",
        ],
      },
      problem: {
        paragraphs: [
          "Small businesses need to understand public website, email, and domain signals, review workplace security settings, and decide what to fix without an internal security team. Findings need context, an agreed scope, and a usable next step.",
        ],
      },
      system: {
        paragraphs: [
          "The Free Website, Email & Domain Check evaluates 11 defined public-facing controls. Business Email Trust Check and IP, DNS & WebRTC Connection Check provide additional focused tools.",
          "The Snapshot workflow combines intake, admin report preparation, and human review. The separate Instant Signal Brief implements automated paid reporting from an eligible completed domain check. Its availability depends on configuration.",
        ],
      },
      architecture: {
        paragraphs: [
          "A Next.js application connects the public tools and report workflows. Airtable supports service requests, Snapshot orders, and CRM records; Neon/PostgreSQL stores paid-brief state. Resend handles application email and provider contact status.",
        ],
      },
      whatIBuilt: {
        bullets: [
          "Public checks, shared control definitions, and client-facing JSON exports of scan results.",
          "Admin report builders, Snapshot print/PDF output, and server-generated paid-brief PDFs.",
          "Server-side scan eligibility, Stripe checkout and webhook handling, and paid-state access to briefs.",
          "Operational records, transactional messages, admin notifications and login alerts, and visit/funnel event tracking.",
        ],
      },
      engineeringDecisions: {
        bullets: [
          "Keep automated public signals separate from human-reviewed assessment. A paid Brief does not become a human-reviewed Snapshot.",
          "Use Resend Contacts for provider contact status and Airtable as its CRM mirror. Broadcasts are operated manually in Resend.",
          "Keep Snapshot browser print/PDF output distinct from the paid Brief's server PDF generator.",
        ],
      },
      securityPrivacy: {
        paragraphs: [
          "The public checks and Snapshot are scoped to nonintrusive public signals and do not guarantee security. Broader reviews and remediation require separately agreed scope, authorization, and access. Paid-brief eligibility and access are decided on the server. Client scan exports omit internal CRM and follow-up fields.",
        ],
      },
      currentState: {
        paragraphs: [
          "An active cybersecurity business and engineering project with a public website.",
        ],
      },
    },
    technicalHighlights: [
      "A shared set of 11 control definitions feeds free-check scoring and Brief reporting.",
      "Separate storage and delivery paths support service operations and paid digital reports.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Stripe",
      "Airtable",
      "Resend",
      "Neon / PostgreSQL",
    ],
    screenshots: [
      {
        src: "/projects/cyberbit-solutions/free-security-check.png",
        alt: "Completed CyberBit public check for farhan-shafee.com: all 11 checks completed, with seven controls observed, one configuration concern, and three controls not observed.",
        width: 1440,
        height: 1000,
        caption:
          "Live public-check result for my own domain, with control summaries and scope limits. Captured September 16, 2026; results are point-in-time observations.",
      },
      {
        src: "/projects/cyberbit-solutions/risk-snapshot-report.png",
        alt: "CyberBit's public Snapshot sample layout with an executive summary, check statuses, and a visible disclaimer that the example business and findings are fictional.",
        width: 1425,
        height: 990,
        caption:
          "Public Snapshot sample showing the report structure and check statuses. The application labels its business and findings as fictional; this is not a client report.",
      },
    ],
    architectureDiagrams: [
      {
        src: "/diagrams/cyberbit-workflows.svg",
        alt: "Public-signal workflows include browser results and a Snapshot with intake and human review. Only eligible completed domain-check results feed the separate Stripe, paid-access, and Brief PDF path. Operations and communications support the relevant workflows.",
        width: 420,
        height: 640,
        caption:
          "Conceptual workflow map. Review and payment apply to different paths; this is not a deployment or network diagram.",
      },
    ],
    website: siteConfig.cyberbit,
    featured: true,
    visibility: "public",
  },
  ...applicationSecurityProjects,
  ...verificationSecurityProjects,
  {
    title: "Job Intelligence Engine",
    slug: "ai-job-intelligence-engine",
    status: "Active",
    category: "Workflow automation / Systems engineering",
    kind: "personal",
    description:
      "An engineering system for job discovery, normalization, matching against career evidence, and application workflows.",
    caseStudy: {
      overview: {
        paragraphs: [
          "I built this personal engineering system to bring job discovery, career evidence, application preparation, and progress tracking into one workflow.",
        ],
      },
      problem: {
        paragraphs: [
          "Job searching across multiple sources fragments information and repeats the same evaluation and writing tasks. Application material also needs to stay grounded in actual career experience.",
        ],
      },
      system: {
        paragraphs: [
          "Manual imports, configured job-board discovery, and Outlook discovery feed normalized job records. The Career Truth Vault stores structured career facts and source references for requirement matching and application drafts.",
        ],
      },
      architecture: {
        paragraphs: [
          "The React/TypeScript application uses Next.js-style App Router conventions through vinext and Vite. Source configuration targets Cloudflare Workers; Cloudflare D1 and Drizzle support persisted jobs, career evidence, assessments, and tracking.",
          "Normalization, deduplication, and provenance precede matching. Selected jobs feed application preparation and tracking; Outlook also produces workflow suggestions for review.",
        ],
      },
      whatIBuilt: {
        bullets: [
          "Greenhouse, Lever, and Ashby public-feed adapters; JSON-LD job extraction; and LinkedIn public-page/import parsing.",
          "Microsoft Graph Mail.Read integration for discovering job, recruiter, and application messages.",
          "Evidence-linked matching, recruiter-message templates, optional cover-letter templates, screening-answer assistance, and résumé/application packets.",
          "Résumé review and DOCX export, plus a tracker for stages, notes, follow-ups, outcomes, and event history.",
        ],
      },
      engineeringDecisions: {
        bullets: [
          "Application assistance uses deterministic templates grounded in career evidence; requirement scoring is deterministic as well. The current workflow does not use a language model.",
          "Retain evidence references and gaps. Unresolved personal screening questions require user input rather than an invented answer.",
          "Run discovery against selected inputs and configured sources; do not treat a source adapter as unrestricted background crawling.",
        ],
      },
      securityPrivacy: {
        paragraphs: [
          "The Outlook connector requests read-only Mail.Read access; job relevance is filtered by the application, not by a job-only mailbox permission. Résumé approval and export use review and verification gates. The tracker requires confirmation of an external submission before marking an application Applied.",
        ],
      },
      currentState: {
        paragraphs: [
          "An active personal engineering system for my own job-search workflow, with assistive preparation and user-controlled tracking.",
        ],
      },
    },
    technicalHighlights: [
      "Career facts, source references, and verification states connect matching to application material.",
      "Approved résumé versions are immutable; application submission remains external and user-confirmed.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "vinext",
      "Vite",
      "Tailwind CSS",
      "Cloudflare Workers",
      "Cloudflare D1",
      "Drizzle ORM",
      "Microsoft Graph",
    ],
    architectureDiagrams: [
      {
        src: "/diagrams/job-engine-workflows.svg",
        alt: "Job inputs become normalized records. Those records and approved Career Truth Vault evidence feed matching. A user selects jobs for application preparation and review, while the tracker records confirmed external submissions.",
        width: 420,
        height: 600,
        caption:
          "Conceptual discovery and preparation path. Outlook also supplies tracker suggestions for review; discovered jobs are not automatically submitted.",
      },
    ],
    featured: false,
    visibility: "public",
  },
  {
    title: "Secure Infrastructure & Homelab",
    slug: "secure-infrastructure-homelab",
    status: "Exploring",
    category: "Infrastructure / Security",
    kind: "lab",
    description:
      "Infrastructure security, isolation, access boundaries, and maintainability in a personal lab.",
    caseStudy: {
      overview: {
        paragraphs: [
          "The scope covers infrastructure experiments, access boundaries, and maintainability. Specific systems, configurations, and engineering decisions are not yet documented publicly.",
        ],
      },
    },
    technologies: [],
    featured: false,
    visibility: "public",
  },
];

export function getPublicProjects(): Project[] {
  return projects.filter((project) => project.visibility === "public");
}

export function getFeaturedProjects(): Project[] {
  return getPublicProjects().filter((project) => project.featured);
}

const securityProjectSlugs = [
  "devsecops-pipeline",
  "detection-security-lab",
  "vulnerability-management",
  "cloud-security",
];

export function getSecurityProjects(): Project[] {
  return getPublicProjects().filter((project) =>
    securityProjectSlugs.includes(project.slug),
  );
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublicProjects().find((project) => project.slug === slug);
}
