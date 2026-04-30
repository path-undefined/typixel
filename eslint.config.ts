import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import typescriptEslint from "typescript-eslint";

export default defineConfigWithVueTs(
  {
    name: "app/files-to-lint",
    files: ["**/*.{vue,ts,mts,tsx}"],
  },

  globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

  eslint.configs.recommended,

  ...eslintPluginVue.configs["flat/recommended"],
  ...typescriptEslint.configs.recommended,
  vueTsConfigs.recommendedTypeChecked,

  {
    rules: {
      "comma-dangle": ["error", "always-multiline"],
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
);
