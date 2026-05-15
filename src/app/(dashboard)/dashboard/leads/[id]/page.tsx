import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { loadLeadDetail } from "@/lib/dashboard";
import { DashboardChrome } from "@/components/dashboard/DashboardChrome";
import { LeadStatusBadge } from "@/components/dashboard/LeadStatusBadge";
import { LeadActionsBar } from "@/components/dashboard/LeadActionsBar";

export const dynamic = "force-dynamic";

const DIVISION_LABEL: Record<string, string> = {
  pools: "Pools",
  developments: "Developments",
  properties: "Properties",
  multi: "Multi-division",
};

const BUDGET_LABEL: Record<string, string> = {
  "50-150": "$50K – $150K",
  "150-500": "$150K – $500K",
  "500plus": "$500K+",
};

const TIMELINE_LABEL: Record<string, string> = {
  asap: "ASAP",
  "1-3mo": "1–3 months",
  "3-6mo": "3–6 months",
  "6-12mo": "6–12 months",
  exploring: "Exploring",
};

type Args = { params: Promise<{ id: string }> };

export default async function LeadDetailPage({ params }: Args) {
  const user = await requireUser("/dashboard/leads");
  const { id } = await params;
  const detail = await loadLeadDetail(id);
  if (!detail) notFound();
  const { lead, notes } = detail;

  const displayName = lead.name || lead.email.split("@")[0];
  // Notes oldest-first; reverse for newest-first display.
  const orderedNotes = [...notes].sort((a, b) => {
    const at = a.createdAt ?? "";
    const bt = b.createdAt ?? "";
    return bt.localeCompare(at);
  });

  return (
    <DashboardChrome user={user}>
      {/* Breadcrumb + header */}
      <p className="mb-3 text-[length:var(--text-13)] text-[var(--color-muted)]">
        <Link href="/dashboard" className="hover:text-[var(--color-accent)]">
          Dashboard
        </Link>{" "}
        <span aria-hidden>›</span>{" "}
        <Link href="/dashboard/leads" className="hover:text-[var(--color-accent)]">
          Leads
        </Link>{" "}
        <span aria-hidden>›</span> {displayName}
      </p>

      <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-3">
            <LeadStatusBadge status={lead.status} size="md" />
          </div>
          <h1 className="font-display text-balance text-[length:var(--text-40)] leading-[1.05] tracking-tight md:text-[length:var(--text-52)]">
            {displayName}
          </h1>
          <p className="mt-3 text-[length:var(--text-15)] text-[var(--color-muted)]">
            <a
              href={`mailto:${lead.email}`}
              className="hover:text-[var(--color-accent)]"
            >
              {lead.email}
            </a>
            {lead.phone ? (
              <>
                {" · "}
                <a
                  href={`tel:${lead.phone}`}
                  className="hover:text-[var(--color-accent)]"
                >
                  {lead.phone}
                </a>
              </>
            ) : null}
            {" · "}
            <time dateTime={lead.createdAt}>
              {new Date(lead.createdAt).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </time>
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/collections/leads/${lead.id}`}
            className="rounded-full border border-[var(--color-line)] px-4 py-2 text-[length:var(--text-13)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Edit in CMS
          </Link>
          {lead.ghlContactId ? (
            <Link
              href={`https://app.gohighlevel.com/v2/location/contacts/detail/${lead.ghlContactId}`}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-[var(--color-line)] px-4 py-2 text-[length:var(--text-13)] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Open in GHL ↗
            </Link>
          ) : null}
        </div>
      </header>

      {/* Body */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left: details + message */}
        <div className="space-y-6 lg:col-span-7">
          <section className="card-highlight rounded-2xl border border-[var(--color-line)]">
            <header className="border-b border-[var(--color-line)] px-5 py-4">
              <h2 className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Details
              </h2>
            </header>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 p-5 text-[length:var(--text-15)]">
              <DetailRow label="Division" value={DIVISION_LABEL[lead.division ?? ""] ?? lead.division ?? "—"} />
              <DetailRow label="Budget band" value={BUDGET_LABEL[lead.budgetBand ?? ""] ?? lead.budgetBand ?? "—"} />
              <DetailRow label="Timeline" value={TIMELINE_LABEL[lead.timeline ?? ""] ?? lead.timeline ?? "—"} />
              <DetailRow label="Source" value={lead.source ?? "—"} mono />
              <DetailRow label="ZIP" value={lead.zip ?? "—"} mono />
              <DetailRow
                label="Service area"
                value={lead.outOfServiceArea ? "Out of area" : "In area"}
                tone={lead.outOfServiceArea ? "warn" : "good"}
              />
              <DetailRow label="GHL sync" value={lead.ghlSyncStatus} mono />
              {lead.statusChangedAt ? (
                <DetailRow
                  label="Status changed"
                  value={new Date(lead.statusChangedAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                />
              ) : null}
            </dl>
          </section>

          {lead.message ? (
            <section className="card-highlight rounded-2xl border border-[var(--color-line)] p-5">
              <h2 className="mb-3 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Visitor message
              </h2>
              <p className="whitespace-pre-wrap text-[length:var(--text-16)] leading-relaxed text-[var(--color-text)]">
                {lead.message}
              </p>
            </section>
          ) : null}

          {/* Activity timeline */}
          <section className="card-highlight rounded-2xl border border-[var(--color-line)]">
            <header className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
              <h2 className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Activity · {orderedNotes.length}
              </h2>
            </header>
            {orderedNotes.length === 0 ? (
              <p className="px-5 py-8 text-center text-[length:var(--text-13)] text-[var(--color-muted)]">
                No notes yet. Add the first from the right.
              </p>
            ) : (
              <ul className="divide-y divide-[var(--color-line)]">
                {orderedNotes.map((n, i) => {
                  const isSystem = n.body.startsWith("[system]");
                  const body = isSystem ? n.body.replace(/^\[system\]\s*/, "") : n.body;
                  return (
                    <li key={i} className="px-5 py-4">
                      <div className="mb-1 flex items-center gap-2 text-[length:var(--text-13)] text-[var(--color-muted)]">
                        {isSystem ? (
                          <span className="text-[var(--color-accent)]">system</span>
                        ) : (
                          <span className="text-[var(--color-text)]/85">
                            {n.author ?? "Unknown"}
                          </span>
                        )}
                        {n.createdAt ? (
                          <>
                            <span aria-hidden>·</span>
                            <time dateTime={n.createdAt}>
                              {new Date(n.createdAt).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </time>
                          </>
                        ) : null}
                      </div>
                      <p
                        className={`whitespace-pre-wrap text-[length:var(--text-15)] leading-relaxed ${
                          isSystem
                            ? "text-[var(--color-muted)]"
                            : "text-[var(--color-text)]"
                        }`}
                      >
                        {body}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        {/* Right: actions */}
        <div className="lg:col-span-5">
          <section className="card-highlight sticky top-24 rounded-2xl border border-[var(--color-line)] p-5">
            <h2 className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Actions
            </h2>
            <LeadActionsBar leadId={lead.id} currentStatus={lead.status} />
          </section>
        </div>
      </div>
    </DashboardChrome>
  );
}

function DetailRow({
  label,
  value,
  mono,
  tone,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: "good" | "warn";
}) {
  return (
    <div>
      <dt className="text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </dt>
      <dd
        className={`mt-1 ${mono ? "font-mono text-[length:var(--text-13)]" : ""} ${
          tone === "good"
            ? "text-emerald-300"
            : tone === "warn"
            ? "text-amber-200"
            : "text-[var(--color-text)]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
