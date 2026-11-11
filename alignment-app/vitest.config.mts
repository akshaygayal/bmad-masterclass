import { existsSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vitest/config";

// Integration tests read DATABASE_URL from .env.local when it is not already
// exported (CI exports it directly). Existing variables are never overwritten.
if (existsSync(".env.local")) process.loadEnvFile(".env.local");

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts", "tests/integration/**/*.test.ts"],
    testTimeout: 30_000,
    // Integration tests share one database; keep files sequential.
    fileParallelism: false,
  },
});
