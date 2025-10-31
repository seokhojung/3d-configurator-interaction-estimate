import { describe, it, expect } from 'vitest';
import { handlePostPdfGenerate } from '../../../src/api/pdf-generate';
import type { RequestLike } from '../../../src/api/templates';
import { uploadTemplateContent } from '../../../src/lib/storage/supabaseClient';
import { createTemplate } from '../../../src/lib/templates/service';

function auth(uid: string) {
  return { Authorization: `Bearer user-${uid}` } as Record<string, string>;
}

async function seedTemplate(uid: string) {
  const up = uploadTemplateContent({ uid, version: 1, ext: 'json', content: '{}', contentType: 'application/json' });
  if (!up.ok) throw new Error('upload failed');
  const res = createTemplate({ name: 'Alpha', type: 'basic', storage_path: up.storage_path, version: 1 }, uid);
  if (!res.ok) throw new Error('create failed');
  return res.id;
}

describe('handlePostPdfGenerate (stub)', () => {
  it('returns 401 when no auth', async () => {
    const req: RequestLike = { method: 'POST', url: '/api/pdf/generate', headers: {}, body: {} };
    const res = await handlePostPdfGenerate(req);
    expect(res.status).toBe(401);
  });

  it('validates body and fields (422)', async () => {
    const uid = 'u1';
    const base = { method: 'POST', url: '/api/pdf/generate', headers: auth(uid) } as any;

    let res = await handlePostPdfGenerate({ ...base, body: null });
    expect(res.status).toBe(422);

    res = await handlePostPdfGenerate({ ...base, body: { data: {} } });
    expect(res.status).toBe(422);

    res = await handlePostPdfGenerate({ ...base, body: { template_id: 'x', data: 'not-object' } });
    expect(res.status).toBe(422);
  });

  it('returns 404 for unknown template', async () => {
    const uid = 'u1';
    const req: RequestLike = {
      method: 'POST',
      url: '/api/pdf/generate',
      headers: auth(uid),
      body: { template_id: 'unknown', data: {} },
    };
    const res = await handlePostPdfGenerate(req);
    expect(res.status).toBe(404);
  });

  it('returns 200 with pdf_base64 and x-processing-ms header', async () => {
    const uid = 'u2';
    const id = await seedTemplate(uid);
    const req: RequestLike = {
      method: 'POST',
      url: '/api/pdf/generate',
      headers: auth(uid),
      body: { template_id: id, data: {} },
    };
    const res = await handlePostPdfGenerate(req);
    expect(res.status).toBe(200);
    expect((res.headers || {})['x-processing-ms']).toBeDefined();
    expect(typeof (res.headers as any)['x-processing-ms']).toBe('string');
    const body = res.body as any;
    expect(body.pdf_base64).toBeTypeOf('string');
    expect(body.pdf_base64.length).toBeGreaterThan(10);
  });
});

