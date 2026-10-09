import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

/**
 * Test runner configuration — exists solely to run the contract tests for
 * `src/app/(auth)/` (the repo had no test runner before). Keep `include`
 * free of glob-special parentheses; the `(auth)` directory name contains
 * them, so tests are discovered by a plain "src slash star-star" pattern
 * instead of naming the directory.
 */
const repoRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(repoRoot, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
});
