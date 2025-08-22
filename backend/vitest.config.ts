import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "node_modules",
        "dist",
        "drizzle.config.ts",
        "vitest.config.ts",
      ],
    },
    globals: true,
    include: ["src/__tests__/**/*.test.ts"],
    exclude: ["node_modules", "dist", "drizzle.config.ts", "vitest.config.ts"],
  },
});
