import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import functional from 'eslint-plugin-functional';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';

// The sonarjs rules that were "recommended" in eslint-plugin-sonarjs 0.10 (the v4 preset enables ~250 rules)
const sonarjsRules = Object.fromEntries(
  [
    'cognitive-complexity',
    'max-switch-cases',
    'no-all-duplicated-branches',
    'no-collapsible-if',
    'no-collection-size-mischeck',
    'no-duplicated-branches',
    'no-element-overwrite',
    'no-empty-collection',
    'no-extra-arguments',
    'no-gratuitous-expressions',
    'no-identical-conditions',
    'no-identical-expressions',
    'no-identical-functions',
    'no-ignored-return',
    'no-inverted-boolean-check',
    'no-nested-switch',
    'no-redundant-boolean',
    'no-redundant-jump',
    'no-same-line-conditional',
    'no-unused-collection',
    'no-use-of-empty-return-value',
    'no-useless-catch',
    'non-existent-operator',
    'prefer-immediate-return',
    'prefer-object-literal',
    'prefer-single-boolean-return',
    'prefer-while',
  ].map((rule) => [`sonarjs/${rule}`, 'error'])
);

export default tseslint.config(
  {
    ignores: [
      // Only TypeScript sources are linted
      '**/*.{js,mjs,cjs}',
      '**/__tests__/**',
      '**/__mocks__/**',
      '**/generated/**',
      'dist/**',
      '.package-check/**',
      'coverage/**',
      'definitions/**',
      'locales/locales.ts',
      'src/vite-env.d.ts',
      'src/reportWebVitals.ts',
      '**/Dangerfile.ts',
      '**/vitest.config.ts',
      '**/vite.config.ts',
      '**/setupTests.ts',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  prettier,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      import: importPlugin,
      functional,
      sonarjs,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...sonarjsRules,
      // Replaces sonarjs/no-one-iteration-loop, removed in eslint-plugin-sonarjs 1.0
      'no-unreachable-loop': 'error',
      'no-case-declarations': 'off',
      'no-inner-declarations': 'off',
      'prefer-const': 'error',
      curly: 'error',
      'spaced-comment': ['error', 'always', { block: { balanced: true } }],
      radix: 'error',
      'one-var': ['error', 'never'],
      'object-shorthand': 'error',
      'no-var': 'error',
      'no-param-reassign': 'error',
      'no-underscore-dangle': 'error',
      'no-undef-init': 'error',
      'no-throw-literal': 'error',
      'no-new-wrappers': 'error',
      'no-eval': 'error',
      'no-console': ['error', { allow: ['error', 'warn'] }],
      'no-caller': 'error',
      'no-bitwise': 'error',
      eqeqeq: ['error', 'smart'],
      'max-classes-per-file': ['error', 1],
      'guard-for-in': 'error',
      complexity: 'error',
      'arrow-body-style': 'error',
      'import/order': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      // Enable if we want to enforce the return type for all the functions
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      // TODO: added for compatibility. Removing this line we have to remove all the any usage in the code
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': ['error'],
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
      'react-hooks/rules-of-hooks': 'warn',
      'functional/no-let': 'error',
      'functional/immutable-data': 'error',
      'sonarjs/no-nested-template-literals': 'warn',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.test.*'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  }
);
