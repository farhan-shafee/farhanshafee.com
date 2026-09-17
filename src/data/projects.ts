import { siteConfig } from "@/config/site";

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
  paragraphs?: string[];
  bullets?: string[];
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
      "A security investigation platform for synthetic fintech telemetry, connecting deterministic detection and correlation with bounded AI analysis and validated evidence citations.",
    caseStudy: {
      overview: {
        paragraphs: [
          "I built AegisGraph to make a security investigation inspectable from its source observations to an analyst's decision. It is a synthetic/demo environment for a simulated fintech system, not a production SOC deployment.",
        ],
      },
      problem: {
        paragraphs: [
          "A suspicious login, role change, or resource request can mean little in isolation. Combining them requires an explainable evidence scope. Adding a language model introduces another problem: a plausible answer with a real citation can still assert something that the cited event does not support.",
        ],
      },
      system: {
        paragraphs: [
          "The investigation follows one explicit path: synthetic fintech telemetry → normalization → detection → correlation → incident → evidence → bounded AI analysis → schema validation → citation and claim-support validation → analyst review.",
          "Source observations and persisted case records remain authoritative. The provider proposes structured findings; human actions control annotations, workflow changes, finding approval, and report review.",
        ],
      },
      demoScenario: {
        paragraphs: [
          "The Atlas Trading Platform scenario follows an engineer account from familiar activity to unfamiliar authentication, successful MFA, a privileged role assignment, internal API enumeration, sensitive resource access, abnormal access volume, another unusual session, and privilege reversion.",
          "The fixed dataset contains 4,026 synthetic events: 4,000 baseline observations and 26 scenario observations. The sequence supports an investigation hypothesis; it does not establish who operated the account, malware execution, external exfiltration, or financial loss.",
        ],
      },
      architecture: {
        paragraphs: [
          "A Next.js/TypeScript workspace uses a FastAPI backend with Pydantic validation. SQLAlchemy and Alembic manage persistence and schema changes in PostgreSQL. SQLite supports lightweight local demonstrations and isolated tests.",
          "Four adapters normalize identity, API gateway, endpoint, and Atlas application telemetry into one canonical event model: timestamp, source, event type, action, outcome, actor, target, network, device, session, bounded attributes, and a synthetic source reference. A seeded generator makes the dataset reproducible.",
        ],
      },
      detectionCorrelation: {
        paragraphs: [
          "Ten inspectable rules emit alerts with source-event references. Detection and correlation are separate: an incident requires at least three distinct rules across at least two rule families for one principal within a 30-minute window anchored at the first alert.",
          "The default case contains ten alerts from nine distinct rules across five families over 22 minutes. Its explanation exposes those actual grouping facts. Device, session, and IP relationships support investigation; they are not additional correlation predicates. These are synthetic policy examples, not calibrated production detectors.",
        ],
      },
      whatIBuilt: {
        bullets: [
          "Event and alert explorers, a chronological incident timeline, source-evidence inspection, and an entity graph derived from relational associations.",
          "Separate evidence annotations, analyst notes, cited findings, incident workflow, and audit history, without rewriting source observations.",
          "Deterministic template reports with explicit human approval. Later case changes mark a report stale, clear approval, and require regeneration and review.",
        ],
      },
      aiGrounding: {
        paragraphs: [
          "A provider interface supports credential-free deterministic testing and a real OpenAI provider. Both use the same validation boundary. Application retrieval selects the earliest 50 incident evidence rows in event-time order; a separate boundary limits projected context and excludes analyst-marked benign observations.",
          "The provider selects typed claim candidates and exact evidence references, rather than writing unrestricted factual prose. Server-side checks enforce the output schema, evidence existence, incident membership, inclusion in the actual bounded context, and support for the proposed claim. Fixed templates render accepted findings and their cited summary. One invalid claim rejects the entire answer, including any otherwise valid subset.",
          "In recorded live OpenAI validation, “What most likely happened?” returned ten supported findings with 13 citation references from 26 supplied evidence rows. “What malware family was used?” produced insufficient evidence and no invented malware attribution. The provider has no database connection, retrieval tools, or incident-mutation authority.",
        ],
      },
      engineeringDecisions: {
        bullets: [
          "Use PostgreSQL for event queries, evidence joins, and transactional case changes. Add a search system only when measured workload needs justify it.",
          "Build the case graph from relational evidence associations instead of introducing a separate graph database for a bounded investigation view.",
          "Construct incidents deterministically before invoking a model, so grouping logic and detection rules can be inspected and tested independently.",
          "Keep the claim vocabulary deliberately narrow. Exact support checks are auditable, while citation existence alone would allow unsupported prose to appear credible.",
        ],
      },
      securityPrivacy: {
        paragraphs: [
          "Telemetry is untrusted data. In a tested telemetry-injection fixture, free text was excluded before the live model call; accepted output remained evidence-grounded and case state stayed unchanged. This validates that fixture's projection and output boundaries, not universal prompt-injection resistance.",
          "Local boundary checks rejected foreign-case input, nonexistent citations, cross-incident citations, and current-case citations omitted from bounded context. Case scoping is separate from user authorization: the demo uses one fixed local analyst. Database triggers reject ordinary event and audit edits or deletes, but a privileged database owner can remove those protections.",
        ],
      },
      validation: {
        paragraphs: [
          "The September 17, 2026 UTC public release review records 146 backend tests, 25 frontend tests, 13 browser tests, and 28 deterministic evaluation cases passing, alongside PostgreSQL/SQLite checks and a production build. Dependency audits reported no known vulnerabilities at that time. These describe validation coverage, not proof of production security.",
          "Live-provider results are recorded separately: three named scenarios eventually passed across six harness requests, with three earlier HTTP 429 failures retained. Two additional browser requests succeeded. This small sample verifies specific behavior; broader repeated live-model evaluation remains necessary.",
          "The public repository includes the threat model, architecture decision records, detection rules, evaluation harness, validation documentation, and CI workflow. The linked September 17, 2026 UTC run passed backend, frontend, and browser validation using deterministic providers, without live-model calls.",
        ],
      },
      lessonsConstraints: {
        paragraphs: [
          "Bounded evidence can omit relevant observations, and a supported finding can still be incomplete. Typed telemetry is not proof that a source is truthful. The narrow claim language trades open-ended narrative for inspectable support; human review remains necessary.",
          "Production work includes authenticated identities, case and tenant authorization, multi-tenancy, authenticated streaming-scale ingestion, broader repeated live-model evaluation, and stronger independently retained evidence and audit protections. The current system is synchronous and local, with no autonomous response or production SOC deployment claim.",
        ],
      },
    },
    technicalHighlights: [
      "The model is not the system of record: the application validates evidence citations and claim support before factual findings render.",
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
        src: "/projects/aegisgraph/incident-workspace.png",
        alt: "AegisGraph's synthetic Atlas incident workspace showing correlation rationale, an event timeline, and the Evidence Analyst panel.",
        width: 1600,
        height: 1050,
        caption:
          "Synthetic Atlas incident workspace: correlation rationale and chronology connect the case to its evidence.",
      },
      {
        src: "/projects/aegisgraph/grounded-ai-answer.png",
        alt: "AegisGraph Evidence Analyst displaying an OpenAI answer with structured findings and evidence citations for the synthetic Atlas incident.",
        width: 1600,
        height: 1050,
        caption:
          "A recorded OpenAI answer for the synthetic case, rendered as validated findings with evidence citations.",
      },
      {
        src: "/projects/aegisgraph/entity-relationships.png",
        alt: "AegisGraph entity graph and evidence-backed relationships connecting synthetic users, devices, sessions, IP addresses, and resources.",
        width: 1600,
        height: 1050,
        caption:
          "Synthetic entity relationships derived from incident evidence, with supporting observations available for inspection.",
      },
      {
        src: "/projects/aegisgraph/evaluation-dashboard.png",
        alt: "AegisGraph evaluation dashboard showing executed deterministic application-boundary checks on synthetic fixtures.",
        width: 1600,
        height: 1050,
        caption:
          "Executed deterministic evaluations on synthetic fixtures. These test application boundaries, not live-model accuracy or universal injection resistance.",
      },
    ],
    website: "https://aegisgraph.farhan-shafee.com",
    github: "https://github.com/farhan-shafee/aegisgraph",
    links: [
      {
        label: "CI validation run",
        href: "https://github.com/farhan-shafee/aegisgraph/actions/runs/35179396463",
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
      "Public security checks, human-reviewed reporting, and paid digital workflows for small businesses.",
    caseStudy: {
      overview: {
        paragraphs: [
          "I built CyberBit Solutions to connect public security signals with assessment, reporting, and business operations. The system includes free checks, a human-reviewed Snapshot, and a separate paid Instant Signal Brief.",
        ],
      },
      problem: {
        paragraphs: [
          "Small businesses need to identify and interpret website, email, and domain security signals without invasive testing or an internal security team. Findings need context, review, and a usable next step.",
        ],
      },
      system: {
        paragraphs: [
          "The Free Website, Email & Domain Check evaluates 11 defined public-facing controls. Business Email Trust Check and IP, DNS & WebRTC Connection Check provide additional focused tools.",
          "The Snapshot workflow combines intake, admin report preparation, and human review. The Instant Signal Brief instead turns an eligible completed domain check into an automated paid report.",
        ],
      },
      architecture: {
        paragraphs: [
          "A Next.js application connects the public tools and report workflows. Airtable supports service requests, Snapshot orders, and CRM records; Neon/PostgreSQL stores paid-brief state. Resend handles application email and subscriber state.",
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
          "Use Resend Contacts as the newsletter subscriber authority and Airtable as its CRM mirror. Broadcasts are operated manually in Resend.",
          "Keep Snapshot browser print/PDF output distinct from the paid Brief's server PDF generator.",
        ],
      },
      securityPrivacy: {
        paragraphs: [
          "The public checks and Snapshot are scoped to nonintrusive public signals and do not guarantee security. Paid-brief eligibility and access are decided on the server. Client scan exports omit internal CRM and follow-up fields.",
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
    featured: true,
    visibility: "public",
  },
  {
    title: "Detection & Security Engineering Lab",
    slug: "detection-security-lab",
    status: "Exploring",
    category: "Security engineering",
    kind: "lab",
    description:
      "Detection engineering, security signals, and system observability.",
    caseStudy: {
      overview: {
        paragraphs: [
          "The lab's scope covers detection engineering and security automation. Specific experiments, configurations, and results are not yet documented publicly.",
        ],
      },
    },
    technologies: [],
    featured: true,
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
    featured: true,
    visibility: "public",
  },
];

export function getPublicProjects(): Project[] {
  return projects.filter((project) => project.visibility === "public");
}

export function getFeaturedProjects(): Project[] {
  return getPublicProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublicProjects().find((project) => project.slug === slug);
}
