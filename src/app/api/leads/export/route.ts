import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { loadLeadsList, type LeadListFilters } from "@/lib/dashboard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * CSV export of the leads list with the same filters as /dashboard/leads.
 * Auth-gated: anonymous request → 401.
 * Hard-capped at 10,000 rows to avoid runaway exports.
 */

const HEADERS = [
  "id",
  "createdAt",
  "name",
  "email",
  "phone",
  "zip",
  "in_service_area",
  "division",
  "budget_band",
  "timeline",
  "source",
  "status",
  "status_changed_at",
  "ghl_sync_status",
  "ghl_contact_id",
  "message",
] as const;

const MAX_ROWS = 10_000;

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Authentication required." },
      { status: 401 },
    );
  }

  const sp = req.nextUrl.searchParams;
  const filters: LeadListFilters = {
    status: sp.get("status") || undefined,
    division: sp.get("division") || undefined,
    source: sp.get("source") || undefined,
    inArea: (sp.get("inArea") as "in" | "out" | undefined) || undefined,
    q: sp.get("q") || undefined,
    page: 1,
    perPage: MAX_ROWS,
  };

  const { leads, totalDocs } = await loadLeadsList(filters);

  const lines: string[] = [HEADERS.map(csvEscape).join(",")];
  for (const l of leads) {
    lines.push(
      [
        l.id,
        l.createdAt,
        l.name ?? "",
        l.email,
        l.phone ?? "",
        l.zip ?? "",
        l.outOfServiceArea ? "out" : "in",
        l.division ?? "",
        l.budgetBand ?? "",
        l.timeline ?? "",
        l.source ?? "",
        l.status,
        l.statusChangedAt ?? "",
        l.ghlSyncStatus,
        l.ghlContactId ?? "",
        l.message ?? "",
      ]
        .map(csvEscape)
        .join(","),
    );
  }
  const body = lines.join("\n") + "\n";

  // Build a meaningful filename: silverline-leads-YYYY-MM-DD[-<status>][-<division>].csv
  const stamp = new Date().toISOString().slice(0, 10);
  const tag = [filters.status, filters.division, filters.inArea]
    .filter(Boolean)
    .join("-");
  const filename = `silverline-leads-${stamp}${tag ? `-${tag}` : ""}.csv`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "X-Lead-Count": String(leads.length),
      "X-Total-Matching": String(totalDocs),
    },
  });
}

function csvEscape(input: unknown): string {
  const v = input == null ? "" : String(input);
  if (/[",\n\r]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}
