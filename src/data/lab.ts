export type LabEntry = {
  title: string;
  description: string;
  evidence: string;
  openQuestion: string;
  status: "Active" | "Completed" | "Archived" | "Exploring";
  technologies: string[];
  date?: string;
  repository?: string;
  writeup?: string;
  demo?: string;
  related?: { label: string; href: string }[];
  category: string;
};

/**
 * These are investigation topics, not claims of implemented systems.
 * Evidence tasks for the associated projects live in project-evidence.ts.
 * Related implementations provide evidence without changing a topic's status.
 * Add experiment dates and results only when a shareable experiment exists.
 */
export const labEntries: LabEntry[] = [
  {
    title: "AI-assisted investigation boundaries",
    description:
      "What can an automated finding establish, and which decisions still belong to an analyst?",
    evidence:
      "AegisGraph validates bounded AI claims against incident evidence. Its article documents the local live-provider checks and their limits.",
    openQuestion:
      "How well do those boundaries hold across repeated model runs and a broader set of incidents?",
    status: "Exploring",
    technologies: [],
    category: "AI / Automation",
    related: [
      {
        label: "Related implementation",
        href: "/work/aegisgraph",
      },
      {
        label: "Read the investigation article",
        href: "/writing/building-an-evidence-grounded-ai-security-investigation-system",
      },
    ],
  },
  {
    title: "Detection engineering",
    description:
      "When should related signals become an incident, and what context makes that decision inspectable?",
    evidence:
      "The Detection Engineering case study documents tested Windows behavior rules, correlation, simulated triage, and scoped tuning. AegisGraph adds decision receipts for both formed incidents and unmet correlation conditions.",
    openQuestion:
      "How should thresholds and correlation rules be evaluated against more varied, representative telemetry?",
    status: "Exploring",
    technologies: [],
    category: "Security",
    writeup: "/work/detection-security-lab",
    related: [
      {
        label: "Detection and correlation in AegisGraph",
        href: "/work/aegisgraph",
      },
    ],
  },
  {
    title: "Secure infrastructure",
    description:
      "How should workload isolation, management access, and maintenance fit together in a personal lab?",
    evidence:
      "The public record currently describes the scope; configurations and results are not yet documented.",
    openQuestion:
      "Which configuration and reproducible checks would provide enough evidence to explain the access and isolation boundaries?",
    status: "Exploring",
    technologies: [],
    category: "Infrastructure",
    writeup: "/work/secure-infrastructure-homelab",
  },
];
