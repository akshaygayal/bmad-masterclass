import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { interfaces } from "@/server/interfaces";
import { discoverInterfaces, interfaceKey, routePathFor } from "./discover-interfaces";

const root = path.resolve(__dirname, "../..");

describe("interface registry (AD-21)", () => {
  const discovered = new Set(discoverInterfaces(root).map(interfaceKey));
  const registered = new Set(interfaces.map(interfaceKey));

  it("lists every page, route handler and exported server action in app/", () => {
    const unregistered = [...discovered].filter((key) => !registered.has(key));
    expect(unregistered, `Unregistered interfaces - add them to src/server/interfaces.ts:\n${unregistered.join("\n")}`).toEqual([]);
  });

  it("has no stale entries", () => {
    const stale = [...registered].filter((key) => !discovered.has(key));
    expect(stale, `Stale registry entries with no matching file/export:\n${stale.join("\n")}`).toEqual([]);
  });

  it("has no duplicate entries", () => {
    expect(registered.size).toBe(interfaces.length);
  });

  it("detects pages, route handlers and exported server actions it was not told about", () => {
    const fixture = mkdtempSync(path.join(os.tmpdir(), "registry-fixture-"));
    try {
      const write = (rel: string, body: string) => {
        mkdirSync(path.dirname(path.join(fixture, rel)), { recursive: true });
        writeFileSync(path.join(fixture, rel), body);
      };
      write("app/page.tsx", "export default function P() { return null; }\n");
      write("app/(g)/s/[sessionId]/page.tsx", "export default function P() { return null; }\n");
      write("app/access/[token]/route.ts", "export async function GET() { return new Response(); }\n");
      write("app/s/actions.ts", '"use server";\nexport async function reveal() {}\nexport const submit = async () => {};\n');
      write("app/s/helper.ts", "export function notAnAction() {}\n");
      write("app/api/upload/route.tsx", "export async function POST() { return new Response(); }\n");
      write("app/sitemap.ts", "export default function sitemap() { return []; }\n");
      write("app/robots.js", "export default function robots() { return {}; }\n");
      write("app/manifest.ts", "export default function manifest() { return {}; }\n");
      write("app/icon.tsx", "export default function Icon() { return null; }\n");
      write("app/apple-icon.jsx", "export default function Icon() { return null; }\n");
      write("app/s/[sessionId]/opengraph-image.tsx", "export default function Img() { return null; }\n");
      write("app/twitter-image.mjs", "export default function Img() { return null; }\n");
      write("app/s/default-action.ts", '"use server";\nexport default async function foo() {}\n');
      const keys = discoverInterfaces(fixture).map(interfaceKey).sort();
      expect(keys).toEqual([
        "action app/s/actions.ts#reveal",
        "action app/s/actions.ts#submit",
        "action app/s/default-action.ts#default",
        "page / (app/page.tsx)",
        "page /s/[sessionId] (app/(g)/s/[sessionId]/page.tsx)",
        "route /access/[token] (app/access/[token]/route.ts)",
        "route /api/upload (app/api/upload/route.tsx)",
        "route /apple-icon (app/apple-icon.jsx)",
        "route /icon (app/icon.tsx)",
        "route /manifest (app/manifest.ts)",
        "route /robots (app/robots.js)",
        "route /s/[sessionId]/opengraph-image (app/s/[sessionId]/opengraph-image.tsx)",
        "route /sitemap (app/sitemap.ts)",
        "route /twitter-image (app/twitter-image.mjs)",
      ]);
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  });

  it("refuses 'export * from' in a 'use server' module, naming the file", () => {
    const fixture = mkdtempSync(path.join(os.tmpdir(), "registry-fixture-"));
    try {
      mkdirSync(path.join(fixture, "app/s"), { recursive: true });
      writeFileSync(path.join(fixture, "app/s/actions.ts"), '"use server";\nexport * from "./impl";\n');
      expect(() => discoverInterfaces(fixture)).toThrow(/app\/s\/actions\.ts: 'export \* from' is not allowed/);
    } finally {
      rmSync(fixture, { recursive: true, force: true });
    }
  });

  it("derives URL paths, ignoring route groups and slots", () => {
    expect(routePathFor("app/page.tsx")).toBe("/");
    expect(routePathFor("app/(main)/s/[sessionId]/page.tsx")).toBe("/s/[sessionId]");
    expect(routePathFor("app/access/[token]/route.ts")).toBe("/access/[token]");
  });
});
