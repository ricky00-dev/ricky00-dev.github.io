"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { id: "projects", label: "프로젝트" },
  { id: "stack", label: "기술" },
  { id: "credentials", label: "자격증·어학" },
  { id: "contact", label: "연락처" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string>(onHome ? "" : "projects");

  useEffect(() => {
    if (!onHome) {
      setActive("projects");
      return;
    }
    const sections = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-semibold">sungbin</span>
          <span className="hidden text-faint sm:inline">/ backend</span>
        </Link>
        <nav className="flex items-center text-sm">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              className={`relative px-2 py-4 transition sm:px-3 ${
                active === n.id ? "font-semibold text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {n.label}
              {active === n.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent sm:inset-x-3" />}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
