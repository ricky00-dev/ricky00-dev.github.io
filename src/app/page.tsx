import Link from "next/link";
import { Diff } from "@/components/Diff";
import { ProjectCover } from "@/components/ProjectCover";
import { projects } from "@/content/projects";

const stack = [
  { group: "backend", items: ["Java", "Spring Boot", "Spring Security", "JPA", "Python", "FastAPI", "SQLAlchemy"] },
  { group: "database", items: ["PostgreSQL", "Redis"] },
  { group: "infra", items: ["Docker", "Nginx", "AWS S3 · SQS", "Google Cloud", "GitHub Actions"] },
  { group: "realtime", items: ["WebSocket", "Redis Pub/Sub", "FCM"] },
  { group: "testing", items: ["Pytest"] },
];

// Real titles of merged PRs in the Keepsa repo (private), newest first.
const recentPRs = [
  { no: 119, type: "fix", scope: "infra", title: "운영 감시 — 실패하면 1분 뒤 재확인 후에만 알림", date: "10.02" },
  { no: 102, type: "perf", scope: "search", title: "두 글자 조각을 두 글자 인덱스로", date: "10.01" },
  { no: 85, type: "feat", scope: "admin", title: "2단계 인증 · 권한 분리 · 운영 기록", date: "09.28" },
  { no: 84, type: "feat", scope: "moderation", title: "신고 통합 · 운영자 숨김 · 이용 정지", date: "09.28" },
  { no: 52, type: "fix", scope: "stores", title: "점주 일별 통계 KST 버킷팅", date: "09.02" },
  { no: 51, type: "fix", scope: "db", title: "인덱스 감사 — 술어 버그 수정 + 중복 4개 제거", date: "09.02" },
];

const credentials = [
  { name: "SQL 개발자 (SQLD)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { name: "데이터분석 준전문가 (ADsP)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { name: "TOEIC Speaking IH (150)", issuer: "ETS", date: "2026.03" },
];

function SectionTitle({ path, title }: { path: string; title: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <span className="font-mono text-xs text-faint">{path}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="grid gap-10 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1fr_27rem] lg:items-center">
        <div>
          <p className="font-mono text-sm text-accent">$ whoami</p>
          <h1 className="mt-4 text-4xl leading-[1.2] font-bold tracking-tight sm:text-[3.25rem]">
            검색·인증·운영까지,
            <br />
            서비스의 <span className="bg-add-bg px-1 text-add-fg">뒷단</span>을 만듭니다.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            백엔드 개발자 조성빈입니다. Spring Boot와 FastAPI로 서비스를 만들어 왔고, 지금은 출시를 앞둔 위치 기반
            서비스 Keepsa의 백엔드를 개발하고 있습니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-medium">
            <Link href="/#projects" className="rounded-md bg-fg px-4 py-2.5 text-white transition hover:bg-fg/85">
              프로젝트 보기
            </Link>
            <a
              href="https://github.com/ricky00-dev"
              className="rounded-md border border-line bg-surface px-4 py-2.5 transition hover:border-fg/40"
            >
              GitHub ↗
            </a>
            <span className="ml-1 font-mono text-xs text-faint">73 merged PRs · Keepsa 43 · Union 30</span>
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2.5">
            <span className="font-mono text-xs text-muted">keepsa · 최근 머지한 PR</span>
            <span className="font-mono text-[11px] text-faint">private repo</span>
          </div>
          <ul className="divide-y divide-line">
            {recentPRs.map((pr) => (
              <li key={pr.no} className="flex items-start gap-3 px-4 py-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-2 text-sm sm:truncate">
                    <span className="font-mono text-xs text-faint">
                      {pr.type}({pr.scope}):
                    </span>{" "}
                    {pr.title}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs text-faint">
                  #{pr.no}
                  <span className="hidden sm:inline"> · {pr.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects" className="scroll-mt-16 pt-10">
        <SectionTitle path="~/projects" title="프로젝트" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => {
            const diff = p.cases.flatMap((c) => c.diff ?? []).slice(0, 2);
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}/`}
                className="card group flex flex-col overflow-hidden transition hover:border-fg/30 hover:shadow-lg hover:shadow-stone-300/40"
              >
                <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-xs">
                  <span>
                    <span className="text-faint">{p.slug} / </span>
                    <span className="font-semibold">backend</span>
                  </span>
                  <span className="rounded-full border border-line px-2 py-0.5 text-faint">
                    {p.privateNote ? "private" : "public"}
                  </span>
                </div>
                <div className="h-52 overflow-hidden border-b border-line">
                  <ProjectCover p={p} />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-bold tracking-tight group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                      {p.name}
                    </h3>
                    <span className="font-mono text-xs text-faint">{p.period}</span>
                  </div>
                  <p className="mt-1 font-medium">{p.headline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
                  {diff.length > 0 && (
                    <div className="mt-4">
                      <Diff rows={diff} compact />
                    </div>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 font-mono text-xs text-muted">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-fg/25" />
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="stack" className="scroll-mt-16 pt-20">
        <SectionTitle path="~/stack" title="사용 기술" />
        <dl className="mt-6 divide-y divide-line">
          {stack.map((g) => (
            <div key={g.group} className="grid gap-2 py-3.5 sm:grid-cols-[8rem_1fr] sm:items-center">
              <dt className="font-mono text-xs text-faint">{g.group}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span key={i} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm">
                    {i}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="credentials" className="scroll-mt-16 pt-20">
        <SectionTitle path="~/credentials" title="자격증 · 어학" />
        <ul className="mt-6 divide-y divide-line">
          {credentials.map((c) => (
            <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <div>
                <span className="text-lg font-semibold">{c.name}</span>
                <span className="ml-3 text-sm text-faint">{c.issuer}</span>
              </div>
              <span className="font-mono text-sm text-muted">{c.date}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="scroll-mt-16 pt-20">
        <div className="overflow-hidden rounded-xl bg-fg text-white">
          <div className="border-b border-white/10 px-6 py-3 font-mono text-xs text-white/50">~/contact</div>
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">연락처</h2>
              <p className="mt-2 text-white/60">단국대학교 소프트웨어학과</p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <a href="mailto:comicricky20@gmail.com" className="font-mono text-lg font-semibold text-[#7ee2a0] hover:underline sm:text-2xl">
                comicricky20@gmail.com
              </a>
              <a href="https://github.com/ricky00-dev" className="font-mono text-sm text-white/60 hover:text-white">
                github.com/ricky00-dev ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
