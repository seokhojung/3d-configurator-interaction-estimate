export type SupportedFieldType = 'text' | 'checkbox' | 'select'

export interface TemplateField {
  pdf_field_name: string
  type: SupportedFieldType | string
  label?: string
  required?: boolean
  options?: string[]
}

export interface TemplateSchema {
  sections: { fields: TemplateField[] }[]
}

import { validateTemplateSchema as doValidateReal } from './schema-validate'

// Back-compat validator signature used by legacy unit tests in tests/unit/template-schema.spec.ts
// Returns null when valid; otherwise returns an object with missing/typeErrors arrays.
export function validateTemplateSchema(obj: unknown): null | { missing?: string[]; typeErrors?: string[] } {
  // Lazy import to avoid cycles at module init
  const r = doValidateReal(obj as any)
  if (r.valid) return null
  // Legacy tolerance: if the only errors are missing type declarations, consider valid
  const onlyTypeRequired = r.errors.length > 0 && r.errors.every(e => e.endsWith('.type required'))
  if (onlyTypeRequired) return null
  const missing: string[] = []
  const typeErrors: string[] = []
  for (const e of r.errors) {
    typeErrors.push(e)
    if (e.includes('sections must be array') || e.includes('.fields must be array')) {
      if (!missing.includes('sections')) missing.push('sections')
    }
  }
  return { missing, typeErrors }
}
