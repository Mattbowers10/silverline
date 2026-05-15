import { NextResponse, type NextRequest } from "next/server";
import { createLead } from "@/lib/leads";

export async function POST(req: NextRequest) {
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

  const result = await createLead(raw);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors ?? { _form: "Unknown error" } },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    leadId: result.leadId,
    outOfServiceArea: result.outOfServiceArea ?? false,
    ghlStatus: "skipped" in result.ghl ? "skipped" : result.ghl.ok ? "synced" : "failed",
  });
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
