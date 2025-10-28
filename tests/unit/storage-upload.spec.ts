import { describe, it, expect } from 'vitest';
import { uploadTemplateContent, existsStoragePath } from '../../src/lib/storage/supabaseClient';

describe('storage upload wrapper (stub)', () => {
  it('uploads and returns a storage_path', () => {
    const res = uploadTemplateContent({ uid: 'u-1', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.storage_path).toMatch(/^supabase:\/\/templates\/u-1\/template-1\.json$/);
    }
  });

  it('existsStoragePath reflects uploaded objects', () => {
    const path = 'supabase://templates/u-2/template-1.json';
    const up = uploadTemplateContent({ uid: 'u-2', version: 1, ext: 'json', content: '{"sections":[]}', contentType: 'application/json' });
    expect(up.ok).toBe(true);
    const chk = existsStoragePath(path);
    expect(chk.ok).toBe(true);
    if (chk.ok) expect(chk.exists).toBe(true);
  });
});

