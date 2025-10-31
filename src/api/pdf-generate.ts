import { RequestLike, ResponseLike } from './templates';
import { ERROR } from '../lib/templates/validation';
import { getTemplate } from '../lib/templates/service';
import { buildMapping, getTemplateSchema } from '../lib/pdf/mapping';

function unauthorized(message = 'Missing or invalid Authorization header'): ResponseLike {
  return { status: 401, body: { code: ERROR.UNAUTHORIZED, message } };
}

function parseAuthUid(headers: Record<string, string | undefined>): string | null {
  const auth = headers['authorization'] || headers['Authorization'];
  if (!auth) return null;
  const m = /^Bearer\s+user-(?<uid>[a-zA-Z0-9-]+)$/.exec(auth);
  return m?.groups?.uid ?? null;
}

function nowMs(): number {
  return Date.now();
}

function stubPdfBase64(): string {
  const minimalPdf = '%PDF-1.1\n%\u25B5\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n';
  return Buffer.from(minimalPdf, 'utf-8').toString('base64');
}

export async function handlePostPdfGenerate(req: RequestLike): Promise<ResponseLike> {
  const started = nowMs();
  // E2E test hook: allow artificial delay via localStorage flags (browser-only)
  try {
    // eslint-disable-next-line no-undef
    const ls: any = (typeof localStorage !== 'undefined') ? localStorage : null;
    if (ls) {
      const slow = ls.getItem('e2e_slow_pdf');
      const delayStr = ls.getItem('e2e_delay_ms');
      let delayMs = 0;
      if (slow === 'true') delayMs = 6000; // exceed 5s timeout
      if (delayStr && !isNaN(Number(delayStr))) delayMs = Math.max(delayMs, Number(delayStr));
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  } catch {}
  const uid = parseAuthUid(req.headers);
  if (!uid) return unauthorized();

  const body = (req.body ?? {}) as any;
  if (!body || typeof body !== 'object') {
    return {
      status: 422,
      body: { code: ERROR.VALIDATION_ERROR, message: 'Body must be an object' },
    };
  }

  const { template_id, data } = body as { template_id?: unknown; data?: unknown };
  if (!template_id || typeof template_id !== 'string') {
    return {
      status: 422,
      body: { code: ERROR.VALIDATION_ERROR, message: 'template_id is required' },
    };
  }
  if (!data || typeof data !== 'object') {
    return {
      status: 422,
      body: { code: ERROR.VALIDATION_ERROR, message: 'data must be an object', details: { typeErrors: ['data must be object'] } },
    };
  }

  const meta = getTemplate(template_id);
  if (!meta) {
    return { status: 404, body: { code: ERROR.NOT_FOUND, message: 'Template not found' } };
  }

  // Mapping validation (FR4): ensure required fields exist per template schema
  const schema = getTemplateSchema(template_id);
  const { issues } = buildMapping(schema, data as Record<string, any>);
  if (issues.missing.length > 0 || issues.duplicate.length > 0 || issues.typeErrors.length > 0) {
    return {
      status: 422,
      body: {
        code: ERROR.VALIDATION_ERROR,
        message: 'Mapping validation failed',
        details: { missing: issues.missing, duplicate: issues.duplicate, typeErrors: issues.typeErrors },
      },
    };
  }

  // NOTE: Minimal stub – actual PDF rendering stays stubbed; we only enforce mapping validation first.
  try {
    const pdf_base64 = stubPdfBase64();
    const elapsed = Math.max(0, nowMs() - started);
    return { status: 200, headers: { 'x-processing-ms': String(elapsed), 'Content-Type': 'application/json' }, body: { pdf_base64 } };
  } catch (e: any) {
    return { status: 503, body: { code: 'GENERATOR_UNAVAILABLE', message: e?.message || 'Generator unavailable' } } as ResponseLike;
  }
}
