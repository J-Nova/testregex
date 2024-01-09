module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:svelte/recommended'
    ],
    parser: '@babel/eslint-parser',

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        jsconfigRootDir: __dirname,
        project: ['./jsconfig.json'],
        extraFileExtensions: ['.svelte'],
        requireConfigFile: false

    },
    env: {
        es6: true,
        browser: true
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser'
        }
    ],
    settings: {
        // ignore style tags in Svelte because of Tailwind CSS
        // See https://github.com/sveltejs/eslint-plugin-svelte3/issues/70
        // 'svelte3/ignore-styles': () => true,
    },
    ignorePatterns: ['node_modules'],
    rules: {
        'no-unused-vars': ["error", { varsIgnorePattern: "_", argsIgnorePattern: "_" }]
    }
}
