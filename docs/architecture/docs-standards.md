# Documentation Standards

Status: Draft

## Link Style
- Use workspace-relative paths starting with `docs/`.
- Prefer inline code format for source citations inside stories: `docs/path/file.markdown#section-anchor` (placeholder).
- For narrative hyperlinks, use markdown links: `[text](docs/path/file.markdown#section-anchor)` (placeholder).
- Keep anchors lowercase; follow renderer rules (spaces → `-`, punctuation stripped). Korean titles are allowed.

## Anchors
- Create anchors by adding headings (e.g., `## 코딩 규약 요약`).
- Avoid slashes `/` in headings; replace with no slash or a hyphen to ensure stable slugs.
- When uncertain, check the rendered slug and reference exactly.

## Path Policy
- Do not use bare filenames like `prd.md`; always prefix with `docs/prd/...`.
- Architecture docs: `docs/architecture/...`
- PRD docs: `docs/prd/...`
- QA docs: `docs/qa/...`
- Story cross-reference: `docs/stories/...`

## Examples
- Source citation: `Source: docs/architecture/test-stack.md#execution`
- Story reference: `docs/stories/1.4.story.md`
- PRD AC: `docs/prd/acceptance-criteria.md#fr2-템플릿-저장-supabase-storage`

## Notes
- Keep references stable; update headings or links together.
- Prefer specific section anchors over whole-document references where helpful.
