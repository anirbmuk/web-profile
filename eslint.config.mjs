import withNuxt from './.nuxt/eslint.config.mjs';
import tailwind from 'eslint-plugin-tailwindcss';
import sonarjs from 'eslint-plugin-sonarjs';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

export default withNuxt(
  [
    ...tailwind.configs['flat/recommended'],
    ...pluginVueA11y.configs['flat/recommended'],
    sonarjs.configs.recommended,
    {
      rules: {
        'eol-last': ['error', 'always'],
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
        'vuejs-accessibility/mouse-events-have-key-events': 'off',
        'vuejs-accessibility/no-static-element-interactions': 'off',
        'vuejs-accessibility/anchor-has-content': 'off',
        'vuejs-accessibility/aria-props': 'off',
        'vuejs-accessibility/aria-role': 'error',
        'vuejs-accessibility/aria-unsupported-elements': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'vuejs-accessibility/form-control-has-label': 'warn',
        'vuejs-accessibility/heading-has-content': 'off',
        'vuejs-accessibility/iframe-has-title': 'off',
        'vuejs-accessibility/interactive-supports-focus': 'error',
        'vuejs-accessibility/label-has-for': 'off',
        'vuejs-accessibility/media-has-caption': 'off',
        'vuejs-accessibility/no-access-key': 'off',
        'vuejs-accessibility/no-autofocus': 'off',
        'vuejs-accessibility/no-distracting-elements': 'off',
        'vuejs-accessibility/no-redundant-roles': 'error',
        'vuejs-accessibility/role-has-required-aria-props': 'error',
        'vuejs-accessibility/tabindex-no-positive': 'warn',
      },
    },
  ],
);
