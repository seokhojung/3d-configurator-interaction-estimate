import { handlePostPdfGenerate } from '../../api/pdf-generate';

export interface GeneratePdfOptions {
  timeoutMs?: number;
  transport?: (req: any) => Promise<{ status: number; headers?: Record<string, string>; body: any }>;
}

export interface GeneratePdfResult {
  pdfBase64: string;
  dataUrl: string;
}

export function buildPdfPayload(templateId: string, values: Record<string, any>) {
  return {
    template_id: templateId,
    data: values ?? {},
  };
}

export async function generatePdf(
  templateId: string,
  values: Record<string, any>,
  opts: GeneratePdfOptions = {}
): Promise<GeneratePdfResult> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const transport = opts.transport ?? (async (req: any) => handlePostPdfGenerate(req as any));

  const req = {
    headers: { Authorization: 'Bearer user-test' },
    body: buildPdfPayload(templateId, values),
  };

  return new Promise<GeneratePdfResult>((resolve, reject) => {
    const timer = setTimeout(() => {
      const err: any = new Error('PDF generation timed out');
      err.code = 'PDF_TIMEOUT';
      reject(err);
    }, timeoutMs);

    transport(req)
      .then((resp) => {
        clearTimeout(timer);
        if (resp.status !== 200) {
          const err: any = new Error(resp.body?.message || 'PDF generation failed');
          err.code = resp.body?.code || 'PDF_ERROR';
          err.details = resp.body?.details;
          throw err;
        }
        const pdfBase64: string = resp.body?.pdf_base64;
        const dataUrl = `data:application/pdf;base64,${pdfBase64}`;
        resolve({ pdfBase64, dataUrl });
      })
      .catch((err) => {
        clearTimeout(timer);
        if (err && !err.code) {
          err.code = err?.message ? 'PDF_ERROR' : 'UNKNOWN_ERROR';
        }
        reject(err);
      });
  });
}
