// Regenerate the site's screenshots (landing + docs).
//
// 1. Run a seeded demo instance (separate from your real one):
//      docker compose -p stache-demo -f /tmp/stache-demo/compose.yml up -d
//    Seed it via the API (areas, labeled bins, items with photos, an out/lent
//    item, something in the trash) — or reuse an existing seeded instance.
// 2. npm i -D playwright-core && node tools/shots.mjs
//
// Env: STACHE_URL (default http://localhost:8181), STACHE_EMAIL, STACHE_PASS,
//      AREA_ID (a labeled area with items), ITEM_ID (an item with a photo),
//      CHROMIUM (default /usr/bin/chromium-browser).
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const BASE = process.env.STACHE_URL ?? 'http://localhost:8181';
const EMAIL = process.env.STACHE_EMAIL ?? 'demo@stache.local';
const PASS = process.env.STACHE_PASS ?? 'demo-password-123';
const AREA_ID = process.env.AREA_ID ?? '';
const ITEM_ID = process.env.ITEM_ID ?? '';

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/usr/bin/chromium-browser',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  colorScheme: 'dark',
});
const page = await ctx.newPage();
await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' });
await page.fill('input[placeholder="Email"]', EMAIL);
await page.fill('input[placeholder="Password"]', PASS);
await page.click('button[type="submit"], button:has-text("Sign in")');
await page.waitForTimeout(2500);

// Landing-page phones -> public/shots/
const landing = [
  ['home', '/'],
  ['area', `/areas/${AREA_ID}`],
  ['search', '/search?q=drill'],
  ['out', '/out'],
  ['trash', '/trash'],
];
// Doc illustrations -> public/shots-docs/
const docs = [
  ['labels', '/labels'],
  ['item', `/items/${ITEM_ID}`],
  ['browse', '/browse'],
  ['settings', '/settings'],
];

for (const [dir, list] of [['shots', landing], ['shots-docs', docs]]) {
  for (const [name, path] of list) {
    if (path.includes('undefined') || path.endsWith('//')) continue;
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const buf = await page.screenshot();
    await sharp(buf).webp({ quality: 82 }).toFile(`public/${dir}/${name}.webp`);
    console.log('shot', `${dir}/${name}.webp`);
  }
}
await browser.close();
