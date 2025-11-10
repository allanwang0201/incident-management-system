module.exports = {
  root: false,
  overrides: [
    {
      files: ['src/theme/index.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};
