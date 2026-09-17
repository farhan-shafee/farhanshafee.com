import { JsonLd } from "@/components/json-ld";
import { PageIntro, TextLink } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { absoluteUrl, pageMetadata, personSchema } from "@/lib/seo";

export const metadata = pageMetadata(
  "About",
  "Farhan Shafee's work connects fintech software engineering, security engineering, and AI-assisted automation. Creator of AegisGraph and CyberBit Solutions.",
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
        description="My background is in financial software. My projects bring security signals, evidence, and human review into working systems."
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
              services for businesses. I keep its automated public checks and
              paid Instant Signal Brief distinct from the human-reviewed
              Snapshot. That separation carries through intake, reporting,
              payment, and delivery.
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
          <p className="editorial-label">03 / How I build</p>
          <div>
            <h2 id="technical-direction">Evidence before automation</h2>
            <p>
              I keep observations, automated suggestions, and human decisions
              separate. In AegisGraph, deterministic detection and correlation
              establish case evidence; server-side checks validate AI claims and
              citations. Its hosted demo is read-only and uses a deterministic
              provider; live OpenAI analysis was validated in the local
              workflow. The fintech data is synthetic. The case study and
              article explain these boundaries, their tests, and the remaining
              production work.
            </p>
            <p>
              I make failure explicit: a single invalid claim rejects the whole
              AI answer. An accepted answer still cannot change case state; that
              remains an analyst decision in the local workflow.
            </p>
            <div className="editorial-context-links">
              <TextLink href="/work/aegisgraph">Inside AegisGraph</TextLink>
              <TextLink href="/writing/building-an-evidence-grounded-ai-security-investigation-system">
                Read the engineering decisions
              </TextLink>
              <TextLink href="/now">Current focus</TextLink>
            </div>
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
