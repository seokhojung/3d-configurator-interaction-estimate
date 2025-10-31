import { describe, it, expect } from 'vitest'
import { handlePostPdfGenerate } from '../../../src/api/pdf-generate'
import { uploadTemplateContent } from '../../../src/lib/storage/supabaseClient'
import { createTemplate } from '../../../src/lib/templates/service'
import { setTestTemplateSchema } from '../../../src/lib/pdf/mapping'
import { getTemplate } from '../../../src/lib/templates/service'

function auth(uid = 'user-test') {
  return { Authorization: `Bearer user-${uid}` }
}

async function seedTemplateWithSchema(uid: string) {
  const up = uploadTemplateContent({ uid, version: 1, ext: 'yaml', content: 'a: 1', contentType: 'application/x-yaml' });
  if (!up.ok) throw new Error('upload failed');
  const res = createTemplate({ name: 'Doc', type: 'basic', storage_path: up.storage_path, version: 1 }, uid);
  if (!res.ok) throw new Error('create failed');
  // Attach schema override for this template id
  setTestTemplateSchema(res.id, [
    { pdf_field_name: 'company', required: true, type: 'text' },
    { pdf_field_name: 'size', required: true, type: 'select', options: ['S','M','L'] },
  ])
  return res.id
}

describe('integration: POST /api/pdf/generate mapping validation', () => {
  it('returns 422 with details when required fields missing', async () => {
    const uid = 'u-m1'
    const templateId = await seedTemplateWithSchema(uid)
    expect(getTemplate(templateId)).not.toBeNull()
    const resp = await handlePostPdfGenerate({
      headers: auth(),
      body: { template_id: templateId, data: { company: '' } },
    } as any)
    expect(resp.status).toBe(422)
    expect(resp.body?.code).toBe('VALIDATION_ERROR')
    expect(resp.body?.details?.missing).toContain('size')
  })

  it('returns 200 when mapping passes', async () => {
    const uid = 'u-m2'
    const templateId = await seedTemplateWithSchema(uid)
    expect(getTemplate(templateId)).not.toBeNull()
    const resp = await handlePostPdfGenerate({
      headers: auth(),
      body: { template_id: templateId, data: { company: 'ACME', size: 'M' } },
    } as any)
    expect(resp.status).toBe(200)
    expect(resp.body?.pdf_base64).toBeDefined()
  })
})
