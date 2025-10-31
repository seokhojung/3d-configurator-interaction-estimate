import { test, expect } from '@playwright/test'

test.describe('FR3 E2E - A11y/Loading', () => {
  test('button shows aria-busy and disabled during generation', async ({ page, context }) => {
    // Short artificial delay to observe loading state clearly
    await context.addInitScript(() => {
      try { localStorage.setItem('e2e_delay_ms', '600') } catch {}
    })

    await page.goto('/templates/edit?templateId=t-a11y')

    await page.getByLabel('회사명 *').fill('A11Y INC')
    await page.getByLabel('규모 *').selectOption('S')

    const btn = page.getByRole('button', { name: 'Generate PDF' })
    await expect(btn).toBeEnabled()
    await btn.click()

    await expect(btn).toHaveAttribute('aria-busy', 'true')
    await expect(btn).toBeDisabled()

    // After done, attributes reset
    await expect(btn).not.toHaveAttribute('aria-busy', 'true')
    await expect(btn).toBeEnabled()
  })
})

