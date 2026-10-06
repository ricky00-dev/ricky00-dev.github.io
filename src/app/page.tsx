import Link from "next/link";
import { Tag } from "@/components/Tag";
import { projects } from "@/content/projects";

const stack = [
  { group: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JPA", "Python", "FastAPI", "SQLAlchemy"] },
  { group: "Database", items: ["PostgreSQL", "Redis"] },
  { group: "Infra", items: ["Docker", "Nginx", "AWS S3 · SQS", "Google Cloud", "GitHub Actions"] },
  { group: "Realtime", items: ["WebSocket", "Redis Pub/Sub", "FCM"] },
  { group: "Testing", items: ["Pytest"] },
];

const highlights = [
  { value: "1.2s → 178ms", label: "두 글자 검색 응답", sub: "Keepsa · 운영 환경" },
  { value: "TOTP 2FA", label: "운영 콘솔 2단계 인증 직접 구현", sub: "Keepsa" },
  { value: "73", label: "Merged PRs", sub: "Keepsa 43 · Union 30" },
];

export default function Home() {
  return (
    <main>
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200/50 via-sky-200/40 to-emerald-200/40 blur-3xl"
        />
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Backend Developer
        </span>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">조성빈</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Spring Boot와 FastAPI로 서비스를 만들어 온 백엔드 개발자입니다.
          <br className="hidden sm:block" /> 지금은 출시를 앞둔 위치 기반 서비스 Keepsa의 백엔드를 개발하고 있습니다.
        </p>
        <p className="mt-4 text-sm text-faint">단국대학교 소프트웨어학과 · SQLD · ADsP</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
          <a
            href="https://github.com/ricky00-dev"
            className="rounded-full bg-fg px-5 py-2.5 text-white transition hover:bg-fg/85"
          >
            GitHub
          </a>
          <a
            href="mailto:comicricky20@gmail.com"
            className="rounded-full border border-line bg-surface px-5 py-2.5 transition hover:border-fg/30"
          >
            Email
          </a>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.label} className="card p-5">
            <div className="text-2xl font-bold tracking-tight text-accent">{h.value}</div>
            <div className="mt-2 text-sm font-medium">{h.label}</div>
            <div className="mt-0.5 text-xs text-faint">{h.sub}</div>
          </div>
        ))}
      </section>

      <section id="projects" className="pt-20">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <div className="mt-6 space-y-5">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              className="card group block p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-200/70 sm:p-7"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight group-hover:text-accent">{p.name}</h3>
                <span className="font-mono text-xs text-faint">{p.period}</span>
              </div>
              <p className="mt-2 text-muted">{p.tagline}</p>
              <p className="mt-1 text-sm text-faint">
                {p.team} · {p.role}
              </p>
              <ul className="mt-5 space-y-2.5">
                {p.cases.slice(0, 3).map((c) => (
                  <li key={c.title} className="flex flex-wrap items-center gap-2 text-sm">
                    <Tag name={c.tag} />
                    <span>{c.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium text-accent">
                  자세히 보기 <span className="inline-block transition group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="stack" className="pt-20">
        <h2 className="text-2xl font-bold tracking-tight">Tech Stack</h2>
        <div className="card mt-6 divide-y divide-line">
          {stack.map((g) => (
            <div key={g.group} className="grid gap-2 px-5 py-4 sm:grid-cols-[8rem_1fr] sm:items-center">
              <div className="text-sm font-medium text-faint">{g.group}</div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="rounded-md border border-line bg-surface-2/60 px-2.5 py-1 text-sm">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
