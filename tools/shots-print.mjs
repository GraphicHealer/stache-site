// Print-UI screenshots for the docs. Run the seeded instance (seed-print.mjs),
// then: node tools/shots-print.mjs
// Env: STACHE_URL, CHROMIUM (browser exe), STACHE_EMAIL, STACHE_PASS.
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const BASE = process.env.STACHE_URL ?? 'http://localhost:8080';
const EMAIL = process.env.STACHE_EMAIL ?? 'dali@stache.local';
const PASS = process.env.STACHE_PASS ?? 'demo-password-123';

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

const shoot = async (name) => {
  await page.waitForTimeout(1200);
  const buf = await page.screenshot();
  await sharp(buf).webp({ quality: 82 }).toFile(`public/shots-docs/${name}.webp`);
  console.log('shot', `shots-docs/${name}.webp`);
};

await page.goto(`${BASE}/labels`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2000); // let the exact preview render settle

// 1. Printer list + preview pane.
await page.locator('text=Zebra GX420d').first().scrollIntoViewIfNeeded();
await shoot('print-printers');

// 2. Zebra edit form - host/size/margin fields.
const zEdit = page.getByRole('button', { name: 'Edit Zebra GX420d' });
if (await zEdit.isVisible()) {
  await zEdit.click();
  await page.waitForTimeout(500);
  await page.locator('text=Margins').first().scrollIntoViewIfNeeded();
  await shoot('print-margins');
  await zEdit.click();
  await page.waitForTimeout(400);
}

// 3. The "+ Add printer" form.
const addBtn = page.locator('button:has-text("+ Add printer")');
if (await addBtn.isVisible()) {
  await addBtn.click();
  await page.waitForTimeout(600);
  const typeSel = page.locator('select').first();
  if (await typeSel.isVisible()) await typeSel.scrollIntoViewIfNeeded();
  await shoot('print-add');
}

// 4. PC printer -> sheet media -> SheetPicker with saved presets.
await page.goto(`${BASE}/labels`, { waitUntil: 'networkidle' });
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

await browser.close();
console.log('done');
