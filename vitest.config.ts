import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Contract-test configuration for the server-side API surface.
//
// Tests are co-located with the module they exercise (dot-test files under
// src) or grouped under the tests directory. All tests run in a plain node
// environment and must mock the database layer (the prisma module) and
// Supabase clients -- no test may require a live database or Supabase.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "tests/**/*.test.ts"],
  },
});
