"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("theme-change", callback);
  return () => window.removeEventListener("theme-change", callback);
}
function getTheme() {
  return document.documentElement.dataset.theme || "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  function toggleTheme() {
    const next = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("fs-theme", next);
    } catch {
      /* Storage can be disabled. */
    }
    window.dispatchEvent(new Event("theme-change"));
  }
  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
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
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" />
      </svg>
    </button>
  );
}
