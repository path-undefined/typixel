import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import eslintPluginVue from "eslint-plugin-vue";
import typescriptEslint from "typescript-eslint";

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{vue,ts}"],
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  eslint.configs.recommended,

  stylistic.configs["recommended"],
  ...eslintPluginVue.configs["flat/recommended"],
  ...typescriptEslint.configs.recommended,
  vueTsConfigs.recommendedTypeChecked,

  {
    rules: {
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/max-len": ["error", {
        code: 80,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      }],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
