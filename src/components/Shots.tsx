/* eslint-disable @next/next/no-img-element */
import type { Shot } from "@/content/projects";

export function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`rounded-[2rem] bg-zinc-900 p-1.5 shadow-xl shadow-zinc-900/15 ${className}`}>
      <img src={src} alt={alt} className="block w-full rounded-[1.6rem]" loading="lazy" />
    </div>
  );
}

export function ShotFigure({ shot }: { shot: Shot }) {
  return (
    <figure>
      <div className="flex justify-center rounded-xl border border-line bg-surface-2/60 p-5 sm:p-8">
        {shot.phone ? (
          <Phone src={shot.src} alt={shot.caption} className="w-full max-w-[15rem]" />
        ) : (
          <img
            src={shot.src}
            alt={shot.caption}
            className="block w-full rounded-lg border border-line shadow-sm"
            loading="lazy"
          />
        )}
      </div>
      <figcaption className="mt-3 text-sm text-faint">{shot.caption}</figcaption>
    </figure>
  );
}

export function Gallery({ shots }: { shots: Shot[] }) {
  const phones = shots.filter((s) => s.phone);
  const wides = shots.filter((s) => !s.phone);
  return (
    <div className="space-y-8">
      {phones.length > 0 && (
        <div className="rounded-xl border border-line bg-surface-2/60 px-5 py-8 sm:px-8">
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
            {phones.map((s) => (
              <figure key={s.src} className="flex flex-col items-center">
                <Phone src={s.src} alt={s.caption} className="w-full max-w-[13rem]" />
                <figcaption className="mt-4 max-w-[15rem] text-center text-xs leading-relaxed text-faint">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
      {wides.map((s) => (
        <ShotFigure key={s.src} shot={s} />
      ))}
    </div>
  );
}
