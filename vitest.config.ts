import { defineConfig } from "vitest/config";

// Standalone config so the SSR smoke tests do not boot the full app Vite pipeline.
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
  },
});
