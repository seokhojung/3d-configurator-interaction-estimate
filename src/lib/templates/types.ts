export type TemplateType = 'basic' | 'advanced';

export interface TemplateMetadata {
  id: string;
  name: string;
  type: TemplateType;
  storage_path: string;
  version: number;
  created_by: string;
  created_at: string;
}

export interface ErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export interface CreateTemplateInput {
  name?: string;
  type?: string;
  storage_path?: string;
  version?: number;
}

