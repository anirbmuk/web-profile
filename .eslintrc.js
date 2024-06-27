module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxt/eslint-config',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:sonarjs/recommended',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    'vue/comment-directive': ['off'],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'no-console': ['error', {
      allow: ['error'],
    }],
    'vue/no-v-html': 'off',
    'vue/no-multiple-template-root': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'sonarjs/cognitive-complexity': ['warn'],
    'sonarjs/no-duplicate-string': ['warn'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'computed-property-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': 'off',
    'arrow-parens': ['error', 'always'],
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
    'tailwindcss/no-custom-classname': 'off',
    'vue/html-indent': ['error'],
  },
};
