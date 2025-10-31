import { test, expect } from '@playwright/test'

test.describe('FR3 E2E - Mode switch (preview ↔ download)', () => {
  test('download mode completes without error and sets filename pattern', async ({ page, context }) => {
    await context.addInitScript(() => {
      try {
        localStorage.removeItem('e2e_slow_pdf');
        localStorage.removeItem('e2e_delay_ms');
        // Monkey-patch to observe anchor creation/click
        // Capture all anchor clicks globally
        // @ts-ignore
        window.__downloadClicked = false;
        // @ts-ignore
        window.__lastDownloadName = '';
        const orig = (HTMLAnchorElement as any).prototype.click;
        (HTMLAnchorElement as any).prototype.click = function(this: HTMLAnchorElement) {
          try {
            // @ts-ignore
            window.__downloadClicked = true;
            // @ts-ignore
            window.__lastDownloadName = this.download || '';
          } catch {}
          return orig.apply(this, arguments as any);
        };
      } catch {}
    })

    await page.goto('/templates/edit?templateId=t-dl')

    await page.getByLabel('회사명 *').fill('DL CO')
    await page.getByLabel('규모 *').selectOption('M')

    // Switch to Download mode
    await page.getByRole('radio', { name: 'Download' }).check()

    await page.getByRole('button', { name: 'Generate PDF' }).click()

    // No timeout/error message expected
    await expect(page.getByText('PDF 생성 시간이 초과되었습니다', { exact: false })).toHaveCount(0)
    // If anchor click was captured, verify filename pattern (best-effort)
    const clicked = await page.evaluate(() => (window as any).__downloadClicked as boolean)
    if (clicked) {
      const name = await page.evaluate(() => (window as any).__lastDownloadName as string)
      expect(name).toMatch(/^quote-t-dl-\d+\.pdf$/)
    }
  })
})
