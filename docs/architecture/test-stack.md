# Test Stack Selection

Status: Draft

## Summary
- Unit/Integration: Vitest (TypeScript 친화, 빠른 실행)
- E2E: Playwright (멀티 브라우저, 다운로드/파일 처리 강점)
- Node Engines: >=18 <=22

## Rationale
- Vitest: 경량, Vite 생태계와의 호환, TS/ESM 친화. 스냅샷/Mock 유틸 제공.
- Playwright: Chromium/WebKit/Firefox 지원, 트레이스/비디오/다운로드 시나리오 용이.

## Directory & Conventions
- Unit tests: `tests/unit/**/*.spec.ts`
- Integration tests: `tests/integration/**/*.int.spec.ts`
- E2E tests: `e2e/**/*.spec.ts`

## Execution
- All: `npm run test`
- Unit only: `npm run test:unit`
- Integration only: `npm run test:integration`
- Watch: `npm run test:watch`
- E2E: `npm run e2e`

## E2E Configuration
- Runner: `@playwright/test`
- Config: `playwright.config.ts`
  - project: chromium (`devices['Desktop Chrome']`)
  - trace: `on-first-retry`
  - reporter: `list` (필요 시 `html` 추가)
- Install:
  - `npx playwright install` (브라우저 다운로드)
  - 필요 시 `npx playwright install-deps` (OS 라이브러리)

## Notes
- 러너 설치가 필요하며(네트워크 제한 없는 환경), 브라우저 바이너리 설치는 Playwright 지시에 따름.
- CI 통합은 별도 스토리에서 진행.
