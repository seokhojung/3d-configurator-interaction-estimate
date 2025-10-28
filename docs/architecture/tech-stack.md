# Tech Stack (Bridge)

목적
- Dev 에이전트 자동 로드 경로(`docs/architecture/tech-stack.md`)를 만족하면서, 실제 기준은 PRD 문서에 위임합니다.

범위
- 현재 레포의 런타임/언어/테스트 스택 개요와 참조 링크를 제공합니다.

현재 스택
- Node: >=18 <=22 (package.json engines)
- TypeScript: ^5
- Unit/Integration: Vitest ^1
- E2E: Playwright ^1 (브라우저 설치/실행은 후속 스토리)
- Repo Layout: `src/`, `tests/unit`, `tests/integration`, `e2e/`

운영 규칙
- 오류 계약: `{ code, message, details? }` 유지(스토리 1.1~1.4 기준)
- 테스트 글롭: Unit `tests/unit/**/*.spec.ts`, Integration `tests/integration/**/*.int.spec.ts`

참조(PRD)
- high-level-architecture: ../prd/high-level-architecture.md
- test-strategy-and-standards: ../prd/test-strategy-and-standards.md
- cicd-and-environment: ../prd/cicd-and-environment.md
- security: ../prd/security.md

TODO
- 런타임/라이브러리 버전 핀다운 전략(보안 업데이트 정책) 명시
- 브라우저/E2E 환경 변수 표준화

