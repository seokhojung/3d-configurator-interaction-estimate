import React from 'react';
import TemplateList from './_components/TemplateList';
import { listTemplates } from '../../lib/templates/service';

export default function TemplatesPage() {
  const items = listTemplates().sort((a, b) => a.name.localeCompare(b.name));
  return (
    <main>
      <h1>Templates</h1>
      <TemplateList items={items} />
    </main>
  );
}
