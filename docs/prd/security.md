# Security

  * **S2 (RLS):** **Supabase DB/Storage**에 **RLS를 적용**하여, **인증된 내부 담당자만** 템플릿에 대한 CRUD 접근 권한을 갖도록 해야 합니다.
  * **S3 (Service Key Isolation):** Supabase Service Role Key는 **Serverless Functions** 내에서만 **Vercel Secrets**을 통해 안전하게 사용되어야 합니다.
