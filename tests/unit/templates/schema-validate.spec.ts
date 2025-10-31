import { describe, it, expect } from 'vitest'
import { validateTemplateSchema } from '../../../src/lib/templates/schema-validate'

describe('template schema validate', () => {
  it('valid schema returns valid=true', () => {
    const schema = { sections: [{ fields: [ { pdf_field_name: 'company', type: 'text' } ] }] }
    const r = validateTemplateSchema(schema)
    expect(r.valid).toBe(true)
    expect(r.errors).toEqual([])
  })

  it('unknown field type yields warning, not error', () => {
    const schema = { sections: [{ fields: [ { pdf_field_name: 'x', type: 'foo' } ] }] }
    const r = validateTemplateSchema(schema)
    expect(r.valid).toBe(true)
    expect(r.warnings.join('\n')).toContain('unknown type')
  })

  it('missing required keys produce errors', () => {
    const schema = { sections: [{ fields: [ { type: 'text' } as any ] }] }
    const r = validateTemplateSchema(schema)
    expect(r.valid).toBe(false)
    expect(r.errors.join('\n')).toContain('pdf_field_name required')
  })
})

