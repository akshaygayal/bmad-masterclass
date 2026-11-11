import { spawnSync } from "node:child_process";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");

// Both refusal paths exit before drizzle-kit is spawned, so nothing touches a database.
function run(args: string[], extraEnv: Record<string, string>) {
  const env: NodeJS.ProcessEnv = { NODE_ENV: "test", PATH: process.env.PATH, ...extraEnv };
  return spawnSync(process.execPath, ["scripts/migrate-production.mjs", ...args], { cwd: root, env, encoding: "utf8" });
}

describe("db:migrate:prod guard", () => {
  it("refuses when DATABASE_URL_UNPOOLED is not set", () => {
    const result = run(["--yes-production"], {});
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("db:migrate:prod refused");
    expect(result.stderr).toContain("DATABASE_URL_UNPOOLED");
  });

  it("refuses without --yes-production", () => {
    const result = run([], { DATABASE_URL_UNPOOLED: "postgres://guard-test.invalid/db" });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("db:migrate:prod refused");
    expect(result.stderr).toContain("--yes-production");
  });
});
