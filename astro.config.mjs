// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
export default defineConfig({
 site: process.env.SITE_URL ?? 'https://stacheit.app',
 base: process.env.BASE_PATH ?? '/',
 integrations: [starlight({
  title: 'Stache',
  description: 'A simple, self-hosted home for the things you own. Photograph it, put it away, find it later.',
  logo: { src: './src/assets/icon.svg', replacesTitle: false },
  social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/GraphicHealer/Stache' }],
  customCss: ['./src/styles/starlight-custom.css'],
  sidebar: [
   { label: 'Introduction', items: [{ label: 'Documentation home', slug: 'docs' }, { label: 'How Stache works', slug: 'docs/concepts' }] },
   { label: 'Get started', items: [
    { label: 'Choose an installation', slug: 'docs/getting-started' },
    { label: 'Docker', slug: 'docs/getting-started/docker' },
    { label: 'Home Assistant', slug: 'docs/getting-started/home-assistant' },
    { label: 'Unraid', slug: 'docs/getting-started/unraid' },
    { label: 'Your first bin', slug: 'docs/getting-started/first-steps' },
   ]},
   { label: 'Using Stache', items: [
    { label: 'Adding and updating items', slug: 'docs/using/adding-items' },
    { label: 'Areas and QR labels', slug: 'docs/using/labels-areas' },
    { label: 'Finding things', slug: 'docs/using/finding' },
    { label: 'Tracking items that are out', slug: 'docs/using/out-tracking' },
    { label: 'Household members and privacy', slug: 'docs/using/household' },
    { label: 'AI suggestions', slug: 'docs/using/ai' },
   ]},
   { label: 'Printing', items: [
    { label: 'Printing labels', slug: 'docs/printing' },
    { label: 'Printer setup', slug: 'docs/printing/printers' },
    { label: 'Printing on label sheets', slug: 'docs/printing/sheets' },
   ]},
   { label: 'Integrations', items: [
    { label: 'Home Assistant sensors', slug: 'docs/extras/ha-sensors' },
    { label: 'MCP connections', slug: 'docs/extras/mcp' },
   ]},
   { label: 'API', items: [
    { label: 'API overview', slug: 'docs/api' },
    { label: 'Interactive API reference', link: '/api/', attrs: { target: '_blank' } },
   ]},
   { label: 'Administration', items: [
    { label: 'Backups and restore', slug: 'docs/extras/backups' },
    { label: 'Configuration reference', slug: 'docs/reference/configuration' },
    { label: 'Security and access', slug: 'docs/reference/security' },
    { label: 'Troubleshooting and FAQ', slug: 'docs/reference/faq' },
   ]},
  ],
 })],
});
