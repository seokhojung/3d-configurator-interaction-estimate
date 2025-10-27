# Components

### 1\. Component List

| 컴포넌트 이름 | 책임 (Responsibility) | 기술 스택 | 주요 인터페이스 / API |
| :--- | :--- | :--- | :--- |
| **App: Web/Client** | **템플릿 작성 UI** 및 **대시보드** 렌더링, 사용자 입력 관리, **템플릿 서비스** 호출. | Next.js, React, TypeScript | Template Service API 호출 |
| **Service: Template API** | **템플릿 메타데이터/파일의 CRUD 로직**, **Supabase DB/Storage**와의 통신, **인증/인가(NFR2)** 로직 적용 및 **데이터 유효성 검증** 책임. | Vercel Function (Node.js/TS) | Template CRUD API (REST/tRPC 등) |
| **Service: PDF Generator** | **(단일 책임)** **유효성이 검증된 데이터**를 받아 **인터랙션 가능한 PDF 문서** 생성 (FR3, FR4) 및 **NFR1 (5초 이내 성능)** 달성 책임. | Vercel Function (Node.js/TS) | `/api/pdf/generate` 엔드포인트 |
| **Shared: Template Schema** | **템플릿 스키마 인터페이스 및 유틸리티 함수** (타입 정의, **데이터 유효성 검증 로직** 등) 공유 및 제공. | TypeScript (Monorepo 공유 패키지) | - (내부적으로 타입 및 로직 제공) |
