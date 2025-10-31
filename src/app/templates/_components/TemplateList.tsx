"use client";
import React, { useMemo, useState } from 'react';
import type { TemplateMetadata } from '../../../lib/templates/types';

type Filter = 'all' | 'basic' | 'advanced';

export interface TemplateListProps {
  items: TemplateMetadata[];
  onSelect?: (id: string) => void;
  selectedId?: string | null;
}

export function TemplateList({ items, onSelect, selectedId: externalSelected }: TemplateListProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(externalSelected ?? null);

  const filtered = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter((t) => t.type === filter);
  }, [items, filter]);

  function handleSelect(id: string) {
    setSelectedId(id);
    onSelect?.(id);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const idx = filtered.findIndex((t) => t.id === selectedId);
    if (e.key === 'ArrowDown') {
      const next = filtered[Math.min(idx + 1, filtered.length - 1)]?.id ?? filtered[0]?.id;
      if (next) handleSelect(next);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      const prev = filtered[Math.max(idx - 1, 0)]?.id ?? filtered[filtered.length - 1]?.id;
      if (prev) handleSelect(prev);
      e.preventDefault();
    } else if (e.key === 'Enter' && selectedId) {
      // noop – selection already set; proceed button uses selectedId
      e.preventDefault();
    }
  }

  const proceedHref = selectedId ? `?templateId=${encodeURIComponent(selectedId)}` : undefined;

  return (
    <div>
      <div role="group" aria-label="Filters">
        <button aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All</button>
        <button aria-pressed={filter === 'basic'} onClick={() => setFilter('basic')}>Basic</button>
        <button aria-pressed={filter === 'advanced'} onClick={() => setFilter('advanced')}>Advanced</button>
      </div>

      <div
        role="list"
        aria-label="Templates"
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ outline: 'none' }}
      >
        {filtered.length === 0 && <div role="status">No templates</div>}
        {filtered.map((t) => (
          <div
            role="listitem"
            key={t.id}
            aria-selected={t.id === selectedId}
            onClick={() => handleSelect(t.id)}
            style={{ cursor: 'pointer', padding: '4px 8px', borderBottom: '1px solid #eee' }}
            data-testid={`template-${t.id}`}
          >
            <div><strong>{t.name}</strong> {t.version ? `(v${t.version})` : null}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{t.type}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        {proceedHref ? (
          <a href={proceedHref} aria-disabled={false}>Proceed</a>
        ) : (
          <a aria-disabled={true}>Proceed</a>
        )}
      </div>
    </div>
  );
}

export default TemplateList;
