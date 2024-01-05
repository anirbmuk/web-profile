module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'no-console': ['error', { allow: ['error'] }],
    'vue/no-v-html': 'off',
    'vue/no-multiple-template-root': 'off',
    camelcase: 'off',
  },
};
