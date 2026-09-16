"use client";

import { useState, type MouseEvent, type ReactNode } from "react";

export function HeadingLinks({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");

  async function copyHeadingLink(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest<HTMLAnchorElement>("a.heading-anchor");
    if (!link) return;
    setMessage("");
    try {
      await navigator.clipboard.writeText(link.href);
      setMessage("Section link copied to clipboard.");
    } catch {
      setMessage("Section opened. Copy the link from your address bar.");
    }
  }

  return (
    <div className="prose" onClick={copyHeadingLink}>
      {children}
      <span className="copy-link-status" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
