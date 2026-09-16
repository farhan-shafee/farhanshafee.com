import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Navigation } from "@/components/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="wordmark" href="/">
          <span className="monogram" aria-hidden="true">
            fs<span>.</span>
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <Navigation />
        <div className="header-actions">
          <a
            className="icon-button github-link"
            href={siteConfig.github}
            aria-label="Farhan Shafee on GitHub (opens in a new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.4c0-1 .1-1.7-.5-2.4 3.1-.3 6.3-1.5 6.3-7A5.4 5.4 0 0 0 19.3 5c.2-.9.2-2.1-.2-3 0 0-1.2-.4-3.8 1.4a13 13 0 0 0-6.6 0C6.1 1.6 4.9 2 4.9 2c-.4.9-.4 2.1-.2 3a5.4 5.4 0 0 0-1.5 3.5c0 5.5 3.2 6.7 6.3 7-.6.7-.6 1.4-.5 2.4v3.4" />
            </svg>
          </a>
          {siteConfig.linkedin && (
            <a
              className="icon-button"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
            >
              <span aria-hidden="true">in</span>
            </a>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
