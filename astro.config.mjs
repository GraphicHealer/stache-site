// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL ?? 'https://stache.graphichealer.com',
	base: process.env.BASE_PATH ?? '/',
	integrations: [
		starlight({
			title: 'Stache',
			description: 'Self-hosted, photo-first home inventory. Where is my stuff?',
			logo: {
				src: './src/assets/icon.svg',
				replacesTitle: false,
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/GraphicHealer/Stache' }],
			customCss: ['./src/styles/starlight-custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Install on Home Assistant', slug: 'docs/getting-started/home-assistant' },
						{ label: 'Install with Docker', slug: 'docs/getting-started/docker' },
						{ label: 'Install on Unraid', slug: 'docs/getting-started/unraid' },
						{ label: 'Your first bin', slug: 'docs/getting-started/first-steps' },
					],
				},
				{
					label: 'Using Stache',
					items: [
						{ label: 'Adding items', slug: 'docs/using/adding-items' },
						{ label: 'Labels & areas', slug: 'docs/using/labels-areas' },
						{ label: 'Finding things', slug: 'docs/using/finding' },
						{ label: 'Out & lent tracking', slug: 'docs/using/out-tracking' },
						{ label: 'Household members', slug: 'docs/using/household' },
					],
				},
				{
					label: 'Optional extras',
					items: [
						{ label: 'AI suggestions', slug: 'docs/extras/ai' },
						{ label: 'Home Assistant sensors', slug: 'docs/extras/ha-sensors' },
						{ label: 'Backups', slug: 'docs/extras/backups' },
						{ label: 'MCP connections', slug: 'docs/extras/mcp' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Configuration', slug: 'docs/reference/configuration' },
						{ label: 'FAQ', slug: 'docs/reference/faq' },
					],
				},
			],
		}),
	],
});
