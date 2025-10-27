# High Level Architecture
### Technical Summary
이 시스템은 **Next.js 기반의 Monorepo** 구조를 채택하여 프론트엔드와 최소한의 서버리스 기능을 통합한 **Serverless Functions 기반 모놀리스 아키텍처**로 설계됩니다. 클라우드 파일 스토리지로 **Supabase Storage**와 **Database**를 활용하며, **TypeScript**를 통해 **프론트엔드/백엔드 간의 데이터 일관성**을 확보합니다. 이 아키텍처는 **무료 티어 제약 (C1)** 하에서 **인터랙션 가능한 PDF 다운로드 (FR3)**라는 핵심 기능을 신속하고 효율적으로 구현하는 것을 목표로 합니다.

### Platform and Infrastructure Choice
| 항목 | 선택 | Rationale (근거) |
| :--- | :--- | :--- |
| **Platform** | **Vercel + Supabase (Free Tier)** | **C1 (무료 티어 제약)** 및 **C2 (서버 관리 최소화)** 준수. |
| **Key Services** | Vercel Functions, Supabase Storage (템플릿 파일), Supabase Database (템플릿 메타데이터), Supabase Auth (내부 담당자 인증) | |
| **Repository** | **Monorepo (Next.js with Workspaces)** | **공유 스키마 (FR6)** 관리 용이성 및 통합 개발 환경 제공. |

### Architectural Patterns
| 패턴 | 선택 및 설명 | Rationale (근거) |
| :--- | :--- | :--- |
| **Overall** | **Serverless Architecture** | 비용 효율적인 종량제 모델 채택. |
| **Data** | **Repository Pattern** | 데이터 접근 로직 추상화 및 테스트 용이성 확보. |
| **Frontend** | **Component-Based UI** | 템플릿 작성 페이지의 개발 및 유지보수 효율성 증대. |
| **Data Consistency** | **Shared TypeScript Interface** | Frontend와 Backend 간의 **데이터 계약 일관성** 확보를 통한 오류 방지. |

### High Level Project Diagram
```mermaid
graph TD
    A[Internal User/PM] -->|1. Access Web Tool (FR5)| B(Frontend: Next.js App)
    B -->|2. Template CRUD (FR1)| C(Vercel Function: Template API)
    C -->|3. Store/Retrieve Meta-data| D1(Supabase Database: Metadata)
    C -->|4. Store/Retrieve Template File| D2(Supabase Storage: File)
    B -->|5. Request PDF Generation (FR3)| E(Vercel Function: PDF Generator)
    E -->|6. Get Template Schema| D2
    E -->|7. Return PDF File| B
    B -->|8. PDF Download (CR1)| A
    
    subgraph Monorepo (Next.js Application)
        B
        C
        E
    end
    
    subgraph Supabase (Cloud Services)
        D1
        D2
    end
````
