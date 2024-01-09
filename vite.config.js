import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';


/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		Icons({ compiler: 'svelte', }),
	],
	build: {
		minify: true,
	}
};

export default config;
