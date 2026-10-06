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
    period: "2026.07 – 진행 중",
    team: "팀 프로젝트",
    role: "Backend",
    stack: ["FastAPI", "SQLAlchemy (async)", "PostgreSQL", "Redis", "Alembic", "Pytest", "FCM"],
    privateNote: "출시 준비 중인 팀 프로젝트라 저장소는 비공개입니다.",
    stats: [
      { label: "Merged PRs", value: "43" },
      { label: "두 글자 검색 (운영)", value: "1.2s → 178ms" },
      { label: "운영 콘솔 인증", value: "TOTP 2FA" },
    ],
    summary:
      "비어 있던 API를 구현하는 것으로 시작해 검색 성능, 운영 콘솔 보안, 모더레이션, 배포·모니터링까지 맡았습니다. 버그는 테스트로 먼저 재현하고, 원인을 고친 뒤 회귀 테스트를 남기는 방식으로 작업했습니다.",
    cases: [
      {
        title: "두 글자 검색어가 표 전체를 읽던 문제",
        tag: "Performance",
        problem:
          "pg_trgm은 세 글자 단위라 '블루 보틀', '쉑쉑'처럼 두 글자 조각으로 된 검색어에는 인덱스를 쓰지 못했고, 드문 이름일수록 표 전체를 읽었습니다.",
        solution: [
          "두 글자 조각을 돌려주는 IMMUTABLE SQL 함수(ref.bigrams)에 GIN 표현식 인덱스를 걸었습니다. 확장 설치는 필요 없습니다.",
          "인덱스로 후보만 좁히고 기존 LIKE 조건은 그대로 둬서 결과가 바뀌지 않게 했고, 인덱스를 켰을 때와 껐을 때 결과가 같은지 테스트로 확인합니다.",
          "함수와 인덱스가 있는지 확인해 5분간 캐시하므로, 배포 순서와 상관없이 적용할 수 있고 DROP만으로 되돌릴 수 있습니다.",
        ],
        result:
          "평가 DB(70만 행)에서 전체를 읽는 검색 39건 → 2건, 검색당 읽은 블록 p95 115k → 9.4k, 정확도는 그대로. 운영에서 '블루 보틀' 1.2초 → 178ms.",
        refs: "PR #102 · #109",
      },
      {
        title: "운영 콘솔 2단계 인증과 권한 분리",
        tag: "Security",
        problem:
          "운영자 비밀번호 하나만 새도 전체 공지, 영구 정지, 사업자 등록증 열람이 모두 가능한 구조였습니다.",
        solution: [
          "RFC 6238 TOTP를 직접 구현하고 RFC 부록의 공식 시험값으로 검증했습니다. 비밀키는 암호화해서 저장합니다.",
          "행 잠금과 마지막 사용 시점 기록으로 같은 코드의 재사용을 막고, 비밀번호 통과 뒤 받는 증표는 5분·5회·1회용으로 제한했습니다.",
          "admin API는 2단계 인증을 거친 토큰만 받고, 위험한 작업은 최고 관리자만 할 수 있게 나눴습니다. 모든 운영 조치는 기록에 남깁니다.",
        ],
        result: "TOTP 테스트 16개, 실제 발급 토큰을 쓰는 운영자 로그인 테스트 13개.",
        refs: "PR #85 · #83 · #86",
      },
      {
        title: "신고가 실제 조치로 이어지도록 모더레이션 재설계",
        tag: "Backend",
        problem:
          "신고를 '조치 완료'로 바꿔도 상태값만 바뀌고 글은 그대로 보였습니다. 신고 표도 둘로 나뉘어 있어 한 사용자의 누적 신고 수가 따로 집계됐습니다.",
        solution: [
          "신고 표를 하나로 합치는 마이그레이션을 작성하고 upgrade/downgrade 왕복을 검증했습니다.",
          "숨김 조건을 한 모듈에 모아 모든 공개 조회와 평점 계산에 적용했습니다.",
          "이용 정지 시 모든 기기에서 즉시 로그아웃되게 했습니다. 앱이 /auth의 403을 '로그인 만료'로 처리하기 때문에, 로그인은 423으로 응답해 앱 수정 없이 정지 사유가 보이게 했습니다.",
        ],
        result: "새 테스트 26개. 숨김·정지 검사를 일부러 빼면 4개가 실패하는 것으로 테스트가 실제로 결함을 잡는지 확인했습니다.",
        refs: "PR #84 · #85",
      },
      {
        title: "한 번도 작동하지 않던 자동 방문 인증 되살리기",
        tag: "Debugging",
        problem:
          "체류 위치가 코스 장소와 겹치면 방문을 자동 인증하는 기능이 있었지만, 실제로는 한 번도 인증된 적이 없었습니다.",
        solution: [
          "추적해 보니 poi_boundaries가 항상 빈 배열이었고, UUID를 담을 수 없는 int 필드가 원인이었습니다.",
          "요청 안에서만 쓰는 로컬 인덱스를 넘기고, 저장 직전에 Place.id로 바꾸도록 했습니다.",
          "기능이 살아나자 근처를 지나가기만 해도 인증되는 오탐이 생겨, 10분 체류 하한을 추가했습니다.",
        ],
        result: "체류 → 자동 인증 → 코스 반영까지 end-to-end 테스트로 검증했습니다.",
        refs: "PR #44 · #46 · #53",
      },
      {
        title: "인덱스 58개 감사",
        tag: "Database",
        problem: "인덱스는 많았지만 실제로 쿼리에 쓰이는지는 확인된 적이 없었습니다.",
        solution: [
          "enable_seqscan=off 상태로 EXPLAIN을 돌리며 인덱스 조건과 실제 쿼리 조건을 하나씩 대조했습니다.",
          "부분 인덱스 조건(confirmed_poi)이 쿼리 조건(confirmed_at)과 달라 한 번도 쓰이지 않던 인덱스를 고쳤습니다.",
          "중복 인덱스 4개를 지우고 리뷰 조회에 빠진 인덱스를 추가했습니다. 마이그레이션은 여러 번 실행해도 안전하게 작성했습니다.",
        ],
        result: "쓰이지 않던 인덱스 1개 수정, 중복 4개 제거, 누락 1개 추가.",
        refs: "PR #51",
      },
      {
        title: "가끔 깨지던 CI에서 찾은 타임존 버그",
        tag: "Debugging",
        problem: "점주 통계 테스트가 자정 무렵에만 간헐적으로 실패했습니다.",
        solution: [
          "'오늘'은 UTC, 일별 집계는 DB 세션 타임존 기준이라 매일 9시간 동안 통계가 틀리고 있었습니다.",
          "timezone('Asia/Seoul')을 명시해 기준을 KST로 맞췄습니다.",
          "타임존을 바인드 파라미터로 넘기면 SELECT와 GROUP BY가 다른 식으로 인식돼 literal_column으로 해결했습니다.",
        ],
        result: "간헐적 실패가 사라졌고, 운영 통계 버그도 함께 고쳤습니다.",
        refs: "PR #52",
      },
      {
        title: "배포 관문과 모니터링의 거짓 경보 줄이기",
        tag: "Infra",
        problem:
          "GitHub API에 CI 결과가 늦게 반영돼 정상 배포가 막혔고, 배포 중 컨테이너를 교체하는 몇 초 동안 서버 다운 알림이 잘못 왔습니다.",
        solution: [
          "배포 관문은 실행 기록이 하나도 보이지 않을 때만 20초 간격으로 최대 3번 다시 확인합니다. 실패 기록이 있거나 실행 중이면 바로 판정합니다.",
          "모니터링은 실패하면 60초 뒤 한 번 더 확인하고, 두 번 모두 실패해야 알립니다.",
          "가짜 gh와 가짜 서버로 통과와 차단 두 경우를 모두 재현해 확인했습니다.",
        ],
        result: "실제 장애는 6분 안에 알림이 가고, 배포 관문이 늦어지는 경우도 최대 60초입니다.",
        refs: "PR #106 · #119",
      },
      {
        title: "음성 리뷰 비동기 처리와 완료 알림",
        tag: "Architecture",
        problem: "음성 리뷰 AI 처리는 수십 초가 걸려 요청을 붙잡고 기다리게 할 수 없었습니다.",
        solution: [
          "업로드 요청에는 202로 바로 응답하고 처리는 백그라운드 작업으로 넘겼습니다.",
          "완료 알림은 기존 WebSocket(Redis Pub/Sub)에 이벤트 타입만 추가해 재사용했습니다.",
          "화면을 벗어나도 결과를 받을 수 있도록 FCM 푸시를 추가했습니다.",
        ],
        result: "업로드 후 바로 다른 화면으로 이동할 수 있고, 처리가 끝나면 앱 어디서든 알림을 받습니다.",
        refs: "PR #32 · #35 · #80",
      },
    ],
    alsoDid: [
      "초성 검색(ㅅㅌㅂㅅ → 스타벅스), 앞글자 일치 자동완성 (PR #110 · #111)",
      "검색어 이해: 상권명, 역 이름, 한영 자판 변환, 업종 동의어. 평가 1위 105 → 107건, 나빠진 검색 0건 (PR #107)",
      "거리 200m 단위 안에서만 인기도를 반영하는 검색 정렬 (PR #112)",
      "운영 콘솔 도메인 배포와 인증서 누락 버그 수정 (PR #86)",
      "사용자 목록 조회에서 비밀번호 해시 컬럼 제외, 신고 목록 N+1 제거 (PR #101)",
      "다중 워커 환경의 동선 협업 중복 처리 방지(SET NX, 전체 재구독 + 지수 백오프) (PR #3)",
      "같은 초에 발급된 refresh 토큰이 같아져 재사용 탐지가 뚫리던 버그를 jti로 수정 (PR #30)",
      "비어 있던 스텁 라우터 7개 구현 (PR #1)",
      "친구 피드 N+1 제거: 친구 수와 상관없이 쿼리 3개 (PR #39)",
      "엔드포인트 196개 전수 조사, 테스트 없던 22개에 테스트 47개 추가 (PR #50)",
      "카카오 API 약관 검토 후 직접 만든 응답 캐시 제거, 잔존 데이터 정리 스크립트 작성 (PR #49 · #55)",
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
