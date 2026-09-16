/** Public information only. Empty optional values are intentionally not rendered. */
export const siteConfig = {
  name: "Farhan Shafee",
  title: "Farhan Shafee — Security Engineering, AI Automation & Fintech",
  description:
    "I build security tools and automation systems, with a background in fintech software engineering, test automation, and backend financial systems.",
  url: "https://farhan-shafee.com",
  github: "https://github.com/farhan-shafee",
  linkedin: "", // TODO: Add the verified, full LinkedIn profile URL.
  googleSiteVerification: "", // Only the exact HTML-tag token supplied by the site owner.
  email: "", // TODO: Add a public professional contact address, never a private address.
  cyberbit: "https://cyberbitsolutions.com",
  ogImage: "/opengraph-image",
};

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github },
  { label: "LinkedIn", href: siteConfig.linkedin },
  { label: "CyberBit Solutions", href: siteConfig.cyberbit },
].filter(({ href }) => Boolean(href));
