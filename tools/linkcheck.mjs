#!/usr/bin/env node
// Internal link check for the Astro/Starlight site.
// - root-relative links ("/docs/x", "/credits") must map to a real route
// - relative links in markdown ("./page.md", "../x/y.md") resolve to docs slugs
// - fragments are stripped; the target page must exist (anchors not verified)
// - external URLs, mailto:, template/dynamic links are ignored
import fs from 'node:fs';
import path from 'node:path';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function runSiteLinkCheck(root) {
  const docsDir = path.join(root, 'src/content/docs/docs');
  const pagesDir = path.join(root, 'src/pages');

  const routes = new Set(['/', '/credits/', '/docs/']);
  const slugOf = (p) => {
    let s = p.slice(docsDir.length).replace(/\\/g, '/').replace(/\.(md|mdx)$/, '');
    if (s.endsWith('/index')) s = s.slice(0, -6);
    return '/docs' + s + '/';
  };
  const walk = (dir, cb) => {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      if (fs.statSync(p).isDirectory()) walk(p, cb);
      else cb(p);
    }
  };
  const docs = [];
  if (fs.existsSync(docsDir)) {
    walk(docsDir, (p) => {
      if (/\.(md|mdx)$/.test(p)) { docs.push(p); routes.add(slugOf(p)); }
    });
  }
  if (fs.existsSync(pagesDir)) {
    for (const f of fs.readdirSync(pagesDir)) {
      if (f.endsWith('.astro')) routes.add('/' + f.replace(/\.astro$/, '/'));
    }
  }

  const broken = [];
  const checkTarget = (file, raw) => {
    const t = raw.split('#')[0].split('?')[0];
    if (!t || t.startsWith('//') || t.startsWith('{') || t.includes('${')) return;
    if (/^[a-z]+:/i.test(t)) return; // external scheme (https:, mailto:, ...)
    if (t.startsWith('/')) {
      const route = t.endsWith('/') ? t : t + '/';
      if (!routes.has(route)) broken.push({ file, target: raw, why: 'no such route' });
      return;
    }
    // Relative link - resolve against the markdown file's location.
    const abs = path.resolve(path.dirname(file), t);
    if (fs.existsSync(abs)) return; // a real file (image, asset, dir)
    const docHits = [
      abs + '.md', abs + '.mdx',
      path.join(abs, 'index.md'), path.join(abs, 'index.mdx'),
    ];
    if (!docHits.some((c) => fs.existsSync(c)))
      broken.push({ file, target: raw, why: 'unresolvable relative link' });
  };

  const files = [
    ...(fs.existsSync(pagesDir)
      ? fs.readdirSync(pagesDir).filter((f) => f.endsWith('.astro')).map((f) => path.join(pagesDir, f))
      : []),
    path.join(root, 'astro.config.mjs'),
    ...docs,
  ].filter((f) => fs.existsSync(f));

  const mdLink = /\]\(\s*([^)\s"']+)/g;
  const hrefRe = /(?:href|to)=["']([^"']+)["']/g;
  const slugRe = /slug:\s*['"]([^'"]+)['"]/g;
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(mdLink)) checkTarget(file, m[1]);
    for (const m of text.matchAll(hrefRe)) checkTarget(file, m[1]);
    for (const m of text.matchAll(slugRe)) {
      checkTarget(file, '/' + m[1].replace(/^\/+|\/+$/g, '') + '/');
    }
  }
  return { routes, broken };
}

// CLI entry
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const { routes, broken } = runSiteLinkCheck(root);
  for (const b of broken) console.error(`x ${b.file.slice(root.length + 1)} -> ${b.target} (${b.why})`);
  if (broken.length) {
    console.error(`\n${broken.length} broken internal link(s)`);
    process.exit(1);
  }
  console.log(`linkcheck: ${routes.size} routes, all internal links resolve`);
}
