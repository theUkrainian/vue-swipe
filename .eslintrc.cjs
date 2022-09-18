/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended", // https://eslint.org/docs/rules/
    "@vue/eslint-config-typescript/recommended", // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/src/configs
    /**
     * Placement of this line here is important as per documentation:
     * https://www.npmjs.com/package/@vue/eslint-config-typescript
     *
     * Some of its rules, might conflict with prettier.
     * So when used alongside other sharable configs, this config
     * should be placed after all other configs except for the
     * one from @vue/eslint-config-prettier or eslint-plugin-prettier
     * in the extends array.
     */
    // Disables all formatting-related ESLint rules to prevent a fight between prettier and ESlint
    "@vue/eslint-config-prettier"
  ],
  /**
   * This config allows us to use advanced linting that needs
   * type information, for that ESLint needs to know what are the files
   * that TypeScript is looking at and use that to make it's linting decisions
   */
  parserOptions: {
    "project": "./tsconfig.json",
  },
  /**
   * These files need to be ignored in order to not create a conflict between
   * the files that tsconfig reads and the files that eslint reads, if they
   * don't match up exactly then ESlint starts throwing errors.
   *
   * This config is important when using `parserOptions` with a
   * `tsconfig.json` file in the ESlint config
   **/
  ignorePatterns: [".eslintrc.cjs", "vite.config.ts","_templates/"],
  env: {
    "vue/setup-compiler-macros": true,
  },
};
