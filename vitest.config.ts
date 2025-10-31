import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Windows 안정화: 워커 스레드 대신 포크 사용
    pool: 'forks',
    // 전역 주입 비활성화: 명시 임포트 사용으로 초기화 순서 이슈 회피
    globals: false,
    // 셋업 훅은 setupFiles에서만 사용
    setupFiles: ['tests/setup.ts'],
    // Windows + Node 22에서 jsdom(parse5 ESM) 혼합 이슈 회피를 위해 happy-dom 사용
    environment: 'happy-dom',
    // 진단 편의 및 타임아웃 설정
    testTimeout: 10000,
    hookTimeout: 10000,
    // 테스트 검색을 명시적으로 제한(Windows 글롭 이슈 회피)
    include: [
      'src/**/*.{test,spec}.{ts,tsx,js,jsx}',
      'tests/**/*.{test,spec}.{ts,tsx,js,jsx}',
    ],
    exclude: ['node_modules', 'dist', '.next', 'coverage', '**/__fixtures__/**'],
    // 초기에는 보수적으로 동시성 제한, 안정화 후 조정
    maxConcurrency: 1,
    reporters: ['default', 'verbose'],
  },
  esbuild: {
    target: 'node20',
    jsx: 'automatic',
  },
})
