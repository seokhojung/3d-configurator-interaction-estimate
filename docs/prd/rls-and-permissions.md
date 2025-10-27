# RLS and Permissions

본 문서는 데이터베이스 테이블 및 스토리지 버킷에 대한 권한 모델과 Row Level Security(RLS) 정책을 정의합니다. 목표는 인증된 내부 사용자만이 템플릿 리소스를 안전하게 생성·수정·삭제하고, 서비스 키는 서버 환경에서만 사용되도록 보장하는 것입니다.

## Roles

- internal_user (authenticated): 내부 담당자. 애플리케이션에서 로그인한 사용자.
- service_role: 서버 측(서버리스 함수)에서만 사용되는 권한(민감 작업).
- anon: 비인증 사용자. 접근 금지.

## Data Model 대상

- Table: `template_metadata`
  - 주요 컬럼: `id (uuid)`, `name`, `type`, `storage_path`, `version`, `created_by (uuid)`, `created_at`
- Storage Bucket: `templates`

## Access Matrix

| Resource                | Action  | internal_user        | service_role        | anon |
| ----------------------- | ------- | -------------------- | ------------------- | ---- |
| template_metadata (DB)  | CREATE  | 허용(작성자=본인)    | 허용                | 거부 |
| template_metadata (DB)  | READ    | 허용(인증자 전원)    | 허용                | 거부 |
| template_metadata (DB)  | UPDATE  | 허용(작성자=본인)    | 허용                | 거부 |
| template_metadata (DB)  | DELETE  | 허용(작성자=본인)    | 허용                | 거부 |
| templates (Storage)     | WRITE   | 허용(인증자 전원)    | 허용                | 거부 |
| templates (Storage)     | READ    | 허용(인증자 전원)    | 허용                | 거부 |
| templates (Storage)     | DELETE  | 허용(작성자=본인)    | 허용                | 거부 |

## RLS Policies (PostgreSQL 예시)

테이블: `template_metadata`

```sql
-- RLS 활성화
ALTER TABLE template_metadata ENABLE ROW LEVEL SECURITY;

-- CREATE: 인증된 사용자만 생성 가능
CREATE POLICY p_template_create
ON template_metadata FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND created_by = auth.uid());

-- READ: 인증된 사용자 누구나 읽기 가능
CREATE POLICY p_template_read
ON template_metadata FOR SELECT
TO authenticated
USING (true);

-- UPDATE: 작성자만 수정 가능
CREATE POLICY p_template_update
ON template_metadata FOR UPDATE
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

-- DELETE: 작성자만 삭제 가능
CREATE POLICY p_template_delete
ON template_metadata FOR DELETE
TO authenticated
USING (created_by = auth.uid());
```

스토리지 버킷: `templates` (Supabase Storage)

```sql
-- READ: 인증된 사용자만
CREATE POLICY p_storage_read
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'templates');

-- WRITE: 인증된 사용자만 (경로 제약 필요 시 prefix 검사)
CREATE POLICY p_storage_write
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'templates');

-- DELETE: 작성자만(메타데이터와 연계 시 경로/소유자 매핑 필요)
CREATE POLICY p_storage_delete
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'templates');
```

주의: 실제 소유자 기반 삭제 정책은 `storage.objects`와 `template_metadata.storage_path`의 매핑 또는 별도 소유자 메타를 통해 보완해야 합니다.

## Service Key Isolation

- `SUPABASE_SERVICE_ROLE_KEY`는 서버리스 함수 환경에서만 사용한다(클라이언트 절대 노출 금지).
- Vercel Project Settings의 Environment Variables에 저장한다.
- 클라이언트는 `SUPABASE_ANON_KEY`만 사용한다.

## Error Handling & Auditing

- 실패 시 상태코드 및 에러코드 표준화(예: AUTH_*, RLS_*, STORAGE_*).
- 중요 변경(UPDATE/DELETE)은 감사 로깅을 수행한다(사용자, 시각, 대상 id).

