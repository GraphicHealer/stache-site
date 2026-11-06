// Print-UI screenshots for the docs, dark AND light.
// Dark keeps the canonical name (name.webp); light gets -light.webp.
// Run the seeded instance (seed-print.mjs), then: node tools/shots-print.mjs
// Labels page + Settings -> Printers (printer list, edit/add forms, PC sheets).
// Env: STACHE_URL, STACHE_DEMO_ORIGIN, CHROMIUM, STACHE_EMAIL, STACHE_PASS.
import { chromium } from 'playwright-core';
import sharp from 'sharp';

// DEMO_ORIGIN is the public address shown in captures (banner + QR payloads).
// Requests to it are routed to the local instance, so QRs point at a safe
// demo URL instead of localhost / private IPs / tunnels.
const DEMO_ORIGIN = process.env.STACHE_DEMO_ORIGIN ?? 'https://demo.stacheit.app';
const BASE = process.env.STACHE_URL ?? 'http://localhost:8080';
const EMAIL = process.env.STACHE_EMAIL ?? 'dali@stache.local';
const PASS = process.env.STACHE_PASS ?? 'demo-password-123';

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/usr/bin/chromium-browser',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--ignore-certificate-errors'],
});

for (const scheme of ['dark', 'light']) {
  const suffix = scheme === 'dark' ? '' : '-light';
  const ctx = await browser.newContext({
    viewport: { width: 393, height: 852 }, // iPhone 15 Pro
    deviceScaleFactor: 3,
    colorScheme: scheme,
    ignoreHTTPSErrors: true,
  });
  // Route the demo origin to the local instance.
  // Skipped when STACHE_URL is the demo origin itself (capturing the hosted demo).
  if (BASE !== DEMO_ORIGIN) {
    await ctx.route(`${DEMO_ORIGIN}/**`, async (route) => {
      const u = new URL(route.request().url());
      const res = await route.fetch({ url: `${BASE}${u.pathname}${u.search}` });
      await route.fulfill({ response: res });
    });
  }
  const page = await ctx.newPage();
  const VIEW = DEMO_ORIGIN;
  await page.goto(`${VIEW}/login`, { waitUntil: 'networkidle' });
  await page.fill('input[placeholder="Email"]', EMAIL);
  await page.fill('input[placeholder="Password"]', PASS);
  await page.click('button[type="submit"], button:has-text("Sign in")');
  await page.waitForTimeout(2500);

  const shoot = async (name) => {
    await page.waitForTimeout(1200);
    const buf = await page.screenshot();
    await sharp(buf).webp({ quality: 82 }).toFile(`public/shots-docs/${name}${suffix}.webp`);
    console.log('shot', `shots-docs/${name}${suffix}.webp`);
  };

  await page.goto(`${VIEW}/labels`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // let the exact preview render settle

  // 1. Full Labels page top - banner, counts, preview, print controls.
  await shoot('labels');

  // 2. Settings -> Printers: printer list + preview pane.
  await page.goto(`${VIEW}/settings/printers`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await shoot('print-printers');

  // 3. Zebra edit form - host/size/margin fields.
  const zEdit = page.getByRole('button', { name: 'Edit Zebra GX420d' });
  if (await zEdit.isVisible()) {
    await zEdit.click();
    await page.waitForTimeout(500);
    await page.getByText('margins', { exact: false }).last()
      .evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await shoot('print-margins');
    await zEdit.click();
    await page.waitForTimeout(400);
  }

  // 4. The "+ Add printer" form.
  const addBtn = page.locator('button:has-text("+ Add printer")');
  if (await addBtn.isVisible()) {
    await addBtn.click();
    await page.waitForTimeout(600);
    const typeSel = page.locator('select').first();
    if (await typeSel.isVisible()) await typeSel.scrollIntoViewIfNeeded();
    await shoot('print-add');
  }

  // 5. PC printer -> sheet media -> SheetPicker with saved presets.
  await page.goto(`${VIEW}/settings/printers`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const pcEdit = page.getByRole('button', { name: 'Configure PC printing' });
  if (await pcEdit.isVisible()) {
    await pcEdit.click();
    await page.waitForTimeout(600);
    const mediaSel = page.locator('select').filter({ hasText: /label/i }).first();
    if (await mediaSel.isVisible()) {
      await mediaSel.selectOption('sheet');
      await page.waitForTimeout(800);
      await mediaSel.scrollIntoViewIfNeeded();
      await shoot('print-sheets');
    }
  }

  await ctx.close();
}
await browser.close();
console.log('done');
