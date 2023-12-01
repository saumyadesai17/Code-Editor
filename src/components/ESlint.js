module.exports = {
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    extends: ['eslint:recommended', 'plugin:codemirror/all'],
    plugins: ['codemirror'],
    env: {
      browser: true,
    },
  };
  