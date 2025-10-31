/* @vitest-environment happy-dom */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import EditPageClient from '../../../src/app/templates/_components/EditPageClient';
import * as pdfRequest from '../../../src/lib/pdf/request';

// Stub PdfPreview to avoid real <iframe> in happy-dom, preventing lingering handles
import { vi } from 'vitest';
vi.mock('../../../src/app/templates/_components/PdfPreview', () => ({
  default: ({ src }: any) => <div title="PDF Preview" data-src={src} />,
}));

describe('integration: templates/edit PDF generate', () => {
  it('generates and previews PDF', async () => {
    const transport = async () => ({ status: 200, body: { pdf_base64: 'JVBERi0xLjEK' } }) as any;
    render(<EditPageClient templateId="demo" pdfOptions={{ transport }} />);
    const genBtn = screen.getByRole('button', { name: 'Generate PDF' });
    fireEvent.click(genBtn);
    await waitFor(() => {
      expect(screen.getByTitle('PDF Preview')).toBeInTheDocument();
    });
    const el = screen.getByTitle('PDF Preview') as HTMLElement;
    const src = (el as HTMLIFrameElement).getAttribute?.('src') || el.getAttribute('data-src') || '';
    // Allow blob URL (preferred) or data URL (fallback)
    expect(src.startsWith('blob:') || src.includes('data:application/pdf;base64,')).toBe(true);
  });

  it('shows timeout error message on PDF_TIMEOUT', async () => {
    const spy = vi.spyOn(pdfRequest, 'generatePdf').mockRejectedValue(
      Object.assign(new Error('PDF generation timed out'), { code: 'PDF_TIMEOUT' })
    );
    render(<EditPageClient templateId="demo" />);
    const genBtn = screen.getByRole('button', { name: 'Generate PDF' });
    fireEvent.click(genBtn);
    await waitFor(() => {
      const alert = screen.getByRole('alert');
      expect(alert).toHaveTextContent('PDF 생성 시간이 초과되었습니다');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });
    spy.mockRestore();
  });

  it('shows loading state with aria-busy', async () => {
    const spy = vi.spyOn(pdfRequest, 'generatePdf').mockImplementation(
      async () => new Promise((r) => setTimeout(() => r({ pdfBase64: 'abc', dataUrl: 'data:abc' }), 100))
    );
    vi.useFakeTimers();
    render(<EditPageClient templateId="demo" />);
    const genBtn = screen.getByRole('button', { name: 'Generate PDF' });
    fireEvent.click(genBtn);
    expect(genBtn).toHaveAttribute('aria-busy', 'true');
    expect(genBtn).toBeDisabled();
    // Fast-forward the artificial timer to resolve the promise
    vi.advanceTimersByTime(120);
    await waitFor(() => expect(genBtn).not.toBeDisabled());
    vi.useRealTimers();
    spy.mockRestore();
  });

  it('switches between preview and download modes', async () => {
    render(<EditPageClient templateId="demo" />);
    const previewRadio = screen.getByLabelText(/Preview/i) as HTMLInputElement;
    const downloadRadio = screen.getByLabelText(/Download/i) as HTMLInputElement;
    expect(previewRadio.checked).toBe(true);
    fireEvent.click(downloadRadio);
    expect(downloadRadio.checked).toBe(true);
    expect(previewRadio.checked).toBe(false);
  });
});
