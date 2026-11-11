import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// AD-4: framework caching is banned. Session data must never be cached.
const cacheBanSyntax = [
  {
    selector: "ExpressionStatement[directive=/^use cache/]",
    message: "'use cache' is banned (AD-4): session data must never be cached.",
  },
  {
    selector: "Property[key.name='cache'][value.value='force-cache'], Property[key.value='cache'][value.value='force-cache']",
    message: "cache: 'force-cache' is banned (AD-4): session data must never be cached.",
  },
  {
    selector: "ImportSpecifier[imported.name='unstable_cache'], MemberExpression[property.name='unstable_cache']",
    message: "unstable_cache is banned (AD-4): session data must never be cached.",
  },
  // Segment config and fetch options that turn on caching or static rendering.
  {
    selector: "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name=/^(revalidate|fetchCache)$/], ExportSpecifier[exported.name=/^(revalidate|fetchCache)$/]",
    message: "Exporting `revalidate` / `fetchCache` segment config is banned (AD-4): routes must never be cached.",
  },
  {
    selector: "ExportNamedDeclaration > VariableDeclaration > VariableDeclarator[id.name='dynamic'][init.value=/^(force-static|error)$/]",
    message: "`dynamic = 'force-static' | 'error'` is banned (AD-4): routes must render per request.",
  },
  {
    selector: "Property[key.name='next'] > ObjectExpression > Property[key.name='revalidate']",
    message: "`next: { revalidate }` is banned (AD-4): session data must never be cached.",
  },
];

// app/ must not reach the db layer through dynamic import() or require() either.
const dbFromAppDynamicBan = [
  {
    selector: "ImportExpression[source.value=/server\\/db/]",
    message: "app/ must not import the database layer. Go through src/server/domain (layering).",
  },
  {
    selector: "CallExpression[callee.name='require'][arguments.0.value=/server\\/db/]",
    message: "app/ must not import the database layer. Go through src/server/domain (layering).",
  },
];

const useServerOutsideApp = {
  selector: "ExpressionStatement[directive='use server']",
  message: "'use server' is allowed only under app/ (AD-21: every server action is a registered interface).",
};

// AD-21: inline (function-level) server actions are still exposed by Next.js as
// endpoints but cannot be listed by module, so every action must live in a
// module-level 'use server' file under app/ that the registry scan can see.
const inlineServerAction = {
  selector: ":function ExpressionStatement[directive='use server']",
  message: "Inline 'use server' functions are banned (AD-21): put server actions in a module-level 'use server' file under app/ so they are registered.",
};

const cacheBanImports = {
  name: "next/cache",
  importNames: ["unstable_cache"],
  message: "unstable_cache is banned (AD-4): session data must never be cached.",
};

const dbFromAppBan = {
  group: [
    "@/server/db",
    "@/server/db/**",
    "**/src/server/db",
    "**/src/server/db/**",
  ],
  message: "app/ must not import the database layer. Go through src/server/domain (layering).",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Interface layer: no caching, no direct DB access.
  {
    files: ["app/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      "no-restricted-syntax": ["error", ...cacheBanSyntax, ...dbFromAppDynamicBan, inlineServerAction],
      "no-restricted-imports": ["error", { paths: [cacheBanImports], patterns: [dbFromAppBan] }],
    },
  },
  // Everything outside app/: no caching, and no 'use server'.
  {
    files: ["src/**/*.{ts,tsx,js,jsx,mjs,cjs}", "proxy.ts"],
    rules: {
      "no-restricted-syntax": ["error", ...cacheBanSyntax, useServerOutsideApp],
      "no-restricted-imports": ["error", { paths: [cacheBanImports] }],
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    ignores: ["app/**", "src/**", "proxy.ts"],
    rules: {
      "no-restricted-syntax": ["error", useServerOutsideApp],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
]);

export default eslintConfig;
