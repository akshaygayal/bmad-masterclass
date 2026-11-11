import { attachDatabasePool } from "@vercel/functions";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

/**
 * AD-14: one pg Pool per server instance, created once in module scope and
 * registered with Vercel Fluid compute so idle connections are released before
 * the instance is suspended.
 *
 * Uses the pooled DATABASE_URL (PgBouncer transaction mode in production):
 * no session-level SET, advisory locks, SQL PREPARE or LISTEN; only SET LOCAL.
 */

export type Database = NodePgDatabase<typeof schema>;

let pool: Pool | undefined;
let db: Database | undefined;

export class MissingDatabaseUrlError extends Error {
  constructor() {
    super("DATABASE_URL is not set. Add it to .env.local (see .env.example).");
    this.name = "MissingDatabaseUrlError";
  }
}

export function getDb(): Database {
  if (db) return db;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new MissingDatabaseUrlError();

  pool = new Pool({ connectionString, max: 10, idleTimeoutMillis: 5_000 });
  // An idle client dropped by Neon/PgBouncer emits 'error' on the pool; without
  // a listener that crashes the instance. Log only the code and message, never
  // the connection string or query data.
  pool.on("error", (error: Error & { code?: string }) => {
    console.error(`[db] idle pg client error${error.code ? ` (${error.code})` : ""}: ${error.message}`);
  });
  attachDatabasePool(pool);
  db = drizzle({ client: pool, schema });
  return db;
}

/** Closes the pool. Used by tests and scripts; the app never calls this. */
export async function closeDb(): Promise<void> {
  const current = pool;
  pool = undefined;
  db = undefined;
  await current?.end();
}
