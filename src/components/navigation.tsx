"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/lab", label: "Lab" },
  { href: "/about", label: "About" },
];
export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="primary-nav" aria-label="Main navigation">
      {items.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href || pathname.startsWith(`${href}/`)
              ? "page"
              : undefined
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
