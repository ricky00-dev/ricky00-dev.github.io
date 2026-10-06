import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchDiagram } from "@/components/ArchDiagram";
import { Diff } from "@/components/Diff";
import { Rich } from "@/components/Rich";
import { Gallery, ShotFigure } from "@/components/Shots";
import { MergedBadge, Tag } from "@/components/Tag";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return p ? { title: `${p.name} · 조성빈`, description: p.tagline } : {};
}

function Heading({ id, title }: { id: string; title: string }) {
  return (
    <h2 id={id} className="scroll-mt-20 border-b border-line pb-3 text-xl font-bold tracking-tight">
      {title}
    </h2>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  const toc = [
    ...(p.gallery ? [{ id: "screens", label: "화면" }] : []),
    { id: "architecture", label: "구조와 담당 범위" },
    ...p.cases.map((c, i) => ({ id: `case-${i + 1}`, label: c.title, ref: c.refs.split(" · ")[0].replace("PR ", "") })),
    { id: "also", label: "그 밖에 한 일" },
    { id: "retro", label: "회고" },
  ];

  const meta = [
    { k: "역할", v: `${p.role} · ${p.team}` },
    { k: "기간", v: p.period },
    { k: "담당", v: p.contribution },
    { k: "기술", v: p.stack.join(", ") },
  ];

  return (
    <main>
      <nav className="pt-8 text-sm">
        <Link href="/#projects" className="text-muted hover:text-fg">
          ← 전체 프로젝트
        </Link>
      </nav>

      <header className="pt-8 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-5xl font-bold tracking-tight">{p.name}</h1>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-xs text-faint">
            {p.privateNote ? "비공개 저장소" : "공개 저장소"}
          </span>
        </div>
        <p className="mt-3 text-xl font-medium">{p.headline}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          {p.tagline}. {p.summary}
        </p>
        {p.links.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md border border-line bg-surface px-3 py-1.5 transition hover:border-fg/40"
              >
                {l.label} <span className="text-faint">↗</span>
              </a>
            ))}
          </div>
        )}
        {p.privateNote && <p className="mt-5 text-sm text-faint">🔒 {p.privateNote}</p>}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
          <dl className="card divide-y divide-line text-sm">
            {meta.map((m) => (
              <div key={m.k} className="grid grid-cols-[4.5rem_1fr] gap-3 px-4 py-3">
                <dt className="text-sm text-faint">{m.k}</dt>
                <dd className="leading-relaxed">{m.v}</dd>
              </div>
            ))}
          </dl>
          <div className="card flex flex-col justify-center p-5">
            <p className="text-sm font-semibold">성과</p>
            <p className="mt-2 leading-relaxed">
              <Rich text={p.outcome} />
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              {p.stats.map((s) => (
                <span key={s.label} className="text-xs text-muted">
                  <span className="font-semibold text-fg">{s.value}</span> {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-12 lg:grid-cols-[14rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <p className="text-xs font-semibold text-faint">목차</p>
            <ol className="mt-3 space-y-0.5 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="flex items-baseline gap-2 rounded px-2 py-1 text-muted hover:bg-surface-2 hover:text-fg"
                  >
                    <span className="min-w-0 flex-1 leading-snug">{t.label}</span>
                    {"ref" in t && t.ref && <span className="shrink-0 font-mono text-[11px] text-faint">{t.ref}</span>}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="min-w-0 space-y-14">
          {p.gallery && (
            <section>
              <Heading id="screens" title="화면" />
              <div className="mt-6">
                <Gallery shots={p.gallery} />
              </div>
            </section>
          )}

          <section>
            <Heading id="architecture" title="구조와 담당 범위" />
            <div className="mt-6">
              <ArchDiagram layers={p.architecture} />
            </div>
          </section>

          <section className="space-y-8">
            <h2 className="border-b border-line pb-3 text-xl font-bold tracking-tight">주요 작업</h2>
            {p.cases.map((c, i) => (
              <article key={c.title} id={`case-${i + 1}`} className="card scroll-mt-20 overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2 px-5 py-2.5">
                  <span className="font-mono text-xs text-muted">{c.refs.replace(/PR /g, "")}</span>
                  <MergedBadge />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag name={c.tag} />
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{c.title}</h3>

                  {c.diff && (
                    <div className="mt-4">
                      <Diff rows={c.diff} />
                    </div>
                  )}

                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed">
                    <div>
                      <p className="text-xs font-semibold text-faint">문제</p>
                      <p className="mt-1.5 text-muted">{c.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-faint">해결</p>
                      <ul className="mt-1.5 space-y-2">
                        {c.solution.map((s) => (
                          <li key={s} className="flex gap-3">
                            <span className="mt-[0.6rem] h-1 w-1 shrink-0 rounded-full bg-fg/50" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-faint">검증</p>
                      <p className="mt-1.5">
                        <Rich text={c.result} />
                      </p>
                    </div>
                  </div>

                  {c.image && (
                    <div className="mt-6">
                      <ShotFigure shot={c.image} />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>

          <section>
            <Heading id="also" title="그 밖에 한 일" />
            <ul className="mt-4 divide-y divide-line">
              {p.alsoDid.map((a) => {
                const m = a.match(/^(.*?)\s*\((PR [^)]+)\)$/);
                return (
                  <li key={a} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-[15px]">
                    <span className="min-w-0 flex-1 text-muted">{m ? m[1] : a}</span>
                    {m && <span className="font-mono text-xs text-faint">{m[2].replace(/PR /g, "")}</span>}
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <Heading id="retro" title="회고" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {p.retro.map((r) => (
                <div key={r.title} className="card p-5">
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {next.slug !== p.slug && (
        <div className="mt-16 flex items-end justify-between border-t border-line pt-8">
          <Link href="/#projects" className="text-sm text-muted hover:text-fg">
            ← 전체 프로젝트
          </Link>
          <Link href={`/projects/${next.slug}/`} className="group text-right">
            <span className="block text-xs text-faint">다음 프로젝트</span>
            <span className="text-2xl font-bold tracking-tight">
              {next.name} <span className="inline-block text-accent transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      )}
    </main>
  );
}
