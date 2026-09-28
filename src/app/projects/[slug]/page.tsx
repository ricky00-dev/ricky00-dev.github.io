import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
    <main className="pb-10">
      <nav className="pt-10">
        <Link href="/" className="text-sm text-muted hover:text-accent">
          ← 조성빈
        </Link>
      </nav>

      <header className="pt-10 pb-12">
        <p className="font-mono text-sm text-accent">{p.period}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">{p.name}</h1>
        <p className="mt-4 text-lg text-muted">{p.tagline}</p>
        <p className="mt-2 text-sm text-faint">
          {p.team} · {p.role}
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {p.stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-line bg-surface p-4">
              <div className="text-2xl font-bold text-accent">{s.value}</div>
              <div className="mt-1 font-mono text-xs text-faint">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
              {s}
            </span>
          ))}
        </div>

        {p.repo && (
          <a href={p.repo} className="mt-6 inline-block text-sm text-accent hover:underline">
            GitHub 저장소 →
          </a>
        )}
        {p.privateNote && <p className="mt-6 text-sm text-faint">🔒 {p.privateNote}</p>}

        <p className="mt-8 leading-relaxed text-muted">{p.summary}</p>
      </header>

      <section className="border-t border-line py-12">
        <h2 className="font-mono text-sm text-faint">Key Work</h2>
        <div className="mt-6 space-y-6">
          {p.cases.map((c, i) => (
            <article key={c.title} className="rounded-lg border border-line bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs text-accent-2">
                  {String(i + 1).padStart(2, "0")} · {c.tag}
                </span>
                <span className="font-mono text-xs text-faint">{c.refs}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold">{c.title}</h3>

              <dl className="mt-4 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-xs text-faint">PROBLEM</dt>
                  <dd className="mt-1 text-muted">{c.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-faint">SOLUTION</dt>
                  <dd className="mt-1">
                    <ul className="space-y-1.5 text-muted">
                      {c.solution.map((s) => (
                        <li key={s} className="flex gap-2">
                          <span className="text-accent">–</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-faint">RESULT</dt>
                  <dd className="mt-1 text-fg">{c.result}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-mono text-sm text-faint">Also</h2>
        <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted">
          {p.alsoDid.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="text-accent-2">▸</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-mono text-sm text-faint">Retrospective</h2>
        <div className="mt-6 space-y-4">
          {p.retro.map((r) => (
            <div key={r.title} className="border-l-2 border-accent pl-4">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
