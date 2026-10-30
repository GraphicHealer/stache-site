// Regenerate the landing-page screenshots.
// 1. Start a demo instance:  docker compose -p stache-demo -f /tmp/stache-demo/compose.yml up -d
//    (any seeded Stache on :8181 works — see seed script history or seed via API)
// 2. npm i -D playwright-core && node tools/shots.mjs
// Writes WebP files into public/shots/.
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const BASE = process.env.STACHE_URL ?? 'http://localhost:8181';
const EMAIL = process.env.STACHE_EMAIL ?? 'demo@stache.local';
const PASS = process.env.STACHE_PASS ?? 'demo-password-123';
const TOOLBIN = process.env.AREA_ID ?? '';

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

const shots = [
  ['home', '/'],
  ['area', `/areas/${TOOLBIN}`],
  ['search', '/search?q=drill'],
  ['out', '/out'],
  ['trash', '/trash'],
];
for (const [name, path] of shots) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const buf = await page.screenshot();
  await sharp(buf).webp({ quality: 82 }).toFile(`public/shots/${name}.webp`);
  console.log('shot', name);
}
await browser.close();
