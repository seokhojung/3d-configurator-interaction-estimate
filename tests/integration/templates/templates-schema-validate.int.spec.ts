import { describe, it, expect } from 'vitest'
import { handleValidateTemplateSchema } from '../../../src/api/templates-schema-validate'

describe('integration: templates schema validate endpoint', () => {
  it('200 for valid schema (no warnings)', async () => {
    const res = await handleValidateTemplateSchema({
      method: 'POST', url: '/api/templates/schema/validate', headers: {},
      body: { schema: { sections: [{ fields: [ { pdf_field_name: 'company', type: 'text' } ] }] } }
    } as any)
    expect(res.status).toBe(200)
    expect((res.body as any).valid).toBe(true)
  })

  it('200 with warnings for unknown type', async () => {
    const res = await handleValidateTemplateSchema({
      method: 'POST', url: '/api/templates/schema/validate', headers: {},
      body: { schema: { sections: [{ fields: [ { pdf_field_name: 'x', type: 'foo' } ] }] } }
    } as any)
    expect(res.status).toBe(200)
    expect((res.body as any).warnings?.join('\n') || '').toContain('unknown type')
  })

  it('422 with details.errors for invalid schema', async () => {
    const res = await handleValidateTemplateSchema({
      method: 'POST', url: '/api/templates/schema/validate', headers: {},
      body: { schema: { sections: [{ fields: [ { type: 'text' } as any ] }] } }
    } as any)
    expect(res.status).toBe(422)
    expect((res.body as any).code).toBe('VALIDATION_ERROR')
    expect(((res.body as any).details?.errors || []).length).toBeGreaterThan(0)
  })
})

