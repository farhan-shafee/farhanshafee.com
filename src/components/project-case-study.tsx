import { Fragment } from "react";
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

function EvidenceImages({ images }: { images: ProjectImage[] }) {
  return images.map((image) => (
    <figure className="mx-0" key={image.src}>
      <Image
        className="block rounded-[5px] border border-[var(--line)]"
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 760px) 100vw, 720px"
      />
      <figcaption className="mt-3 text-sm">{image.caption}</figcaption>
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
    { id: "what-i-built", title: "What I built", content: study?.whatIBuilt },
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
      id: "selected-interfaces",
      title: "Selected interfaces",
      images: project.screenshots,
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

  return (
    <div className="prose">
      {sections.map(({ id, title, content, images }) => {
        const paragraphs = nonEmpty(content?.paragraphs);
        const bullets = nonEmpty(content?.bullets);
        const assets = renderableImages(images);
        if (!paragraphs.length && !bullets.length && !assets.length)
          return null;

        return (
          <Fragment key={id}>
            <h2 id={id}>{title}</h2>
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
            <EvidenceImages images={assets} />
          </Fragment>
        );
      })}
      {links.length > 0 && (
        <>
          <h2 id="links">Links</h2>
          <div className="inline-links">
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
        </>
      )}
    </div>
  );
}
