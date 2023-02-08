/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest-testing-library",
    "prettier",
    "plugin:jsx-a11y/recommended",
  ],
  // We're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but we have to
  // set the jest version explicitly.
  settings: {
    jest: {
      version: 27,
    },
  },
  parser: "@typescript-eslint/parser",

  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "import/order": [
      1,
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always",
        pathGroups: [
          {
            group: "builtin",
            pattern: "react+(|-native)",
            position: "before",
          },
          {
            group: "builtin",
            pattern: "react+(|-helmet)",
            position: "after",
          },
          {
            group: "builtin",
            pattern: "react+(|-redux)",
            position: "after",
          },
          { group: "builtin", pattern: "react+(|-router)", position: "after" },
          {
            group: "builtin",
            pattern: "react+(|-router)+(|-dom)",
            position: "after",
          },
          {
            group: "builtin",
            pattern: "prop-types",
            position: "after",
          },
          {
            group: "external",
            pattern: "date-fns",
            position: "before",
          },
          {
            group: "external",
            pattern: "moment",
            position: "before",
          },
          { group: "external", pattern: "moment-timezone", position: "before" },
          {
            group: "external",
            pattern: "lodash",
            position: "before",
          },
          { group: "parent", pattern: "recharts", position: "before" },
          {
            group: "parent",
            pattern: "@material-ui/styles",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    quotes: [
      1,
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
  },
}
