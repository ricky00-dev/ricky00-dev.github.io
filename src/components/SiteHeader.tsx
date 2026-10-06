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
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="text-lg font-bold tracking-tight">조성빈</span>
          <span className="hidden text-sm text-faint sm:inline">Backend Developer</span>
        </Link>
        <nav className="flex items-center gap-0.5 text-sm sm:gap-1">
          {nav.map((n) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              className={`rounded-md px-2 py-1.5 transition sm:px-3 ${
                active === n.id ? "bg-accent-soft font-semibold text-accent" : "text-muted hover:text-fg"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
