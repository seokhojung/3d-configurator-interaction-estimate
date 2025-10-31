"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';

export type FieldType = 'text' | 'checkbox' | 'select';
export interface SchemaField {
  type: FieldType;
  pdf_field_name: string;
  label?: string;
  required?: boolean;
  options?: string[];
}
export interface SchemaSection {
  section_id?: string;
  title?: string;
  fields: SchemaField[];
}
export interface UISchema {
  sections: SchemaSection[];
}

export interface SchemaFormProps {
  templateId: string;
  schema: UISchema;
  onValuesChange?: (values: Values) => void;
}

type Values = Record<string, any>;
type Errors = Record<string, string>;

function defaultValue(field: SchemaField): any {
  if (field.type === 'checkbox') return false;
  return '';
}

function validateField(field: SchemaField, value: any): string | '' {
  if (field.required) {
    if (field.type === 'text') {
      if (typeof value !== 'string' || value.trim() === '') return '필수 항목입니다';
    } else if (field.type === 'checkbox') {
      if (typeof value !== 'boolean') return '불리언 값이 필요합니다';
    } else if (field.type === 'select') {
      if (!field.options || !Array.isArray(field.options)) return '';
      if (!field.options.includes(value)) return '유효한 옵션을 선택하세요';
    }
  } else {
    // optional but type check for checkbox/select
    if (field.type === 'checkbox' && typeof value !== 'boolean') return '불리언 값이 필요합니다';
    if (field.type === 'select' && value && field.options && !field.options.includes(value)) return '유효한 옵션을 선택하세요';
  }
  return '';
}

export default function SchemaForm({ templateId, schema, onValuesChange }: SchemaFormProps) {
  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  const fieldRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});
  const fields = useMemo(() => schema.sections.flatMap((s) => s.fields), [schema]);
  const [values, setValues] = useState<Values>(() => {
    const init: Values = {};
    fields.forEach((f) => (init[f.pdf_field_name] = defaultValue(f)));
    return init;
  });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    // Reset when templateId changes
    const init: Values = {};
    fields.forEach((f) => (init[f.pdf_field_name] = defaultValue(f)));
    setValues(init);
    setErrors({});
    // focus first input
    setTimeout(() => firstInputRef.current?.focus(), 0);
    if (onValuesChange) onValuesChange(init);
  }, [templateId, fields]);

  function onChange(field: SchemaField, v: any) {
    setValues((prev) => {
      const next = { ...prev, [field.pdf_field_name]: v };
      if (onValuesChange) onValuesChange(next);
      return next;
    });
    // live validate
    const msg = validateField(field, v);
    setErrors((prev) => ({ ...prev, [field.pdf_field_name]: msg }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: Errors = {};
    fields.forEach((f) => {
      const msg = validateField(f, values[f.pdf_field_name]);
      if (msg) nextErrors[f.pdf_field_name] = msg;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // noop for now
    } else {
      // focus first invalid field for accessibility
      for (const f of fields) {
        if (nextErrors[f.pdf_field_name]) {
          const el = fieldRefs.current[f.pdf_field_name];
          if (el && typeof (el as any).focus === 'function') {
            // schedule after state update flush
            setTimeout(() => el.focus(), 0);
          }
          break;
        }
      }
    }
  }

  const hasErrors = Object.values(errors).some((m) => m);

  let firstInputAssigned = false;

  return (
    <form onSubmit={onSubmit} aria-labelledby="schema-form-title">
      <h1 id="schema-form-title" style={{ fontSize: 18 }}>작성 폼</h1>
      {schema.sections.map((sec, si) => (
        <section key={sec.section_id || si} aria-labelledby={`section-${si}-title`}>
          {sec.title && <h2 id={`section-${si}-title`}>{sec.title}</h2>}
          <div>
            {sec.fields.map((f, fi) => {
              const id = `${f.pdf_field_name}`;
              const err = errors[f.pdf_field_name] || '';
              const commonProps: any = {
                ref: (el: any) => {
                  fieldRefs.current[f.pdf_field_name] = el;
                  if (!firstInputAssigned && el) {
                    firstInputRef.current = el;
                  }
                },
              };
              if (!firstInputAssigned) firstInputAssigned = true;
              return (
                <div key={id} style={{ marginBottom: 12 }}>
                  <label htmlFor={id}>{f.label || f.pdf_field_name}{f.required ? ' *' : ''}</label>
                  {f.type === 'text' && (
                    <input
                      id={id}
                      type="text"
                      value={values[f.pdf_field_name] ?? ''}
                      onChange={(e) => onChange(f, e.target.value)}
                      {...commonProps}
                    />
                  )}
                  {f.type === 'checkbox' && (
                    <input
                      id={id}
                      type="checkbox"
                      checked={Boolean(values[f.pdf_field_name])}
                      onChange={(e) => onChange(f, e.target.checked)}
                      {...commonProps}
                    />
                  )}
                  {f.type === 'select' && (
                    <select
                      id={id}
                      value={values[f.pdf_field_name] ?? ''}
                      onChange={(e) => onChange(f, e.target.value)}
                      {...commonProps}
                    >
                      <option value="">선택...</option>
                      {(f.options || []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                  <div role="status" aria-live="polite" style={{ color: '#d00', minHeight: 16 }}>
                    {err}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
      <button type="submit" aria-disabled={hasErrors}>Next</button>
    </form>
  );
}
