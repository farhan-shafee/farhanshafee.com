import { siteConfig } from "@/config/site";

/** Update this date only when the content is reviewed; do not use build time. */
export const now = {
  updated: "2026-09-16",
  sections: [
    {
      title: "Building",
      text: "CyberBit Solutions: practical cybersecurity tools and services for businesses.",
      link: {
        label: "Visit CyberBit Solutions",
        href: siteConfig.cyberbit,
      },
    },
    {
      title: "Learning",
      text: "Deepening my work in security engineering, detection, and infrastructure security.",
    },
    {
      title: "Investigating",
      text: "How AI-assisted automation can support security workflows while keeping people involved in decisions that need judgment.",
    },
  ],
};
