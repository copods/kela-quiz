
/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
 module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'prettier',
    'plugin:jsx-a11y/recommended'
  ],
  // We're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but we have to
  // set the jest version explicitly.
  settings: {
    jest: {
      version: 27,
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
  },
}