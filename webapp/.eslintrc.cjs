module.exports = {
    extends: [
        'eslint:recommended'
    ],
	
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsconfigRootDir: __dirname,
        project: ['./jsconfig.json'],
        extraFileExtensions: ['.svelte'],
		
    },
    env: {
        es6: true,
        browser: true
    },
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3'
        }
    ],
    settings: {
        // ignore style tags in Svelte because of Tailwind CSS
        // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
        'svelte3/ignore-styles': () => true,
    },
    plugins: [
        'svelte3'
    ],
    ignorePatterns: ['node_modules'],
	rules: {
		'no-unused-vars': ["error", { varsIgnorePattern: "_", argsIgnorePattern: "_"}]
	}
}
