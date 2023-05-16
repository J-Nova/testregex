import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({out:"build"}),
		alias: {
			"$components": "src/components"
		},
	},
	checkOrigin: true,
    preprocess: vitePreprocess()
};

export default config;
