import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Vendored upstream plugin code is hash-checked by lint-toolchain tests.
    "tooling/next-eslint-plugin/dist/**",
    ".next/**",
    "out/**",
    "next-env.d.ts",
    ".npm-cache/**",
    ".artifacts/**",
    "test-results/**",
    "playwright-report/**",
  ]),
]);
