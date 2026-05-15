import Link from "next/link";
import { cn } from "@/lib/cn";
import { EmptyNudge } from "./EmptyNudge";
import { LeadStatusBadge } from "./LeadStatusBadge";
import type { LeadRow } from "@/lib/dashboard";

const DIVISION_LABEL: Record<string, string> = {
  pools: "Pools",
  developments: "Developments",
  properties: "Properties",
  multi: "Multi",
};

const BUDGET_LABEL: Record<string, string> = {
  "50-150": "$50–150K",
  "150-500": "$150–500K",
  "500plus": "$500K+",
};

const TIMELINE_LABEL: Record<string, string> = {
  asap: "ASAP",
  "1-3mo": "1–3 mo",
  "3-6mo": "3–6 mo",
  "6-12mo": "6–12 mo",
  exploring: "Exploring",
};

const SYNC_LABEL: Record<string, string> = {
  synced: "GHL ✓",
  pending: "GHL · pending",
  failed: "GHL × failed",
};

export function LeadInbox({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return (
      <EmptyNudge
        title="No leads yet in this window."
        body="When a visitor fills the hero pill, the consultation form, or unlocks a calculator, it lands here."
        cta={{ label: "Open all leads", href: "/dashboard/leads" }}
      />
    );
  }

  return (
    <ul className="divide-y divide-[var(--color-line)]">
      {leads.map((l) => (
        <li key={l.id}>
          <Link
            href={`/dashboard/leads/${l.id}`}
            className="grid grid-cols-12 items-center gap-4 px-4 py-3.5 transition-colors hover:bg-white/[0.02] md:gap-6"
          >
            <div className="col-span-12 md:col-span-3">
              <p className="text-[length:var(--text-15)] text-[var(--color-text)]">
                {l.name || l.email.split("@")[0]}
              </p>
              <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
                {l.email}
                {l.zip ? ` · ${l.zip}` : ""}
              </p>
            </div>

            <div className="col-span-8 flex flex-wrap items-center gap-1.5 md:col-span-7">
              <LeadStatusBadge status={l.status} />
              {l.division ? (
                <Chip>{DIVISION_LABEL[l.division] ?? l.division}</Chip>
              ) : null}
              {l.budgetBand ? (
                <Chip accent>{BUDGET_LABEL[l.budgetBand] ?? l.budgetBand}</Chip>
              ) : null}
              {l.timeline ? (
                <Chip>{TIMELINE_LABEL[l.timeline] ?? l.timeline}</Chip>
              ) : null}
              {l.outOfServiceArea ? (
                <Chip tone="warn">Out of area</Chip>
              ) : (
                <Chip tone="good">In area</Chip>
              )}
              {l.source ? (
                <Chip tone="muted">{l.source}</Chip>
              ) : null}
            </div>

            <div className="col-span-4 text-right md:col-span-2">
              <time
                dateTime={l.createdAt}
                className="block text-[length:var(--text-13)] text-[var(--color-muted)]"
              >
                {formatAgo(l.createdAt)}
              </time>
              <span
                className={cn(
                  "mt-1 inline-block text-[length:var(--text-13)]",
                  l.ghlSyncStatus === "synced" && "text-emerald-300",
                  l.ghlSyncStatus === "failed" && "text-red-300",
                  l.ghlSyncStatus === "pending" && "text-[var(--color-muted)]",
                )}
              >
                {SYNC_LABEL[l.ghlSyncStatus] ?? l.ghlSyncStatus}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Chip({
  children,
  accent,
  tone,
}: {
  children: React.ReactNode;
  accent?: boolean;
  tone?: "good" | "warn" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-[length:var(--text-13)]",
        accent && "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
        tone === "good" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        tone === "warn" && "border-amber-500/30 bg-amber-500/10 text-amber-200",
        tone === "muted" && "border-[var(--color-line)] text-[var(--color-muted)]",
        !accent && !tone && "border-[var(--color-line)] text-[var(--color-text)]/85",
      )}
    >
      {children}
    </span>
  );
}

function formatAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ms) || ms < 0) return "";
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
