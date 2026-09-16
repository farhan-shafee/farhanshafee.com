import { PageIntro, TextLink } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact",
  "Professional connections with Farhan Shafee for engineering opportunities, security and automation collaboration, and technical partnerships.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="page-shell">
      <PageIntro
        eyebrow="Contact / Start a conversation"
        title="Interesting systems. Useful conversations."
        description="For engineering opportunities, security and automation collaboration, technical partnerships, or a systems problem worth thinking through."
      />
      <div className="contact-grid section">
        {(siteConfig.email || siteConfig.linkedin) && (
          <section className="contact-card">
            <span className="eyebrow">01 / Professional</span>
            <h2>Get in touch</h2>
            <p>Share the context, the problem, and what you have in mind.</p>
            <div className="inline-links">
              {siteConfig.email && (
                <TextLink href={`mailto:${siteConfig.email}`}>
                  Email Farhan
                </TextLink>
              )}
              {siteConfig.linkedin && (
                <TextLink href={siteConfig.linkedin} external>
                  Connect on LinkedIn
                </TextLink>
              )}
            </div>
          </section>
        )}
        <section className="contact-card">
          <span className="eyebrow">CyberBit Solutions</span>
          <h2>Security tools & services</h2>
          <p>
            For business cybersecurity inquiries, find the appropriate contact
            path through CyberBit Solutions.
          </p>
          <TextLink href={siteConfig.cyberbit} external>
            Visit CyberBit Solutions
          </TextLink>
        </section>
        <section className="contact-card">
          <span className="eyebrow">GitHub</span>
          <h2>Connect through the work</h2>
          <p>
            Explore public repositories and the technical projects I share on
            GitHub.
          </p>
          <TextLink href={siteConfig.github} external>
            View GitHub profile
          </TextLink>
        </section>
      </div>
    </div>
  );
}
