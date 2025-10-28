// Integration tests for Story 1.1 Template APIs
import { describe, it, expect } from 'vitest';
import { handlePostTemplates, handleGetTemplates, handleGetTemplateById, RequestLike } from '../../src/api/templates';
import { uploadTemplateContent } from '../../src/lib/storage/supabaseClient';
import { ERROR } from '../../src/lib/templates/validation';

// 목적: 시나리오 플로우와 기대 응답 계약 검증(201/401/422/400/404)

function req(partial: Partial<RequestLike>): RequestLike {
  return {
    method: 'GET',
    url: '/api/templates',
    headers: {},
    ...partial,
  } as RequestLike;
}

function auth(uid = 'user-111'): Record<string, string> {
  return { Authorization: `Bearer user-${uid}` };
}

describe('Integration: Template API Flows', () => {
  it('GET /api/templates without Authorization → 401 UNAUTHORIZED', async () => {
    const res = await handleGetTemplates(req({ headers: {} }));
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ code: ERROR.UNAUTHORIZED, message: 'Missing or invalid Authorization header' });
  });

  it('POST /api/templates invalid payload → 422 VALIDATION_ERROR', async () => {
    const res = await handlePostTemplates(req({ method: 'POST', headers: auth(), body: {} }));
    expect(res.status).toBe(422);
    expect(res.body).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'name is required' });
  });

  it('POST /api/templates invalid storage_path → 400 STORAGE_PATH_INVALID', async () => {
    const res = await handlePostTemplates(
      req({ method: 'POST', headers: auth(), body: { name: 't', type: 'basic', storage_path: 'invalid://x' } })
    );
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ code: ERROR.STORAGE_PATH_INVALID, message: 'Invalid or unreachable storage_path' });
  });

  it('Flow: create (201) → list (200) → detail (200) and unknown detail → 404', async () => {
    const up = uploadTemplateContent({ uid: 'abc', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up.ok) throw new Error('upload failed');
    const create = await handlePostTemplates(
      req({ method: 'POST', headers: auth('abc'), body: { name: 'ok', type: 'advanced', storage_path: up.storage_path } })
    );
    expect(create.status).toBe(201);
    const id = (create.body as any).id as string;
    expect(id).toBeTruthy();
    expect(create.headers?.Location).toBe(`/api/templates/${id}`);

    const list = await handleGetTemplates(req({ headers: auth('abc') }));
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);

    const detail = await handleGetTemplateById(req({}), id);
    expect(detail.status).toBe(200);
    expect((detail.body as any).id).toBe(id);

    const notFound = await handleGetTemplateById(req({}), 'does-not-exist');
    expect(notFound.status).toBe(404);
    expect(notFound.body).toEqual({ code: ERROR.NOT_FOUND, message: 'Template not found' });
  });
});
