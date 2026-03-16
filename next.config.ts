import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Next.js uses this directory as the workspace root when tracing files.
  // This avoids warnings when multiple lockfiles exist on the machine.
  outputFileTracingRoot: __dirname,
  images: {
    domains: ["images.ygoprodeck.com"],
  },
};

export default nextConfig;
