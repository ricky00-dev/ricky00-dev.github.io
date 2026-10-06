/* eslint-disable @next/next/no-img-element */
import type { Project } from "@/content/projects";
import { Phone } from "./Shots";

export function ProjectCover({ p }: { p: Project }) {
  if (p.coverPhones) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-indigo-500">
        <div aria-hidden className="absolute -top-16 -left-16 h-56 w-56 rounded-full border-[32px] border-white/10" />
        <div className="absolute top-6 left-6 text-white">
          <div className="text-2xl font-bold tracking-tight">{p.name}</div>
          <div className="mt-1 text-sm text-white/75">{p.category}</div>
        </div>
        <div className="absolute right-6 -bottom-28 flex gap-3 sm:right-12">
          {p.coverPhones.map((src, i) => (
            <Phone key={src} src={src} alt="" className={`w-28 sm:w-36 ${i === 1 ? "translate-y-8" : ""}`} />
          ))}
        </div>
      </div>
    );
  }
  if (p.cover) {
    return <img src={p.cover} alt={`${p.name} 화면`} className="h-full w-full object-cover object-top" />;
  }
  return <div className="h-full w-full bg-surface-2" />;
}
