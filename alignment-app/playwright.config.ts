import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3100);
const baseURL = `http://127.0.0.1:${PORT}`;

// E2E runs against a production build (`next build && next start`), so the
// headers and CSP under test match what is deployed. CI builds in an earlier
// step and sets E2E_SKIP_BUILD=1 to avoid building twice.
const start = `npx next start --hostname 127.0.0.1 --port ${PORT}`;
const command = process.env.E2E_SKIP_BUILD === "1" ? start : `npm run build && ${start}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    viewport: { width: 1280, height: 800 },
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } }],
  webServer: {
    command,
    url: baseURL,
    // Never reuse whatever is on the port: it could be a stale or dev server.
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
