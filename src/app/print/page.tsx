/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { ArchDiagram } from "@/components/ArchDiagram";
import { Diff } from "@/components/Diff";
import { Rich } from "@/components/Rich";
import { Phone } from "@/components/Shots";
import { projects, type Case, type Project } from "@/content/projects";

// A4 print layout rendered to PDF by scripts/pdf.mjs. Not linked from the site.
export const metadata: Metadata = {
  title: "조성빈 · 백엔드 포트폴리오",
  robots: { index: false },
};

const SITE = "https://ricky00-dev.github.io";

const stack = [
  { group: "Backend", items: "Java, Spring Boot, Spring Security, JPA, Python, FastAPI, SQLAlchemy" },
  { group: "Database", items: "PostgreSQL, Redis, Flyway" },
  { group: "Infra", items: "Docker, Nginx, Caddy, AWS EC2 · S3 · SQS, Google Cloud, GitHub Actions" },
  { group: "Realtime", items: "SSE, WebSocket, Redis Pub/Sub, FCM" },
  { group: "Testing", items: "Pytest, JUnit, Testcontainers" },
];

const credentials = [
  { name: "SQL 개발자 (SQLD)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { name: "데이터분석 준전문가 (ADsP)", issuer: "한국데이터산업진흥원", date: "2026.03" },
  { name: "TOEIC Speaking IH (150)", issuer: "ETS", date: "2026.03" },
];

const highlights = [
  { value: "1.2s → 178ms", label: "두 글자 검색 응답 (Keepsa 운영)" },
  { value: "TOTP 2FA", label: "운영 콘솔 2단계 인증 직접 구현" },
  { value: "129건", label: "머지된 PR (Keepsa 52 · 불앤베어 47 · Union 30)" },
];

// How many cases get the full write-up; the rest are listed briefly.
const FULL_CASES: Record<string, number> = { keepsa: 4, "bull-and-bear": 3, union: 3 };

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 border-b border-line pb-1.5 text-[13pt] font-bold">{children}</h2>;
}

function CaseBlock({ c }: { c: Case }) {
  return (
    <article className="break-inside-avoid rounded-lg border border-line p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-[11.5pt] font-bold">{c.title}</h3>
        <span className="shrink-0 font-mono text-[8pt] text-faint">{c.refs}</span>
      </div>
      {c.diff && (
        <div className="mt-2.5">
          <Diff rows={c.diff} compact />
        </div>
      )}
      <p className="mt-2.5 text-muted">{c.problem}</p>
      <ul className="mt-2 space-y-1">
        {c.solution.map((s) => (
          <li key={s} className="flex gap-2">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-fg/50" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2">
        <span className="mr-1.5 font-semibold">결과</span>
        <Rich text={c.result} />
      </p>
    </article>
  );
}

function ProjectSection({ p }: { p: Project }) {
  const n = FULL_CASES[p.slug] ?? p.cases.length;
  const full = p.cases.slice(0, n);
  const brief = p.cases.slice(n);
  const meta = [
    { k: "기간", v: p.period },
    { k: "역할", v: `${p.role} · ${p.team}` },
    { k: "담당", v: p.contribution },
    { k: "기술", v: p.stack.join(", ") },
  ];
  const phones = p.gallery?.filter((g) => g.phone) ?? [];
  const wide = p.gallery?.find((g) => !g.phone);

  return (
    <section className="break-before-page">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-[22pt] font-bold tracking-tight">{p.name}</h1>
        <a href={p.repo ?? `${SITE}/projects/${p.slug}/`} className="font-mono text-[8.5pt] text-accent">
          {p.repo ? p.repo.replace("https://", "") : "비공개 저장소 · 사이트에서 자세히"}
        </a>
      </div>
      <p className="mt-0.5 text-[12pt] font-medium">{p.headline}</p>
      <p className="mt-1.5 text-muted">
        {p.tagline}. {p.summary}
      </p>

      <div className={`mt-4 grid gap-4 ${phones.length ? "grid-cols-[1fr_auto]" : ""}`}>
      <dl className="grid h-fit grid-cols-[3.2rem_1fr] gap-x-3 gap-y-1.5 rounded-lg bg-surface-2 px-4 py-3">
        {meta.map((m) => (
          <div key={m.k} className="contents">
            <dt className="text-faint">{m.k}</dt>
            <dd>{m.v}</dd>
          </div>
        ))}
        <dt className="text-faint">성과</dt>
        <dd>
          <Rich text={p.outcome} />
        </dd>
      </dl>

      {phones.length > 0 && (
        <div className="flex items-start gap-2.5">
          {phones.map((s) => (
            <figure key={s.src} className="w-[23mm]">
              <Phone src={s.src} alt={s.caption} />
            </figure>
          ))}
        </div>
      )}
      </div>
      {!phones.length && wide && (
        <figure className="mt-4">
          <img src={wide.src} alt={wide.caption} className="h-[62mm] w-full rounded-lg border border-line object-cover object-top" />
          <figcaption className="mt-1 text-[8.5pt] text-faint">{wide.caption}</figcaption>
        </figure>
      )}

      <div className="mt-5">
        <H2>구조와 담당 범위</H2>
        <ArchDiagram layers={p.architecture} compact />
      </div>

      <div className="mt-6">
        <div className="space-y-3">
          {full.map((c, i) => (
            <div key={c.title} className="break-inside-avoid">
              {i === 0 && <H2>주요 작업</H2>}
              <CaseBlock c={c} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 break-inside-avoid">
        <H2>회고</H2>
        <div className="grid grid-cols-2 gap-3">
          {p.retro.map((r) => (
            <div key={r.title} className="rounded-lg border border-line p-3">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-1 text-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <H2>그 밖에 한 일</H2>
        <ul className="columns-2 gap-6 text-[8.5pt] leading-[1.5] [&>li]:mb-1 [&>li]:break-inside-avoid">
          {brief.map((c) => (
            <li key={c.title} className="flex gap-2">
              <span className="text-faint">·</span>
              <span>
                {c.title} <span className="font-mono text-[8pt] text-faint">({c.refs})</span>
              </span>
            </li>
          ))}
          {p.alsoDid.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="text-faint">·</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}

export default function PrintPage() {
  return (
    <main className="print-doc mx-auto max-w-[180mm] py-8 text-[9.5pt] leading-[1.6] print:py-0">
      <style>{`
        @page { size: A4; margin: 14mm 14mm 16mm; }
        body > header, body > footer { display: none !important; }
        html, body { background: white !important; }
        .print-doc { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .break-before-page { break-before: page; }
      `}</style>

      <section>
        <p className="text-[10pt] font-medium text-muted">Backend Developer</p>
        <h1 className="mt-1 text-[28pt] leading-tight font-bold tracking-tight">조성빈</h1>
        <p className="mt-3 text-[12pt] leading-relaxed">
          검색·인증·운영까지, <span className="font-semibold text-accent">서비스의 뒷단</span>을 만듭니다.
        </p>
        <p className="mt-1.5 text-muted">
          Spring Boot와 FastAPI로 서비스를 만들어 온 백엔드 개발자입니다. 지금은 출시를 앞둔 위치 기반 서비스
          Keepsa와 졸업 전시 프로젝트 불앤베어의 백엔드를 개발하고 있습니다. 버그는 테스트로 먼저 재현하고, 원인을 고친 뒤 회귀 테스트를 남기는
          방식으로 일합니다.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
          <a href="mailto:comicricky20@gmail.com" className="text-accent">
            comicricky20@gmail.com
          </a>
          <a href="https://github.com/ricky00-dev" className="text-accent">
            github.com/ricky00-dev
          </a>
          <a href={SITE} className="text-accent">
            ricky00-dev.github.io
          </a>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {highlights.map((h) => (
            <div key={h.label} className="rounded-lg border border-line p-3">
              <div className="text-[14pt] font-bold text-accent">{h.value}</div>
              <div className="mt-0.5 text-[8.5pt] text-muted">{h.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <H2>프로젝트</H2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.slug} className="grid grid-cols-[6.5rem_1fr] gap-3">
                <div>
                  <div className="text-[11pt] font-bold">{p.name}</div>
                  <div className="font-mono text-[8pt] text-faint">{p.period}</div>
                </div>
                <div>
                  <div className="font-medium">{p.headline}</div>
                  <div className="text-muted">{p.tagline}</div>
                  <div className="mt-0.5">
                    <Rich text={p.outcome} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <H2>기술</H2>
          <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1">
            {stack.map((s) => (
              <div key={s.group} className="contents">
                <dt className="text-faint">{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-8">
          <div>
            <H2>자격증 · 어학</H2>
            <ul className="space-y-1">
              {credentials.map((c) => (
                <li key={c.name} className="flex justify-between gap-3">
                  <span>
                    {c.name} <span className="text-faint">· {c.issuer}</span>
                  </span>
                  <span className="font-mono text-[8.5pt] text-faint">{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H2>학력</H2>
            <p>단국대학교 소프트웨어학과</p>
          </div>
        </div>
      </section>

      {projects.map((p) => (
        <ProjectSection key={p.slug} p={p} />
      ))}
    </main>
  );
}
