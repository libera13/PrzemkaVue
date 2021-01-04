module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:prettier/recommended'
    // "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    indent: 'off',
    'object-curly-spacing': 'off',
    semi: 'off',
    'no-eval': 'off',
    'no-unused-vars': 'off',
    'no-multiple-empty-lines': 'off',
    'comma-dangle': ['warn', 'never'],
    quotes: ['warn', 'single'],
    'standard/computed-property-even-spacing': 'off',
    'vue/no-unused-components': 'off',
    'vue/valid-v-bind': 'off',
    '@typescript-eslint/no-var-requires': 0
  }
};
