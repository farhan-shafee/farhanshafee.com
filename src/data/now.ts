type NowSection = {
  title: string;
  text: string;
  links: { label: string; href: string; external?: boolean }[];
};

/** Update this date only when the content is reviewed; do not use build time. */
export const now: { updated: string; sections: NowSection[] } = {
  updated: "2026-11-06",
  sections: [
    {
      title: "Current systems",
      text: "My public engineering portfolio centers on AegisGraph, CreditOps AI, TradeFlow, and CreditFlow QE. AegisGraph presents deterministic security investigation, CreditOps a recorded synthetic trading-incident showcase with public source, and TradeFlow now presents the November 6 public institutional workflow: fictional bond analytics, private RFQ/execution/reconciliation, dedicated PostgreSQL/TLS and separately bounded offline FIX conformance. CreditFlow QE adds a public synthetic banking simulator with Java API/browser automation and separately recorded hosted and local validation.",
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
      text: "The supporting security work covers CI evidence gates, detection tuning, synthetic cloud reassessment, and matching-rescan closure. Each case study distinguishes its fixture or recorded evidence from production claims. The portfolio and all four flagship demos now run on Railway. Current case studies document TLS, database authority, off-volume backups and source-release boundaries, while the AegisGraph article preserves its original design and dated updates. TradeFlow's November 6 public release b021602 passed eight first-attempt main checks and real three-browser acceptance; original-session access and short institutional-record retention remain separate boundaries.",
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
      text: "Broader live-model evaluation and authenticated tenant controls remain outside AegisGraph's public demo. CreditOps recordings leave initiating causes unconfirmed. TradeFlow's later runtime session engine and real peer interoperability remain unimplemented; its existing tests establish finite synthetic behavior without exchange execution; CreditFlow QE similarly has no real card or funds movement or banking SLA. CreditFlow's first scheduled-backup/stabilization gate passed October 26; five rehearsal service instances were retired October 29 while protected volumes/archive storage were retained. Further retirement and future backup/availability assurances remain separate operational questions. The lab notebook keeps open questions tied to public evidence.",
      links: [{ label: "Questions in the lab", href: "/lab" }],
    },
  ],
};
