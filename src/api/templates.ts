import { CreateTemplateInput, ErrorBody } from '../lib/templates/types';
import { ERROR, validateCreateInput } from '../lib/templates/validation';
import { createTemplate, getTemplate, listTemplates } from '../lib/templates/service';

// Minimal handler signatures to keep framework-agnostic.
export interface RequestLike {
  method: 'GET' | 'POST';
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
  if (!result.ok) return { status: result.error.code === ERROR.STORAGE_PATH_INVALID ? 400 : 400, body: result.error };

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
