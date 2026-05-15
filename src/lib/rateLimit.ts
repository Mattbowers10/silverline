/**
 * Sliding-window rate limit keyed by client IP.
 *
 * V1 implementation: in-memory Map. Works for single-region long-running
 * servers and the local dev preview. On Vercel serverless, each instance
 * has its own counter — that's intentional for cheap protection against
 * casual abuse, NOT a guarantee against distributed bots.
 *
 * Upgrade path when traffic warrants: drop in `@upstash/ratelimit` with
 * `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` env vars and swap
 * the implementation behind the same interface.
 */

import type { NextRequest } from "next/server";

export type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number };

type Hit = { ts: number };

const STORE = new Map<string, Hit[]>();

/** Default identifier — IP from common proxy headers, falling back to "unknown". */
export function getClientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "anon";
}

type Opts = {
  /** Number of requests allowed in the window. */
  limit: number;
  /** Window length in seconds. */
  windowSec: number;
  /** Namespace so different endpoints don't share buckets. */
  namespace: string;
};

export function rateLimit(req: NextRequest, opts: Opts): RateLimitResult {
  const key = `${opts.namespace}:${getClientKey(req)}`;
  const now = Date.now();
  const windowStart = now - opts.windowSec * 1000;

  // Prune anything outside the current window.
  const prev = STORE.get(key) ?? [];
  const fresh = prev.filter((h) => h.ts > windowStart);

  if (fresh.length >= opts.limit) {
    // Reset when the oldest still-counted hit ages out.
    const oldest = fresh[0]?.ts ?? now;
    const resetAt = oldest + opts.windowSec * 1000;
    // No point keeping the over-quota state forever.
    STORE.set(key, fresh);
    return { ok: false, remaining: 0, resetAt };
  }

  fresh.push({ ts: now });
  STORE.set(key, fresh);
  return {
    ok: true,
    remaining: opts.limit - fresh.length,
    resetAt: now + opts.windowSec * 1000,
  };
}

/** Convenience headers for 429 responses. */
export function rateLimitHeaders(result: RateLimitResult, limit: number): Record<string, string> {
  return {
    "X-RateLimit-Limit": String(limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    "Retry-After": String(Math.max(0, Math.ceil((result.resetAt - Date.now()) / 1000))),
  };
}
