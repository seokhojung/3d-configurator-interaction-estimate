# CI/CD and Environment

본 문서는 개발/배포 파이프라인과 환경 구성, 런타임/도구 버전 요구사항을 정의합니다. 목적은 신뢰 가능한 미리보기(Preview)와 엄격한 본배포(Production) 게이팅을 제공하는 것입니다.

## Version Matrix

- Node.js: >= 20.10.0 (LTS 권장)
- Package Manager: pnpm 9.x 또는 npm 10.x
- TypeScript: ^5.x
- Next.js: ^14.x
- Playwright: ^1.48.x (E2E)

## Environments

- Local: 개발자 로컬 실행. `.env.local` 사용.
- Preview: Pull Request마다 Vercel Preview 배포.
- Production: `main` 병합 시 Vercel Production 배포.

## Environment Variables (예시)

- Public (Client)
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Server-only
  - `SUPABASE_SERVICE_ROLE_KEY` (절대 클라이언트 노출 금지)
  - `PDF_RENDER_TIMEOUT_MS` (기본 5000)
  - `PDF_RENDER_MEMORY_MB` (예: 256)

Vercel에서 Preview/Production 환경변수를 별도로 관리하고, Secret은 Project Settings에 저장한다.

## Pipeline

1) Pull Request (Preview)
- Install → Lint/Build → Unit/Integration → (선택) E2E Smoke
- 성공 시 자동 Preview 배포(URL 코멘트).

2) Main (Production)
- Install → Lint/Build → Unit/Integration → E2E (전체) → Deploy Production
- 모든 테스트 통과 시에만 본배포 진행.

## Gates & Quality Bar

- Lint/TypeCheck 실패 시 배포 중단.
- Integration: Supabase emulator 또는 테스트 스텁을 사용.
- E2E: 핵심 시나리오 최소 3개 이상(템플릿 선택/작성/다운로드) 필수.

## Branch Strategy (권장)

- `main`: 보호 브랜치. CI 필수, 리뷰 1+ 필수.
- `feat/*`: 기능 단위 브랜치 → PR.

## Error Contracts

- 표준화된 에러 바디: `{ code: string, message: string, details?: any }`.
- PDF 타임아웃: 504 + `PDF_TIMEOUT`.
- 스토리지 장애: 503 + `STORAGE_UNAVAILABLE`.

## Observability

- 서버 함수 로깅(요청 ID, 지연시간, 실패율) 수집.
- E2E 결과 아티팩트(스크린샷/비디오) 보존.

