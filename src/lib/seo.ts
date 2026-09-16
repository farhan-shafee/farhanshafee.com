import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
      types: { "application/rss+xml": absoluteUrl("/rss.xml") },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(path),
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: siteConfig.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.github, siteConfig.linkedin].filter(Boolean),
    knowsAbout: [
      "Security engineering",
      "Automation engineering",
      "Financial technology",
      "Backend systems",
    ],
    affiliation: {
      "@type": "Organization",
      name: "CyberBit Solutions",
      url: siteConfig.cyberbit,
    },
  };
}
