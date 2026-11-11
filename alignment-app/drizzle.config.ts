import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

// Local convenience: read .env.local unless the production guard script asked
// us not to (it must only ever use the explicitly exported variable).
if (!process.env.DRIZZLE_SKIP_ENV_FILE && existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

// Migrations always use the direct (unpooled) connection.
const url = process.env.DATABASE_URL_UNPOOLED;
// `generate` needs no connection; every other command (migrate, check, push,
// studio, ...) does, so fail early with a clear message instead of an opaque one.
if (!url && !process.argv.includes("generate")) {
  throw new Error("DATABASE_URL_UNPOOLED is not set. Add it to .env.local (see .env.example) or export it.");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/migrations",
  dbCredentials: { url: url ?? "" },
  migrations: { table: "__drizzle_migrations", schema: "drizzle" },
  strict: true,
  verbose: true,
});
