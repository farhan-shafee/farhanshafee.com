import Link from "next/link";
import { siteConfig, socialLinks } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link className="footer-name" href="/">
          {siteConfig.name}
          <span>Security. Automation. Systems.</span>
        </Link>
        <nav aria-label="More pages">
          <Link href="/now">Now</Link>
          <Link href="/uses">Uses</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <nav aria-label="Social and feed links">
          {socialLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          <a href="/rss.xml">RSS</a>
        </nav>
        <a className="back-top" href="#top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
