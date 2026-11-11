import type { NextConfig } from "next";

// AD-4: no framework caching anywhere. Session data must never be served from
// a cache, so Cache Components and Partial Prefetching are explicitly off.
const nextConfig: NextConfig = {
  cacheComponents: false,
  partialPrefetching: false,
  poweredByHeader: false,
};

export default nextConfig;
