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

/**
 * These are investigation topics, not claims of implemented systems.
 * Evidence tasks for the associated projects live in project-evidence.ts.
 * TODO: For the AI topic, confirm a specific implemented workflow, human review
 * boundary, evaluation evidence, and publication-safe examples before claiming results.
 * Add dates and links only when a specific, shareable experiment exists.
 */
export const labEntries: LabEntry[] = [
  {
    title: "AI agents in security workflows",
    description:
      "Which security workflow steps can be automated, and which require human review? A research topic on the boundary between model output and operational decisions.",
    status: "Exploring",
    technologies: [],
    category: "AI / Automation",
  },
  {
    title: "Detection engineering",
    description:
      "System visibility, detection signals, and the context needed to interpret security events.",
    status: "Exploring",
    technologies: [],
    category: "Security",
    writeup: "/work/detection-security-lab",
  },
  {
    title: "Secure infrastructure",
    description:
      "Workload isolation, management access, and maintenance in a personal lab.",
    status: "Exploring",
    technologies: [],
    category: "Infrastructure",
    writeup: "/work/secure-infrastructure-homelab",
  },
];
