// Self-test for linkcheck.mjs: builds a fixture site in a temp dir and checks
// that valid links pass and broken ones are reported.
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { runSiteLinkCheck } from './linkcheck.mjs';

const root = mkdtempSync(join(tmpdir(), 'linkcheck-'));
mkdirSync(join(root, 'src/content/docs/docs/using'), { recursive: true });
mkdirSync(join(root, 'src/content/docs/docs/extras'), { recursive: true });
mkdirSync(join(root, 'src/pages'), { recursive: true });

writeFileSync(
  join(root, 'src/pages/index.astro'),
  `<html><a href="/docs/using/a/">ok</a><a href="/docs/nope/">bad</a><a href="https://example.com">ext</a></html>`,
);
writeFileSync(join(root, 'astro.config.mjs'), `export default { sidebar: [{ slug: 'docs/using/a' }] };`);
writeFileSync(
  join(root, 'src/content/docs/docs/using/a.md'),
  '[rel](./b.md) [up](../extras/x.md) [abs](/docs/extras/x/) [frag](./b.md#h) [missing](./ghost.md)',
);
writeFileSync(join(root, 'src/content/docs/docs/using/b.md'), '# b');
writeFileSync(join(root, 'src/content/docs/docs/extras/x.md'), '# x');

const { broken } = runSiteLinkCheck(root);
const targets = broken.map((b) => b.target);
assert.equal(broken.length, 2, JSON.stringify(broken, null, 2));
assert.ok(targets.includes('/docs/nope/'), 'missing route not reported');
assert.ok(targets.includes('./ghost.md'), 'missing relative link not reported');
console.log('linkcheck selftest: pass');

// Reduced-motion regression: the override must be at least as specific as the
// base `html.js .reveal` rule or it silently loses and users get animations.
import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const css = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '../src/styles/landing.css'),
  'utf8',
);
const motionBlock = css.match(
  /@media \(prefers-reduced-motion:\s*reduce\)\s*\{(?:[^{}]|\{[^{}]*\})*\}/s,
);
assert.ok(motionBlock, 'no prefers-reduced-motion block found');
assert.ok(
  motionBlock[0].includes('html.js .reveal'),
  'reduced-motion rule lost specificity vs html.js .reveal',
);
assert.ok(motionBlock[0].includes('opacity: 1'), 'reduced-motion must force visible');
assert.ok(
  motionBlock[0].includes('scroll-behavior: auto') &&
    motionBlock[0].includes('animation: none'),
  'reduced-motion must kill smooth scroll + cue animation',
);
console.log('reduced-motion check: pass');
