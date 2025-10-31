"use client";
import React, { useEffect, useState } from 'react';
import SchemaForm, { UISchema } from './SchemaForm';
import PdfPreview from './PdfPreview';
import { generatePdf, type GeneratePdfOptions } from '../../../lib/pdf/request';
import { getPdfErrorMessage } from '../../../lib/errors/pdf';
import { createPdfBlobUrl, makeTemplatePdfCacheKey } from '../../../lib/pdf/util';

function getMockSchema(templateId: string): UISchema | null {
  if (!templateId) return null;
  return {
    sections: [
      {
        section_id: 'basic',
        title: '기본 정보',
        fields: [
          { type: 'text', pdf_field_name: 'company', label: '회사명', required: true },
          { type: 'checkbox', pdf_field_name: 'need_demo', label: '데모 요청' },
          { type: 'select', pdf_field_name: 'size', label: '규모', options: ['S', 'M', 'L'], required: true },
        ],
      },
    ],
  };
}

type Mode = 'preview' | 'download';

export default function EditPageClient({ templateId, pdfOptions }: { templateId: string; pdfOptions?: GeneratePdfOptions }) {
  const [mode, setMode] = useState<Mode>('preview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [lastValues, setLastValues] = useState<Record<string, any>>({});
  const [previewCacheKey, setPreviewCacheKey] = useState<string | null>(null);

  // Revoke blob URLs on change/unmount to avoid leaks
  useEffect(() => {
    return () => {
      if (previewSrc && previewSrc.startsWith('blob:')) {
        try { URL.revokeObjectURL(previewSrc); } catch {}
      }
    };
  }, [previewSrc]);

  if (!templateId) return <div role="alert">templateId가 필요합니다</div>;
  const schema = getMockSchema(templateId);
  if (!schema) return <div role="status">스키마가 없습니다</div>;

  async function onGenerate() {
    setError(null);
    setLoading(true);
    try {
      const { dataUrl, pdfBase64 } = await generatePdf(templateId, lastValues, { timeoutMs: 5000, ...(pdfOptions || {}) });
      const blobUrl = pdfBase64 ? createPdfBlobUrl(pdfBase64) : null;
      const url = blobUrl || dataUrl;
      if (mode === 'preview') {
        setPreviewSrc(url);
      } else {
        const a = document.createElement('a');
        a.href = url;
        a.download = `quote-${templateId}-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (e: any) {
      const code = e?.code || 'PDF_ERROR';
      setError(getPdfErrorMessage(code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Template Edit</h1>
      <div style={{ marginBottom: 12 }}>
        <label>
          <input type="radio" name="mode" value="preview" checked={mode === 'preview'} onChange={() => setMode('preview')} /> Preview
        </label>
        <label style={{ marginLeft: 12 }}>
          <input type="radio" name="mode" value="download" checked={mode === 'download'} onChange={() => setMode('download')} /> Download
        </label>
        <button onClick={onGenerate} disabled={loading} aria-busy={loading} aria-label="Generate PDF" style={{ marginLeft: 12 }}>
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </div>
      {error && (
        <div role="alert" aria-live="assertive" style={{ color: '#d00', marginBottom: 8 }}>
          {error}
        </div>
      )}
      <SchemaForm
        templateId={templateId}
        schema={schema}
        onValuesChange={(vals) => {
          setLastValues(vals);
          // Clear preview when inputs change to respect cache invalidation note
          setPreviewSrc(null);
          setPreviewCacheKey(makeTemplatePdfCacheKey(templateId, vals));
        }}
      />
      {previewSrc && mode === 'preview' && <PdfPreview src={previewSrc} />}
    </main>
  );
}
