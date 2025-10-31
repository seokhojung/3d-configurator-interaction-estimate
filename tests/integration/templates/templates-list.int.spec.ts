import { describe, it, expect } from 'vitest';
import { fetchTemplates } from '../../../src/lib/templates/api';
import { uploadTemplateContent } from '../../../src/lib/storage/supabaseClient';
import { createTemplate } from '../../../src/lib/templates/service';

async function seed(uid: string, name: string, type: 'basic'|'advanced', version = 1) {
  const up = uploadTemplateContent({ uid, version, ext: 'yaml', content: 'a: 1', contentType: 'application/x-yaml' });
  if (!up.ok) throw new Error('seed upload failed');
  const res = createTemplate({ name, type, storage_path: up.storage_path, version }, uid);
  if (!res.ok) throw new Error('seed create failed');
}

describe('integration: templates list via api client', () => {
  it('lists templates (JSON/YAML storage paths agnostic)', async () => {
    const uid = 'u2';
    await seed(uid, 'Gamma', 'advanced');
    await seed(uid, 'Delta', 'basic');

    const res = await fetchTemplates(uid);
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.data.length).toBeGreaterThanOrEqual(2);
      // sorted by name ASC
      const names = res.data.map((t) => t.name);
      expect(names).toEqual(names.slice().sort());
    }
  });

  it('returns 401 when Authorization is invalid', async () => {
    const res = await fetchTemplates('');
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.status).toBe(401);
    }
  });
});

