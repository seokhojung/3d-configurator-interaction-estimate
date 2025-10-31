import { test, expect } from '@playwright/test'

test.describe('FR3 E2E - Timeout (504/PDF_TIMEOUT)', () => {
  test('shows timeout error message on slow generation', async ({ page, context }) => {
    // Enable artificial slow path (>5s) via localStorage hook
    await context.addInitScript(() => {
      try { localStorage.setItem('e2e_slow_pdf', 'true') } catch {}
    })

    await page.goto('/templates/edit?templateId=t-slow')

    await page.getByLabel('회사명 *').fill('SLOW CO')
    await page.getByLabel('규모 *').selectOption('L')

    await page.getByRole('button', { name: 'Generate PDF' }).click()

    // Expect Korean timeout message (avoid matching Next route announcer)
    const alert = page.locator('div[role="alert"]')
      .filter({ hasText: 'PDF 생성 시간이 초과되었습니다' })
    await expect(alert).toBeVisible({ timeout: 8000 })
  })
})
