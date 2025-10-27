import { randomUUID } from 'crypto';
import { CreateTemplateInput, TemplateMetadata } from './types';
import { ERROR, storagePathSeemsValid } from './validation';

// In-memory store as a placeholder until DB integration (Supabase) is added.
const STORE: Record<string, TemplateMetadata> = {};

function nowISO(): string {
  return new Date().toISOString();
}

export function createTemplate(input: CreateTemplateInput, createdBy: string): { ok: true; id: string } | { ok: false; error: { code: string; message: string } } {
  if (!storagePathSeemsValid(input.storage_path!)) {
    return { ok: false, error: { code: ERROR.STORAGE_PATH_INVALID, message: 'Invalid or unreachable storage_path' } };
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

