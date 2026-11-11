import path from "node:path";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { closeDb, getDb } from "@/server/db/client";

const hasDatabase = Boolean(process.env.DATABASE_URL);
const MISSING = "DATABASE_URL is not set: set it in .env.local (see .env.example) to run DB integration tests.";

if (!hasDatabase) {
  if (process.env.CI) {
    // In CI a missing database must fail loudly, never skip silently.
    describe("database integration", () => {
      it("requires DATABASE_URL", () => {
        throw new Error(MISSING);
      });
    });
  } else {
    console.warn(`[skip] ${MISSING}`);
  }
}

// These tests run migrations, so never point them at a shared or production
// database by accident (for example a remote URL left in .env.local).
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);
function assertSafeTestDatabase(url: string): void {
  if (process.env.CI) return;
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    throw new Error("DATABASE_URL is not a valid URL; refusing to run DB integration tests.");
  }
  if (!LOCAL_HOSTS.has(host)) {
    throw new Error(
      `Refusing to run DB integration tests: DATABASE_URL host "${host}" is not localhost/127.0.0.1/::1. ` +
        "These tests apply migrations; point DATABASE_URL at a local test database.",
    );
  }
}

describe.skipIf(!hasDatabase)("database integration (AD-14)", () => {
  beforeAll(() => {
    assertSafeTestDatabase(process.env.DATABASE_URL!);
  });

  afterAll(async () => {
    await closeDb();
  });

  it("applies migrations", async () => {
    await migrate(getDb(), {
      migrationsFolder: path.resolve(__dirname, "../../src/server/db/migrations"),
      migrationsTable: "__drizzle_migrations",
      migrationsSchema: "drizzle",
    });
    const result = await getDb().execute(sql`select count(*)::int as n from drizzle.__drizzle_migrations`);
    expect((result.rows[0] as { n: number }).n).toBeGreaterThanOrEqual(1);
  });

  it("runs select 1 through the pooled client", async () => {
    const result = await getDb().execute(sql`select 1 as one`);
    expect(result.rows).toEqual([{ one: 1 }]);
  });
});
