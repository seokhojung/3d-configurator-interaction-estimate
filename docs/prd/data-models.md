# Data Models

### 1\. Template Metadata Model

| Key Attribute (키 속성) | Type (타입) | Description (설명) |
| :--- | :--- | :--- |
| `id` | UUID | 템플릿의 고유 식별자 (Primary Key) |
| `name` | String | 템플릿 이름 (예: 기본 양식 V1) |
| `type` | Enum | 템플릿 유형 (기본, 고급) |
| **`client_id`** | **String / UUID (Nullable)** | **(Phase 2 확장용)** 템플릿이 특정 클라이언트용으로 커스터마이징된 경우의 식별자. **MVP에서는 Null.** |
| `storage_path` | String | 템플릿 파일이 저장된 **Supabase Storage의 경로** |
| `version` | Integer | 템플릿의 현재 버전 (수정 시 증가) |
| `created_by` | UUID | 템플릿을 생성한 내부 담당자 ID (NFR2 인증 연동) |
| `created_at` | Timestamp | 생성 일시 |

### 2\. Template File Schema

```typescript
interface TemplateSchema {
  template_id: string;
  sections: Array<{
    section_id: string;
    title: string;
    fields: Array<{
      field_id: string;
      label_ko: string; 
      type: 'text' | 'checkbox' | 'dropdown';
      is_required: boolean;
      pdf_field_name: string; // PDF 필드 호환성 (CR1)을 위한 필수 매핑 값
    }>;
  }>;
}
```
