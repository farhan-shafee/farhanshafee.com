import { JsonLd } from "@/components/json-ld";
import { PageIntro, TextLink } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { absoluteUrl, pageMetadata, personSchema } from "@/lib/seo";

export const metadata = pageMetadata(
  "About",
  "Farhan Shafee's work connects fintech software engineering, security engineering, and AI-assisted automation. Creator of CyberBit Solutions.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="page-shell editorial-page editorial-about">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": absoluteUrl("/about#profile"),
          url: absoluteUrl("/about"),
          mainEntity: personSchema(),
        }}
      />
      <PageIntro
        eyebrow="About / Farhan Shafee"
        title="Financial systems. Security tooling."
        description="My work connects backend engineering, automation, and security product development."
      />
      <div className="editorial-narrative">
        <section
          className="editorial-narrative-section"
          aria-labelledby="engineering-background"
        >
          <p className="editorial-label">01 / Background</p>
          <div>
            <h2 id="engineering-background">Financial systems & automation</h2>
            <p>
              My professional background is in fintech software engineering,
              test automation, and backend financial systems. That work spans
              APIs, FIX-related systems, CI/CD, and software delivery. My
              technical experience includes Python, Java, and SQL.
            </p>
          </div>
        </section>
        <section
          className="editorial-narrative-section"
          aria-labelledby="security-product-work"
        >
          <p className="editorial-label">02 / Product work</p>
          <div>
            <h2 id="security-product-work">Building CyberBit Solutions</h2>
            <p>
              I created CyberBit Solutions to develop cybersecurity tools and
              services primarily for businesses. It connects public security
              checks with assessment, reporting, and the operational workflows
              around them.
            </p>
            <TextLink href="/work/cyberbit-solutions">
              Inside the CyberBit system
            </TextLink>
          </div>
        </section>
        <section
          className="editorial-narrative-section"
          aria-labelledby="technical-direction"
        >
          <p className="editorial-label">03 / Direction</p>
          <div>
            <h2 id="technical-direction">
              Security, automation & infrastructure
            </h2>
            <p>
              My current focus is security tooling, AI-assisted automation, and
              infrastructure security. Alongside product work, my lab notebook
              explores detection engineering and the boundaries of human review
              in automated workflows.
            </p>
            <TextLink href="/now">Current focus</TextLink>
          </div>
        </section>
      </div>
      <div className="editorial-profile-links">
        <span className="editorial-label">Elsewhere</span>
        {siteConfig.linkedin && (
          <TextLink href={siteConfig.linkedin} external>
            LinkedIn
          </TextLink>
        )}
        <TextLink href={siteConfig.github} external>
          GitHub
        </TextLink>
      </div>
    </div>
  );
}
