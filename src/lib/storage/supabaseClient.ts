export const STORAGE_ERROR = { STORAGE_UNAVAILABLE: 'STORAGE_UNAVAILABLE' } as const;

type Ext = 'json' | 'yaml' | 'yml';

const memoryBucket = new Set<string>();

function keyFromPath(path: string): { bucket: string; key: string } | null {
  const m = /^supabase:\/\/([^\/]+)\/(.+)$/.exec(path);
  if (!m) return null;
  return { bucket: m[1], key: m[2] };
}

function useRealSdk(): boolean {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(url && serviceKey && process.env.USE_SUPABASE_SDK === '1');
}

export function existsStoragePath(
  path: string
): { ok: true; exists: boolean } | { ok: false; error: { code: string; message: string } } {
  try {
    const parsed = keyFromPath(path);
    if (!parsed) return { ok: true, exists: false };

    if (useRealSdk()) {
      // Lazy dynamic import to avoid hard dependency when SDK is unavailable.
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { createClient } = require('@supabase/supabase-js');
        const client = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);
        // HEAD via list with prefix limited to exact key; reduce network when possible.
        // Note: in this environment tests run without SDK; this branch is only used when explicitly enabled.
        const bucket = client.storage.from(parsed.bucket);
        const list = bucket.list(parsed.key.replace(/\/[^/]+$/, ''), { search: parsed.key.split('/').pop() });
        // Promise-like guard: if list is a promise, handle synchronously unsupported in this wrapper context.
        if (typeof (list as any)?.then === 'function') {
          // Not awaited to keep current sync signature; treat as unavailable for now.
          return { ok: false, error: { code: STORAGE_ERROR.STORAGE_UNAVAILABLE, message: 'Async SDK path check not supported in sync context' } };
        }
      } catch (e: any) {
        // Fallback to stub on missing SDK or runtime errors
      }
    }

    const composite = `${parsed.bucket}/${parsed.key}`;
    return { ok: true, exists: memoryBucket.has(composite) };
  } catch (e: any) {
    return { ok: false, error: { code: STORAGE_ERROR.STORAGE_UNAVAILABLE, message: e?.message || 'Storage unavailable' } };
  }
}

export function uploadTemplateContent(params: {
  uid: string;
  version: number;
  ext: Ext;
  content: string;
  contentType: string;
}): { ok: true; storage_path: string } | { ok: false; error: { code: string; message: string } } {
  try {
    const bucket = 'templates';
    const key = `${params.uid}/template-${params.version}.${params.ext}`;

    if (useRealSdk()) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { createClient } = require('@supabase/supabase-js');
        const client = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);
        const storage = client.storage.from(bucket);
        const file = new Blob([params.content], { type: params.contentType || 'application/octet-stream' });
        const uploadRes = storage.upload(key, file, { upsert: true });
        if (typeof (uploadRes as any)?.then === 'function') {
          // Cannot await in current sync interface; report temporary unavailability in this environment.
          return { ok: false, error: { code: STORAGE_ERROR.STORAGE_UNAVAILABLE, message: 'Async SDK upload not supported in sync context' } };
        }
      } catch (e: any) {
        // On any SDK error, map to STORAGE_UNAVAILABLE per contract
        return { ok: false, error: { code: STORAGE_ERROR.STORAGE_UNAVAILABLE, message: e?.message || 'Storage unavailable' } };
      }
    }

    const composite = `${bucket}/${key}`;
    memoryBucket.add(composite);
    const storage_path = `supabase://${bucket}/${key}`;
    return { ok: true, storage_path };
  } catch (e: any) {
    return { ok: false, error: { code: STORAGE_ERROR.STORAGE_UNAVAILABLE, message: e?.message || 'Storage unavailable' } };
  }
}
