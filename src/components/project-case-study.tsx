import Image from "next/image";
import { TextLink } from "@/components/ui";
import type { CaseStudySection, Project, ProjectImage } from "@/data/projects";

function nonEmpty(items: string[] = []): string[] {
  return items.map((item) => item.trim()).filter(Boolean);
}

function renderableImages(images: ProjectImage[] = []): ProjectImage[] {
  return images.filter(
    (image) =>
      image.src.startsWith("/") &&
      !image.src.startsWith("//") &&
      image.src.trim().length > 1 &&
      image.alt.trim() &&
      image.caption.trim() &&
      Number.isInteger(image.width) &&
      image.width > 0 &&
      Number.isInteger(image.height) &&
      image.height > 0,
  );
}

function EvidenceImages({
  images,
  fullSize = false,
}: {
  images: ProjectImage[];
  fullSize?: boolean;
}) {
  return images.map((image) => (
    <figure
      className={`case-evidence${fullSize ? " case-evidence--screenshot" : " case-evidence--diagram"}`}
      key={image.src}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={
          fullSize
            ? "(max-width: 760px) calc(100vw - 40px), (max-width: 1200px) 47vw, 560px"
            : "(max-width: 480px) calc(100vw - 40px), 420px"
        }
      />
      <figcaption>
        {image.caption}
        {fullSize && (
          <>
            {" "}
            <TextLink href={image.src} className="case-evidence-link">
              View full-size screenshot
            </TextLink>
          </>
        )}
      </figcaption>
    </figure>
  ));
}

type Section = {
  id: string;
  title: string;
  content?: CaseStudySection;
  images?: ProjectImage[];
};

/** This server component accepts reviewed public records, never the evidence backlog. */
export function ProjectCaseStudy({ project }: { project: Project }) {
  const study = project.caseStudy;
  const sections: Section[] = [
    { id: "overview", title: "Overview", content: study?.overview },
    { id: "problem", title: "Problem", content: study?.problem },
    { id: "system", title: "System", content: study?.system },
    {
      id: "demo-scenario",
      title: "Demo scenario",
      content: study?.demoScenario,
    },
    {
      id: "selected-interfaces",
      title: "Selected interfaces",
      images: project.screenshots,
    },
    {
      id: "technical-highlights",
      title: "Technical highlights",
      content: { bullets: project.technicalHighlights },
    },
    {
      id: "architecture",
      title: "Architecture",
      content: study?.architecture,
      images: project.architectureDiagrams,
    },
    {
      id: "detection-correlation",
      title: "Detection & correlation",
      content: study?.detectionCorrelation,
    },
    { id: "what-i-built", title: "What I built", content: study?.whatIBuilt },
    {
      id: "ai-grounding",
      title: "Evidence-grounded AI",
      content: study?.aiGrounding,
    },
    {
      id: "engineering-decisions",
      title: "Engineering decisions",
      content: study?.engineeringDecisions,
    },
    {
      id: "security-privacy",
      title: "Security / privacy considerations",
      content: study?.securityPrivacy,
    },
    {
      id: "validation",
      title: "Validation",
      content: study?.validation,
    },
    {
      id: "lessons-constraints",
      title: "Lessons / constraints",
      content: study?.lessonsConstraints,
    },
    {
      id: "current-state",
      title: "Current state",
      content: study?.currentState,
    },
  ];
  const links = [
    ...(project.website
      ? [{ label: "Visit website", href: project.website }]
      : []),
    ...(project.github
      ? [{ label: "View source on GitHub", href: project.github }]
      : []),
    ...(project.links ?? []),
  ].filter((link) => link.label.trim() && link.href.trim());
  const populatedSections = sections.flatMap(
    ({ id, title, content, images }) => {
      const paragraphs = nonEmpty(content?.paragraphs);
      const bullets = nonEmpty(content?.bullets);
      const assets = renderableImages(images);
      return paragraphs.length || bullets.length || assets.length
        ? [{ id, title, paragraphs, bullets, assets }]
        : [];
    },
  );

  return (
    <div className="case-study-content">
      {populatedSections.map(
        ({ id, title, paragraphs, bullets, assets }, index) => (
          <section
            className={`case-section case-section--${id}`}
            aria-labelledby={id}
            key={id}
          >
            <div className="case-section-heading">
              <span className="case-section-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 id={id}>{title}</h2>
            </div>
            <div
              className={`case-section-body${id === "architecture" && assets.length > 0 && (paragraphs.length > 0 || bullets.length > 0) ? " case-section-body--with-diagrams" : ""}`}
            >
              {(paragraphs.length > 0 || bullets.length > 0) && (
                <div className="case-section-text">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {bullets.length > 0 && (
                    <ul>
                      {bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {assets.length > 0 && (
                <div
                  className={
                    id === "selected-interfaces"
                      ? "case-evidence-grid"
                      : "case-diagrams"
                  }
                >
                  <EvidenceImages
                    images={assets}
                    fullSize={id === "selected-interfaces"}
                  />
                </div>
              )}
            </div>
          </section>
        ),
      )}
      {links.length > 0 && (
        <section
          className="case-section case-section--links"
          aria-labelledby="links"
        >
          <div className="case-section-heading">
            <span className="case-section-index" aria-hidden="true">
              {String(populatedSections.length + 1).padStart(2, "0")}
            </span>
            <h2 id="links">Links</h2>
          </div>
          <div className="case-section-body case-section-links">
            {links.map((link) => (
              <TextLink
                href={link.href}
                key={link.href}
                external={link.href.startsWith("https://")}
              >
                {link.label}
              </TextLink>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
