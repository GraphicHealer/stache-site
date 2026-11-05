// Seeds demo items (with real CC0/CC-BY photos from Wikimedia Commons)
// for the screenshot workflow. Idempotent-ish: skips items that exist.
// Run seed-print.mjs first (accounts, areas, printer, sheet preset).
// Env: STACHE_URL (trusted origin; default localhost:8080),
//      STACHE_EMAIL, STACHE_PASS.
const BASE = process.env.STACHE_URL ?? 'http://localhost:8080';
const EMAIL = process.env.STACHE_EMAIL ?? 'dali@stache.local';
const PASS = process.env.STACHE_PASS ?? 'demo-password-123';
const H = { 'content-type': 'application/json', origin: BASE };

const api = async (path, init = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...H, ...(init.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} -> ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
};

// Wikimedia title -> direct file URL via the Commons API.
const commonsUrl = async (title) => {
  const u = new URL('https://commons.wikimedia.org/w/api.php');
  u.search = new URLSearchParams({
    action: 'query', titles: title, prop: 'imageinfo',
    iiprop: 'url', iiurlwidth: '800', format: 'json',
  });
  const data = await (await fetch(u)).json();
  const page = Object.values(data.query.pages)[0];
  const info = page.imageinfo?.[0];
  return info?.thumburl ?? info?.url;
};

const ITEMS = [
  { name: 'Cordless drill', area: 'Garage', title: 'File:Cordless electric (screw) drill.jpg', status: 'out' },
  { name: 'Tape measure', area: 'Garage', title: 'File:Tape Measure Tailor Tape Measure 387277 Edited 2020 (49917401241).jpg' },
  { name: 'Camping lantern', area: 'Garage', title: 'File:Streamlight LED Camping Lantern - The Siege (41339394074).jpg', status: 'lent', lent_to: 'Friedrich Nietzsche' },
  { name: 'Paint brushes', area: 'Garage', title: 'File:Jar of Paint Brushes (Unsplash).jpg' },
  { name: 'Yarn stash', area: 'Garage', title: 'File:Yarn store with various yarns.jpg' },
  { name: 'Headphones', area: 'Garage', title: 'File:1970s or earlier Queen 505 8 Ohm headphones made in Japan.jpg' },
  { name: 'Water bottles', area: 'Garage', title: 'File:Metal Water Bottles.jpeg' },
  { name: 'Myst board game', area: 'Garage', title: 'File:Myst board game box (back).png', trash: true },
];

const login = await fetch(`${BASE}/api/auth/sign-in/email`, {
  method: 'POST', headers: H,
  body: JSON.stringify({ email: EMAIL, password: PASS }),
});
if (!login.ok) throw new Error(`login failed: ${login.status} ${await login.text()}`);
const cookie = login.headers.get('set-cookie').split(';')[0];
const auth = (extra = {}) => ({ cookie, ...extra });

const { areas } = await api('/api/areas', { headers: auth() });
const byName = Object.fromEntries(areas.map((a) => [a.name, a.id]));
// No flat item-list endpoint - gather names from each area's contents.
const existing = new Set();
for (const a of areas) {
  const detail = await api(`/api/areas/${a.id}`, { headers: auth() });
  for (const i of detail.items ?? []) existing.add(i.name);
}

for (const it of ITEMS) {
  if (existing.has(it.name)) { console.log('skip', it.name); continue; }
  const url = await commonsUrl(it.title);
  if (!url) { console.log('NO IMAGE for', it.name); continue; }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const form = new FormData();
  form.append('area_id', byName[it.area]);
  form.append('name', it.name);
  form.append('photo', new Blob([buf]), `${it.name}.jpg`);
  const res = await fetch(`${BASE}/api/items`, {
    method: 'POST', headers: auth(), body: form,
  });
  if (!res.ok) { console.log('FAIL', it.name, res.status, await res.text()); continue; }
  const { item } = await res.json();
  console.log('created', it.name);
  if (it.status) {
    await api(`/api/items/${item.id}`, {
      method: 'PATCH', headers: auth(),
      body: JSON.stringify({ status: it.status, lent_to: it.lent_to }),
    });
    console.log('  status ->', it.status);
  }
  if (it.trash) {
    const res = await fetch(`${BASE}/api/items/${item.id}`, {
      method: 'DELETE', headers: auth(),
    });
    if (!res.ok) console.log('  trash failed', res.status);
    else console.log('  trashed');
  }
}

// MCP connection so the Settings shot has a real row.
const mcp = await api('/api/settings/mcp', { headers: auth() });
if (!(mcp.connections ?? []).length) {
  await api('/api/settings/mcp', {
    method: 'POST', headers: auth(),
    body: JSON.stringify({ name: 'ChatGPT', scope: 'read-write' }),
  });
  console.log('mcp connection created');
}
console.log('done');
