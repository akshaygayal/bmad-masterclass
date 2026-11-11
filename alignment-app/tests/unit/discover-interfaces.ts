import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import type { InterfaceEntry } from "@/server/interfaces";

const SOURCE = /\.(ts|tsx|js|jsx|mjs)$/;
const PAGE = /^page\.(ts|tsx|js|jsx|mjs)$/;
const ROUTE = /^route\.(ts|tsx|js|jsx|mjs)$/;
// Metadata route files are served publicly, so they are interfaces too.
const METADATA_ROUTE = /^(sitemap|robots|manifest|icon\d*|apple-icon\d*|opengraph-image\d*|twitter-image\d*)\.(ts|tsx|js|jsx|mjs)$/;

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/** "app/s/[id]/(group)/page.tsx" -> "/s/[id]" */
export function routePathFor(file: string): string {
  const segments = file
    .split("/")
    .slice(1, -1)
    .filter((s) => !(s.startsWith("(") && s.endsWith(")")) && !s.startsWith("@"));
  return "/" + segments.join("/");
}

function hasModuleDirective(source: ts.SourceFile, directive: string): boolean {
  for (const statement of source.statements) {
    if (!ts.isExpressionStatement(statement) || !ts.isStringLiteral(statement.expression)) break;
    if (statement.expression.text === directive) return true;
  }
  return false;
}

function exportedNames(source: ts.SourceFile, file: string): string[] {
  const names: string[] = [];
  const hasModifier = (node: ts.Node, kind: ts.SyntaxKind) =>
    ts.canHaveModifiers(node) && (ts.getModifiers(node) ?? []).some((m) => m.kind === kind);
  const isExported = (node: ts.Node) => hasModifier(node, ts.SyntaxKind.ExportKeyword);
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && isExported(statement)) {
      // `export default async function foo` is exposed as "default", not "foo".
      names.push(hasModifier(statement, ts.SyntaxKind.DefaultKeyword) ? "default" : (statement.name?.text ?? "default"));
    } else if (ts.isExportDeclaration(statement) && (!statement.exportClause || ts.isNamespaceExport(statement.exportClause))) {
      // `export * from` would hide actions from the registry scan.
      throw new Error(`${file}: 'export * from' is not allowed in a 'use server' module; export each action by name so it can be registered.`);
    } else if (ts.isVariableStatement(statement) && isExported(statement)) {
      for (const decl of statement.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) names.push(decl.name.text);
      }
    } else if (ts.isExportDeclaration(statement) && statement.exportClause && ts.isNamedExports(statement.exportClause)) {
      for (const el of statement.exportClause.elements) names.push(el.name.text);
    } else if (ts.isExportAssignment(statement)) {
      names.push("default");
    }
  }
  return names;
}

/** Scans app/ for pages, route handlers and exported server actions. */
export function discoverInterfaces(rootDir: string): InterfaceEntry[] {
  const appDir = path.join(rootDir, "app");
  const found: InterfaceEntry[] = [];
  for (const full of walk(appDir)) {
    if (!SOURCE.test(full)) continue;
    const file = path.relative(rootDir, full).split(path.sep).join("/");
    const base = path.basename(full);
    if (PAGE.test(base)) found.push({ kind: "page", file, path: routePathFor(file) });
    if (ROUTE.test(base)) found.push({ kind: "route", file, path: routePathFor(file) });
    if (METADATA_ROUTE.test(base)) {
      const dir = routePathFor(file);
      found.push({ kind: "route", file, path: `${dir === "/" ? "" : dir}/${base.replace(/\.[^.]+$/, "")}` });
    }

    const text = readFileSync(full, "utf8");
    if (!text.includes("use server")) continue;
    const source = ts.createSourceFile(full, text, ts.ScriptTarget.Latest, true);
    if (hasModuleDirective(source, "use server")) {
      for (const exportName of exportedNames(source, file)) found.push({ kind: "action", file, exportName });
    }
  }
  return found;
}

export function interfaceKey(entry: InterfaceEntry): string {
  return entry.kind === "action"
    ? `action ${entry.file}#${entry.exportName}`
    : `${entry.kind} ${entry.path} (${entry.file})`;
}
