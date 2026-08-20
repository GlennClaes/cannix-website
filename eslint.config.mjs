import { defineConfig } from "eslint/config";
import nextPlugin from "eslint-plugin-next";

export default defineConfig([
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**"],
  },
  {
    plugins: {
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "off", // We use next/image properly
      "react/no-unescaped-entities": "off",
    },
  },
]);