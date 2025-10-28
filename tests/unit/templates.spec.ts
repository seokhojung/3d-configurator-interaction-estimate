// Unit tests for Story 1.1 Template APIs
import { describe, it, expect } from 'vitest';
import { validateCreateInput, storagePathSeemsValid, ERROR } from '../../src/lib/templates/validation';
import { createTemplate, getTemplate, listTemplates } from '../../src/lib/templates/service';
import { uploadTemplateContent } from '../../src/lib/storage/supabaseClient';

describe('Unit: validation helpers', () => {
  it('validateCreateInput returns error when body is not object', () => {
    const res = validateCreateInput(undefined as any);
    expect(res).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'Body must be an object' });
  });

  it('validateCreateInput detects missing required fields', () => {
    expect(validateCreateInput({})).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'name is required' });
    expect(validateCreateInput({ name: 'n' } as any)).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'type must be basic|advanced' });
    expect(validateCreateInput({ name: 'n', type: 'basic' } as any)).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'storage_path is required' });
  });

  it('storagePathSeemsValid accepts supabase template paths only', () => {
    expect(storagePathSeemsValid('supabase://templates/basic-v1.json')).toBe(true);
    expect(storagePathSeemsValid('http://templates/basic.json')).toBe(false);
    expect(storagePathSeemsValid('supabase://wrong/segment')).toBe(false);
  });
});

describe('Unit: service layer', () => {
  it('createTemplate rejects invalid storage_path with STORAGE_PATH_INVALID', () => {
    const res = createTemplate({ name: 'n', type: 'basic', storage_path: 'invalid://x' } as any, 'user-1');
    expect(res).toEqual({ ok: false, error: { code: ERROR.STORAGE_PATH_INVALID, message: 'Invalid or unreachable storage_path' } });
  });

  it('createTemplate creates record with defaults and list/get work', () => {
    const up = uploadTemplateContent({ uid: 'user-2', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up.ok) throw new Error('upload failed in test');
    const good = createTemplate({ name: 'n2', type: 'advanced', storage_path: up.storage_path }, 'user-2');
    expect(good.ok).toBe(true);
    if (good.ok) {
      const all = listTemplates();
      expect(all.some(r => r.id === good.id && r.created_by === 'user-2' && r.version === 1)).toBe(true);
      const one = getTemplate(good.id);
      expect(one?.id).toBe(good.id);
    }
  });
});
