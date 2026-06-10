import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // the only stylesheet is ~6KB; inlining it removes the one
    // render-blocking request on the LCP critical path
    inlineCss: true,
  },
};

export default nextConfig;
