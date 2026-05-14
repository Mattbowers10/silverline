import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so Next 16 doesn't fall back to a parent lockfile.
  turbopack: {
    root: dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.silverlineind.com" },
      { protocol: "https", hostname: "silverlineind.com" },
    ],
  },
};

export default withPayload(nextConfig);
