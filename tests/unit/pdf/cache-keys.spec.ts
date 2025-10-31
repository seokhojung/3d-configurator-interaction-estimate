/* @vitest-environment happy-dom */
import { describe, it, expect } from 'vitest';
import { makeTemplatePdfCacheKey } from '../../../src/lib/pdf/util';

describe('pdf cache keys', () => {
  it('makes stable key for same values order', () => {
    const a = makeTemplatePdfCacheKey('t1', { x: 1, y: 2 });
    const b = makeTemplatePdfCacheKey('t1', { x: 1, y: 2 });
    expect(a).toBe(b);
  });

  it('changes key when values change', () => {
    const a = makeTemplatePdfCacheKey('t1', { x: 1 });
    const b = makeTemplatePdfCacheKey('t1', { x: 2 });
    expect(a).not.toBe(b);
  });
});

