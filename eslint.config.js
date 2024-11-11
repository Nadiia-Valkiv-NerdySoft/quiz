import json from 'eslint-plugin-json';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['dist/', 'vendor/', '**/*.config.js', '.angular/', '.vscode/'],
  },
  ...compat.config(js.configs.recommended),
  {
    plugins: {
      json,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'array-element-newline': [2, 'consistent'],
      'array-bracket-newline': [2, 'consistent'],
      'array-bracket-spacing': [
        2,
        'always',
        {
          singleValue: false,
          objectsInArrays: false,
          arraysInArrays: false,
        },
      ],
      'arrow-parens': [
        2,
        'as-needed',
        {
          requireForBlockBody: true,
        },
      ],
      'arrow-spacing': [
        2,
        {
          before: true,
          after: true,
        },
      ],
      'block-scoped-var': 2,
      'block-spacing': [2, 'always'],
      'brace-style': [
        2,
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'comma-dangle': [2, 'always-multiline'],
      'comma-spacing': [
        2,
        {
          before: false,
          after: true,
        },
      ],
      'comma-style': [2, 'last'],
      'computed-property-spacing': [2, 'never'],
      'constructor-super': 2,
      curly: [2, 'all'],
      'dot-notation': 2,
      'eol-last': 2,
      'for-direction': 2,
      'func-call-spacing': [2, 'never'],
      'function-paren-newline': [2, 'consistent'],
      'getter-return': 2,
      'implicit-arrow-linebreak': [2, 'beside'],
      indent: [
        2,
        2,
        {
          MemberExpression: 0,
          SwitchCase: 1,
        },
      ],
      'key-spacing': [
        2,
        {
          mode: 'strict',
          beforeColon: false,
          afterColon: true,
        },
      ],
      'keyword-spacing': [
        2,
        {
          before: true,
          after: true,
        },
      ],
      'lines-between-class-members': [
        2,
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'new-cap': [
        2,
        {
          capIsNewExceptions: [
            'Pipe',
            'Component',
            'Directive',
            'Injectable',
            'ViewChild',
            'NgModule',
            'Input',
            'Output',
            'HostBinding',
            'HostListener',
            'Inject',
            'ViewChild',
            'ViewChildren',
            'Optional',
            'Self',
            'Host',
            'SkipSelf',
          ],
        },
      ],
      'no-bitwise': 1,
      'no-console': 2,
      'no-debugger': 2,
      'no-dupe-args': 2,
      'no-dupe-class-members': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-else-return': [
        2,
        {
          allowElseIf: false,
        },
      ],
      'no-empty-character-class': 2,
      'no-eval': [
        2,
        {
          allowIndirect: false,
        },
      ],
      'no-ex-assign': 2,
      'no-extra-bind': 2,
      'no-extra-boolean-cast': 2,
      'no-extra-label': 2,
      'no-extra-parens': [2, 'functions'],
      'no-extra-semi': 2,
      'no-floating-decimal': 2,
      'no-func-assign': 2,
      'no-global-assign': 2,
      'no-implied-eval': 2,
      'no-inner-declarations': 2,
      'no-invalid-regexp': 2,
      'no-lonely-if': 2,
      'no-misleading-character-class': 2,
      'no-multi-spaces': 2,
      'no-multiple-empty-lines': [
        2,
        {
          max: 1,
        },
      ],
      'no-new-func': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2,
      'no-param-reassign': 2,
      'no-redeclare': [
        2,
        {
          builtinGlobals: true,
        },
      ],
      'no-regex-spaces': 2,
      'no-script-url': 2,
      'no-self-compare': 2,
      'no-shadow-restricted-names': 2,
      'no-sparse-arrays': 2,
      'no-template-curly-in-string': 1,
      'no-this-before-super': 2,
      'no-throw-literal': 2,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-unmodified-loop-condition': 2,
      'no-unneeded-ternary': 2,
      'no-unsafe-finally': 0,
      'no-unsafe-negation': 2,
      'no-unused-labels': 2,
      'no-use-before-define': [
        1,
        {
          functions: true,
          classes: false,
          variables: true,
        },
      ],
      'no-var': 2,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'object-curly-newline': [
        2,
        {
          multiline: true,
          consistent: true,
        },
      ],
      'object-curly-spacing': [2, 'always'],
      'one-var': [2, 'never'],
      'operator-linebreak': [2, 'before'],
      'padded-blocks': [
        2,
        {
          blocks: 'never',
        },
      ],
      'prefer-arrow-callback': 2,
      'prefer-template': 2,
      'quote-props': [2, 'consistent-as-needed'],
      quotes: [2, 'single'],
      'rest-spread-spacing': [2, 'never'],
      'semi-spacing': [
        2,
        {
          before: false,
          after: true,
        },
      ],
      semi: [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-before-blocks': [1, 'always'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': [
        2,
        {
          int32Hint: true,
        },
      ],
      'space-unary-ops': [
        2,
        {
          words: true,
          nonwords: false,
        },
      ],
      'switch-colon-spacing': [
        2,
        {
          before: false,
          after: true,
        },
      ],
      'template-curly-spacing': [2, 'never'],
      'unicode-bom': [2, 'never'],
      'use-isnan': 2,
      'wrap-iife': [2, 'inside'],
      yoda: 2,
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
];
