import { CreateTemplateInput, ErrorBody } from '../lib/templates/types';
import { ERROR, validateCreateInput, validateUpdateInput } from '../lib/templates/validation';
import { createTemplate, getTemplate, listTemplates, updateTemplate, deleteTemplate } from '../lib/templates/service';

// Minimal handler signatures to keep framework-agnostic.
export interface RequestLike {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers: Record<string, string | undefined>;
  body?: unknown;
}

export interface ResponseLike {
  status: number;
  headers?: Record<string, string>;
  body?: unknown;
}

function unauthorized(message = 'Missing or invalid Authorization header'): ResponseLike {
  const body: ErrorBody = { code: ERROR.UNAUTHORIZED, message };
  return { status: 401, body };
}

function parseAuthUid(headers: Record<string, string | undefined>): string | null {
  // Placeholder auth: Authorization: Bearer user-<uuid>
  const auth = headers['authorization'] || headers['Authorization'];
  if (!auth) return null;
  const m = /^Bearer\s+user-(?<uid>[a-zA-Z0-9-]+)$/.exec(auth);
  return m?.groups?.uid ?? null;
}

export async function handlePostTemplates(req: RequestLike): Promise<ResponseLike> {
  const uid = parseAuthUid(req.headers);
  if (!uid) return unauthorized();

  const validation = validateCreateInput((req.body ?? {}) as CreateTemplateInput);
  if (validation) return { status: 422, body: validation };

  const result = createTemplate(req.body as CreateTemplateInput, uid);
  if (!result.ok) {
    const code = result.error.code;
    if (code === ERROR.STORAGE_UNAVAILABLE) return { status: 503, body: result.error };
    return { status: 400, body: result.error };
  }

  return {
    status: 201,
    headers: { Location: `/api/templates/${result.id}` },
    body: { id: result.id },
  };
}

export async function handleGetTemplates(req: RequestLike): Promise<ResponseLike> {
  const uid = parseAuthUid(req.headers);
  if (!uid) return unauthorized();
  const data = listTemplates();
  return { status: 200, body: data };
}

export async function handleGetTemplateById(req: RequestLike, id: string): Promise<ResponseLike> {
  const found = getTemplate(id);
  if (!found) {
    const body: ErrorBody = { code: ERROR.NOT_FOUND, message: 'Template not found' };
    return { status: 404, body };
  }
  return { status: 200, body: found };
}

export async function handlePutTemplateById(req: RequestLike, id: string): Promise<ResponseLike> {
  const uid = parseAuthUid(req.headers);
  if (!uid) return unauthorized();

  const existing = getTemplate(id);
  if (!existing) return { status: 404, body: { code: ERROR.NOT_FOUND, message: 'Template not found' } };
  if (existing.created_by !== uid) return { status: 403, body: { code: ERROR.FORBIDDEN, message: 'Forbidden' } };

  // Immutable field guard
  const raw = (req.body ?? {}) as any;
  if ('created_by' in raw || 'created_at' in raw) {
    return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: 'created_by/created_at are immutable' } };
  }

  const validation = validateUpdateInput(raw as CreateTemplateInput);
  if (validation) return { status: 422, body: validation };

  const result = updateTemplate(id, raw as CreateTemplateInput, uid);
  if (!result.ok) {
    const code = result.error.code;
    if (code === ERROR.NOT_FOUND) return { status: 404, body: result.error };
    if (code === ERROR.FORBIDDEN) return { status: 403, body: result.error };
    if (code === ERROR.STORAGE_UNAVAILABLE) return { status: 503, body: result.error };
    if (code === ERROR.STORAGE_PATH_INVALID) return { status: 400, body: result.error };
    return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: result.error.message } };
  }

  return { status: 200, body: result.record };
}

export async function handleDeleteTemplateById(req: RequestLike, id: string): Promise<ResponseLike> {
  const uid = parseAuthUid(req.headers);
  if (!uid) return unauthorized();
  const existing = getTemplate(id);
  if (!existing) return { status: 404, body: { code: ERROR.NOT_FOUND, message: 'Template not found' } };
  if (existing.created_by !== uid) return { status: 403, body: { code: ERROR.FORBIDDEN, message: 'Forbidden' } };
  const res = deleteTemplate(id, uid);
  if (!res.ok) {
    const code = res.error.code;
    if (code === ERROR.NOT_FOUND) return { status: 404, body: res.error };
    if (code === ERROR.FORBIDDEN) return { status: 403, body: res.error };
    return { status: 400, body: res.error };
  }
  return { status: 204 };
}
