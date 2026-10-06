import Link from "next/link";
import { ProjectCover } from "@/components/ProjectCover";
import { Rich } from "@/components/Rich";
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
  { value: "73", label: "머지된 PR", sub: "Keepsa 43 · Union 30" },
];

const credentials = [
  { kind: "자격증", name: "SQL 개발자 (SQLD)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { kind: "자격증", name: "데이터분석 준전문가 (ADsP)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { kind: "어학", name: "TOEIC Speaking IH (150)", issuer: "ETS", date: "2026.03" },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="grid gap-12 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1fr_20rem] lg:items-end">
        <div>
          <p className="text-sm font-medium text-muted">조성빈 · Backend Developer</p>
          <h1 className="mt-4 text-4xl leading-[1.2] font-bold tracking-tight sm:text-5xl">
            검색·인증·운영까지,
            <br />
            <span className="text-accent">서비스의 뒷단</span>을 만듭니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Spring Boot와 FastAPI로 서비스를 만들어 온 백엔드 개발자입니다. 지금은 출시를 앞둔 위치 기반 서비스
            Keepsa의 백엔드를 개발하고 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            <Link href="/#projects" className="rounded-lg bg-accent px-5 py-2.5 text-white transition hover:bg-accent/90">
              프로젝트 보기
            </Link>
            <a
              href="https://github.com/ricky00-dev"
              className="rounded-lg border border-line bg-surface px-5 py-2.5 transition hover:border-fg/30"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {highlights.map((h) => (
            <div key={h.label} className="card px-5 py-4">
              <div className="text-xl font-bold tracking-tight text-accent">{h.value}</div>
              <div className="mt-1 text-sm font-medium">{h.label}</div>
              <div className="text-xs text-faint">{h.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 border-t border-line pt-16">
        <SectionTitle eyebrow="Projects" title="프로젝트" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}/`}
              className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/80"
            >
              <div className="h-60 overflow-hidden border-b border-line">
                <ProjectCover p={p} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2 text-xs text-faint">
                  <span>{p.category}</span>
                  <span className="font-mono">{p.period}</span>
                </div>
                <h3 className="mt-2 flex items-center justify-between text-2xl font-bold tracking-tight">
                  <span className="group-hover:text-accent">{p.name}</span>
                  <span className="text-lg text-faint transition group-hover:translate-x-0.5 group-hover:text-accent">↗</span>
                </h3>
                <p className="mt-1 font-medium">{p.headline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.tagline}</p>
                <p className="mt-4 rounded-lg bg-surface-2 px-4 py-3 text-sm leading-relaxed">
                  <Rich text={p.outcome} />
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {p.stack.slice(0, 6).map((s) => (
                    <span key={s} className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="stack" className="scroll-mt-20 pt-24">
        <SectionTitle eyebrow="Tech Stack" title="사용 기술" />
        <div className="card mt-8 divide-y divide-line">
          {stack.map((g) => (
            <div key={g.group} className="grid gap-2 px-6 py-4 sm:grid-cols-[8rem_1fr] sm:items-center">
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

      <section id="credentials" className="scroll-mt-20 pt-24">
        <SectionTitle eyebrow="Credentials" title="자격증 · 어학" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {credentials.map((c) => (
            <div key={c.name} className="card p-6">
              <div className="flex items-center justify-between text-xs">
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-medium text-accent">{c.kind}</span>
                <span className="font-mono text-faint">{c.date}</span>
              </div>
              <div className="mt-4 text-lg font-bold tracking-tight">{c.name}</div>
              <div className="mt-1 text-sm text-faint">{c.issuer}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 pt-24">
        <div className="card flex flex-col gap-6 p-8 sm:flex-row sm:items-end sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-xs tracking-widest text-accent uppercase">Contact</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">연락처</h2>
            <p className="mt-3 text-muted">단국대학교 소프트웨어학과</p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a href="mailto:comicricky20@gmail.com" className="text-xl font-semibold text-accent hover:underline sm:text-2xl">
              comicricky20@gmail.com
            </a>
            <a href="https://github.com/ricky00-dev" className="text-sm text-muted hover:text-fg">
              github.com/ricky00-dev ↗
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
