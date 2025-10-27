import { CreateTemplateInput, ErrorBody, TemplateType } from './types';

export const ERROR = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  STORAGE_PATH_INVALID: 'STORAGE_PATH_INVALID',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
} as const;

export function isTemplateType(v: unknown): v is TemplateType {
  return v === 'basic' || v === 'advanced';
}

export function validateCreateInput(body: CreateTemplateInput): ErrorBody | null {
  if (!body || typeof body !== 'object') {
    return { code: ERROR.VALIDATION_ERROR, message: 'Body must be an object' };
  }
  const { name, type, storage_path } = body;
  if (!name || typeof name !== 'string') {
    return { code: ERROR.VALIDATION_ERROR, message: 'name is required' };
  }
  if (!type || typeof type !== 'string' || !isTemplateType(type)) {
    return { code: ERROR.VALIDATION_ERROR, message: 'type must be basic|advanced' };
  }
  if (!storage_path || typeof storage_path !== 'string') {
    return { code: ERROR.VALIDATION_ERROR, message: 'storage_path is required' };
  }
  return null;
}

// Placeholder storage path existence check.
// Accepts supabase schema-like pseudo URIs: supabase://templates/...
export function storagePathSeemsValid(path: string): boolean {
  return /^supabase:\/\/templates\/.+/.test(path);
}

