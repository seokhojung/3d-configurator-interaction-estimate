import React from 'react';
import EditPageClient from '../_components/EditPageClient';

export default async function TemplatesEditPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[]>> }) {
  const params = (await searchParams) || {};
  const templateIdParam = params.templateId as string | string[] | undefined;
  const templateId = Array.isArray(templateIdParam) ? templateIdParam[0] : (templateIdParam || '');
  return <EditPageClient templateId={templateId} />;
}
