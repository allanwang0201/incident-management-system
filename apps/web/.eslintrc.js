module.exports = {
  root: false,
  overrides: [
    {
      files: ['test/**/*.ts', 'test/**/*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
