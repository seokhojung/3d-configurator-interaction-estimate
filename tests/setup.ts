import '@testing-library/jest-dom/vitest'
import { beforeEach, afterEach, vi } from 'vitest'

beforeEach(() => {
  // 필요한 전역 초기화가 있다면 여기서 최소화하여 수행
})

afterEach(() => {
  // 타이머/모킹 정리로 테스트 간 간섭 제거
  vi.useRealTimers()
  vi.restoreAllMocks()
})
