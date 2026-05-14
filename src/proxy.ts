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
 * Dev shortcuts: `pools.localhost:3000`, etc. resolve the same way.
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") ?? "";
  const tenant = tenantFromHost(host);

  // Don't rewrite Payload routes, static assets, or Next internals.
  const path = url.pathname;
  const isPayload =
    path.startsWith("/admin") ||
    path.startsWith("/api/") ||
    path.startsWith("/_next") ||
    path.startsWith("/media") ||
    path === "/favicon.ico";

  if (isPayload) {
    const res = NextResponse.next();
    res.headers.set("x-silverline-tenant", tenant);
    return res;
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
