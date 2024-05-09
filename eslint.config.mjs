import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.mocha,
                ...globals.node,
                ...globals.browser,
            },
        },
    },
    pluginJs.configs.recommended,
    {
        ignores: ['node_modules/*', './eslint.config.js', './src/configs/*'],
    },
    {
        rules: {
            indent: ['error', 4],
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
        },
    },
];
