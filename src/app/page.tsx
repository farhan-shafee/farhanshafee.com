import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ProjectCard } from "@/components/project-card";
import { WritingList } from "@/components/writing-list";
import { ArrowIcon, TextLink } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getFeaturedProjects } from "@/data/projects";
import { getPublishedArticles } from "@/lib/writing";
import { personSchema } from "@/lib/seo";

export const metadata = {
  alternates: {
    canonical: siteConfig.url,
    types: { "application/rss+xml": `${siteConfig.url}/rss.xml` },
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website" as const,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
};

const disciplines = [
  {
    name: "Security engineering",
    description: "Security tooling, detection, and infrastructure security.",
  },
  {
    name: "AI & automation",
    description: "AI-assisted workflows and human review.",
  },
  {
    name: "Fintech systems",
    description: "Backend financial systems, APIs, and test automation.",
  },
];

const selectedEvidence = [
  {
    label: "AegisGraph threat model",
    href: "https://github.com/farhan-shafee/aegisgraph/blob/main/docs/threat-model/THREAT_MODEL.md",
    description: "Trust boundaries and residual risks.",
  },
  {
    label: "CyberBit methodology",
    href: "https://cyberbitsolutions.com/methodology",
    description: "Public controls and what they establish.",
  },
  {
    label: "Engineering article",
    href: "/writing/building-an-evidence-grounded-ai-security-investigation-system",
    description: "Bounded AI, evidence, and validation.",
  },
];

export default function HomePage() {
  const articles = getPublishedArticles().slice(0, 3);
  const projects = getFeaturedProjects();
  return (
    <div className="home-shell">
      <JsonLd data={{ "@context": "https://schema.org", ...personSchema() }} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-rule" /> Security / Automation / Systems
          </p>
          <h1 id="hero-title">
            Farhan Shafee<span className="accent">.</span>
          </h1>
          <p className="hero-positioning">
            Security Engineering <span>×</span>
            <br className="hero-break" /> AI Automation <span>×</span> Fintech
            Systems
          </p>
          <p className="hero-description">{siteConfig.description}</p>
          <div className="hero-actions">
            <Link className="button-primary" href="/work">
              Explore my work
              <ArrowIcon />
            </Link>
            <TextLink href={siteConfig.github} external>
              GitHub
            </TextLink>
            {siteConfig.linkedin && (
              <TextLink href={siteConfig.linkedin} external>
                LinkedIn
              </TextLink>
            )}
          </div>
        </div>
        <aside className="discipline-index" aria-label="Areas of work">
          <div className="index-label">
            <span>Areas of work</span>
            <span aria-hidden="true">01 — 03</span>
          </div>
          {disciplines.map((item, index) => (
            <div className="discipline-row" key={item.name}>
              <span className="index-number">0{index + 1}</span>
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
          <Link href="/about" className="index-footer">
            The background behind the work
            <ArrowIcon />
          </Link>
        </aside>
      </section>
      <nav className="home-proof" aria-label="Selected evidence">
        <p className="eyebrow">Open for inspection</p>
        <ul>
          {selectedEvidence.map((item) => (
            <li key={item.href}>
              <TextLink
                href={item.href}
                external={item.href.startsWith("https://")}
              >
                {item.label}
              </TextLink>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </nav>
      <section
        className="section selected-work"
        aria-labelledby="selected-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="selected-heading">Selected work.</h2>
          </div>
          <TextLink href="/work">All work</TextLink>
        </div>
        <div className="selected-projects">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              variant={
                project.slug === "aegisgraph"
                  ? "primary"
                  : project.slug === "cyberbit-solutions"
                    ? "flagship"
                    : project.kind === "lab"
                      ? "supporting"
                      : "secondary"
              }
            />
          ))}
        </div>
      </section>
      <div className="home-notes">
        <section aria-labelledby="writing-heading">
          <p className="eyebrow">02 / Writing</p>
          <h2 id="writing-heading">Notes from the work.</h2>
          {articles.length ? (
            <WritingList articles={articles} />
          ) : (
            <p className="home-note-copy">
              Technical writing in progress. Security engineering, automation,
              and financial systems, grounded in implementation.
            </p>
          )}
          <div className="inline-links">
            <TextLink href="/writing">Writing archive</TextLink>
            <TextLink href="/rss.xml">RSS</TextLink>
          </div>
        </section>
        <section aria-labelledby="exploration-heading">
          <p className="eyebrow">03 / Engineering notebook</p>
          <h2 id="exploration-heading">Questions under investigation.</h2>
          <p>
            Detection signals, infrastructure boundaries, and human review in
            AI-assisted workflows. Exploratory work, with scope kept explicit.
          </p>
          <TextLink href="/lab">Open the notebook</TextLink>
        </section>
      </div>
    </div>
  );
}
