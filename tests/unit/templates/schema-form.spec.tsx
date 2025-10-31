/* @vitest-environment happy-dom */
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SchemaForm, { UISchema } from '../../../src/app/templates/_components/SchemaForm';

const schema: UISchema = {
  sections: [
    {
      section_id: 's1',
      title: '기본',
      fields: [
        { type: 'text', pdf_field_name: 'company', label: '회사명', required: true },
        { type: 'checkbox', pdf_field_name: 'need_demo', label: '데모 요청' },
        { type: 'select', pdf_field_name: 'size', label: '규모', required: true, options: ['S', 'M'] },
      ],
    },
  ],
};

describe('SchemaForm', () => {
  beforeEach(() => {
    // noop
  });

  it('renders fields and labels', () => {
    render(<SchemaForm templateId="t1" schema={schema} />);
    expect(screen.getByLabelText(/회사명/)).toBeInTheDocument();
    expect(screen.getByLabelText(/데모 요청/)).toBeInTheDocument();
    expect(screen.getByLabelText(/규모/)).toBeInTheDocument();
  });

  it('validates required text/select and shows errors', () => {
    render(<SchemaForm templateId="t1" schema={schema} />);
    const submit = screen.getAllByRole('button', { name: 'Next' })[0];
    fireEvent.submit(submit);
    // required text error
    expect(screen.getAllByRole('status').some((el) => el.textContent?.includes('필수'))).toBe(true);
    // set select invalid then valid
    const select = screen.getAllByLabelText(/규모/)[0] as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'X' } });
    expect(screen.getAllByRole('status').some((el) => el.textContent?.includes('유효한 옵션'))).toBe(true);
    fireEvent.change(select, { target: { value: 'S' } });
    expect(screen.getAllByRole('status').some((el) => el.textContent?.includes('유효한 옵션'))).toBe(false);
  });

  it('moves focus to first invalid field on submit', async () => {
    render(<SchemaForm templateId="t1" schema={schema} />);
    const submit = screen.getAllByRole('button', { name: 'Next' })[0];
    // Trigger submit with empty required fields
    submit.click();
    await waitFor(() => {
      const active = document.activeElement as HTMLElement | null;
      expect(!!active && active.id === 'company').toBe(true);
    });
  });

  it('resets state and focuses first input on templateId change', async () => {
    const { rerender } = render(<SchemaForm templateId="t1" schema={schema} />);
    const input = screen.getAllByLabelText(/회사명/)[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'ACME' } });
    expect(input.value).toBe('ACME');
    rerender(<SchemaForm templateId="t2" schema={schema} />);
    await waitFor(() => {
      const inputs = screen.getAllByLabelText(/회사명/) as HTMLInputElement[];
      const last = inputs[inputs.length - 1];
      expect(last.value).toBe('');
    });
  });
});
