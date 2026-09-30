import Link from "next/link";
import { projects } from "@/content/projects";

const stack = [
  { group: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JPA", "Python", "FastAPI", "SQLAlchemy"] },
  { group: "Database", items: ["PostgreSQL", "Redis"] },
  { group: "Infra", items: ["Docker", "AWS S3 · SQS", "Google Cloud", "GitHub Actions"] },
  { group: "Realtime", items: ["WebSocket", "Redis Pub/Sub", "FCM"] },
  { group: "Testing", items: ["Pytest"] },
];

const strengths = [
  {
    title: "근본 원인까지",
    body: "'가끔 깨지는 CI'에서 매일 9시간씩 틀리던 통계를, '작동하지 않는 기능'에서 타입 불일치를 찾아냅니다.",
  },
  {
    title: "재현하고, 고치고, 고정한다",
    body: "버그를 테스트로 먼저 재현하고, 고친 뒤 회귀 테스트로 닫습니다.",
  },
  {
    title: "데이터 정합성",
    body: "인덱스 감사, N+1, 타임존, 멱등성처럼 에러 없이 결과만 틀리는 지점을 챙깁니다.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="pt-20 pb-16 sm:pt-28">
        <p className="font-mono text-sm text-accent">Backend Developer</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">조성빈</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
          Spring Boot와 FastAPI로 서비스를 만들어 온 백엔드 개발자입니다.
          <br className="hidden sm:block" /> 지금은 출시를 앞둔 위치 기반 서비스 Keepsa의 백엔드를 개발하고 있습니다.
        </p>
        <p className="mt-4 text-sm text-faint">단국대학교 소프트웨어학과 · SQLD · ADsP</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href="https://github.com/ricky00-dev"
            className="rounded-md border border-line bg-surface px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="mailto:comicricky20@gmail.com"
            className="rounded-md border border-line bg-surface px-4 py-2 transition hover:border-accent hover:text-accent"
          >
            comicricky20@gmail.com
          </a>
        </div>
      </header>

      <section className="border-t border-line py-14">
        <h2 className="font-mono text-sm text-faint">How I work</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {strengths.map((s) => (
            <div key={s.title} className="rounded-lg border border-line bg-surface p-5">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-14">
        <h2 className="font-mono text-sm text-faint">Projects</h2>
        <div className="mt-6 space-y-4">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              className="group block rounded-lg border border-line bg-surface p-6 transition hover:border-accent"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold group-hover:text-accent">{p.name}</h3>
                <span className="font-mono text-xs text-faint">{p.period}</span>
              </div>
              <p className="mt-2 text-muted">{p.tagline}</p>
              <p className="mt-1 text-sm text-faint">
                {p.team} · {p.role}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {p.cases.slice(0, 3).map((c) => (
                  <li key={c.title} className="flex gap-2">
                    <span className="text-accent-2">▸</span>
                    {c.title}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s} className="rounded bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-accent">자세히 보기 →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-14">
        <h2 className="font-mono text-sm text-faint">Tech Stack</h2>
        <dl className="mt-6 space-y-4">
          {stack.map((g) => (
            <div key={g.group} className="grid gap-2 sm:grid-cols-[7rem_1fr]">
              <dt className="text-sm text-faint">{g.group}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="rounded border border-line px-2.5 py-1 text-sm">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
