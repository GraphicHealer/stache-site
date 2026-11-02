#!/usr/bin/env node
// Internal link check: every `/…` link in the landing page and docs must map
// to a real page (src/content/docs/docs/** slugs or a src/pages/*.astro file).
// External links are not fetched - no flaky network dependence in CI.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = join(root, 'src/content/docs/docs');
const pagesDir = join(root, 'src/pages');

// Real routes: every content doc (index maps to its dir) + each src/pages file.
const routes = new Set(['/', '/credits/']);
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(md|mdx)$/.test(f)) {
      let slug = p.slice(docsDir.length).replace(/\\/g, '/').replace(/\.(md|mdx)$/, '');
      if (slug.endsWith('/index')) slug = slug.slice(0, -6);
      routes.add('/docs' + (slug === '/index' ? '/' : slug) + '/');
    }
  }
};
walk(docsDir);
for (const f of readdirSync(pagesDir)) if (f.endsWith('.astro')) routes.add('/' + f.replace(/\.astro$/, '/'));
routes.add('/docs/'); // docs landing

// Sources to scan: index.astro + all docs content + astro.config.mjs slugs.
const sources = [
  join(root, 'src/pages/index.astro'),
  join(root, 'src/pages/credits.astro'),
  join(root, 'astro.config.mjs'),
  ...(() => { const out = []; const w = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) w(p); else if (/\.(md|mdx)$/.test(f)) out.push(p); } }; w(docsDir); return out; })(),
];

const linkRe = /(?:\(|href=|href:"|to=|slug:\s*)["'(]\s*(\/[^\s"')#\]]*)/g;
let bad = 0;
for (const file of sources) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(linkRe)) {
    const path = m[1].split('#')[0].split('?')[0];
    if (!path || path.startsWith('//')) continue;
    const target = path.endsWith('/') ? path : path + '/';
    // Allow any /docs/* style prefix even if BASE_PATH varies.
    if (!routes.has(target) && !routes.has(target.replace(/^\//, '')) ) {
      console.error(`✗ ${file.slice(root.length + 1)} -> ${path}`);
      bad++;
    }
  }
}
if (bad) {
  console.error(`\n${bad} broken internal link(s)`);
  process.exit(1);
}
console.log(`linkcheck: ${[...routes].length} routes, all internal links resolve`);
