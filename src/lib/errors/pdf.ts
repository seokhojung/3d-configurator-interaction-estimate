export type PdfErrorCode =
  | 'PDF_TIMEOUT'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'GENERATOR_UNAVAILABLE'
  | 'PDF_ERROR'
  | string;

const defaultMessages: Record<string, string> = {
  PDF_TIMEOUT: 'PDF 생성 시간이 초과되었습니다 (5초). 다시 시도해 주세요.',
  UNAUTHORIZED: '인증이 필요합니다.',
  NOT_FOUND: '템플릿을 찾을 수 없습니다.',
  VALIDATION_ERROR: '입력 데이터가 유효하지 않습니다.',
  GENERATOR_UNAVAILABLE: 'PDF 생성 서비스를 사용할 수 없습니다.',
  PDF_ERROR: 'PDF 생성 중 오류가 발생했습니다.',
};

export function getPdfErrorMessage(code: PdfErrorCode, t?: (key: string) => string): string {
  // If i18n translator provided, prefer translation keys like 'pdf.error.PDF_TIMEOUT'
  if (t) {
    const key = `pdf.error.${code}`;
    const translated = t(key);
    if (translated && translated !== key) return translated;
  }
  return defaultMessages[code] || `오류가 발생했습니다: ${code}`;
}

