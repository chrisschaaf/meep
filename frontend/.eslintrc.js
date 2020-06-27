module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'google'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'babel'],
  rules: {
    'max-len': ['error', {code: 150}],
    'no-invalid-this': 0,
    'babel/no-invalid-this': 1,
  },
};
