/**
 * AD-21: the interface registry.
 *
 * Every page, route handler and exported server action under app/ must be
 * listed here. tests/unit/registry.test.ts fails on missing or stale entries,
 * and later leak tests iterate this list so every interface is covered.
 */

export type InterfaceKind = "page" | "route" | "action";

export interface InterfaceEntry {
  kind: InterfaceKind;
  /** Source file relative to the app root, e.g. "app/page.tsx". */
  file: string;
  /** URL pattern for pages and route handlers, e.g. "/" or "/s/[sessionId]". */
  path?: string;
  /** Exported function name, for server actions only. */
  exportName?: string;
  /** UX surface id from EXPERIENCE.md, when there is one. */
  surface?: string;
}

export const interfaces: readonly InterfaceEntry[] = [
  { kind: "page", file: "app/page.tsx", path: "/", surface: "S1" },
];
