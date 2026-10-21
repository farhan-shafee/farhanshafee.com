type NowSection = {
  title: string;
  text: string;
  links: { label: string; href: string; external?: boolean }[];
};

/** Update this date only when the content is reviewed; do not use build time. */
export const now: { updated: string; sections: NowSection[] } = {
  updated: "2026-10-20",
  sections: [
    {
      title: "Current systems",
      text: "My public engineering portfolio centers on AegisGraph, CreditOps AI, TradeFlow, and CreditFlow QE. AegisGraph presents deterministic security investigation, CreditOps a recorded synthetic trading-incident showcase with private source, and TradeFlow reproducible local trading-workflow tests. CreditFlow QE adds a public synthetic banking simulator with Java API/browser automation and separately recorded hosted and local validation.",
      links: [
        { label: "AegisGraph case study", href: "/work/aegisgraph" },
        {
          label: "CreditOps AI case study",
          href: "/work/creditops-ai",
        },
        { label: "TradeFlow case study", href: "/work/tradeflow" },
        { label: "CreditFlow QE case study", href: "/work/creditflow-qe" },
      ],
    },
    {
      title: "Evidence & quality",
      text: "The supporting security work covers CI evidence gates, detection tuning, synthetic cloud reassessment, and matching-rescan closure. Each case study distinguishes its fixture or recorded evidence from production claims. The published AegisGraph article preserves the original design and its dated V2 update.",
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
      title: "Open boundaries",
      text: "Broader live-model evaluation and authenticated tenant controls remain outside AegisGraph's public demo. CreditOps recordings leave initiating causes unconfirmed. TradeFlow's tests establish finite synthetic behavior without exchange execution; CreditFlow QE similarly has no real card or funds movement or banking SLA. The lab notebook keeps those open questions tied to public evidence.",
      links: [{ label: "Questions in the lab", href: "/lab" }],
    },
  ],
};
