module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      project: ['./tsconfig.json', './tsconfig.dev.json'],
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
    ignorePatterns: ['.eslintrc.js'],
  };
  