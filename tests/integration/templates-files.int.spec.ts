import { describe, it, expect } from 'vitest';
import { handlePostTemplateFiles } from '../../src/api/templates-files';

function req(body: any, auth = 'Bearer user-u-42') {
  return {
    method: 'POST',
    url: '/api/templates/files',
    headers: { authorization: auth },
    body,
  } as any;
}

describe('POST /api/templates/files', () => {
  it('returns 401 without auth', async () => {
    const res = await handlePostTemplateFiles(req({ content: '{}', contentType: 'application/json' }, '')); // no auth
    expect(res.status).toBe(401);
  });

  it('validates MIME/ext and JSON schema', async () => {
    const badMime = await handlePostTemplateFiles(req({ content: '{}', contentType: 'text/plain' }));
    expect(badMime.status).toBe(422);

    const badSchema = await handlePostTemplateFiles(req({ content: '{"x":1}', contentType: 'application/json' }));
    expect(badSchema.status).toBe(422);
  });

  it('accepts valid JSON and returns storage_path', async () => {
    const content = JSON.stringify({ sections: [{ section_id: 's1', title: 't', fields: [{ field_id: 'f1', label_ko: 'l', type: 'text', is_required: false, pdf_field_name: 'P1' }] }] });
    const res = await handlePostTemplateFiles(req({ content, contentType: 'application/json', version: 1 }));
    expect(res.status).toBe(201);
    expect((res.body as any).storage_path).toMatch(/^supabase:\/\/templates\/u-42\/template-1\.json$/);
  });

  it('rejects YAML parse failures with details.reason', async () => {
    const badYaml = 'sections: [\n - fields: [{ pdf_field_name: P1 }'; // broken yaml
    const res = await handlePostTemplateFiles(req({ content: badYaml, contentType: 'text/yaml' }));
    expect(res.status).toBe(422);
    expect((res.body as any).details?.reason).toBeTruthy();
  });

  it('accepts valid YAML and returns storage_path', async () => {
    const yaml = [
      'sections:',
      '  - section_id: s1',
      '    title: t',
      '    fields:',
      '      - field_id: f1',
      '        label_ko: l',
      '        type: text',
      '        is_required: false',
      '        pdf_field_name: P1',
    ].join('\n');
    const res = await handlePostTemplateFiles(req({ content: yaml, contentType: 'application/x-yaml', ext: 'yml', version: 2 }));
    expect(res.status).toBe(201);
    expect((res.body as any).storage_path).toMatch(/^supabase:\/\/templates\/u-42\/template-2\.(yaml|yml)$/);
  });

  it('rejects files larger than 5MB', async () => {
    const big = 'a'.repeat(5 * 1024 * 1024 + 1);
    const res = await handlePostTemplateFiles(req({ content: big, contentType: 'application/json' }));
    expect(res.status).toBe(422);
  });
});
