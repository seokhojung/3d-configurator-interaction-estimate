/* @vitest-environment happy-dom */
import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import TemplateList from '../../../src/app/templates/_components/TemplateList';

const items = [
  { id: 'a', name: 'Alpha', type: 'basic', storage_path: 'supabase://templates/u/a.json', version: 1, created_by: 'u', created_at: 't' },
  { id: 'b', name: 'Beta', type: 'advanced', storage_path: 'supabase://templates/u/b.json', version: 1, created_by: 'u', created_at: 't' },
  { id: 'c', name: 'Gamma', type: 'basic', storage_path: 'supabase://templates/u/c.json', version: 2, created_by: 'u', created_at: 't' },
];

describe('TemplateList', () => {
  afterEach(() => cleanup());
  it('renders list and supports filter buttons', () => {
    render(<TemplateList items={items} />);
    // default shows all
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();

    // filter basic
    fireEvent.click(screen.getByRole('button', { name: 'Basic' }));
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('supports selection via click and updates proceed href', () => {
    render(<TemplateList items={items} />);
    const item = screen.getByTestId('template-b');
    fireEvent.click(item);
    expect(item).toHaveAttribute('aria-selected', 'true');
    const proceed = screen.getByText('Proceed');
    expect(proceed).toHaveAttribute('href', '?templateId=b');
  });

  it('supports keyboard navigation and selection', () => {
    render(<TemplateList items={items} />);
    const list = screen.getByRole('list', { name: 'Templates' });
    list.focus();

    // ArrowDown selects first when none selected
    fireEvent.keyDown(list, { key: 'ArrowDown' });
    const first = screen.getByTestId('template-a');
    expect(first).toHaveAttribute('aria-selected', 'true');

    // Move down
    fireEvent.keyDown(list, { key: 'ArrowDown' });
    const second = screen.getByTestId('template-b');
    expect(second).toHaveAttribute('aria-selected', 'true');

    // Enter keeps selection; proceed href updated
    fireEvent.keyDown(list, { key: 'Enter' });
    const proceed = screen.getByText('Proceed');
    expect(proceed).toHaveAttribute('href', '?templateId=b');
  });
});
