import { describe, it, expect } from 'vitest';
import { validateTemplateSchema } from '../../src/lib/templates/schema';

describe('Unit: TemplateSchema validator', () => {
  it('accepts minimal valid schema', () => {
    const obj = { sections: [{ fields: [{ pdf_field_name: 'P1' }] }] };
    const res = validateTemplateSchema(obj);
    expect(res).toBeNull();
  });

  it('detects missing sections and pdf_field_name', () => {
    const obj = { something: 1 } as any;
    const res = validateTemplateSchema(obj);
    expect(res && Array.isArray(res.missing)).toBe(true);
    if (!res) return;
    expect(res.missing!.some(k => k === 'sections')).toBe(true);
  });

  it('detects type errors', () => {
    const obj = { sections: { not: 'array' } } as any;
    const res = validateTemplateSchema(obj);
    expect(res && res.typeErrors && res.typeErrors.length > 0).toBe(true);
  });
});

