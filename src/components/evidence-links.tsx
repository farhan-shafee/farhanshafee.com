import { TextLink } from "@/components/ui";
import type { ProjectEvidenceLink } from "@/data/projects";

export function evidenceLinks(links: ProjectEvidenceLink[] = []) {
  return links.filter(
    ({ label, href }) =>
      label.trim() &&
      (href.startsWith("https://") ||
        (href.startsWith("/") && !href.startsWith("//"))),
  );
}

/** Reviewed, static references; no live repository or analytics requests. */
export function EvidenceLinks({
  links,
  label,
}: {
  links: ProjectEvidenceLink[];
  label: string;
}) {
  const visible = evidenceLinks(links);
  if (!visible.length) return null;

  return (
    <nav className="evidence-links" aria-label={label}>
      {visible.map((link) => (
        <TextLink
          key={link.href}
          href={link.href}
          external={link.href.startsWith("https://")}
        >
          {link.label}
        </TextLink>
      ))}
    </nav>
  );
}
