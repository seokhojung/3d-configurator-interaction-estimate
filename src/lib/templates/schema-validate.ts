import type { TemplateSchema, TemplateField, SupportedFieldType } from './schema'

export interface SchemaValidationResult {
  valid: boolean
  warnings: string[]
  errors: string[]
}

const SUPPORTED: SupportedFieldType[] = ['text', 'checkbox', 'select']

export function validateTemplateSchema(schema: unknown): SchemaValidationResult {
  const warnings: string[] = []
  const errors: string[] = []

  if (!schema || typeof schema !== 'object') {
    return { valid: false, warnings, errors: ['schema must be object'] }
  }
  const s = schema as TemplateSchema
  if (!Array.isArray(s.sections)) {
    return { valid: false, warnings, errors: ['sections must be array'] }
  }
  const seen = new Set<string>()
  for (const [si, sec] of s.sections.entries()) {
    if (!sec || !Array.isArray(sec.fields)) {
      errors.push(`sections[${si}].fields must be array`)
      continue
    }
    for (const [fi, f] of sec.fields.entries()) {
      const path = `sections[${si}].fields[${fi}]`
      if (!f || typeof f !== 'object') {
        errors.push(`${path} must be object`)
        continue
      }
      if (!('pdf_field_name' in f) || typeof (f as TemplateField).pdf_field_name !== 'string' || !(f as TemplateField).pdf_field_name.trim()) {
        errors.push(`${path}.pdf_field_name required`)
        continue
      }
      const name = (f as TemplateField).pdf_field_name
      if (seen.has(name)) warnings.push(`duplicate pdf_field_name: ${name}`)
      seen.add(name)
      const t = (f as TemplateField).type
      if (!t || typeof t !== 'string') {
        errors.push(`${path}.type required`)
      } else if (!SUPPORTED.includes(t as SupportedFieldType)) {
        warnings.push(`unknown type: ${t}`)
      }
      if ((f as TemplateField).type === 'select') {
        const opts = (f as TemplateField).options
        if (!Array.isArray(opts) || opts.length === 0) {
          errors.push(`${path}.options required for select`)
        }
      }
    }
  }
  return { valid: errors.length === 0, warnings, errors }
}

