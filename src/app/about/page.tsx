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
        title="Engineering is the through line."
        description="From backend financial systems to security tooling, my work is grounded in building practical technical systems."
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
            Security engineering is a growing focus of my work. I build
            technical projects and security labs to explore how systems behave,
            how they fail, and how to make them more dependable.
          </p>
          <h2>Building CyberBit Solutions</h2>
          <p>
            I created CyberBit Solutions to develop practical cybersecurity
            tools and services for businesses. It brings together my interests
            in security, automation, and technical entrepreneurship.
          </p>
          <p>
            This site is the broader record of my work: the systems I build, the
            questions I investigate, and the engineering decisions worth writing
            down.
          </p>
          <h2>Where my interests meet</h2>
          <p>
            I am interested in the overlap between security, AI-assisted
            automation, and infrastructure, with a financial systems background
            shaping how I approach those problems. My technical experience
            includes Python, Java, SQL, APIs, and automation engineering.
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
