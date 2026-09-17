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
    <div className="page-shell editorial-page editorial-contact">
      <PageIntro
        eyebrow="Contact"
        title="Engineering & collaboration."
        description="For engineering opportunities, security and automation collaboration, and technical partnerships."
      />
      <div className="editorial-contact-list">
        {(siteConfig.email || siteConfig.linkedin) && (
          <section className="editorial-contact-row editorial-contact-lead">
            <h2>Professional inquiries</h2>
            <div>
              <div className="editorial-inline-links">
                {siteConfig.linkedin && (
                  <TextLink
                    href={siteConfig.linkedin}
                    external
                    className="editorial-contact-primary"
                  >
                    Connect on LinkedIn
                  </TextLink>
                )}
                {siteConfig.email && (
                  <TextLink href={`mailto:${siteConfig.email}`}>
                    Email Farhan
                  </TextLink>
                )}
              </div>
              <p>
                Share the problem, the context, and the work you have in mind.
              </p>
            </div>
          </section>
        )}
        <section className="editorial-contact-row">
          <h2>CyberBit inquiries</h2>
          <div>
            <p>Business cybersecurity tools and services.</p>
            <TextLink href={siteConfig.cyberbit} external>
              Visit CyberBit Solutions
            </TextLink>
          </div>
        </section>
        <section className="editorial-contact-row">
          <h2>Public work</h2>
          <div>
            <p>Repositories and technical projects on GitHub.</p>
            <TextLink href={siteConfig.github} external>
              View GitHub profile
            </TextLink>
          </div>
        </section>
      </div>
    </div>
  );
}
