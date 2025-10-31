import { describe, it, expect } from 'vitest';
import { handlePostPdfGenerate } from '../../../src/api/pdf-generate';
import type { RequestLike } from '../../../src/api/templates';
import { uploadTemplateContent } from '../../../src/lib/storage/supabaseClient';
import { createTemplate } from '../../../src/lib/templates/service';

function auth(uid: string) {
  return { Authorization: `Bearer user-${uid}` } as Record<string, string>;
}

async function seedTemplate(uid: string, name = 'Doc') {
  const up = uploadTemplateContent({ uid, version: 1, ext: 'yaml', content: 'a: 1', contentType: 'application/x-yaml' });
  if (!up.ok) throw new Error('upload failed');
  const res = createTemplate({ name, type: 'basic', storage_path: up.storage_path, version: 1 }, uid);
  if (!res.ok) throw new Error('create failed');
  return res.id;
}

describe('integration: POST /api/pdf/generate (stub)', () => {
  it('success: returns base64 and processing header', async () => {
    const uid = 'u3';
    const id = await seedTemplate(uid);
    const req: RequestLike = { method: 'POST', url: '/api/pdf/generate', headers: auth(uid), body: { template_id: id, data: {} } };
    const res = await handlePostPdfGenerate(req);
    expect(res.status).toBe(200);
    expect((res.headers || {})['x-processing-ms']).toBeDefined();
  });

  it('401: missing Authorization', async () => {
    const req: RequestLike = { method: 'POST', url: '/api/pdf/generate', headers: {}, body: { template_id: 'x', data: {} } };
    const res = await handlePostPdfGenerate(req);
    expect(res.status).toBe(401);
  });

  it('404: unknown template', async () => {
    const uid = 'u4';
    const req: RequestLike = { method: 'POST', url: '/api/pdf/generate', headers: auth(uid), body: { template_id: 'missing', data: {} } };
    const res = await handlePostPdfGenerate(req);
    expect(res.status).toBe(404);
  });

  it('422: invalid body', async () => {
    const uid = 'u5';
    const req: RequestLike = { method: 'POST', url: '/api/pdf/generate', headers: auth(uid), body: { template_id: 123, data: {} } as any };
    const res = await handlePostPdfGenerate(req);
    expect(res.status).toBe(422);
  });
});

