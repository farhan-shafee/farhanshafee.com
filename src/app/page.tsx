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
  alternates: { canonical: siteConfig.url },
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
    description: "Practical tooling. Observable systems.",
  },
  { name: "AI & automation", description: "Useful workflows. Human judgment." },
  {
    name: "Fintech systems",
    description: "Backend engineering. Financial infrastructure.",
  },
];

export default function HomePage() {
  const articles = getPublishedArticles().slice(0, 3);
  return (
    <div className="home-shell">
      <JsonLd data={{ "@context": "https://schema.org", ...personSchema() }} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-rule" /> Engineering / Systems / Notes
          </p>
          <h1 id="hero-title">
            Farhan Shafee<span className="accent">.</span>
          </h1>
          <p className="hero-positioning">
            Security Engineering <span>×</span>
            <br className="hero-break" /> AI Automation <span>×</span> Fintech
            Systems
          </p>
          <p className="hero-description">
            I build security tools, automation systems, and infrastructure at
            the intersection of cybersecurity, AI, and financial technology.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" href="/work">
              Explore my work
              <ArrowIcon />
            </Link>
            <TextLink href={siteConfig.github} external>
              GitHub
            </TextLink>
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
      <section
        className="section selected-work"
        aria-labelledby="selected-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2 id="selected-heading">Systems, from idea to practice.</h2>
          </div>
          <TextLink href="/work">All work</TextLink>
        </div>
        <div className="project-grid">
          {getFeaturedProjects().map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section
        className="section exploration-section"
        aria-labelledby="exploration-heading"
      >
        <div className="exploration-intro">
          <p className="eyebrow">02 / In the lab</p>
          <h2 id="exploration-heading">Following the useful questions.</h2>
          <p>
            Explorations in security, automation, and the systems underneath
            them.
          </p>
          <TextLink href="/lab">Open the notebook</TextLink>
        </div>
        <div className="exploration-questions">
          <Link href="/lab">
            <span className="index-number">A</span>
            <span>
              Where can AI agents help security workflows—and where should a
              person decide?
            </span>
            <ArrowIcon />
          </Link>
          <Link href="/lab">
            <span className="index-number">B</span>
            <span>
              Which signals make detection more useful and security automation
              more dependable?
            </span>
            <ArrowIcon />
          </Link>
          <Link href="/lab">
            <span className="index-number">C</span>
            <span>
              What makes infrastructure secure enough to trust and simple enough
              to maintain?
            </span>
            <ArrowIcon />
          </Link>
        </div>
      </section>
      <section
        className="section latest-writing"
        aria-labelledby="writing-heading"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / Writing</p>
            <h2 id="writing-heading">Notes from the work.</h2>
          </div>
          <TextLink href="/writing">All writing</TextLink>
        </div>
        {articles.length ? (
          <WritingList articles={articles} />
        ) : (
          <div className="home-writing-empty">
            <div className="notebook-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div>
              <h3>Good notes take real work.</h3>
              <p>
                Technical write-ups are in progress. This space will hold the
                decisions, tradeoffs, and lessons behind the systems.
              </p>
            </div>
            <a className="text-link" href="/rss.xml">
              Follow via RSS
              <ArrowIcon />
            </a>
          </div>
        )}
      </section>
      <section className="cyberbit-section" aria-labelledby="cyberbit-heading">
        <div className="cyberbit-monogram" aria-hidden="true">
          cb<span>.</span>
        </div>
        <div>
          <p className="eyebrow">A focused part of the bigger picture</p>
          <h2 id="cyberbit-heading">Building CyberBit Solutions.</h2>
          <p>
            Practical cybersecurity tools and services for businesses.
            <br />A place to turn security engineering into useful products.
          </p>
        </div>
        <TextLink href={siteConfig.cyberbit} external>
          Visit CyberBit Solutions
        </TextLink>
      </section>
    </div>
  );
}
