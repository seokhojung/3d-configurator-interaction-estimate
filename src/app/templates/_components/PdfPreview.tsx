"use client";
import React from 'react';

export default function PdfPreview({ src }: { src: string }) {
  return (
    <section aria-labelledby="pdf-preview-title">
      <h2 id="pdf-preview-title">PDF Preview</h2>
      <iframe title="PDF Preview" src={src} style={{ width: '100%', height: 480, border: '1px solid #ccc' }} />
    </section>
  );
}

