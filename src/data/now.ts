import { siteConfig } from "@/config/site";

type NowSection = {
  title: string;
  text: string;
  links: { label: string; href: string; external?: boolean }[];
};

/** Update this date only when the content is reviewed; do not use build time. */
export const now: { updated: string; sections: NowSection[] } = {
  updated: "2026-09-27",
  sections: [
    {
      title: "Current systems",
      text: "AegisGraph's final V2 refinement is live. Guided replay explains both incident formation and unmet correlation conditions; fixed rule comparisons expose regression failures. The public demo remains read-only and deterministic. CyberBit remains my business product work, connecting scoped security services with public tools, intake, reporting, payments, and communications.",
      links: [
        { label: "AegisGraph case study", href: "/work/aegisgraph" },
        {
          label: "Visit CyberBit Solutions",
          href: siteConfig.cyberbit,
          external: true,
        },
      ],
    },
    {
      title: "Studying",
      text: "Investigation reliability, bounded AI evaluation, and verification after remediation. The supporting security projects now cover CI evidence gates, detection tuning, matching rescans, and synthetic cloud reassessment. My original AegisGraph article records the V1 design; the current case study covers the expanded workflow.",
      links: [
        {
          label: "Security engineering work",
          href: "/work#security-engineering",
        },
        {
          label: "Read the engineering decisions",
          href: "/writing/building-an-evidence-grounded-ai-security-investigation-system",
        },
      ],
    },
    {
      title: "Investigating",
      text: "How named synthetic obligations can inform broader evaluation while keeping case decisions under human control. Repeated live-model trials, authenticated case access, tenant isolation, and independent evidence retention remain open work.",
      links: [{ label: "Questions in the lab", href: "/lab" }],
    },
  ],
};
