import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <main className="pb-6">
      <nav className="pt-8">
        <Link href="/#projects" className="text-sm text-muted hover:text-fg">
          ← 프로젝트 목록
        </Link>
      </nav>

      <header className="pt-8 pb-12">
        <p className="font-mono text-xs text-faint">{p.period}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{p.name}</h1>
        <p className="mt-4 text-lg text-muted">{p.tagline}</p>
        <p className="mt-1 text-sm text-faint">
          {p.team} · {p.role}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {p.stats.map((s) => (
            <div key={s.label} className="card p-4">
              <div className="text-xl font-bold tracking-tight text-accent sm:text-2xl">{s.value}</div>
              <div className="mt-1 text-xs text-faint">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
              {s}
            </span>
          ))}
        </div>

        {p.repo && (
          <a href={p.repo} className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
            GitHub 저장소 →
          </a>
        )}
        {p.privateNote && <p className="mt-6 text-sm text-faint">🔒 {p.privateNote}</p>}

        <p className="mt-8 leading-relaxed text-muted">{p.summary}</p>
      </header>

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Key Work</h2>
        <div className="mt-6 space-y-5">
          {p.cases.map((c, i) => (
            <article key={c.title} className="card p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <Tag name={c.tag} />
                </div>
                <span className="font-mono text-xs text-faint">{c.refs}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold tracking-tight">{c.title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-muted">{c.problem}</p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                {c.solution.map((s) => (
                  <li key={s} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-lg bg-accent-soft px-4 py-3 text-sm leading-relaxed">
                <span className="mr-2 font-semibold text-accent">Result</span>
                {c.result}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <h2 className="text-2xl font-bold tracking-tight">그 밖에 한 일</h2>
        <ul className="card mt-6 divide-y divide-line text-sm leading-relaxed">
          {p.alsoDid.map((a) => (
            <li key={a} className="px-5 py-3 text-muted">
              {a}
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-16">
        <h2 className="text-2xl font-bold tracking-tight">회고</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {p.retro.map((r) => (
            <div key={r.title} className="card p-5">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
