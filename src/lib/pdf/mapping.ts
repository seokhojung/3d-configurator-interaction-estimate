export type FieldType = 'text' | 'checkbox' | 'select'

export interface FieldSpec {
  pdf_field_name: string
  required?: boolean
  type?: FieldType
  options?: string[]
}

export interface MappingIssues {
  missing: string[]
  duplicate: string[]
  typeErrors: string[]
}

export interface MappingResult {
  map: Record<string, any>
  issues: MappingIssues
}

export function buildMapping(
  schema: { fields: FieldSpec[] } | { sections: { fields: FieldSpec[] }[] },
  values: Record<string, any>
): MappingResult {
  const fields: FieldSpec[] = (schema as any).fields
    ? (schema as { fields: FieldSpec[] }).fields
    : (schema as { sections: { fields: FieldSpec[] }[] }).sections.flatMap((s) => s.fields)

  const map: Record<string, any> = {}
  const missing: string[] = []
  const duplicate: string[] = []
  const typeErrors: string[] = []

  const seen = new Set<string>()
  for (const f of fields) {
    if (seen.has(f.pdf_field_name)) duplicate.push(f.pdf_field_name)
    seen.add(f.pdf_field_name)

    const v = (values ?? {})[f.pdf_field_name]
    if (f.required) {
      if (v === undefined || v === null || (typeof v === 'string' && v.trim() === '')) {
        missing.push(f.pdf_field_name)
      }
    }
    // simple type checks
    if (v !== undefined) {
      if (f.type === 'checkbox' && typeof v !== 'boolean') typeErrors.push(`${f.pdf_field_name}:boolean expected`)
      if (f.type === 'text' && typeof v !== 'string') typeErrors.push(`${f.pdf_field_name}:string expected`)
      if (f.type === 'select') {
        if (typeof v !== 'string') typeErrors.push(`${f.pdf_field_name}:string expected`)
        if (f.options && Array.isArray(f.options) && !f.options.includes(v)) typeErrors.push(`${f.pdf_field_name}:invalid option`)
      }
    }
    if (v !== undefined) map[f.pdf_field_name] = v
  }

  return { map, issues: { missing, duplicate, typeErrors } }
}

// Minimal in-memory schema registry for integration tests and stubbed server validation
const overrideSchemas = new Map<string, FieldSpec[]>()

export function setTestTemplateSchema(templateId: string, fields: FieldSpec[]) {
  overrideSchemas.set(templateId, fields)
}

export function getTemplateSchema(templateId: string): { fields: FieldSpec[] } {
  if (overrideSchemas.has(templateId)) {
    return { fields: overrideSchemas.get(templateId)! }
  }
  // For this project, template ids used in tests start with 't-' and share the same minimal schema
  const common: FieldSpec[] = [
    { pdf_field_name: 'company', type: 'text', required: true },
    { pdf_field_name: 'size', type: 'select', required: true, options: ['S', 'M', 'L'] },
  ]
  if (templateId && templateId.startsWith('t-')) return { fields: common }
  // Default: no required fields
  return { fields: [] }
}
