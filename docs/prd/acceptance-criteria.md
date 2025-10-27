# Acceptance Criteria (FR1–FR6)

본 문서는 PRD의 기능 요구사항(FR1–FR6)에 대한 수용 기준(AC)을 Gherkin 스타일로 정의합니다. 각 AC는 테스트 전략(Unit/Integration/E2E)과 매핑되어 개발 및 검증의 기준으로 사용됩니다.

## Test Mapping

- FR1, FR2, FR6: Unit + Integration
- FR3, FR4, FR5: Integration + E2E (필수)

## FR1 템플릿 생성/수정 (Template CRUD)

Scenario: 템플릿 생성 성공
Given 인증된 내부 사용자로 로그인했다
When 템플릿 이름, 유형(기본/고급), 파일 경로, 버전, 작성 데이터를 제출한다
Then 템플릿 메타데이터가 DB에 저장된다
And `created_by`는 현재 사용자로 기록된다
And 응답은 201과 함께 신규 `id`를 반환한다

Scenario: 템플릿 수정 권한 제한
Given 다른 사용자가 생성한 템플릿 메타데이터가 있다
When 내가 해당 템플릿을 수정하려고 시도한다
Then RLS로 인해 403이 반환된다

Scenario: 템플릿 삭제 성공(작성자)
Given 내가 생성한 템플릿 메타데이터가 있다
When 삭제를 요청한다
Then 204와 함께 삭제된다

## FR2 템플릿 저장 (Supabase Storage)

Scenario: 템플릿 파일 저장 및 재활용 가능
Given 유효한 템플릿 파일(JSON/YAML)을 업로드한다
When Supabase Storage에 저장한다
Then 고유 `storage_path`가 발급된다
And 이후 동일 경로로 파일을 조회할 수 있다(200)

Scenario: 스토리지 장애 시 오류 처리
Given 스토리지 서비스가 일시적으로 불안정하다
When 업로드를 시도한다
Then 503과 재시도 가이드가 반환된다(지수 백오프 권고)

## FR3 PDF 다운로드 (Interactive PDF)

Scenario: 5초 이내 PDF 생성 성공
Given 선택된 템플릿과 작성 데이터를 제출했다
When PDF 생성 API를 호출한다
Then 5초 이내로 200이 반환된다
And Content-Type은 `application/pdf`이다
And 파일명 규칙은 `quote-{template_id}-{timestamp}.pdf`를 따른다

Scenario: 시간 초과 처리
Given 복잡한 고급 양식으로 PDF 생성을 요청했다
When 5초를 초과한다
Then 504와 함께 "PDF_TIMEOUT" 코드가 반환된다
And 사용자는 다시 시도 안내를 확인할 수 있다

## FR4 설문 항목 표시 (스키마 기반 렌더링)

Scenario: 스키마와 PDF 필드 매핑 일치
Given 스키마의 각 필드에 `pdf_field_name`이 정의되어 있다
When PDF를 생성한다
Then 모든 필드가 해당 `pdf_field_name`으로 정확히 매핑된다
And 누락/중복 매핑이 없어야 한다

Scenario: 필수 항목 유효성 실패
Given `is_required=true`인 필드가 비어 있다
When PDF 생성 요청을 보낸다
Then 422와 함께 누락 필드 목록이 반환된다

## FR5 템플릿 선택 페이지 (최소 UI)

Scenario: 템플릿 목록 조회 및 선택
Given 인증된 내부 사용자로 로그인했다
When 템플릿 목록을 조회한다
Then 기본/고급 템플릿이 유형별로 표시된다
When 하나를 선택하고 작성 화면으로 이동한다
Then 입력 필드가 정상적으로 렌더링된다(콘솔 오류 없음)

Scenario: PDF 미리보기/다운로드
Given 작성 화면에서 데이터를 입력했다
When 미리보기(또는 다운로드)를 요청한다
Then PDF 미리보기(또는 파일 다운로드)가 성공한다(200)

## FR6 스키마 표준 (동적 스키마)

Scenario: 스키마 유효성 통과
Given 템플릿 스키마가 타입 요건을 충족한다
When 서버에서 스키마를 검증한다
Then 200과 함께 유효로 판단된다

Scenario: 미지원 필드 타입 처리
Given 스키마에 알 수 없는 `type` 값이 포함되어 있다
When 스키마를 로드한다
Then 해당 필드는 무시되고 경고 로그가 남는다
And 전체 로드는 실패하지 않는다

