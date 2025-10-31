import { handleGetTemplates, RequestLike, ResponseLike } from '../../api/templates';
import { ErrorBody, TemplateMetadata } from './types';

export interface ApiOk<T> { ok: true; data: T }
export interface ApiErr { ok: false; status: number; error: ErrorBody }
export type ApiResult<T> = ApiOk<T> | ApiErr;

function authHeaderFor(uid: string): string {
  return `Bearer user-${uid}`;
}

function sortByNameAsc(list: TemplateMetadata[]): TemplateMetadata[] {
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
}

export function groupByType(list: TemplateMetadata[]): Record<'basic' | 'advanced', TemplateMetadata[]> {
  return {
    basic: list.filter((t) => t.type === 'basic'),
    advanced: list.filter((t) => t.type === 'advanced'),
  };
}

export async function fetchTemplates(uid: string): Promise<ApiResult<TemplateMetadata[]>> {
  const req: RequestLike = {
    method: 'GET',
    url: '/api/templates',
    headers: { Authorization: authHeaderFor(uid) },
  };
  const res: ResponseLike = await handleGetTemplates(req);
  if (res.status !== 200) {
    return { ok: false, status: res.status, error: (res.body || { code: 'UNKNOWN', message: 'Unknown error' }) as ErrorBody };
  }
  const data = Array.isArray(res.body) ? (res.body as TemplateMetadata[]) : [];
  return { ok: true, data: sortByNameAsc(data) };
}

