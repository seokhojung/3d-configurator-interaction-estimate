import { describe, it, expect } from 'vitest';
import { fetchTemplates, groupByType } from '../../../src/lib/templates/api';
import { uploadTemplateContent } from '../../../src/lib/storage/supabaseClient';
import { createTemplate } from '../../../src/lib/templates/service';

async function seed(uid: string, name: string, type: 'basic'|'advanced', version = 1) {
  const up = uploadTemplateContent({ uid, version, ext: 'json', content: '{}', contentType: 'application/json' });
  if (!up.ok) throw new Error('seed upload failed');
  const res = createTemplate({ name, type, storage_path: up.storage_path, version }, uid);
  if (!res.ok) throw new Error('seed create failed');
}

describe('templates api client', () => {
  it('returns templates sorted by name ASC', async () => {
    const uid = 'u1';
    await seed(uid, 'Zeta', 'basic');
    await seed(uid, 'Alpha', 'advanced');
    await seed(uid, 'Beta', 'basic');

    const res = await fetchTemplates(uid);
    expect(res.ok).toBe(true);
    if (res.ok) {
      const names = res.data.map((t) => t.name);
      expect(names).toEqual(['Alpha', 'Beta', 'Zeta']);
      const grouped = groupByType(res.data);
      expect(grouped.basic.every((t) => t.type === 'basic')).toBe(true);
      expect(grouped.advanced.every((t) => t.type === 'advanced')).toBe(true);
    }
  });

  it('maps unauthorized to 401 error', async () => {
    const res = await fetchTemplates('');
    // fetchTemplates always sets Authorization header using provided uid.
    // Empty uid yields invalid Authorization format => 401 from handler.
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.status).toBe(401);
      expect(res.error.code).toBeDefined();
    }
  });
});

