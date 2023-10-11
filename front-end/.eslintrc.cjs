/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  ignorePatterns: ["**/public/*"] /* don't try to lint uswds files */,
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  rules: {
    "vue/multi-word-component-names":
      "off" /* allow component names like 'Alert' for now */,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
};
