/** Public information only. Empty optional values are intentionally not rendered. */
export const siteConfig = {
  name: "Farhan Shafee",
  title: "Farhan Shafee — Security Engineering, AI Automation & Fintech",
  description:
    "I build security tools, automation systems, and infrastructure at the intersection of cybersecurity, AI, and financial technology.",
  url: "https://farhanshafee.com",
  github: "https://github.com/farhan-shafee",
  linkedin: "", // TODO: Add the verified, full LinkedIn profile URL.
  email: "", // TODO: Add a public professional contact address, never a private address.
  cyberbit: "https://cyberbitsolutions.com",
  ogImage: "/opengraph-image",
};

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "CyberBit Solutions", href: siteConfig.cyberbit },
].filter(({ href }) => Boolean(href));
