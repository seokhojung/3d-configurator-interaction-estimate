# Test Run Guide (Local)

## Prerequisites
- Node.js >= 18 (<= 22 권장)
- 네트워크 허용 환경에서 의존성 설치 가능해야 함

## Install
```
npm install
# (Playwright 브라우저 설치가 필요한 경우)
npx playwright install
```

## Run
```
# All tests (unit+integration)
npm run test

# Unit only
npm run test:unit

# Integration only
npm run test:integration

# Watch mode (unit+integration)
npm run test:watch

# E2E
npm run e2e
```

### E2E - System Dependencies
Playwright 브라우저 실행에는 OS 라이브러리 설치가 필요할 수 있습니다. 실패 시 메시지에 안내되는 명령을 참고하세요.

```
# Linux 예시
npx playwright install-deps

# 또는 배포판 패키지 매니저로 수동 설치(메시지 참조)
```

설치 후 다시 실행:

```
npm run e2e
```

## Conventions
- Unit: `tests/unit/**/*.spec.ts`
- Integration: `tests/integration/**/*.int.spec.ts`
- E2E: `e2e/**/*.spec.ts`

## Notes
- 현재 리포는 러너 미설치 상태에서 스켈레톤만 포함합니다.
- 의존성 설치 후 최초 실행 시, E2E의 경우 브라우저 설치가 필요할 수 있습니다.
 - CI 환경에서는 Playwright 공식 Docker 이미지 사용을 고려하세요(`mcr.microsoft.com/playwright`).
