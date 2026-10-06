import Link from "next/link";
import { Diff } from "@/components/Diff";
import { ProjectCover } from "@/components/ProjectCover";
import { projects } from "@/content/projects";

const stack = [
  { group: "Backend", items: ["Java", "Spring Boot", "Spring Security", "JPA", "Python", "FastAPI", "SQLAlchemy"] },
  { group: "Database", items: ["PostgreSQL", "Redis"] },
  { group: "Infra", items: ["Docker", "Nginx", "AWS S3 · SQS", "Google Cloud", "GitHub Actions"] },
  { group: "Realtime", items: ["WebSocket", "Redis Pub/Sub", "FCM"] },
  { group: "Testing", items: ["Pytest"] },
];

const credentials = [
  { name: "SQL 개발자 (SQLD)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { name: "데이터분석 준전문가 (ADsP)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { name: "TOEIC Speaking IH (150)", issuer: "ETS", date: "2026.03" },
];

function SectionTitle({ title }: { title: string }) {
  return <h2 className="border-b border-line pb-3 text-2xl font-bold tracking-tight">{title}</h2>;
}

export default function Home() {
  return (
    <main>
      <section className="pt-14 pb-16 sm:pt-20">
        <div>
          <p className="text-sm font-medium text-muted">조성빈 · Backend Developer</p>
          <h1 className="mt-4 text-4xl leading-[1.2] font-bold tracking-tight sm:text-[3.25rem]">
            검색·인증·운영까지,
            <br />
            <span className="text-accent">서비스의 뒷단</span>을 만듭니다.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Spring Boot와 FastAPI로 서비스를 만들어 온 백엔드 개발자입니다. 지금은 출시를 앞둔 위치 기반 서비스
            Keepsa의 백엔드를 개발하고 있습니다.
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
            <span className="ml-1 text-sm text-faint">머지된 PR 73건 · Keepsa 43 · Union 30</span>
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-16 pt-10">
        <SectionTitle title="프로젝트" />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => {
            const diff = p.cases.flatMap((c) => c.diff ?? []).slice(0, 2);
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}/`}
                className="card group flex flex-col overflow-hidden transition hover:border-fg/30 hover:shadow-lg hover:shadow-stone-300/40"
              >
                <div className="h-52 overflow-hidden border-b border-line">
                  <ProjectCover p={p} />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                      <span className="group-hover:text-accent">{p.name}</span>
                      <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-normal tracking-normal text-faint">
                        {p.privateNote ? "비공개 저장소" : "공개 저장소"}
                      </span>
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
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs text-muted">
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
        <SectionTitle title="사용 기술" />
        <dl className="mt-6 divide-y divide-line">
          {stack.map((g) => (
            <div key={g.group} className="grid gap-2 py-3.5 sm:grid-cols-[8rem_1fr] sm:items-center">
              <dt className="text-sm text-faint">{g.group}</dt>
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
        <SectionTitle title="자격증 · 어학" />
        <ul className="mt-6 divide-y divide-line">
          {credentials.map((c) => (
            <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
              <div>
                <span className="text-lg font-semibold">{c.name}</span>
                <span className="ml-3 text-sm text-faint">{c.issuer}</span>
              </div>
              <span className="text-sm text-faint">{c.date}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="scroll-mt-16 pt-20">
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">연락처</h2>
            <p className="mt-2 text-muted">단국대학교 소프트웨어학과</p>
          </div>
          <div className="flex flex-col gap-1.5 sm:items-end">
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
