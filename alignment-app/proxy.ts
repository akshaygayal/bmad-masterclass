import { NextResponse, type NextRequest } from "next/server";

/**
 * AD-11: security headers for every page response.
 *
 * A fresh nonce is generated per request. Next.js reads it from the request's
 * Content-Security-Policy header during dynamic rendering and attaches it to
 * its own scripts and inline styles, so pages using this must render
 * dynamically (see app/layout.tsx).
 */

export function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
}

export function buildContentSecurityPolicy(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    // 'unsafe-eval' is needed only by React's dev tooling; never in production.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' blob: data:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = createNonce();
  const csp = buildContentSecurityPolicy(nonce, process.env.NODE_ENV === "development");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export const config = {
  matcher: [
    // Everything except build-time static assets, which carry no HTML.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
