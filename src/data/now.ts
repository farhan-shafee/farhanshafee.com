type NowSection = {
  title: string;
  text: string;
  links: { label: string; href: string; external?: boolean }[];
};

/** Update this date only when the content is reviewed; do not use build time. */
export const now: { updated: string; sections: NowSection[] } = {
  updated: "2026-10-14",
  sections: [
    {
      title: "Current systems",
      text: "My public engineering portfolio centers on AegisGraph, CreditOps AI, and TradeFlow. AegisGraph's hosted replay remains read-only and deterministic. CreditOps presents recorded synthetic trading investigations with private source. TradeFlow is a local synthetic workstation whose session ownership, contracts, and browser tests can be inspected in public source.",
      links: [
        { label: "AegisGraph case study", href: "/work/aegisgraph" },
        {
          label: "CreditOps AI case study",
          href: "/work/creditops-ai",
        },
        { label: "TradeFlow case study", href: "/work/tradeflow" },
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
      text: "Broader live-model evaluation and authenticated tenant controls remain outside AegisGraph's public demo. CreditOps recordings leave initiating causes unconfirmed. TradeFlow's tests establish finite synthetic behavior, without exchange execution or operational trading guarantees. The lab notebook keeps those open questions tied to public evidence.",
      links: [{ label: "Questions in the lab", href: "/lab" }],
    },
  ],
};
