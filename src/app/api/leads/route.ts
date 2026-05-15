import { NextResponse, type NextRequest } from "next/server";
import { createLead } from "@/lib/leads";
import { rateLimit, rateLimitHeaders } from "@/lib/rateLimit";

const LIMIT = 5; // submissions
const WINDOW_SEC = 60; // per minute, per IP

export async function POST(req: NextRequest) {
  // 1. Rate limit — protect Payload + GHL + Resend from runaway bots.
  const rl = rateLimit(req, {
    limit: LIMIT,
    windowSec: WINDOW_SEC,
    namespace: "leads",
  });
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429, headers: rateLimitHeaders(rl, LIMIT) },
    );
  }

  // 2. Parse + validate via createLead pipeline.
  const contentType = req.headers.get("content-type") ?? "";
  let raw: Record<string, unknown> = {};
  if (contentType.includes("application/json")) {
    raw = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  } else if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await req.formData();
    raw = Object.fromEntries(form.entries()) as Record<string, unknown>;
  }

  // 3. Honeypot: if the hidden "website" field is populated, this is a bot.
  //    Silently return success so the bot thinks it worked, but never persist.
  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return NextResponse.json({
      ok: true,
      leadId: "bot-trapped",
      outOfServiceArea: false,
      ghlStatus: "skipped",
    });
  }

  const result = await createLead(raw);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors ?? { _form: "Unknown error" } },
      { status: 400, headers: rateLimitHeaders(rl, LIMIT) },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      leadId: result.leadId,
      outOfServiceArea: result.outOfServiceArea ?? false,
      ghlStatus:
        "skipped" in result.ghl ? "skipped" : result.ghl.ok ? "synced" : "failed",
    },
    { headers: rateLimitHeaders(rl, LIMIT) },
  );
}

/** Convenience GET — surfaces lead pipeline health for quick sanity checks. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    pipeline: {
      payload: "always-on",
      ghl: process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID ? "configured" : "skipped",
      resend: process.env.RESEND_API_KEY ? "configured" : "skipped",
    },
  });
}
