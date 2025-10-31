/* @vitest-environment happy-dom */
import { describe, it, expect } from 'vitest';
import { buildPdfPayload, generatePdf } from '../../../src/lib/pdf/request';

describe('pdf/request', () => {
  it('builds payload with template_id and data', () => {
    const p = buildPdfPayload('t1', { a: 1 });
    expect(p).toEqual({ template_id: 't1', data: { a: 1 } });
  });

  it('maps timeout into PDF_TIMEOUT error code', async () => {
    const transport = async () => {
      await new Promise((r) => setTimeout(r, 50));
      return { status: 200, body: { pdf_base64: 'JVBERi0xLjEK' } } as any;
    };
    let code = '';
    try {
      await generatePdf('t1', {}, { transport, timeoutMs: 10 });
    } catch (e: any) {
      code = e?.code;
    }
    expect(code).toBe('PDF_TIMEOUT');
  });

  it('throws on non-200 responses with mapped code', async () => {
    const transport = async () => ({ status: 422, body: { code: 'VALIDATION_ERROR', message: 'bad' } }) as any;
    await expect(generatePdf('t1', {}, { transport })).rejects.toMatchObject({ code: 'VALIDATION_ERROR' });
  });
});
