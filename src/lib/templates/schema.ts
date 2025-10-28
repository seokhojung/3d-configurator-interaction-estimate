export interface TemplateField {
  pdf_field_name?: unknown;
  [k: string]: unknown;
}

export interface TemplateSection {
  section_id?: unknown;
  title?: unknown;
  fields?: unknown;
  [k: string]: unknown;
}

export interface TemplateSchemaLike {
  sections?: unknown;
  [k: string]: unknown;
}

export type TemplateSchemaIssues = {
  missing?: string[];
  typeErrors?: string[];
};

// Minimal runtime validator used by both JSON and YAML paths
export function validateTemplateSchema(obj: unknown): TemplateSchemaIssues | null {
  const missing: string[] = [];
  const typeErrors: string[] = [];

  if (!obj || typeof obj !== 'object') {
    typeErrors.push('root must be an object');
    return { typeErrors };
  }

  const root = obj as TemplateSchemaLike;
  if (!('sections' in root)) {
    missing.push('sections');
  }

  const sections = root.sections as unknown;
  if (sections !== undefined && !Array.isArray(sections)) {
    typeErrors.push('sections must be an array');
  }

  if (Array.isArray(sections)) {
    sections.forEach((sec, i) => {
      const s = sec as TemplateSection;
      if (!('fields' in s)) missing.push(`sections[${i}].fields`);
      const fieldsAny = s.fields as unknown;
      if (fieldsAny !== undefined && !Array.isArray(fieldsAny)) {
        typeErrors.push(`sections[${i}].fields must be an array`);
      }
      if (Array.isArray(fieldsAny)) {
        fieldsAny.forEach((f, j) => {
          const field = f as TemplateField;
          if (!('pdf_field_name' in field)) missing.push(`sections[${i}].fields[${j}].pdf_field_name`);
          else if (typeof field.pdf_field_name !== 'string') typeErrors.push(`sections[${i}].fields[${j}].pdf_field_name must be string`);
        });
      }
    });
  }

  if (missing.length === 0 && typeErrors.length === 0) return null;
  const details: TemplateSchemaIssues = {};
  if (missing.length) details.missing = missing;
  if (typeErrors.length) details.typeErrors = typeErrors;
  return details;
}

