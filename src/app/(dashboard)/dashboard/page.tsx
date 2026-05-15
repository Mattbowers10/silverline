import Link from "next/link";
import { requireUser } from "@/lib/auth";
import {
  deltaPct,
  loadDashboard,
  loadPipelineCounts,
  resolveRange,
} from "@/lib/dashboard";
import { formatPrice } from "@/lib/stripe";
import { LEAD_STATUSES } from "@/payload/collections/Leads";
import { DashboardChrome } from "@/components/dashboard/DashboardChrome";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RangePicker } from "@/components/dashboard/RangePicker";
import { LeadInbox } from "@/components/dashboard/LeadInbox";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { RecentContent } from "@/components/dashboard/RecentContent";

export const dynamic = "force-dynamic";

type Args = { searchParams: Promise<{ range?: string }> };

export default async function DashboardPage({ searchParams }: Args) {
  const user = await requireUser("/dashboard");
  const { range: rangeParam } = await searchParams;
  const data = await loadDashboard(rangeParam);

  // Re-resolve to know the active range key for the picker.
  const activeKey =
    rangeParam && ["today", "7d", "30d", "90d", "all"].includes(rangeParam)
      ? rangeParam
      : "7d";

  const newLeadsDelta = deltaPct(data.kpis.newLeads, data.kpis.newLeadsPrev);
  const range = resolveRange(rangeParam);
  const pipeline = await loadPipelineCounts();

  return (
    <DashboardChrome user={user}>
      {/* Page header */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Overview · {range.label}
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-40)] leading-[1.05] tracking-tight md:text-[length:var(--text-52)]">
            Good to see you,{" "}
            <i className="font-display italic text-[var(--color-accent)]">
              {firstName(user.name, user.email)}.
            </i>
          </h1>
        </div>
        <RangePicker active={activeKey} />
      </div>

      {/* KPI grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="New leads"
          value={String(data.kpis.newLeads)}
          sub="In window"
          deltaPct={newLeadsDelta}
        />
        <KpiCard
          label="Hot leads"
          value={String(data.kpis.hotLeads)}
          sub="$500K+ · in-area"
          accent
        />
        <KpiCard
          label="Calc unlocks"
          value={String(data.kpis.calcUnlocks)}
          sub="Gunite / Home / STR"
        />
        <KpiCard
          label="In-area"
          value={`${data.kpis.inAreaPct}%`}
          sub="Of leads in window"
        />
        <KpiCard
          label="Revenue"
          value={formatPrice(data.kpis.revenueCents)}
          sub="Paid orders, in window"
        />
        <KpiCard
          label="Top division"
          value={data.kpis.topDivision.label}
          sub={`${data.kpis.topDivision.count} lead${data.kpis.topDivision.count === 1 ? "" : "s"}`}
        />
      </section>

      {/* Pipeline rollup */}
      <section className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s.value}
            href={`/dashboard/leads?status=${s.value}`}
            className="rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)]/60 p-4 transition-colors hover:border-[var(--color-accent)]/40"
          >
            <p className="text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {s.label}
            </p>
            <p className="mt-2 font-display text-[length:var(--text-32)] leading-none tracking-tight">
              {pipeline[s.value] ?? 0}
            </p>
          </Link>
        ))}
      </section>

      {/* Lead inbox */}
      <section className="mt-10 card-highlight rounded-2xl border border-[var(--color-line)]">
        <header className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
          <h2 className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Lead inbox · {data.leads.length} in window
          </h2>
          <Link
            href="/dashboard/leads"
            className="text-[length:var(--text-13)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            All leads →
          </Link>
        </header>
        <LeadInbox leads={data.leads} />
      </section>

      {/* Two-column lower row */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="card-highlight rounded-2xl border border-[var(--color-line)]">
            <header className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
              <h2 className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Recent orders
              </h2>
              <a
                href="/admin/collections/orders"
                className="text-[length:var(--text-13)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
              >
                All orders →
              </a>
            </header>
            <RecentOrders orders={data.orders} />
          </div>
        </div>
        <div className="space-y-6 lg:col-span-5">
          <RecentContent
            title="Recent posts"
            rows={data.recentPosts}
            emptyTitle="No posts yet."
            emptyBody="The Deep End fills as your team publishes."
            emptyCta={{ label: "Create a post", href: "/admin/collections/posts/create" }}
            viewAllHref="/admin/collections/posts"
          />
          <RecentContent
            title="Recent projects"
            rows={data.recentProjects}
            emptyTitle="No projects yet."
            emptyBody="The portfolio fills as case studies go live."
            emptyCta={{ label: "Create a project", href: "/admin/collections/projects/create" }}
            viewAllHref="/admin/collections/projects"
          />
        </div>
      </section>

      {/* Footer hints — what activates as keys land */}
      <section className="mt-12 rounded-2xl border border-dashed border-[var(--color-line)] p-6 text-[length:var(--text-13)] text-[var(--color-muted)]">
        <p className="mb-2 uppercase tracking-[0.22em]">Activating later</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          <li>
            <span className="text-[var(--color-text)]">GHL pipeline</span> — Faiz wires
            the keys and a "Pipeline value" KPI replaces "Top division".
          </li>
          <li>
            <span className="text-[var(--color-text)]">Stripe insights</span> — when
            keys are set, MRR / refund-rate KPIs join the row.
          </li>
          <li>
            <span className="text-[var(--color-text)]">GA4 traffic</span> — sessions and
            top pages slot into the lower row.
          </li>
        </ul>
      </section>
    </DashboardChrome>
  );
}

function firstName(name?: string, email?: string): string {
  if (name) return name.split(" ")[0];
  if (email) return email.split("@")[0];
  return "team";
}
