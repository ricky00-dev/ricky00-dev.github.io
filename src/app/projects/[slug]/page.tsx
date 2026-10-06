import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchDiagram } from "@/components/ArchDiagram";
import { Rich } from "@/components/Rich";
import { Gallery, ShotFigure } from "@/components/Shots";
import { Tag } from "@/components/Tag";
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

function Block({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-12 pb-4 first:border-t-0 first:pt-0">
      {eyebrow && <p className="text-xs font-medium text-faint">{eyebrow}</p>}
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-accent">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  const toc = [
    ...(p.gallery ? [{ id: "screens", label: "대표 화면" }] : []),
    { id: "architecture", label: "구조와 담당 범위" },
    ...p.cases.map((c, i) => ({ id: `case-${i + 1}`, label: c.title })),
    { id: "also", label: "그 밖에 한 일" },
    { id: "retro", label: "회고" },
  ];

  return (
    <main>
      <nav className="pt-8">
        <Link href="/#projects" className="text-sm text-muted hover:text-fg">
          ← 전체 프로젝트
        </Link>
      </nav>

      <header className="pt-10 pb-10">
        <p className="text-sm text-faint">{p.category}</p>
        <h1 className="mt-2 text-5xl font-bold tracking-tight text-accent">{p.name}</h1>
        <p className="mt-4 text-xl font-medium">{p.headline}</p>
        <p className="mt-3 flex flex-wrap gap-x-4 text-sm text-faint">
          <span className="font-mono">{p.period}</span>
          <span>
            {p.team} · {p.role}
          </span>
        </p>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted">
          {p.tagline}. {p.summary}
        </p>
        {p.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} className="border-b border-accent/30 pb-0.5 text-accent hover:border-accent">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
        {p.privateNote && <p className="mt-6 text-sm text-faint">🔒 {p.privateNote}</p>}
      </header>

      <div className="grid gap-8 border-y border-line py-8 md:grid-cols-3">
        <div>
          <h3 className="text-xs font-semibold text-accent">기여와 역할</h3>
          <p className="mt-3 text-sm leading-relaxed">{p.contribution}</p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-accent">결과</h3>
          <p className="mt-3 text-sm leading-relaxed">
            <Rich text={p.outcome} />
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-accent">사용 기술</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{p.stack.join(" · ")}</p>
        </div>
      </div>

      <div className="grid gap-12 pt-12 lg:grid-cols-[13rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-faint">목차</p>
            <ol className="mt-3 space-y-1 border-l border-line text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="-ml-px block border-l border-transparent py-1 pl-3 text-muted hover:border-accent hover:text-accent">
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="min-w-0 space-y-8">
          {p.gallery && (
            <Block id="screens" eyebrow="대표 화면" title="화면으로 보기">
              <Gallery shots={p.gallery} />
            </Block>
          )}

          <Block id="architecture" eyebrow="구조" title="구조와 담당 범위">
            <ArchDiagram layers={p.architecture} />
          </Block>

          {p.cases.map((c, i) => (
            <Block key={c.title} id={`case-${i + 1}`} title={c.title}>
              <div className="-mt-1 mb-4 flex flex-wrap items-center gap-2">
                <Tag name={c.tag} />
                <span className="font-mono text-xs text-faint">{c.refs}</span>
              </div>
              <p className="leading-relaxed text-muted">{c.problem}</p>
              <ul className="mt-4 space-y-2.5 leading-relaxed">
                {c.solution.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-lg border-l-4 border-accent bg-accent-soft px-5 py-3.5 text-sm leading-relaxed">
                <span className="mr-2 font-semibold text-accent">결과</span>
                <Rich text={c.result} />
              </p>
              {c.image && (
                <div className="mt-6">
                  <ShotFigure shot={c.image} />
                </div>
              )}
            </Block>
          ))}

          <Block id="also" title="그 밖에 한 일">
            <ul className="space-y-2.5 leading-relaxed text-muted">
              {p.alsoDid.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-faint" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block id="retro" title="회고">
            <div className="grid gap-4 sm:grid-cols-2">
              {p.retro.map((r) => (
                <div key={r.title} className="card p-5">
                  <h3 className="font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              ))}
            </div>
          </Block>
        </div>
      </div>

      {next.slug !== p.slug && (
        <div className="mt-16 flex items-end justify-between border-t border-line pt-8">
          <Link href="/#projects" className="text-sm text-muted hover:text-fg">
            ← 프로젝트 목록
          </Link>
          <Link href={`/projects/${next.slug}/`} className="group text-right">
            <span className="block text-xs text-faint">다음 프로젝트</span>
            <span className="text-2xl font-bold tracking-tight text-accent">
              {next.name} <span className="inline-block transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      )}
    </main>
  );
}
