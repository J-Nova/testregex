import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: "dist", precompress: true }),
		alias: {
			"$components": "src/components"
		},
	},
	checkOrigin: true,
	preprocess: vitePreprocess()
};

export default config;
