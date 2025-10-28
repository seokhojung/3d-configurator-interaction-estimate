import { test, expect } from '@playwright/test';

// 최소 스모크: 빈 페이지 로드 확인 (placeholder)
test('smoke: open about:blank and assert title', async ({ page }) => {
  await page.goto('about:blank');
  await expect(page).toHaveTitle('');
});
