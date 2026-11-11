import { expect, test } from "@playwright/test";

function nonceOf(csp: string): string {
  const match = csp.match(/'nonce-([^']+)'/);
  expect(match, `CSP has no nonce: ${csp}`).not.toBeNull();
  return match![1];
}

test("GET / sends the security headers (AD-11)", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const headers = response.headers();
  const csp = headers["content-security-policy"];
  expect(csp, "Content-Security-Policy header").toBeTruthy();

  const nonce = nonceOf(csp);
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain(`script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`);
  expect(csp).toContain(`style-src 'self' 'nonce-${nonce}'`);
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp, "no unsafe-eval in production").not.toContain("unsafe-eval");
  expect(csp).not.toContain("unsafe-inline");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");

  // Next.js applied the same nonce to its scripts.
  const html = await response.text();
  expect(html).toContain(`nonce="${nonce}"`);
});

test("the CSP nonce differs across requests", async ({ request }) => {
  const nonces = new Set<string>();
  for (let i = 0; i < 3; i++) {
    const response = await request.get("/");
    nonces.add(nonceOf(response.headers()["content-security-policy"]));
  }
  expect(nonces.size).toBe(3);
});

test("the page loads with no CSP violations", async ({ page }) => {
  const violations: string[] = [];
  page.on("console", (msg) => {
    if (/Content Security Policy|Content-Security-Policy/i.test(msg.text())) violations.push(msg.text());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(violations).toEqual([]);
});

test("unknown routes are also served with a nonce that Next.js applies", async ({ request }) => {
  const response = await request.get("/does-not-exist");
  expect(response.status()).toBe(404);
  const nonce = nonceOf(response.headers()["content-security-policy"]);
  expect(await response.text()).toContain(`nonce="${nonce}"`);
});
