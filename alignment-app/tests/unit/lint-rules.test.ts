import path from "node:path";
import { ESLint } from "eslint";
import { beforeAll, describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
let eslint: ESLint;

beforeAll(() => {
  eslint = new ESLint({ cwd: root });
});

async function lint(code: string, filePath: string) {
  const [result] = await eslint.lintText(code, { filePath: path.join(root, filePath) });
  return result.messages.filter((m) => m.severity === 2);
}

const banned: Array<{ name: string; file: string; code: string; rule: string; message?: RegExp }> = [
  { name: "'use cache' directive in app/", file: "app/fixture/page.tsx", rule: "no-restricted-syntax",
    code: `"use cache";\nexport default function P() { return null; }\n` },
  { name: "'use cache: private' in src/server/", file: "src/server/domain/fixture.ts", rule: "no-restricted-syntax",
    code: `export async function q() {\n  "use cache: private";\n  return 1;\n}\n` },
  { name: "unstable_cache import in app/", file: "app/fixture/page.tsx", rule: "no-restricted-imports",
    code: `import { unstable_cache } from "next/cache";\nexport const x = unstable_cache;\n` },
  { name: "unstable_cache import in src/server/", file: "src/server/domain/fixture.ts", rule: "no-restricted-imports",
    code: `import { unstable_cache } from "next/cache";\nexport const x = unstable_cache;\n` },
  { name: "cache: 'force-cache' in app/", file: "app/fixture/page.tsx", rule: "no-restricted-syntax",
    code: `export async function f() { return fetch("/x", { cache: "force-cache" }); }\n` },
  { name: "cache: 'force-cache' in src/server/", file: "src/server/domain/fixture.ts", rule: "no-restricted-syntax",
    code: `export const opts = { cache: "force-cache" };\n` },
  { name: "'use server' module in src/server/", file: "src/server/domain/fixture.ts", rule: "no-restricted-syntax",
    code: `"use server";\nexport async function act() {}\n` },
  { name: "'use server' module in src/ui/", file: "src/ui/fixture.ts", rule: "no-restricted-syntax",
    code: `"use server";\nexport async function act() {}\n` },
  { name: "'use server' module at repo root", file: "fixture.ts", rule: "no-restricted-syntax",
    code: `"use server";\nexport async function act() {}\n` },
  { name: "app/ imports @/server/db", file: "app/fixture/page.tsx", rule: "no-restricted-imports",
    code: `import { getDb } from "@/server/db/client";\nexport const x = getDb;\n` },
  { name: "app/ imports @/server/db (index)", file: "app/fixture/page.tsx", rule: "no-restricted-imports",
    code: `import * as db from "@/server/db";\nexport const x = db;\n` },
  { name: "inline 'use server' function in app/", file: "app/fixture/page.tsx", rule: "no-restricted-syntax",
    code: `export default function P() {\n  async function act() {\n    "use server";\n  }\n  return act;\n}\n` },
  { name: "inline 'use server' arrow function in app/", file: "app/fixture/actions.ts", rule: "no-restricted-syntax",
    code: `export const act = async () => {\n  "use server";\n};\n` },
  { name: "app/ imports src/server/db relatively", file: "app/fixture/page.tsx", rule: "no-restricted-imports",
    code: `import { getDb } from "../../src/server/db/client";\nexport const x = getDb;\n` },
  { name: "exported revalidate in app/", file: "app/fixture/page.tsx", rule: "no-restricted-syntax", message: /revalidate/,
    code: `export const revalidate = 60;\nexport default function P() { return null; }\n` },
  { name: "exported fetchCache in src/server/", file: "src/server/domain/fixture.ts", rule: "no-restricted-syntax", message: /fetchCache/,
    code: `export const fetchCache = "force-cache";\n` },
  { name: "dynamic = 'force-static' in app/", file: "app/fixture/page.tsx", rule: "no-restricted-syntax", message: /force-static/,
    code: `export const dynamic = "force-static";\nexport default function P() { return null; }\n` },
  { name: "dynamic = 'error' in src/", file: "src/ui/fixture.ts", rule: "no-restricted-syntax", message: /force-static/,
    code: `export const dynamic = "error";\n` },
  { name: "next: { revalidate } in app/", file: "app/fixture/page.tsx", rule: "no-restricted-syntax", message: /next: \{ revalidate \}/,
    code: `export async function f() { return fetch("/x", { next: { revalidate: 10 } }); }\n` },
  { name: "dynamic import() of the db layer in app/", file: "app/fixture/page.tsx", rule: "no-restricted-syntax", message: /database layer/,
    code: `export async function f() { return import("@/server/db/client"); }\n` },
  { name: "require() of the db layer in app/", file: "app/fixture/route.js", rule: "no-restricted-syntax", message: /database layer/,
    code: `const db = require("../../src/server/db/client");\nmodule.exports = db;\n` },
];

describe("lint bans (AD-4, AD-21, layering)", () => {
  it.each(banned)("errors on $name", async ({ code, file, rule, message }) => {
    const errors = await lint(code, file);
    const matching = errors.filter((e) => e.ruleId === rule && (!message || message.test(e.message)));
    expect(matching, JSON.stringify(errors.map((e) => `${e.ruleId}: ${e.message}`))).not.toEqual([]);
  });

  it("allows dynamic = 'force-dynamic'", async () => {
    const errors = await lint(`export const dynamic = "force-dynamic";\nexport default function P() { return null; }\n`, "app/fixture/layout.tsx");
    expect(errors).toEqual([]);
  });

  it("allows 'use server' under app/", async () => {
    const errors = await lint(`"use server";\nexport async function act() {}\n`, "app/fixture/actions.ts");
    expect(errors).toEqual([]);
  });

  it("allows src/server/ to import the db layer", async () => {
    const errors = await lint(`import { getDb } from "@/server/db/client";\nexport const x = getDb;\n`, "src/server/domain/fixture.ts");
    expect(errors).toEqual([]);
  });

  it("allows cache: 'no-store'", async () => {
    const errors = await lint(`export async function f() { return fetch("/x", { cache: "no-store" }); }\n`, "app/fixture/page.tsx");
    expect(errors).toEqual([]);
  });
});
