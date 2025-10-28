import { randomUUID } from 'crypto';
import { CreateTemplateInput, TemplateMetadata } from './types';
import { ERROR } from './validation';
import { existsStoragePath } from '../storage/supabaseClient';

// In-memory store as a placeholder until DB integration (Supabase) is added.
const STORE: Record<string, TemplateMetadata> = {};

function nowISO(): string {
  return new Date().toISOString();
}

export function createTemplate(input: CreateTemplateInput, createdBy: string): { ok: true; id: string } | { ok: false; error: { code: string; message: string } } {
  {
    const chk = existsStoragePath(String(input.storage_path));
    if (!chk.ok) return { ok: false, error: { code: ERROR.STORAGE_UNAVAILABLE, message: 'Storage unavailable' } };
    if (!chk.exists) return { ok: false, error: { code: ERROR.STORAGE_PATH_INVALID, message: 'Invalid or unreachable storage_path' } };
  }
  const id = randomUUID();
  const record: TemplateMetadata = {
    id,
    name: String(input.name),
    type: input.type as any,
    storage_path: String(input.storage_path),
    version: input.version ?? 1,
    created_by: createdBy,
    created_at: nowISO(),
  };
  STORE[id] = record;
  return { ok: true, id };
}

export function listTemplates(): TemplateMetadata[] {
  return Object.values(STORE);
}

export function getTemplate(id: string): TemplateMetadata | null {
  return STORE[id] ?? null;
}

export function updateTemplate(
  id: string,
  input: CreateTemplateInput,
  uid: string
):
  | { ok: true; record: TemplateMetadata }
  | { ok: false; error: { code: string; message: string } } {
  const existing = STORE[id];
  if (!existing) return { ok: false, error: { code: ERROR.NOT_FOUND, message: 'Template not found' } };
  if (existing.created_by !== uid) return { ok: false, error: { code: ERROR.FORBIDDEN, message: 'Forbidden' } };

  {
    const chk = existsStoragePath(String(input.storage_path));
    if (!chk.ok) return { ok: false, error: { code: ERROR.STORAGE_UNAVAILABLE, message: 'Storage unavailable' } };
    if (!chk.exists) return { ok: false, error: { code: ERROR.STORAGE_PATH_INVALID, message: 'Invalid or unreachable storage_path' } };
  }

  const updated: TemplateMetadata = {
    id: existing.id,
    name: String(input.name),
    type: input.type as any,
    storage_path: String(input.storage_path),
    version: input.version ?? existing.version,
    created_by: existing.created_by,
    created_at: existing.created_at,
  };
  STORE[id] = updated;
  return { ok: true, record: updated };
}

export function deleteTemplate(
  id: string,
  uid: string
): { ok: true } | { ok: false; error: { code: string; message: string } } {
  const existing = STORE[id];
  if (!existing) return { ok: false, error: { code: ERROR.NOT_FOUND, message: 'Template not found' } };
  if (existing.created_by !== uid) return { ok: false, error: { code: ERROR.FORBIDDEN, message: 'Forbidden' } };
  delete STORE[id];
  return { ok: true };
}
