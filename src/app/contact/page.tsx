import { PageIntro, TextLink } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getProjectBySlug } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact",
  "Professional connections with Farhan Shafee for engineering opportunities, security and automation collaboration, and technical partnerships.",
  "/contact",
);

export default function ContactPage() {
  const aegisGraph = getProjectBySlug("aegisgraph");

  return (
    <div className="page-shell editorial-page editorial-contact">
      <PageIntro
        eyebrow="Contact"
        title="Engineering & collaboration."
        description="Engineering opportunities and technical discussions in security, AI systems, fintech automation, and test engineering."
      />
      <div className="editorial-contact-list">
        {(siteConfig.email || siteConfig.linkedin) && (
          <section className="editorial-contact-row editorial-contact-lead">
            <h2>Engineering opportunities</h2>
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
                Share the role or engineering problem, the context, and the
                collaboration you have in mind.
              </p>
            </div>
          </section>
        )}
        <section className="editorial-contact-row">
          <h2>Technical discussion</h2>
          <div>
            <p>
              AegisGraph connects the architecture, implementation, and
              validation behind my security investigation work.
            </p>
            <div className="editorial-inline-links">
              <TextLink href="/work/aegisgraph">Read the case study</TextLink>
              {aegisGraph?.github && (
                <TextLink href={aegisGraph.github} external>
                  Inspect the source
                </TextLink>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
