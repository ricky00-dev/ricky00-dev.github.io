/* eslint-disable @next/next/no-img-element */
import type { Project } from "@/content/projects";
import { Phone } from "./Shots";

export function ProjectCover({ p }: { p: Project }) {
  if (p.coverPhones) {
    return (
      <div className="grid-bg relative h-full w-full overflow-hidden bg-surface-2">
        <div className="absolute right-0 -bottom-24 left-0 flex justify-center gap-4">
          {p.coverPhones.map((src, i) => (
            <Phone key={src} src={src} alt="" className={`w-32 sm:w-36 ${i === 1 ? "translate-y-8" : ""}`} />
          ))}
        </div>
      </div>
    );
  }
  if (p.cover) {
    return <img src={p.cover} alt={`${p.name} 화면`} className="h-full w-full object-cover object-top" />;
  }
  return <div className="grid-bg h-full w-full bg-surface-2" />;
}
