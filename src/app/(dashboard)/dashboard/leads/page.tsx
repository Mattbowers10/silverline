import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { loadLeadsList, loadPipelineCounts } from "@/lib/dashboard";
import { DashboardChrome } from "@/components/dashboard/DashboardChrome";
import { LeadInbox } from "@/components/dashboard/LeadInbox";
import { LEAD_STATUSES } from "@/payload/collections/Leads";

export const dynamic = "force-dynamic";

type SearchParams = {
  status?: string;
  division?: string;
  source?: string;
  inArea?: string;
  q?: string;
  page?: string;
};

type Args = { searchParams: Promise<SearchParams> };

const DIVISION_FILTERS = [
  { value: "pools", label: "Pools" },
  { value: "developments", label: "Developments" },
  { value: "properties", label: "Properties" },
  { value: "multi", label: "Multi" },
];

const IN_AREA_FILTERS = [
  { value: "in", label: "In area" },
  { value: "out", label: "Out of area" },
];

export default async function LeadsListPage({ searchParams }: Args) {
  const user = await requireUser("/dashboard/leads");
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const result = await loadLeadsList({
    status: sp.status || undefined,
    division: sp.division || undefined,
    source: sp.source || undefined,
    inArea: (sp.inArea as "in" | "out" | undefined) || undefined,
    q: sp.q || undefined,
    page,
    perPage: 25,
  });

  const counts = await loadPipelineCounts();

  return (
    <DashboardChrome user={user}>
      <p className="mb-3 text-[length:var(--text-13)] text-[var(--color-muted)]">
        <Link href="/dashboard" className="hover:text-[var(--color-accent)]">
          Dashboard
        </Link>{" "}
        <span aria-hidden>›</span> Leads
      </p>

      <header className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-balance text-[length:var(--text-40)] leading-[1.05] tracking-tight md:text-[length:var(--text-52)]">
            Lead{" "}
            <i className="font-display italic text-[var(--color-accent)]">inbox.</i>
          </h1>
          <p className="mt-2 text-[length:var(--text-15)] text-[var(--color-muted)]">
            {result.totalDocs.toLocaleString()} total · showing {result.leads.length} on
            page {result.page} of {Math.max(1, result.totalPages)}
          </p>
        </div>
        <a
          href={`/api/leads/export${toQuery({ ...sp, page: undefined })}`}
          className="rounded-full border border-[var(--color-line)] px-4 py-2 text-[length:var(--text-13)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          download
        >
          Export CSV ↓
        </a>
      </header>

      {/* Pipeline rollup */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {LEAD_STATUSES.map((s) => {
          const active = sp.status === s.value;
          const count = counts[s.value] ?? 0;
          const href = active
            ? toQuery({ ...sp, status: undefined, page: undefined })
            : toQuery({ ...sp, status: s.value, page: undefined });
          return (
            <Link
              key={s.value}
              href={`/dashboard/leads${href}`}
              className={`rounded-xl border p-4 transition-colors ${
                active
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5"
                  : "border-[var(--color-line)] bg-[var(--color-panel)]/60 hover:border-[var(--color-accent)]/40"
              }`}
            >
              <p className="text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {s.label}
              </p>
              <p className="mt-2 font-display text-[length:var(--text-32)] leading-none tracking-tight">
                {count}
              </p>
            </Link>
          );
        })}
      </section>

      {/* Filters + search */}
      <section className="mb-6 space-y-4">
        {/* Search */}
        <form
          action="/dashboard/leads"
          method="GET"
          className="flex flex-wrap items-center gap-3"
        >
          {/* preserve other filters */}
          {sp.status ? <input type="hidden" name="status" value={sp.status} /> : null}
          {sp.division ? <input type="hidden" name="division" value={sp.division} /> : null}
          {sp.source ? <input type="hidden" name="source" value={sp.source} /> : null}
          {sp.inArea ? <input type="hidden" name="inArea" value={sp.inArea} /> : null}
          <label htmlFor="q" className="sr-only">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={sp.q ?? ""}
            placeholder="Search by email, name, phone, or ZIP"
            className="w-full max-w-md rounded-full border border-[var(--color-line)] bg-[var(--color-page)] px-5 py-2.5 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-5 py-2.5 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
          >
            Search
          </button>
          {(sp.q || sp.status || sp.division || sp.source || sp.inArea) && (
            <Link
              href="/dashboard/leads"
              className="text-[length:var(--text-13)] text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
            >
              Clear filters
            </Link>
          )}
        </form>

        {/* Division + in-area pill rows */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <FilterRow
            label="Division"
            current={sp.division}
            paramName="division"
            options={DIVISION_FILTERS}
            sp={sp}
          />
          <FilterRow
            label="Service area"
            current={sp.inArea}
            paramName="inArea"
            options={IN_AREA_FILTERS}
            sp={sp}
          />
        </div>
      </section>

      {/* List */}
      <section className="card-highlight rounded-2xl border border-[var(--color-line)]">
        <LeadInbox leads={result.leads} />
      </section>

      {/* Pagination */}
      {result.totalPages > 1 ? (
        <nav
          aria-label="Pagination"
          className="mt-6 flex items-center justify-between text-[length:var(--text-15)]"
        >
          <Link
            href={`/dashboard/leads${toQuery({
              ...sp,
              page: page > 1 ? String(page - 1) : undefined,
            })}`}
            aria-disabled={page <= 1}
            className={`rounded-full border border-[var(--color-line)] px-4 py-2 ${
              page <= 1
                ? "pointer-events-none opacity-40"
                : "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}
          >
            ← Previous
          </Link>
          <p className="text-[var(--color-muted)]">
            Page {page} of {result.totalPages}
          </p>
          <Link
            href={`/dashboard/leads${toQuery({
              ...sp,
              page: page < result.totalPages ? String(page + 1) : undefined,
            })}`}
            aria-disabled={page >= result.totalPages}
            className={`rounded-full border border-[var(--color-line)] px-4 py-2 ${
              page >= result.totalPages
                ? "pointer-events-none opacity-40"
                : "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}
          >
            Next →
          </Link>
        </nav>
      ) : null}
    </DashboardChrome>
  );
}

function FilterRow({
  label,
  current,
  paramName,
  options,
  sp,
}: {
  label: string;
  current?: string;
  paramName: string;
  options: { value: string; label: string }[];
  sp: SearchParams;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
        {label}
      </span>
      <Link
        href={`/dashboard/leads${toQuery({ ...sp, [paramName]: undefined, page: undefined })}`}
        className={pillClass(!current)}
      >
        All
      </Link>
      {options.map((o) => (
        <Link
          key={o.value}
          href={`/dashboard/leads${toQuery({ ...sp, [paramName]: o.value, page: undefined })}`}
          className={pillClass(current === o.value)}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}

function pillClass(active: boolean) {
  return active
    ? "rounded-full border border-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 text-[length:var(--text-13)] text-[var(--color-accent)]"
    : "rounded-full border border-[var(--color-line)] bg-[var(--color-page)] px-3 py-1 text-[length:var(--text-13)] text-[var(--color-text)]/85 hover:border-[var(--color-accent)]/50";
}

function toQuery(params: Record<string, string | undefined>): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) usp.set(k, v);
  }
  const s = usp.toString();
  return s ? `?${s}` : "";
}

