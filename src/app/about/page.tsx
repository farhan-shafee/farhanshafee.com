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
    <div className="page-shell">
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
        title="Fintech, automation, and security engineering."
        description="My background spans fintech software engineering, test automation, and backend financial systems."
      />
      <div className="split-layout section">
        <div className="side-label">Background & direction</div>
        <div className="prose">
          <p>
            My professional background is in fintech software engineering, test
            automation, and backend financial systems. That work spans APIs,
            FIX-related systems, CI/CD, and the automation that supports
            software delivery.
          </p>
          <p>
            My security work includes technical projects and labs. The lab
            notebook focuses on detection engineering, infrastructure security,
            and AI-assisted workflows.
          </p>
          <h2>CyberBit Solutions</h2>
          <p>
            I created CyberBit Solutions to develop cybersecurity tools and
            services primarily for businesses.
          </p>
          <p>
            This site documents that work alongside my personal automation
            projects, security labs, and financial systems background.
          </p>
          <h2>Technical background</h2>
          <p>
            My technical experience includes Python, Java, SQL, APIs, and
            automation engineering. My current focus is security tooling,
            AI-assisted automation, and infrastructure security.
          </p>
          <div className="inline-links">
            <TextLink href={siteConfig.github} external>
              GitHub
            </TextLink>
            {siteConfig.linkedin && (
              <TextLink href={siteConfig.linkedin} external>
                LinkedIn
              </TextLink>
            )}
            <TextLink href={siteConfig.cyberbit} external>
              CyberBit Solutions
            </TextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
