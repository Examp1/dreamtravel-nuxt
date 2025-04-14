import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import pluginVue from "eslint-plugin-vue";

export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,vue}"] },
    {
        files: ["**/*.{js,mjs,cjs,vue}"],
        languageOptions: { globals: globals.browser },
    },
    {
        files: ["**/*.{js,mjs,cjs,vue}"],
        plugins: { js, prettier: prettierPlugin },
        extends: ["js/recommended"],
        rules: {
            "prettier/prettier": [
                "warn",
                {
                    endofLine: "auto",
                },
            ],
        },
    },
    pluginVue.configs["flat/essential"],
])