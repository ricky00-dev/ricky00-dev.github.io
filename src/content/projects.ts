export type Case = {
  title: string;
  tag: string;
  problem: string;
  solution: string[];
  result: string;
  refs: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  team: string;
  role: string;
  stack: string[];
  repo?: string;
  privateNote?: string;
  stats: { label: string; value: string }[];
  summary: string;
  cases: Case[];
  alsoDid: string[];
  retro: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "keepsa",
    name: "Keepsa",
    tagline: "SNS·AI로 장소를 발견하고 동선을 기록·공유하는 위치 기반 서비스",
    period: "2026.07 – 진행 중 (출시 준비)",
    team: "팀 프로젝트",
    role: "Backend",
    stack: ["FastAPI", "SQLAlchemy (async)", "PostgreSQL", "Redis", "Alembic", "Pytest", "FCM"],
    privateNote: "출시 준비 중인 팀 프로젝트라 저장소는 비공개입니다.",
    stats: [
      { label: "Merged PRs", value: "25" },
      { label: "Lines added", value: "+12.8k" },
      { label: "Tests added", value: "~200" },
    ],
    summary:
      "비어 있던 API를 구현하는 것부터 시작해, 이후에는 '돌아가는 것처럼 보이지만 실제로는 틀린' 부분을 찾아 고치는 일에 집중했습니다. 증상을 테스트로 먼저 재현하고, 근본 원인을 고친 뒤, 회귀 테스트로 닫는 방식으로 일했습니다.",
    cases: [
      {
        title: "한 번도 작동하지 않던 자동 방문 인증 되살리기",
        tag: "Debugging",
        problem:
          "체류 위치가 코스 장소와 겹치면 방문을 자동 인증하는 기능이 있었지만, 실제로는 한 번도 인증된 적이 없었습니다.",
        solution: [
          "추적 결과 poi_boundaries가 항상 빈 배열로 전달되고 있었고, 원인은 UUID를 담을 수 없는 int 필드였습니다.",
          "요청 안에서만 쓰는 로컬 인덱스를 넘기고, 저장 직전에 Place.id로 번역하도록 바꿨습니다.",
          "기능이 살아나자 근처를 스쳐 지나가기만 해도 인증되는 오탐이 생겨, 10분 체류 하한을 추가했습니다.",
        ],
        result: "체류 → 자동 인증 → 코스 반영까지 end-to-end 테스트로 검증했습니다.",
        refs: "PR #44 · #46 · #53",
      },
      {
        title: "인덱스 58개 감사",
        tag: "Database",
        problem: "인덱스는 많은데, 실제로 쿼리에 쓰이고 있는지는 아무도 확인하지 않은 상태였습니다.",
        solution: [
          "enable_seqscan=off 상태로 EXPLAIN을 돌리면서, 인덱스 술어와 실제 쿼리 조건을 하나씩 대조했습니다.",
          "부분 인덱스의 조건(confirmed_poi)이 쿼리 조건(confirmed_at)과 달라 한 번도 쓰이지 않던 것을 찾아 고쳤습니다.",
          "중복 인덱스 4개를 제거하고, 리뷰 조회에 빠져 있던 인덱스를 추가했습니다. 마이그레이션은 멱등하게 작성하고 upgrade/downgrade 왕복을 검증했습니다.",
        ],
        result: "쓰이지 않던 인덱스 1개 수정, 중복 4개 제거, 누락 1개 추가.",
        refs: "PR #51",
      },
      {
        title: "'CI가 가끔 깨진다'에서 찾은 타임존 버그",
        tag: "Debugging",
        problem: "점주 통계 테스트가 자정 무렵에만 간헐적으로 실패했습니다.",
        solution: [
          "'오늘'은 UTC 기준으로, 일별 버킷은 DB 세션 타임존 기준으로 계산되고 있었습니다. 그래서 매일 9시간 동안 통계가 틀리고 있었습니다.",
          "timezone('Asia/Seoul')을 명시해 기준을 KST로 통일했습니다.",
          "타임존을 파라미터로 넘기면 SELECT와 GROUP BY가 서로 다른 식으로 인식되는 문제가 있어, literal_column으로 해결했습니다.",
        ],
        result: "flaky 테스트가 사라졌고, 운영 통계의 실제 버그를 고쳤습니다.",
        refs: "PR #52",
      },
      {
        title: "음성 리뷰 비동기 처리와 완료 알림",
        tag: "Architecture",
        problem: "음성 리뷰의 AI 처리는 수십 초가 걸려, 요청을 붙잡고 기다리게 할 수 없었습니다.",
        solution: [
          "업로드 요청에는 202로 바로 응답하고, 처리는 백그라운드 작업으로 넘겼습니다.",
          "완료 통지는 새 채널을 만들지 않고, 기존 WebSocket(Redis Pub/Sub)에 이벤트 타입만 추가해 재사용했습니다.",
          "사용자가 화면을 벗어나도 결과를 받을 수 있도록 FCM 푸시를 추가했습니다.",
        ],
        result: "업로드 후 바로 다른 작업이 가능하고, 완료되면 앱 어디에 있든 알림이 도착합니다.",
        refs: "PR #32 · #35 · #80",
      },
      {
        title: "다중 워커 환경에서 동선 협업 멱등성 보장",
        tag: "Concurrency",
        problem: "여러 워커가 Redis Pub/Sub을 함께 구독하는 구조에서, 같은 요청이 중복 처리되거나 재연결 후 일부 채널을 놓칠 수 있었습니다.",
        solution: [
          "SET NX로 요청을 중복 제거하고, FOR UPDATE로 동시 수정을 직렬화했습니다.",
          "리스너가 재연결될 때 채널 일부만 복구되던 문제를, 전체 재구독과 지수 백오프(0.5–30초)로 바꿨습니다.",
        ],
        result: "워커 수와 무관하게 요청이 한 번만 반영됩니다.",
        refs: "PR #3",
      },
      {
        title: "refresh 토큰 재사용 탐지 우회 버그",
        tag: "Security",
        problem: "같은 초에 발급된 refresh 토큰이 바이트 단위로 완전히 같아져, 재사용 탐지가 뚫릴 수 있었습니다.",
        solution: [
          "토큰마다 고유한 jti를 넣었습니다.",
          "재사용이 감지되면 세션을 폐기하는 흐름을 테스트로 고정했습니다.",
        ],
        result: "토큰 회전과 재사용 탐지가 의도대로 동작합니다.",
        refs: "PR #30",
      },
    ],
    alsoDid: [
      "비어 있던 스텁 라우터 7개 전체 구현, API 선별표 작성 (PR #1)",
      "위치 동기화에서 재전송된 조각이 중복 행을 만들던 것을 '시간 포함' 판정으로 차단 (PR #47)",
      "친구 피드 N+1 제거: 친구 수와 무관하게 쿼리 3개 (PR #39)",
      "엔드포인트 196개 전수 조사, 테스트 없던 22개에 신규 테스트 47개 (PR #50)",
      "월말·연말에만 발생하던 날짜 계산 크래시 수정 (PR #43)",
      "카카오 API 약관 검토 후, 직접 만든 응답 캐시를 제거하고 잔존 데이터 정리 스크립트 작성 (PR #49 · #55)",
    ],
    retro: [
      {
        title: "백그라운드 작업의 내구성",
        body: "음성 리뷰는 프로세스 내 BackgroundTasks로 처리합니다. 워커가 재시작되면 작업이 유실되고 재시도도 없습니다. 다시 설계한다면 영속 큐(arq/Celery)와 하트비트 기반 만료 처리를 두겠습니다.",
      },
      {
        title: "성능보다 약관이 먼저",
        body: "카카오 응답을 캐시해 응답 속도를 크게 줄였지만, 약관상 서버 저장이 허용되지 않는다는 것을 확인하고 직접 제거했습니다. 기술적으로 가능한 것과 해도 되는 것을 구분하는 계기가 됐습니다.",
      },
    ],
  },
  {
    slug: "union",
    name: "Union",
    tagline: "퍼블리셔가 미니앱을 배포하고 대학생이 실행하는 슈퍼앱 플랫폼",
    period: "2026.03 – 2026.06",
    team: "캡스톤 디자인 · 4인",
    role: "Backend",
    stack: ["Java", "Spring Boot", "Spring Security", "JPA", "PostgreSQL", "Redis", "FCM", "GCS"],
    repo: "https://github.com/dku-union/union-app-backend",
    stats: [
      { label: "Merged PRs", value: "30" },
      { label: "Lines added", value: "+4.8k" },
      { label: "Owned domains", value: "5" },
    ],
    summary:
      "인증의 기반을 세우는 것부터 시작해 미니앱, 검색, 알림, 신고, 사용자 도메인을 맡았습니다. 대시보드(Next.js)·iOS 앱과 API를 맞추며 개발했습니다.",
    cases: [
      {
        title: "JWT 인증과 Auth 도메인",
        tag: "Security",
        problem: "사용자 앱과 퍼블리셔 대시보드가 같은 백엔드를 쓰기 때문에, 인증 기반부터 필요했습니다.",
        solution: [
          "Spring Security 필터 체인에 JWT 인증 필터를 구성했습니다.",
          "인증 실패(401)와 인가 실패(403)를 전용 핸들러로 분리해, 클라이언트가 구분할 수 있는 응답을 주도록 했습니다.",
          "미니앱을 변경하는 API마다 워크스페이스 멤버십을 검증했습니다.",
        ],
        result: "이후 추가된 내부 JWT, 워크스페이스 권한 구조의 기반이 되었습니다.",
        refs: "PR #1",
      },
      {
        title: "한글 자모 분해 검색",
        tag: "Search",
        problem: "입력 중인 'ㅎㅏㄱ' 같은 조합 전 상태로는 LIKE 검색에 걸리지 않아, 자동완성이 한 박자 늦었습니다.",
        solution: [
          "유니코드 연산으로 음절을 자모로 분해해 searchableName 컬럼에 저장했습니다.",
          "@PrePersist/@PreUpdate로 이름이 바뀔 때마다 자동 동기화되게 했습니다.",
          "검색은 prefix LIKE로 해서 인덱스를 탈 수 있게 했습니다.",
        ],
        result: "자모를 입력하는 단계부터 결과가 매칭됩니다.",
        refs: "PR #25",
      },
      {
        title: "Redis ZSET 인기 검색어와 차등 캐시",
        tag: "Caching",
        problem: "탐색 화면의 인기·추천·신규 목록이 요청마다 DB를 조회하고 있었습니다.",
        solution: [
          "검색과 클릭 이벤트마다 ZSET 점수를 올려, 실시간 인기 검색어 랭킹을 만들었습니다.",
          "데이터 특성에 따라 캐시 수명을 달리했습니다. 인기·추천은 30분, 신규는 10분 주기로 무효화합니다.",
          "Redis에서 LocalDateTime 직렬화 오류로 500이 나던 문제도 함께 고쳤습니다.",
        ],
        result: "탐색 API가 DB 대신 캐시에서 응답합니다.",
        refs: "PR #22 · #42",
      },
      {
        title: "FCM 푸시와 인박스 알림",
        tag: "Messaging",
        problem: "공지·심사 결과 등을 푸시로 보내고, 앱 안에서도 다시 볼 수 있어야 했습니다.",
        solution: [
          "(user_id, device_id) 유니크 제약을 걸고 기기별 토큰을 upsert했습니다.",
          "캠페인 1건을 사용자별 인박스로 펼쳐, 1,000명 단위로 나눠 저장했습니다.",
          "딥링크 data payload와 APNs mutable-content를 설정했습니다.",
        ],
        result: "푸시를 탭하면 해당 화면으로 바로 이동하고, 인박스에 기록이 남습니다.",
        refs: "PR #43 · #49",
      },
    ],
    alsoDid: [
      "대학 이메일 도메인 검증을 하드코딩에서 DB로 재설계, 외부 API에 타임아웃 적용과 예외 변환 (PR #2 · #4)",
      "대상 타입별 검증과 중복 신고 409 처리를 갖춘 신고 도메인 설계, 어드민 처리 API (PR #50 · #53)",
      "회원 탈퇴 시 FCM 토큰 등 연관 개인정보 삭제 (PR #53)",
      "미니앱 심사 흐름: 테스트 번들 링크 발급과 상태 전이 (PR #7 · #26 · #36 · #38)",
      "아이콘과 앱 버전 업로드 API (PR #46 · #47)",
    ],
    retro: [
      {
        title: "enum 하나가 만든 운영 장애",
        body: "미니앱 상태에 DEPLOYED를 추가했는데, 운영 DB의 CHECK 제약을 갱신하지 않아 500이 발생했고 라이브 목록이 비었습니다. 스키마를 코드와 함께 관리하는 마이그레이션 도구(Flyway)와 스테이징 검증의 필요성을 배웠습니다.",
      },
      {
        title: "@Async self-invocation",
        body: "알림 fan-out에 @Async를 붙였지만 같은 클래스 안에서 호출해 프록시를 거치지 않았고, 결국 동기로 실행되고 있었습니다. 별도 빈으로 분리하고 @TransactionalEventListener(AFTER_COMMIT)로 커밋 이후에 실행하는 구조가 맞다고 봅니다.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
