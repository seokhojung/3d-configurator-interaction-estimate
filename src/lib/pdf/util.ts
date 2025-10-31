export function base64ToUint8Array(base64: string): Uint8Array {
  if (typeof Buffer !== 'undefined') {
    // Node/test env
    return new Uint8Array(Buffer.from(base64, 'base64'));
  }
  // Browser fallback
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export function createPdfBlobUrl(pdfBase64: string): string | null {
  try {
    const bytes = base64ToUint8Array(pdfBase64);
    const blob = new Blob([bytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

// Simple FNV-1a 32-bit hash for deterministic cache keys
export function fnv1a(str: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  // Convert to unsigned and hex
  return (h >>> 0).toString(16).padStart(8, '0');
}

export function makeTemplatePdfCacheKey(templateId: string, values: Record<string, any>): string {
  const payload = JSON.stringify(values ?? {});
  return `${templateId}:${fnv1a(payload)}`;
}

