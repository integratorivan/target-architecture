import js from '@eslint/js';
import * as reatom from '@reatom/eslint-plugin';
import tanstackRouter from '@tanstack/eslint-plugin-router';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import deMorgan from 'eslint-plugin-de-morgan';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFixPlugin from 'eslint-plugin-sort-keys-fix';
import typescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const deepImportPatterns = [
    {
        group: ['$domain/*/*', '$entities/*/*', '$features/*/*/*', '$shared/*/*/*'],
        message: 'Import through module public API (index.ts), not internal files.',
    },
];

const noUpwardRelativePatterns = [
    {
        group: ['../*'],
        message: 'Upward relative imports are forbidden. Use layer public API aliases.',
    },
];

const typescriptBaseConfig = {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
        ecmaVersion: 'latest',
        globals: {
            ...globals.browser,
            ...globals.node,
        },
        parser: tsParser,
        parserOptions: {
            project: './tsconfig.json',
            sourceType: 'module',
        },
    },
    plugins: {
        '@reatom': reatom,
        '@typescript-eslint': tseslint,
        'de-morgan': deMorgan,
        prettier: prettierPlugin,
        'simple-import-sort': simpleImportSort,
        'sort-keys-fix': sortKeysFixPlugin,
        'typescript-sort-keys': typescriptSortKeys,
        'unused-imports': unusedImports,
    },
    rules: {
        ...reatom.configs.recommended.rules,
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'max-classes-per-file': 'off',
        'no-restricted-imports': ['error', { patterns: deepImportPatterns }],
        'no-restricted-syntax': [
            'error',
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                singleQuote: true,
            },
        ],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    ['^react', '^@?\\w'],
                    ['^\\$'],
                    [
                        '^\\.\\.(?!/?$)',
                        '^\\.\\./?$',
                        '^\\./(?=.*/)(?!/?$)',
                        '^\\.(?!/?$)',
                        '^\\./?$',
                    ],
                    ['^.+\\.(c|le|sa|sc|pc)ss$'],
                ],
            },
        ],
        'sort-keys-fix/sort-keys-fix': 'error',
        'typescript-sort-keys/interface': [
            'error',
            'asc',
            { caseSensitive: true, natural: true, requiredFirst: true },
        ],
        'typescript-sort-keys/string-enum': [
            'error',
            'asc',
            { caseSensitive: true, natural: true },
        ],
        'unused-imports/no-unused-imports': 'error',
    },
};

export default [
    {
        ignores: [
            '.tanstack/**',
            'dev-dist/**',
            'dist/**',
            'node_modules/**',
            'src/routeTree.gen.ts',
        ],
    },
    js.configs.recommended,
    ...tanstackRouter.configs['flat/recommended'],
    typescriptBaseConfig,
    {
        files: ['src/features/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        ...deepImportPatterns,
                        ...noUpwardRelativePatterns,
                        {
                            group: ['$features/*'],
                            message: 'Мы не можем импортировать одну features в другую напрямую. Если есть необходимость в этом, то нужно вынести общую логику в entities, или оркестрировать на уровне routes.',
                        },
                    ],
                },
            ],
        },
    },
    {
        files: ['src/entities/**/*.{ts,tsx}', 'src/routes/**/*.{ts,tsx}', 'src/shared/**/*.{ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [...deepImportPatterns, ...noUpwardRelativePatterns],
                },
            ],
        },
    },
];
