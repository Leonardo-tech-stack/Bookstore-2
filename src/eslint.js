module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint'],
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    },
  };
  