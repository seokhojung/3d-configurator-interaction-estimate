# Coding Standards (Bridge)

목적
- Dev 에이전트 자동 로드 경로(`docs/architecture/coding-standards.md`)를 만족하고, 실제 상세 기준은 PRD/스토리 구현을 참조합니다.

범위
- 코딩 규약 최소 합의와 관련 문서 링크를 제공합니다.

## 코딩 규약 요약
- 언어/모듈: TypeScript, ESM(`module: ESNext`), 엄격 모드 활성화(`strict: true`).
- 오류 계약: `{ code, message, details? }` 일관 유지(1.1~1.4 스토리).
- 인증 표준: `Authorization: Bearer user-<uuid>` 파싱, 우선순위 `401 > 404/403 > 422`.
- 테스트 명명: Unit `*.spec.ts`, Integration `*.int.spec.ts`.
- 디렉터리: `src/api`, `src/lib/**`, `tests/**`, `e2e/`.

참조(PRD)
- acceptance-criteria: ../prd/acceptance-criteria.md
- test-strategy-and-standards: ../prd/test-strategy-and-standards.md
- rls-and-permissions: ../prd/rls-and-permissions.md

TODO
- 린터/포매터 도입 정책(Jest/Vitest 전용 규칙 포함) 명시
- 보안/비밀정보 처리 가이드라인(Secrets 관리) 추가

## 문서 표준
- 상세 규칙: `docs/architecture/docs-standards.md`
