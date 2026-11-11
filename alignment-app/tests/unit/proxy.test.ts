import { describe, expect, it } from "vitest";
import { buildContentSecurityPolicy } from "../../proxy";

function directive(csp: string, name: string): string {
  return csp.split("; ").find((d) => d.startsWith(`${name} `)) ?? "";
}

describe("buildContentSecurityPolicy (AD-11)", () => {
  it("puts the nonce in script-src and style-src, without unsafe-eval in production", () => {
    const csp = buildContentSecurityPolicy("abc123", false);
    expect(directive(csp, "script-src")).toBe("script-src 'self' 'nonce-abc123' 'strict-dynamic'");
    expect(directive(csp, "style-src")).toBe("style-src 'self' 'nonce-abc123'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).toContain("frame-ancestors 'none'");
  });

  it("adds unsafe-eval to script-src only in development", () => {
    const csp = buildContentSecurityPolicy("abc123", true);
    expect(directive(csp, "script-src")).toBe("script-src 'self' 'nonce-abc123' 'strict-dynamic' 'unsafe-eval'");
    expect(directive(csp, "style-src")).toBe("style-src 'self' 'nonce-abc123'");
    expect(csp.match(/unsafe-eval/g)).toHaveLength(1);
  });
});
