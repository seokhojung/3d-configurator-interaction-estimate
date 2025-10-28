import { ResponseLike, RequestLike } from './templates';
import { uploadTemplateContent } from '../lib/storage/supabaseClient';
import { ERROR } from '../lib/templates/validation';
import { validateTemplateSchema } from '../lib/templates/schema';
import YAML from 'yaml';

function unauthorized(message = 'Missing or invalid Authorization header'): ResponseLike {
  return { status: 401, body: { code: ERROR.UNAUTHORIZED, message } } as any;
}

function parseAuthUid(headers: Record<string, string | undefined>): string | null {
  const auth = headers['authorization'] || headers['Authorization'];
  if (!auth) return null;
  const m = /^Bearer\s+user-(?<uid>[a-zA-Z0-9-]+)$/.exec(auth);
  return (m?.groups as any)?.uid ?? null;
}

const ALLOWED_MIME = new Set(['application/json', 'application/x-yaml', 'text/yaml']);
const ALLOWED_EXT = new Set(['json', 'yaml', 'yml']);
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function detectExt(mime?: string, ext?: string): string | null {
  if (ext && ALLOWED_EXT.has(ext)) return ext;
  if (mime === 'application/json') return 'json';
  if (mime === 'application/x-yaml' || mime === 'text/yaml') return 'yaml';
  return null;
}

// JSON/YAML 모두 공통 스키마 검증 경유

export async function handlePostTemplateFiles(req: RequestLike): Promise<ResponseLike> {
  const uid = parseAuthUid(req.headers);
  if (!uid) return unauthorized();

  const body = (req.body ?? {}) as any;
  const content: string | undefined = body.content;
  const contentType: string | undefined = body.contentType;
  const extIn: string | undefined = body.ext;
  const version: number = Number.isFinite(body.version) ? Number(body.version) : 1;

  if (!content || typeof content !== 'string') {
    return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: 'content is required' } };
  }
  const size = Buffer.byteLength(content, 'utf8');
  if (size > MAX_SIZE) {
    return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: 'file size exceeds 5MB' } };
  }
  const ext = detectExt(contentType, extIn);
  if (!ext) {
    return {
      status: 422,
      body: { code: ERROR.VALIDATION_ERROR, message: 'Unsupported MIME/ext', details: { mime: contentType, ext: extIn } },
    } as any;
  }

  let parsed: any = null;
  if (ext === 'json') {
    try {
      parsed = JSON.parse(content);
    } catch (e: any) {
      return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: 'JSON parse failed', details: { reason: String(e?.message || 'parse error') } } } as any;
    }
  } else {
    try {
      parsed = YAML.parse(content);
    } catch (e: any) {
      return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: 'YAML parse failed', details: { reason: String(e?.message || 'parse error') } } } as any;
    }
  }

  const issues = validateTemplateSchema(parsed);
  if (issues) {
    return { status: 422, body: { code: ERROR.VALIDATION_ERROR, message: 'Invalid schema', details: issues } } as any;
  }

  const up = uploadTemplateContent({ uid, version, ext: ext as any, content, contentType: contentType ?? '', });
  if (!up.ok) {
    return { status: 503, body: { code: 'STORAGE_UNAVAILABLE', message: up.error.message } } as any;
  }
  return { status: 201, body: { storage_path: up.storage_path } };
}
