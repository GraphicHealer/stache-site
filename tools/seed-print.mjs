// Seed the local dev instance for print-UI screenshots.
// Idempotent-ish: skips anything that already exists.
// Demo users are famous moustaches of history, per user request.
const BASE = process.env.STACHE_URL ?? 'http://localhost:8080';
const EMAIL = 'dali@stache.local';
const PASS = 'demo-password-123';

let cookie = '';
const call = async (method, path, body) => {
  const r = await fetch(BASE + path, {
    method,
    headers: {
      'content-type': 'application/json',
      origin: BASE,
      ...(cookie ? { cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const set = r.headers.get('set-cookie');
  if (set) cookie = set.split(';')[0];
  const j = await r.json().catch(() => ({}));
  if (!r.ok) console.log(method, path, '->', r.status, JSON.stringify(j).slice(0, 160));
  return j;
};

// Sign up (first signup is open) or sign in if already seeded.
const up = await call('POST', '/api/auth/sign-up/email', { name: 'Salvador Dalí', email: EMAIL, password: PASS });
if (!cookie) await call('POST', '/api/auth/sign-in/email', { email: EMAIL, password: PASS });
console.log('auth', cookie ? 'ok' : JSON.stringify(up).slice(0, 200));

// Household members - famous moustaches.
const users = (await call('GET', '/api/users')).users ?? [];
for (const [name, email] of [
  ['Friedrich Nietzsche', 'friedrich@stache.local'],
  ['Mark Twain', 'mark@stache.local'],
  ['Wyatt Earp', 'wyatt@stache.local'],
]) {
  if (!users.find((u) => u.name === name)) {
    await call('POST', '/api/users', { name, email, password: PASS });
    console.log('user +', name);
  }
}

const labels = (await call('GET', '/api/labels')).labels ?? [];
if (labels.length < 8) {
  const b = await call('POST', '/api/labels/batch', { count: 12 });
  console.log('minted', b.labels?.length ?? 0, 'labels');
}
const codes = ((await call('GET', '/api/labels')).labels ?? []).map((l) => l.code);

const areas = (await call('GET', '/api/areas')).areas ?? [];
if (!areas.find((a) => a.name === 'Garage')) {
  await call('POST', '/api/areas', { name: 'Garage', label_code: codes[0] });
  console.log('area Garage claimed', codes[0]);
}
if (!areas.find((a) => a.name === 'Shelf 2')) {
  const garage = (await call('GET', '/api/areas')).areas.find((a) => a.name === 'Garage');
  await call('POST', '/api/areas', { name: 'Shelf 2', parent_id: garage?.id, label_code: codes[1] });
  console.log('area Shelf 2 claimed', codes[1]);
}

const printers = (await call('GET', '/api/printers')).printers ?? [];
if (!printers.find((p) => p.name === 'Zebra GX420d')) {
  await call('POST', '/api/printers', {
    name: 'Zebra GX420d', type: 'zpl', host: '192.0.2.40', port: 9100, dpi: 203,
    label_w_mm: 57, label_h_mm: 32,
    top_offset_mm: 1, left_offset_mm: 1, right_offset_mm: 1, bottom_offset_mm: 1,
  });
  console.log('printer added');
}
await call('PATCH', '/api/printers/pc', {
  media_type: 'label', label_w_mm: 57, label_h_mm: 32, dpi: 300,
  top_offset_mm: 1, left_offset_mm: 1, right_offset_mm: 1, bottom_offset_mm: 1,
});

const tpl = (await call('GET', '/api/sheet-templates')).templates ?? [];
if (!tpl.find((t) => t.id.startsWith('custom-'))) {
  await call('POST', '/api/sheet-templates', {
    name: 'Drawer labels',
    spec: { page: 'letter', cols: 4, rows: 10, cellW: 50, cellH: 20, gapX: 1, gapY: 0.5, marginTop: 9, marginX: 4 },
  });
  console.log('sheet preset saved');
}
console.log('seed done');
