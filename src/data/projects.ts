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
      "Cybersecurity tools and services developed primarily for businesses.",
    caseStudy: {
      overview: {
        paragraphs: [
          "I created CyberBit Solutions to develop cybersecurity tools and services primarily for businesses.",
        ],
      },
    },
    technologies: [],
    website: siteConfig.cyberbit,
    featured: true,
    visibility: "public",
  },
  {
    title: "AI Job Intelligence Engine",
    slug: "ai-job-intelligence-engine",
    status: "Exploring",
    category: "AI automation / Systems engineering",
    kind: "personal",
    description:
      "A personal engineering project focused on job discovery, scoring, tracking, and application workflow automation.",
    caseStudy: {
      overview: {
        paragraphs: [
          "The scope is a workflow for job discovery, scoring, tracking, and application intelligence. Implementation details and supporting examples are not yet documented publicly.",
        ],
      },
    },
    technologies: [],
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
