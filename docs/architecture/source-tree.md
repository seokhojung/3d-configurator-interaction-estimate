# Source Tree (Bridge)

목적
- Dev 에이전트 자동 로드 경로(`docs/architecture/source-tree.md`)를 만족하고, 현재 코드/문서 트리의 개요를 제공합니다.

개요
- src/
  - api/
    - templates.ts
  - lib/
    - templates/
      - service.ts
      - validation.ts
      - types.ts
- tests/
  - unit/
    - templates.spec.ts
    - templates-update-delete.spec.ts
  - integration/
    - templates.int.spec.ts
    - templates-update-delete.int.spec.ts
- e2e/
  - smoke.spec.ts
- docs/
  - prd/ (요구사항/전략/아키텍처 기준)
  - qa/  (게이트/가이드)
  - architecture/ (본 브릿지 문서들)

참조
- high-level-architecture: ../prd/high-level-architecture.md
- components: ../prd/components.md
- data-models: ../prd/data-models.md

TODO
- 모듈 경로 별 책임/의존성 다이어그램 추가
- 데이터 흐름(요청→서비스→검증→응답) 시퀀스 보강

