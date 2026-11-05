// Regenerate the site's screenshots (landing + docs), dark AND light.
// Dark output keeps the canonical name (name.webp); light gets -light.webp.
//
// 1. Run a seeded demo instance (separate from your real one), seeded via
//    tools/seed-print.mjs + tools/seed-items.mjs.
// 2. Temporarily add the demo origin to STACHE_TRUSTED_ORIGINS, recreate.
// 3. node tools/shots.mjs
//
// Env: STACHE_URL (route target, default http://localhost:8181),
//      STACHE_DEMO_ORIGIN (public origin shown in captures,
//        default https://demo.stacheit.app),
//      STACHE_EMAIL, STACHE_PASS,
//      AREA_ID (a labeled area with items), ITEM_ID (an item with a photo),
//      CHROMIUM (browser executable).
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const DEMO_ORIGIN = process.env.STACHE_DEMO_ORIGIN ?? 'https://demo.stacheit.app';
const BASE = process.env.STACHE_URL ?? 'http://localhost:8181';
const EMAIL = process.env.STACHE_EMAIL ?? 'dali@stache.local';
const PASS = process.env.STACHE_PASS ?? 'demo-password-123';
const AREA_ID = process.env.AREA_ID ?? '';
const ITEM_ID = process.env.ITEM_ID ?? '';

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/usr/bin/chromium-browser',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors'],
});

// Landing-page phones -> public/shots/
// Optional 3rd element: text to scroll into view before shooting.
const landing = [
  ['item', `/items/${ITEM_ID}`],
  ['labels', '/labels'],
  ['area', `/areas/${AREA_ID}`],
  ['search', '/search?q=drill'],
  ['mcp', '/settings', 'API tokens'],
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

for (const scheme of ['dark', 'light']) {
  const suffix = scheme === 'dark' ? '' : '-light';
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    colorScheme: scheme,
    ignoreHTTPSErrors: true,
  });
  // Route the demo origin to the local instance so QRs/banners show a
  // safe public URL, never localhost/private IPs/tunnels.
  await ctx.route(`${DEMO_ORIGIN}/**`, async (route) => {
    const u = new URL(route.request().url());
    const res = await route.fetch({ url: `${BASE}${u.pathname}${u.search}` });
    await route.fulfill({ response: res });
  });
  const page = await ctx.newPage();
  await page.goto(`${DEMO_ORIGIN}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[placeholder="Email"]', EMAIL);
  await page.fill('input[placeholder="Password"]', PASS);
  await page.click('button[type="submit"], button:has-text("Sign in")');
  await page.waitForTimeout(2500);

  for (const [dir, list] of [['shots', landing], ['shots-docs', docs]]) {
    for (const [name, path, scrollTo] of list) {
      if (path.includes('undefined') || path.endsWith('//')) continue;
      await page.goto(DEMO_ORIGIN + path, { waitUntil: 'networkidle' });
      if (scrollTo) await page.locator(`text=${scrollTo}`).first().scrollIntoViewIfNeeded();
      await page.waitForTimeout(1200);
      const buf = await page.screenshot();
      await sharp(buf).webp({ quality: 82 }).toFile(`public/${dir}/${name}${suffix}.webp`);
      console.log('shot', `${dir}/${name}${suffix}.webp`);
    }
  }
  await ctx.close();
}
await browser.close();
