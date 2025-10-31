/* @vitest-environment happy-dom */
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import EditPageClient from '../../../src/app/templates/_components/EditPageClient';

describe('integration: templates/edit page client', () => {
  it('shows error when templateId missing', () => {
    render(<EditPageClient templateId="" />);
    expect(screen.getByRole('alert')).toHaveTextContent('templateId');
  });

  it('renders form when templateId provided', () => {
    render(<EditPageClient templateId="demo" />);
    expect(screen.getByText('Template Edit')).toBeInTheDocument();
    expect(screen.getByLabelText(/회사명/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });
});
