import { describe, it, expect } from 'vitest';
import {
  handlePostTemplates,
  handleGetTemplateById,
  handlePutTemplateById,
  handleDeleteTemplateById,
  RequestLike,
} from '../../src/api/templates';
import { ERROR } from '../../src/lib/templates/validation';
import { uploadTemplateContent } from '../../src/lib/storage/supabaseClient';

function req(partial: Partial<RequestLike>): RequestLike {
  return {
    method: 'GET',
    url: '/api/templates',
    headers: {},
    ...partial,
  } as RequestLike;
}

function auth(uid = 'user-abc'): Record<string, string> {
  return { Authorization: `Bearer user-${uid}` };
}

describe('Integration: Update/Delete with RLS', () => {
  it('PUT unauthenticated → 401; not found → 404; non-owner → 403; invalid body → 422; invalid storage → 400; success → 200', async () => {
    const up0 = uploadTemplateContent({ uid: 'owner', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up0.ok) throw new Error('upload failed');
    const created = await handlePostTemplates(
      req({ method: 'POST', headers: auth('owner'), body: { name: 't1', type: 'basic', storage_path: up0.storage_path } })
    );
    const id = (created.body as any).id as string;

    // 401
    const unauth = await handlePutTemplateById(req({ method: 'PUT', headers: {}, body: {} }), id);
    expect(unauth.status).toBe(401);

    // 404
    const nf = await handlePutTemplateById(req({ method: 'PUT', headers: auth('owner'), body: { name: 'a', type: 'basic', storage_path: 'supabase://templates/x.json' } }), 'nope');
    expect(nf.status).toBe(404);

    // 403 (non-owner)
    const fbd = await handlePutTemplateById(
      req({ method: 'PUT', headers: auth('other'), body: { name: 'a', type: 'advanced', storage_path: 'supabase://templates/x.json' } }),
      id
    );
    expect(fbd.status).toBe(403);
    expect(fbd.body).toEqual({ code: ERROR.FORBIDDEN, message: 'Forbidden' });

    // 422 invalid body
    const badBody = await handlePutTemplateById(req({ method: 'PUT', headers: auth('owner'), body: {} }), id);
    expect(badBody.status).toBe(422);

    // 400 invalid storage
    const badStorage = await handlePutTemplateById(
      req({ method: 'PUT', headers: auth('owner'), body: { name: 't2', type: 'basic', storage_path: 'invalid://z' } }),
      id
    );
    expect(badStorage.status).toBe(400);
    expect(badStorage.body).toEqual({ code: ERROR.STORAGE_PATH_INVALID, message: 'Invalid or unreachable storage_path' });

    // 200 success
    const up1 = uploadTemplateContent({ uid: 'owner', version: 5, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up1.ok) throw new Error('upload failed');
    const ok = await handlePutTemplateById(
      req({ method: 'PUT', headers: auth('owner'), body: { name: 't2', type: 'advanced', storage_path: up1.storage_path, version: 5 } }),
      id
    );
    expect(ok.status).toBe(200);
    const rec = ok.body as any;
    expect(rec.name).toBe('t2');
    expect(rec.type).toBe('advanced');
    expect(rec.version).toBe(5);

    // immutable guard: created_by provided → 422
    const imm = await handlePutTemplateById(
      req({ method: 'PUT', headers: auth('owner'), body: { name: 't3', type: 'basic', storage_path: 'supabase://templates/3.json', created_by: 'hacker' } as any }),
      id
    );
    expect(imm.status).toBe(422);
    expect(imm.body).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'created_by/created_at are immutable' });
  });

  it('DELETE unauthenticated → 401; not found → 404; non-owner → 403; success → 204', async () => {
    const up0 = uploadTemplateContent({ uid: 'owner2', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up0.ok) throw new Error('upload failed');
    const created = await handlePostTemplates(
      req({ method: 'POST', headers: auth('owner2'), body: { name: 'd1', type: 'basic', storage_path: up0.storage_path } })
    );
    const id = (created.body as any).id as string;

    const unauth = await handleDeleteTemplateById(req({ method: 'DELETE', headers: {} }), id);
    expect(unauth.status).toBe(401);

    const nf = await handleDeleteTemplateById(req({ method: 'DELETE', headers: auth('owner2') }), 'no-such');
    expect(nf.status).toBe(404);

    const fbd = await handleDeleteTemplateById(req({ method: 'DELETE', headers: auth('other') }), id);
    expect(fbd.status).toBe(403);
    expect(fbd.body).toEqual({ code: ERROR.FORBIDDEN, message: 'Forbidden' });

    const ok = await handleDeleteTemplateById(req({ method: 'DELETE', headers: auth('owner2') }), id);
    expect(ok.status).toBe(204);

    // subsequent detail should 404
    const after = await handleGetTemplateById(req({}), id);
    expect(after.status).toBe(404);
  });
});
