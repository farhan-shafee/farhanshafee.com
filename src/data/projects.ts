import { siteConfig } from "@/config/site";

/**
 * Public project records. Add evidence before adding implementation details,
 * dates, technologies, or outcomes. Private records never receive public routes.
 */
export type Project = {
  title: string;
  slug: string;
  status: "Building" | "Documenting" | "Exploring" | "Completed" | "Archived";
  year?: string;
  category: string;
  kind: "business" | "personal" | "lab";
  description: string;
  longDescription?: string;
  technologies: string[];
  problem?: string;
  approach?: string;
  outcome?: string;
  links?: { label: string; href: string }[];
  github?: string;
  website?: string;
  featured: boolean;
  image?: { src: string; alt: string };
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
    status: "Building",
    category: "Security engineering / Product",
    kind: "business",
    description:
      "Practical cybersecurity tools and services, developed primarily for businesses.",
    longDescription:
      "CyberBit Solutions develops cybersecurity tools and services aimed primarily at businesses. It is where I bring together my interests in security engineering, automation, and building useful technical systems.",
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
      "A personal engineering project exploring job discovery, scoring, tracking, and application workflow automation.",
    longDescription:
      "A personal project exploring how discovery, scoring, tracking, and application intelligence can fit into a coherent workflow. Implementation details and supporting examples are not yet documented publicly.",
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
      "An area of exploration for detection engineering, security signals, and the practical work of making systems observable.",
    longDescription:
      "An engineering notebook for investigating detection and security automation. Specific experiments, configurations, and results will be documented here when they are ready for public review.",
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
      "Exploring infrastructure security and the engineering decisions behind a secure, maintainable personal lab.",
    longDescription:
      "A space for infrastructure experiments and engineering notes. Public documentation will focus on design decisions and lessons without exposing private network details or security-sensitive configuration.",
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
