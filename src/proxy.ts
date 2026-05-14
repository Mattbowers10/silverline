import { NextResponse, type NextRequest } from "next/server";
import { tenantFromHost } from "@/lib/tenants";

/**
 * Subdomain routing.
 *
 *  - silverlineind.com               → app/s/parent/...
 *  - pools.silverlineind.com         → app/s/pools/...
 *  - developments.silverlineind.com  → app/s/developments/...
 *  - properties.silverlineind.com    → app/s/properties/...
 *
 * Payload's admin (`/admin`) and API (`/api/*`) are exempt — they run on every host.
 *
 * Company pages (about, contact, careers, blog, shop, legal, etc.) live ONLY
 * on the parent. Subdomain requests for those paths are redirected to the
 * parent host so footer links work everywhere.
 *
 * Dev shortcuts: `pools.localhost:3000`, etc. resolve the same way.
 */

/** Paths that only exist on the parent. Match prefixes. */
const PARENT_ONLY_PREFIXES = [
  "/about",
  "/contact",
  "/careers",
  "/financing",
  "/press",
  "/partners",
  "/investors",
  "/blog",
  "/shop",
  "/legal",
  "/service-area",
];

function isParentOnly(path: string) {
  return PARENT_ONLY_PREFIXES.some(
    (p) => path === p || path.startsWith(`${p}/`),
  );
}

/** Derive the parent host from the current host (for both prod + localhost dev). */
function parentHostFromCurrent(host: string): string {
  const [hostname, port] = host.split(":");
  // localhost dev: any *.localhost → localhost
  if (hostname.endsWith(".localhost") || hostname === "localhost") {
    return port ? `localhost:${port}` : "localhost";
  }
  // Strip the leftmost label (subdomain) and rejoin.
  const parts = hostname.split(".");
  if (parts.length >= 3) {
    return parts.slice(1).join(".");
  }
  return hostname;
}

export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  const tenant = tenantFromHost(host);
  const path = url.pathname;

  // Don't rewrite Payload routes, static assets, or Next internals.
  const isPayload =
    path.startsWith("/admin") ||
    path.startsWith("/api/") ||
    path.startsWith("/_next") ||
    path.startsWith("/media") ||
    path === "/favicon.ico" ||
    path === "/sitemap.xml" ||
    path === "/robots.txt";

  if (isPayload) {
    const res = NextResponse.next();
    res.headers.set("x-silverline-tenant", tenant);
    return res;
  }

  // If a subdomain is hit on a parent-only path, redirect to the parent host.
  if (tenant !== "parent" && isParentOnly(path)) {
    const parentHost = parentHostFromCurrent(host);
    const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
    const target = new URL(`${proto}://${parentHost}${path}${url.search}`);
    return NextResponse.redirect(target, 308);
  }

  // Rewrite the URL to the tenant subtree under /s/.
  url.pathname = `/s/${tenant}${path === "/" ? "" : path}`;

  const res = NextResponse.rewrite(url);
  res.headers.set("x-silverline-tenant", tenant);
  return res;
}

export const config = {
  matcher: [
    // Run on every path except Next internals and explicit static files.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
