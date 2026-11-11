#!/usr/bin/env node
// Production migration guard. Production migrations never run in a Vercel
// build (user decision, 2026-11-10); they run only through this script, either
// by hand or from the manual "Migrate production" GitHub Actions workflow.
//
// Usage: DATABASE_URL_UNPOOLED=... npm run db:migrate:prod -- --yes-production
import { spawnSync } from "node:child_process";

const fail = (message) => {
  console.error(`db:migrate:prod refused: ${message}`);
  process.exit(1);
};

if (!process.env.DATABASE_URL_UNPOOLED) {
  fail("DATABASE_URL_UNPOOLED must be exported in the environment (it is never read from .env files here).");
}
if (!process.argv.slice(2).includes("--yes-production")) {
  fail("pass --yes-production to confirm you intend to migrate the production database.");
}

console.log("Applying migrations to the database in DATABASE_URL_UNPOOLED ...");
const result = spawnSync("npx", ["drizzle-kit", "migrate"], {
  stdio: "inherit",
  env: { ...process.env, DRIZZLE_SKIP_ENV_FILE: "1" },
});
if (result.error) fail(`could not start drizzle-kit: ${result.error.message}`);
process.exit(result.status ?? 1);
