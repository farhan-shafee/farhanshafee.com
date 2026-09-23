import { siteConfig } from "@/config/site";

type NowSection = {
  title: string;
  text: string;
  links: { label: string; href: string; external?: boolean }[];
};

/** Update this date only when the content is reviewed; do not use build time. */
export const now: { updated: string; sections: NowSection[] } = {
  updated: "2026-09-23",
  sections: [
    {
      title: "Building",
      text: "AegisGraph V2 is built and live: replay across eight synthetic scenarios, evidence-derived hypotheses, fixed public rule comparisons, and hash-verifiable exports. Its public demo stays read-only and deterministic. CyberBit remains my business product work: public checks, human-reviewed reports, and a separate paid Brief.",
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
      text: "How hypothesis gaps and full-corpus rule comparisons make investigation decisions easier to review. My original AegisGraph article records the V1 design; the current case study covers the expanded workflow.",
      links: [
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
