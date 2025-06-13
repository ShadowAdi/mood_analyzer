import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      // Disable unused vars
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Disable any type warning
      "@typescript-eslint/no-explicit-any": "off",

      // Disable React-specific ESLint issues (optional)
      "react/jsx-key": "off",

      // Disable warning for using <a> without Link in /app directory (optional)
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default eslintConfig;
