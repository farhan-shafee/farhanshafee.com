export type LabEntry = {
  title: string;
  description: string;
  status: "Active" | "Completed" | "Archived" | "Exploring";
  technologies: string[];
  date?: string;
  repository?: string;
  writeup?: string;
  demo?: string;
  category: string;
};

/** Add dates and links only when a specific, shareable experiment exists. */
export const labEntries: LabEntry[] = [
  {
    title: "AI agents in security workflows",
    description:
      "Where can an agent reduce repetitive work, and where should a human remain in control? An exploration of useful boundaries for security automation.",
    status: "Exploring",
    technologies: [],
    category: "AI / Automation",
  },
  {
    title: "Detection engineering",
    description:
      "Investigating the relationship between system visibility, useful security signals, and the context needed to interpret them.",
    status: "Exploring",
    technologies: [],
    category: "Security",
    writeup: "/work/detection-security-lab",
  },
  {
    title: "Secure infrastructure",
    description:
      "Examining isolation, access boundaries, and maintainability in a personal lab environment.",
    status: "Exploring",
    technologies: [],
    category: "Infrastructure",
    writeup: "/work/secure-infrastructure-homelab",
  },
];
