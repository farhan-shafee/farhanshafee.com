import Link from "next/link";
import Image from "next/image";
import { ArrowIcon } from "@/components/ui";
import { EvidenceLinks } from "@/components/evidence-links";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  index = 0,
  variant = "secondary",
  headingLevel = 3,
}: {
  project: Project;
  index?: number;
  variant?: "primary" | "flagship" | "secondary" | "supporting";
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const preview =
    variant === "primary" || variant === "flagship"
      ? project.screenshots?.[0]
      : undefined;
  const highlights =
    variant === "primary"
      ? (project.technicalHighlights ?? [])
      : variant === "flagship"
        ? (project.technicalHighlights ?? []).slice(0, 1)
        : [];
  const selectedEvidence = (
    <EvidenceLinks
      links={project.inspection?.links.filter((link) => link.featured) ?? []}
      label={`${project.title} selected evidence`}
    />
  );

  return (
    <article
      className={`project-entry project-entry--${variant}${preview ? " project-entry--with-preview" : ""}`}
    >
      <div className="project-entry-copy">
        <div className="project-entry-heading">
          <div className="project-entry-meta">
            <span className="project-entry-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{project.category}</span>
          </div>
          <Heading
            className="project-entry-title"
            id={`project-${project.slug}`}
          >
            <Link href={`/work/${project.slug}`}>
              <span>{project.title}</span>
              <ArrowIcon diagonal />
            </Link>
          </Heading>
          <span className="project-entry-status">{project.status}</span>
          {project.sourceVisibility === "private" && (
            <span className="project-entry-status"> · Source private</span>
          )}
        </div>
        <div className="project-entry-summary">
          <p>{project.description}</p>
          {highlights.length > 0 && (
            <ul className="project-entry-highlights">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          )}
          {(variant === "secondary" || variant === "supporting") &&
            selectedEvidence}
        </div>
        {(variant === "primary" || variant === "flagship") && selectedEvidence}
      </div>
      {preview && (
        <figure className="project-entry-preview">
          <Image
            src={preview.src}
            alt={preview.alt}
            width={preview.width}
            height={preview.height}
            sizes={
              variant === "flagship"
                ? "(max-width: 760px) calc(100vw - 40px), (max-width: 960px) 48vw, 440px"
                : "(max-width: 760px) calc(100vw - 40px), (max-width: 1200px) 52vw, 610px"
            }
          />
          <figcaption>{preview.caption}</figcaption>
        </figure>
      )}
    </article>
  );
}
