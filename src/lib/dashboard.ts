import { getPayload, type Where } from "payload";
import config from "@payload-config";

/* ---------- Date range ---------- */

export type DateRange = {
  /** ISO start (inclusive). */
  from: string;
  /** ISO end (exclusive). */
  to: string;
  /** Human label, e.g. "Last 7 days". */
  label: string;
  /** Compare-against window for delta math. */
  prevFrom: string;
  prevTo: string;
};

const DAY_MS = 24 * 60 * 60 * 1000;

export function resolveRange(rangeParam: string | undefined): DateRange {
  const now = new Date();
  const map: Record<string, { days: number; label: string }> = {
    today: { days: 1, label: "Today" },
    "7d": { days: 7, label: "Last 7 days" },
    "30d": { days: 30, label: "Last 30 days" },
    "90d": { days: 90, label: "Last 90 days" },
    all: { days: 3650, label: "All time" },
  };
  const key = rangeParam && map[rangeParam] ? rangeParam : "7d";
  const { days, label } = map[key];

  const to = now;
  const from = new Date(to.getTime() - days * DAY_MS);
  const prevTo = from;
  const prevFrom = new Date(prevTo.getTime() - days * DAY_MS);

  return {
    from: from.toISOString(),
    to: to.toISOString(),
    prevFrom: prevFrom.toISOString(),
    prevTo: prevTo.toISOString(),
    label,
  };
}

export const RANGE_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "all", label: "All time" },
] as const;

/* ---------- Types ---------- */

export type LeadRow = {
  id: string;
  createdAt: string;
  email: string;
  name?: string;
  phone?: string;
  zip?: string;
  division?: string;
  budgetBand?: string;
  timeline?: string;
  source?: string;
  message?: string;
  status: string;
  statusChangedAt?: string;
  outOfServiceArea: boolean;
  ghlSyncStatus: string;
  ghlContactId?: string;
};

export type LeadNote = {
  body: string;
  author?: string;
  createdAt?: string;
};

export type OrderRow = {
  id: string;
  createdAt: string;
  email: string;
  totalCents: number;
  status: string;
  itemCount: number;
};

export type ContentRow = {
  id: string;
  title: string;
  href: string;
  meta: string;
  publishedAt?: string;
};

export type KpiSnapshot = {
  range: DateRange;
  newLeads: number;
  newLeadsPrev: number;
  hotLeads: number;
  calcUnlocks: number;
  inAreaPct: number;
  revenueCents: number;
  topDivision: { label: string; count: number };
};

export type DashboardData = {
  range: DateRange;
  kpis: KpiSnapshot;
  leads: LeadRow[];
  orders: OrderRow[];
  recentPosts: ContentRow[];
  recentProjects: ContentRow[];
};

/* ---------- Helpers ---------- */

function within(range: DateRange, useCreatedAt = true): Where {
  const field = useCreatedAt ? "createdAt" : "publishedAt";
  return {
    [field]: {
      greater_than_equal: range.from,
      less_than: range.to,
    },
  } as Where;
}

const DIVISION_LABEL: Record<string, string> = {
  pools: "Pools",
  developments: "Developments",
  properties: "Properties",
  multi: "Multi-division",
  unknown: "Uncategorized",
};

/* ---------- Main loader ---------- */

export async function loadDashboard(rangeParam: string | undefined): Promise<DashboardData> {
  const range = resolveRange(rangeParam);
  const payload = await getPayload({ config });

  // ----- Leads (current + previous window for delta) -----
  const [leadsCurrent, leadsPrev] = await Promise.all([
    payload
      .find({
        collection: "leads",
        where: within(range),
        sort: "-createdAt",
        limit: 200,
        depth: 0,
      })
      .catch(() => ({ docs: [], totalDocs: 0 })),
    payload
      .find({
        collection: "leads",
        where: {
          createdAt: {
            greater_than_equal: range.prevFrom,
            less_than: range.prevTo,
          },
        } as Where,
        limit: 1,
        depth: 0,
      })
      .catch(() => ({ docs: [], totalDocs: 0 })),
  ]);

  const allLeads = leadsCurrent.docs as Array<Record<string, unknown>>;
  const newLeads = allLeads.length;
  const newLeadsPrev = leadsPrev.totalDocs ?? 0;
  const inArea = allLeads.filter((l) => !l.outOfServiceArea).length;
  const inAreaPct = newLeads > 0 ? Math.round((inArea / newLeads) * 100) : 0;

  const calcUnlocks = allLeads.filter((l) =>
    String(l.source ?? "").startsWith("calc_"),
  ).length;

  const hotLeads = allLeads.filter(
    (l) => l.budgetBand === "500plus" && !l.outOfServiceArea,
  ).length;

  // Top division by lead count
  const divisionCounts = new Map<string, number>();
  for (const l of allLeads) {
    const key = String(l.division ?? "unknown");
    divisionCounts.set(key, (divisionCounts.get(key) ?? 0) + 1);
  }
  const top = [...divisionCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const topDivision = top
    ? { label: DIVISION_LABEL[top[0]] ?? top[0], count: top[1] }
    : { label: "—", count: 0 };

  const leadRows: LeadRow[] = allLeads.slice(0, 25).map(toLeadRow);

  // ----- Orders -----
  const ordersRes = await payload
    .find({
      collection: "orders",
      where: within(range),
      sort: "-createdAt",
      limit: 50,
      depth: 0,
    })
    .catch(() => ({ docs: [] }));

  const ordersAll = ordersRes.docs as Array<Record<string, unknown>>;
  const paidStatuses = new Set(["paid", "fulfilled", "shipped"]);
  const revenueCents = ordersAll
    .filter((o) => paidStatuses.has(String(o.status ?? "")))
    .reduce((sum, o) => sum + Number(o.totalCents ?? 0), 0);

  const orderRows: OrderRow[] = ordersAll.slice(0, 10).map(toOrderRow);

  // ----- Top content -----
  const [postsRes, projectsRes] = await Promise.all([
    payload
      .find({
        collection: "posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 5,
        depth: 0,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: "projects",
        sort: "-completedAt",
        limit: 5,
        depth: 0,
      })
      .catch(() => ({ docs: [] })),
  ]);

  const recentPosts: ContentRow[] = (postsRes.docs as Array<Record<string, unknown>>).map(
    (p) => ({
      id: String(p.id),
      title: String(p.title ?? ""),
      href: `/admin/collections/posts/${p.id}`,
      meta: String(p.category ?? ""),
      publishedAt: p.publishedAt ? String(p.publishedAt) : undefined,
    }),
  );

  const recentProjects: ContentRow[] = (
    projectsRes.docs as Array<Record<string, unknown>>
  ).map((p) => ({
    id: String(p.id),
    title: String(p.title ?? ""),
    href: `/admin/collections/projects/${p.id}`,
    meta: `${String(p.division ?? "")}${p.city ? ` · ${p.city}` : ""}`,
    publishedAt: p.completedAt ? String(p.completedAt) : undefined,
  }));

  const kpis: KpiSnapshot = {
    range,
    newLeads,
    newLeadsPrev,
    hotLeads,
    calcUnlocks,
    inAreaPct,
    revenueCents,
    topDivision,
  };

  return { range, kpis, leads: leadRows, orders: orderRows, recentPosts, recentProjects };
}

function toLeadRow(doc: Record<string, unknown>): LeadRow {
  return {
    id: String(doc.id),
    createdAt: String(doc.createdAt ?? ""),
    email: String(doc.email ?? ""),
    name: doc.name ? String(doc.name) : undefined,
    phone: doc.phone ? String(doc.phone) : undefined,
    zip: doc.zip ? String(doc.zip) : undefined,
    division: doc.division ? String(doc.division) : undefined,
    budgetBand: doc.budgetBand ? String(doc.budgetBand) : undefined,
    timeline: doc.timeline ? String(doc.timeline) : undefined,
    source: doc.source ? String(doc.source) : undefined,
    message: doc.message ? String(doc.message) : undefined,
    status: String(doc.status ?? "new"),
    statusChangedAt: doc.statusChangedAt ? String(doc.statusChangedAt) : undefined,
    outOfServiceArea: Boolean(doc.outOfServiceArea),
    ghlSyncStatus: String(doc.ghlSyncStatus ?? "pending"),
    ghlContactId: doc.ghlContactId ? String(doc.ghlContactId) : undefined,
  };
}

function toOrderRow(doc: Record<string, unknown>): OrderRow {
  const items = Array.isArray(doc.items) ? (doc.items as unknown[]) : [];
  return {
    id: String(doc.id),
    createdAt: String(doc.createdAt ?? ""),
    email: String(doc.email ?? ""),
    totalCents: Number(doc.totalCents ?? 0),
    status: String(doc.status ?? "paid"),
    itemCount: items.length,
  };
}

/** Compute % delta vs previous window; returns null when prev is zero. */
export function deltaPct(curr: number, prev: number): number | null {
  if (prev === 0) return null;
  return Math.round(((curr - prev) / prev) * 100);
}

/* ---------- Pipeline counts (used by /dashboard top strip + leads page) ---------- */

export type PipelineCounts = Record<string, number>;

export async function loadPipelineCounts(): Promise<PipelineCounts> {
  try {
    const payload = await getPayload({ config });
    const statuses = ["new", "contacted", "consultation_booked", "proposal", "won", "lost"];
    const counts: PipelineCounts = {};
    await Promise.all(
      statuses.map(async (s) => {
        const res = await payload.find({
          collection: "leads",
          where: { status: { equals: s } } as Where,
          limit: 1,
          depth: 0,
        });
        counts[s] = res.totalDocs ?? 0;
      }),
    );
    return counts;
  } catch {
    return {};
  }
}

/* ---------- Lead list query (filters + pagination) ---------- */

export type LeadListFilters = {
  status?: string;
  division?: string;
  source?: string;
  inArea?: "in" | "out";
  q?: string;
  page?: number;
  perPage?: number;
};

export type LeadListResult = {
  leads: LeadRow[];
  totalDocs: number;
  totalPages: number;
  page: number;
  perPage: number;
};

export async function loadLeadsList(filters: LeadListFilters): Promise<LeadListResult> {
  try {
    const payload = await getPayload({ config });
    const page = Math.max(1, Math.floor(filters.page ?? 1));
    const perPage = Math.max(10, Math.min(100, Math.floor(filters.perPage ?? 25)));

    const and: Where[] = [];
    if (filters.status) and.push({ status: { equals: filters.status } } as Where);
    if (filters.division) and.push({ division: { equals: filters.division } } as Where);
    if (filters.source) and.push({ source: { contains: filters.source } } as Where);
    if (filters.inArea === "in") and.push({ outOfServiceArea: { equals: false } } as Where);
    if (filters.inArea === "out") and.push({ outOfServiceArea: { equals: true } } as Where);
    if (filters.q) {
      const q = filters.q;
      and.push({
        or: [
          { email: { contains: q } },
          { name: { contains: q } },
          { phone: { contains: q } },
          { zip: { contains: q } },
        ],
      } as Where);
    }

    const where: Where = and.length > 0 ? { and } : {};

    const res = await payload.find({
      collection: "leads",
      where,
      sort: "-createdAt",
      page,
      limit: perPage,
      depth: 0,
    });

    return {
      leads: (res.docs as unknown as Array<Record<string, unknown>>).map(toLeadRow),
      totalDocs: res.totalDocs ?? 0,
      totalPages: res.totalPages ?? 1,
      page: res.page ?? page,
      perPage,
    };
  } catch {
    return { leads: [], totalDocs: 0, totalPages: 1, page: 1, perPage: 25 };
  }
}

/* ---------- Single lead (detail) ---------- */

export type LeadDetail = {
  lead: LeadRow;
  notes: LeadNote[];
};

export async function loadLeadDetail(id: string): Promise<LeadDetail | null> {
  try {
    const payload = await getPayload({ config });
    const doc = (await payload.findByID({
      collection: "leads",
      id,
      depth: 0,
    })) as unknown as Record<string, unknown>;
    if (!doc) return null;
    const notesRaw = Array.isArray(doc.notes) ? (doc.notes as LeadNote[]) : [];
    return {
      lead: toLeadRow(doc),
      notes: notesRaw.map((n) => ({
        body: String(n.body ?? ""),
        author: n.author ? String(n.author) : undefined,
        createdAt: n.createdAt ? String(n.createdAt) : undefined,
      })),
    };
  } catch {
    return null;
  }
}
