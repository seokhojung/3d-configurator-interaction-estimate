// Simple docs anchor checker
// Scans docs/**/*.md for:
//  1) Markdown links: [text](path/file.md#anchor)
//  2) Inline code refs: `path/file.md#anchor`
// Validates file existence and anchor presence (based on headings)
// Exit code: 0 when clean, 1 when issues found
import fs from 'node:fs';
import path from 'node:path';

const workspace = process.cwd();
const docsRoot = path.join(workspace, 'docs');

function listMarkdownFiles(dir) {
  const out = [];
  function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && e.name.toLowerCase().endsWith('.md')) out.push(full);
    }
  }
  if (fs.existsSync(dir)) walk(dir);
  return out;
}

function readFileLines(file) {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/);
}

function slugify(text) {
  return text
    .trim()
    .toLowerCase()
    // remove control chars
    .replace(/[\u0000-\u001F]/g, '')
    // remove punctuation except spaces and hyphens; keep unicode letters/numbers
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    // spaces to hyphens; do not collapse multiple hyphens to match common renderers
    .replace(/\s/g, '-');
}

function extractAnchors(file) {
  const lines = readFileLines(file);
  const anchors = new Set();
  for (const line of lines) {
    const m = line.match(/^#{1,6}\s+(.*)$/);
    if (m) anchors.add(slugify(m[1]));
  }
  return anchors;
}

function findReferences(file) {
  const content = fs.readFileSync(file, 'utf8');
  const refs = [];
  // Markdown links
  const linkRe = /\[[^\]]*\]\(([^)\s]+?\.md)#([^)#\s]+)\)/g;
  // Inline code refs
  const codeRe = /`([^`\s]+?\.md)#([^`\s]+)`/g;
  let m;
  while ((m = linkRe.exec(content))) {
    refs.push({ type: 'link', path: m[1], anchor: m[2] });
  }
  while ((m = codeRe.exec(content))) {
    refs.push({ type: 'code', path: m[1], anchor: m[2] });
  }
  return refs;
}

function normalizePath(p) {
  // Prefer workspace-relative paths; allow absolute-like docs/ paths
  let np = p.replace(/^\.\//, '');
  const full = path.isAbsolute(np) ? np : path.join(workspace, np);
  return path.normalize(full);
}

const mdFiles = listMarkdownFiles(docsRoot);
const anchorCache = new Map();
const issues = [];

for (const file of mdFiles) {
  const refs = findReferences(file);
  for (const r of refs) {
    const targetFile = normalizePath(r.path);
    if (!fs.existsSync(targetFile)) {
      issues.push({ file, kind: 'missing-file', ref: r, note: 'Target file not found' });
      continue;
    }
    let anchors = anchorCache.get(targetFile);
    if (!anchors) {
      anchors = extractAnchors(targetFile);
      anchorCache.set(targetFile, anchors);
    }
    const anchor = r.anchor.trim();
    if (!anchors.has(anchor)) {
      issues.push({ file, kind: 'missing-anchor', ref: r, note: `Available: ${[...anchors].join(', ')}` });
    }
  }
}

if (issues.length) {
  console.error('Docs anchor check found issues:');
  for (const i of issues) {
    console.error(`- ${path.relative(workspace, i.file)} → ${i.ref.path}#${i.ref.anchor} [${i.kind}]`);
    if (i.note) console.error(`  ${i.note}`);
  }
  process.exit(1);
} else {
  console.log('Docs anchor check passed.');
}
