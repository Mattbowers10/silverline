import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Security headers applied to every response. CSP is intentionally deferred
 * until Week 12 — Payload admin, GTM, and Calendly all rely on inline scripts
 * that require a nonce-based CSP done carefully to avoid breaking. The
 * non-CSP headers below cover OWASP basics with zero functional risk.
 */
const SECURITY_HEADERS = [
  // HSTS — 2 years, include subdomains, preload-list eligible.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // No MIME-sniffing.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking — same-origin only. Payload admin embeds work; the marketing
  // site never embeds in third-party frames.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Reasonable default for an editorial site: send referrer to same-origin,
  // origin-only to cross-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Lock down powerful browser APIs we never use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Block legacy XSS auditors that misfire more than they help.
  { key: "X-XSS-Protection", value: "0" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: dirname,
    resolveAlias: {
      "@payload-config": "./src/payload.config.ts",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.silverlineind.com" },
      { protocol: "https", hostname: "silverlineind.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default withPayload(nextConfig);
