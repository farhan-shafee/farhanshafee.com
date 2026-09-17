import { siteConfig } from "@/config/site";

type NowSection = {
  title: string;
  text: string;
  links: { label: string; href: string; external?: boolean }[];
};

/** Update this date only when the content is reviewed; do not use build time. */
export const now: { updated: string; sections: NowSection[] } = {
  updated: "2026-09-17",
  sections: [
    {
      title: "Building",
      text: "AegisGraph now has a hosted read-only demo with synthetic fintech data and a deterministic analyst. CyberBit remains my business product work: public checks, human-reviewed reports, and a separate paid Brief.",
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
      text: "The tradeoffs documented in my AegisGraph article: deterministic incident scope, evidence support, storage choices, and what production would require.",
      links: [
        {
          label: "Read the engineering decisions",
          href: "/writing/building-an-evidence-grounded-ai-security-investigation-system",
        },
      ],
    },
    {
      title: "Investigating",
      text: "How to evaluate security automation beyond one synthetic scenario while keeping case decisions under human control. Broader live-model evaluation, production authorization, and stronger audit protections remain open work.",
      links: [{ label: "Questions in the lab", href: "/lab" }],
    },
  ],
};
