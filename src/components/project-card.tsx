import Link from "next/link";
import { ArrowIcon } from "@/components/ui";
import type { Project } from "@/data/projects";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card">
      <div className="project-card-meta">
        <span className="project-category">{project.category}</span>
        <span className="project-number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="project-title" id={`project-${project.slug}`}>
        <Link href={`/work/${project.slug}`}>{project.title}</Link>
      </h3>
      <p className="project-description">{project.description}</p>
      {project.technologies.length > 0 && (
        <ul className="project-tags" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      )}
      <div className="project-footer">
        <span className="status">{project.status}</span>
        <span className="project-arrow" aria-hidden="true">
          <ArrowIcon diagonal />
        </span>
      </div>
    </article>
  );
}
