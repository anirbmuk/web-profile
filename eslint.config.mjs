import withNuxt from './.nuxt/eslint.config.mjs';
import tailwind from 'eslint-plugin-tailwindcss';
import sonarjs from 'eslint-plugin-sonarjs';

export default withNuxt(
  [
    ...tailwind.configs['flat/recommended'],
    sonarjs.configs.recommended,
    {
      rules: {
        'tailwindcss/classnames-order': 'error',
        'tailwindcss/no-unnecessary-arbitrary-value': 'error',
        'tailwindcss/no-custom-classname': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        semi: ['error', 'always'],
        'no-console': ['error', {
          allow: ['error'],
        }],
        camelcase: 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        indent: ['error', 2],
        quotes: ['error', 'single'],
        'computed-property-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'space-before-function-paren': 'off',
        'arrow-parens': ['error', 'always'],
        'object-curly-newline': ['error', {
          ObjectExpression: 'always',
          ObjectPattern: {
            multiline: true,
            minProperties: 2,
          },
          ImportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
          ExportDeclaration: {
            multiline: true,
            minProperties: 2,
          },
        }],
        'object-property-newline': ['error'],
        'prefer-destructuring': ['error'],
        'sonarjs/cognitive-complexity': ['warn'],
        'sonarjs/no-duplicate-string': ['warn'],
        'vue/comment-directive': ['off'],
        'vue/no-v-html': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/first-attribute-linebreak': [
          'error',
          {
            singleline: 'beside',
            multiline: 'below',
          },
        ],
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 1,
            },
            multiline: {
              max: 1,
            },
          },
        ],
        'vue/html-closing-bracket-newline': ['error', {
          singleline: 'never',
          multiline: 'never',
        }],
        'vue/html-indent': ['error'],
        'vue/define-emits-declaration': ['error', 'type-literal'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/slot-name-casing': ['error', 'kebab-case'],
      },
    },
  ],
);
