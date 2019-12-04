module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error', //acusar como erro se não estiver nas regras
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx','.js']} //aceita js ao invés de jsx
    ],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'desabled'
  },
};
