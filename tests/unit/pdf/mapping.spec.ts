import { describe, it, expect } from 'vitest'
import { buildMapping } from '../../../src/lib/pdf/mapping'

describe('pdf mapping', () => {
  const schema = {
    sections: [
      { fields: [
        { pdf_field_name: 'company', type: 'text', required: true },
        { pdf_field_name: 'size', type: 'select', required: true, options: ['S','M','L'] },
      ]}
    ]
  }

  it('builds mapping and reports no issues for valid values', () => {
    const { map, issues } = buildMapping(schema as any, { company: 'ACME', size: 'M' })
    expect(map).toEqual({ company: 'ACME', size: 'M' })
    expect(issues.missing).toEqual([])
    expect(issues.duplicate).toEqual([])
    expect(issues.typeErrors).toEqual([])
  })

  it('reports missing required fields and type errors', () => {
    const { issues } = buildMapping(schema as any, { company: '', size: 1 as any })
    expect(issues.missing).toContain('company')
    expect(issues.typeErrors.join('\n')).toContain('size')
  })
})

