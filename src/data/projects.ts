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
  architecture?: CaseStudySection;
  whatIBuilt?: CaseStudySection;
  engineeringDecisions?: CaseStudySection;
  securityPrivacy?: CaseStudySection;
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
