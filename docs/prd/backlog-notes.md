# Backlog Notes

작성일: 2025-10-28
작성자: PO/SM 합동 메모

목적
- 기존 PRD의 FR 범위 내에서 세분화가 필요한 후속 스토리를 기록하고, Epic/Story 트레이스와 범위/리스크/초안 AC를 명시한다.

## 1.6 — Supabase Storage SDK 실연동 + 권한/RLS 기초
- 관련 FR/문서
  - FR2: `docs/prd/acceptance-criteria.md#fr2-템플릿-저장-supabase-storage`
  - 권한/RLS: `docs/prd/rls-and-permissions.md`
- 목표
  - 인메모리 스토리지 래퍼를 Supabase 공식 SDK로 대체하고, 서버사이드 업로드(서비스 키) 및 버킷 권한 원칙을 적용한다.
  - `POST /api/templates`·`PUT /api/templates/{id}`에서 `storage_path` 존재성 검증을 SDK 기반으로 일원화한다.
- 범위(Out of scope)
  - DB 테이블 마이그레이션/정식 RLS SQL 적용(별도 스토리로 추진)
- 초안 Acceptance Criteria(제안)
  1) 업로드 API는 SDK로 동작하며 201/401/422/503 계약을 유지한다.
  2) `storage_path` 존재성 검증은 SDK 메타/HEAD 수준에서 수행되고 실패 시 400(`STORAGE_PATH_INVALID`), 장애 시 503 매핑.
  3) 버킷 `templates`는 private, 서버사이드(Service Role)만 쓰기 허용. 키는 ENV로 주입, 응답/로그에 노출 금지.
  4) 재시도 가이드(지수 백오프) 문서화.
  5) 테스트: 유닛(어댑터/매핑), 통합(Mock 기반) 그린.
- 의존성/리스크
  - 환경변수 관리, 로컬/CI 환경 차이, SDK 예외 케이스 표준화 필요.
- 다음 단계
  - SM: `docs/stories/1.6.story.md` Draft 생성(본 메모 참조).

## 1.7 — YAML 정식 파서 + TemplateSchema 검증
- 관련 FR/문서
  - FR6: `docs/prd/acceptance-criteria.md#fr6-스키마-표준-동적-스키마`
  - 데이터 모델: `docs/prd/data-models.md`
- 목표
  - YAML 휴리스틱 검증을 정식 파서로 대체하고, 공통 스키마(TemplateSchema)로 JSON/YAML 동등 검증을 제공한다.
- 범위(Out of scope)
  - DB 스키마/마이그레이션은 본 스토리 범위 외(별도 스토리).
- 초안 Acceptance Criteria(제안)
  1) YAML 파서 도입으로 파싱 실패 시 422 상세 사유(`details`) 제공.
  2) TemplateSchema(섹션/필드/pdf_field_name 등) 위반 시 422 + 누락/타입 불일치 구체화.
  3) JSON/YAML 모두 동일 스키마 로직 경유.
  4) 5MB 제한, MIME/확장자 일치 정책 유지.
  5) 테스트: 성공/필수 누락/타입 오류/대용량/잘못된 YAML 전수 케이스.
- 의존성/리스크
  - 파서/검증 라이브러리 선택(네트워크/라이선스 제약), 퍼포먼스/메모리 고려.
- 다음 단계
  - SM: `docs/stories/1.7.story.md` Draft 생성(본 메모 참조).

비고
- 두 스토리는 PRD의 기존 기능 요구(FR2, FR6) 범위 내 세분 구현 항목으로, PRD 본문 구조 변경 없이 에픽 내 후속 스토리로 관리한다. PRD 변경이 발생하는 경우 PO가 별도 Change Log에 반영한다.

