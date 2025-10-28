import { describe, it, expect } from 'vitest';
import { ERROR, validateUpdateInput } from '../../src/lib/templates/validation';
import { createTemplate, getTemplate, updateTemplate, deleteTemplate } from '../../src/lib/templates/service';
import { uploadTemplateContent } from '../../src/lib/storage/supabaseClient';

describe('Unit: validation for update', () => {
  it('validateUpdateInput requires name/type/storage_path', () => {
    expect(validateUpdateInput({} as any)).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'name is required' });
    expect(validateUpdateInput({ name: 'n' } as any)).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'type must be basic|advanced' });
    expect(validateUpdateInput({ name: 'n', type: 'basic' } as any)).toEqual({ code: ERROR.VALIDATION_ERROR, message: 'storage_path is required' });
  });
});

describe('Unit: service update/delete with RLS', () => {
  it('updateTemplate returns NOT_FOUND for unknown id', () => {
    const up = uploadTemplateContent({ uid: 'user-x', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up.ok) throw new Error('upload failed in test');
    const res = updateTemplate('nope', { name: 'a', type: 'basic', storage_path: up.storage_path }, 'user-x');
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error.code).toBe(ERROR.NOT_FOUND);
  });

  it('deleteTemplate returns NOT_FOUND for unknown id', () => {
    const res = deleteTemplate('nope', 'user-x');
    expect(!res.ok && res.error.code === ERROR.NOT_FOUND).toBe(true);
  });

  it('owner can update with valid payload; non-owner gets FORBIDDEN; invalid storage_path → STORAGE_PATH_INVALID', () => {
    const up0 = uploadTemplateContent({ uid: 'owner-1', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up0.ok) throw new Error('upload failed');
    const created = createTemplate({ name: 'n1', type: 'basic', storage_path: up0.storage_path }, 'owner-1');
    expect(created.ok).toBe(true);
    if (!created.ok) return;

    // Non-owner forbidden
    const forb = updateTemplate(created.id, { name: 'n2', type: 'advanced', storage_path: 'supabase://templates/y.json' }, 'other');
    expect(!forb.ok && forb.error.code === ERROR.FORBIDDEN).toBe(true);

    // Owner invalid storage path
    const bad = updateTemplate(created.id, { name: 'n2', type: 'advanced', storage_path: 'invalid://z' } as any, 'owner-1');
    expect(!bad.ok && bad.error.code === ERROR.STORAGE_PATH_INVALID).toBe(true);

    // Owner valid update
    const up1 = uploadTemplateContent({ uid: 'owner-1', version: 3, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up1.ok) throw new Error('upload failed');
    const ok = updateTemplate(created.id, { name: 'n2', type: 'advanced', storage_path: up1.storage_path, version: 3 }, 'owner-1');
    expect(ok.ok).toBe(true);
    if (ok.ok) {
      expect(ok.record.name).toBe('n2');
      expect(ok.record.type).toBe('advanced');
      expect(ok.record.version).toBe(3);
      const after = getTemplate(created.id)!;
      expect(after.created_by).toBe('owner-1');
    }
  });

  it('owner can delete; non-owner forbidden', () => {
    const up = uploadTemplateContent({ uid: 'owner-2', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    if (!up.ok) throw new Error('upload failed');
    const c = createTemplate({ name: 'd1', type: 'basic', storage_path: up.storage_path }, 'owner-2');
    if (!c.ok) return;
    const id = c.id;
    const no = deleteTemplate(id, 'other');
    expect(!no.ok && no.error.code === ERROR.FORBIDDEN).toBe(true);
    const ok = deleteTemplate(id, 'owner-2');
    expect(ok.ok).toBe(true);
    expect(getTemplate(id)).toBeNull();
  });
});
