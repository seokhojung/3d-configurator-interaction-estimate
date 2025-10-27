# Test Strategy and Standards

  * **Unit Tests:** Template API의 **데이터 유효성 검증** 및 **Shared Schema 유틸리티** 검증.
  * **Integration Tests:** **Supabase DB/Storage** 연동의 안정성 검증.
  * **End-to-End (E2E) Tests (CRITICAL):** **CR1 (PDF 호환성)** 및 **FR3 (PDF 다운로드)** 기능의 최종 사용자 경험 검증을 위해 **Playwright 또는 Cypress**를 사용하여 자동화하여 검증.
