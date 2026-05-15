import { getPayload, type Where } from "payload";
import config from "@payload-config";

export type Division = "pools" | "developments" | "properties";

export type ProjectType =
  | "pool-gunite"
  | "pool-fiberglass"
  | "pool-remodel"
  | "residential"
  | "commercial"
  | "remodel"
  | "str";

export const DIVISION_LABEL: Record<Division, string> = {
  pools: "Pools",
  developments: "Developments",
  properties: "Properties",
};

export const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  "pool-gunite": "Gunite",
  "pool-fiberglass": "Fiberglass",
  "pool-remodel": "Pool remodel",
  residential: "Residential",
  commercial: "Commercial",
  remodel: "Home remodel",
  str: "Short-term rental",
};

export const TYPES_BY_DIVISION: Record<Division, ProjectType[]> = {
  pools: ["pool-gunite", "pool-fiberglass", "pool-remodel"],
  developments: ["residential", "commercial", "remodel"],
  properties: ["str"],
};

export type ProjectSpec = { label: string; value: string };

export type ProjectImage = { url?: string; alt?: string };

export type ProjectSummary = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  division: Division;
  projectType?: ProjectType;
  city?: string;
  state?: string;
  completedAt?: string;
  heroImage?: ProjectImage;
  featured: boolean;
};

export type ProjectFull = ProjectSummary & {
  story?: unknown; // Lexical JSON
  gallery?: ProjectImage[];
  specs?: ProjectSpec[];
};

type ListArgs = {
  division?: Division;
  type?: ProjectType;
  city?: string;
  featuredOnly?: boolean;
  limit?: number;
};

/** Query Payload `projects`. Returns [] on any failure so pages still render. */
export async function listProjects({
  division,
  type,
  city,
  featuredOnly,
  limit = 60,
}: ListArgs = {}): Promise<ProjectSummary[]> {
  try {
    const payload = await getPayload({ config });
    const where: Where = {};
    if (division) where.division = { equals: division };
    if (type) where.projectType = { equals: type };
    if (city) where.city = { equals: city };
    if (featuredOnly) where.featured = { equals: true };

    const res = await payload.find({
      collection: "projects",
      where,
      limit,
      sort: "-completedAt",
      depth: 1,
    });

    return res.docs.map((d) =>
      toSummary(d as unknown as Record<string, unknown>),
    );
  } catch {
    return [];
  }
}

export async function getProject(
  division: Division,
  slug: string,
): Promise<ProjectFull | null> {
  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "projects",
      where: {
        slug: { equals: slug },
        division: { equals: division },
      },
      limit: 1,
      depth: 2,
    });
    const doc = res.docs[0];
    if (!doc) return null;
    return toFull(doc as unknown as Record<string, unknown>);
  } catch {
    return null;
  }
}

/** Unique non-empty cities across the given division (or all). For filter chips. */
export async function listCities(division?: Division): Promise<string[]> {
  const projects = await listProjects({ division, limit: 200 });
  const set = new Set<string>();
  for (const p of projects) {
    if (p.city) set.add(p.city);
  }
  return Array.from(set).sort();
}

/* ---------- mappers ---------- */

type PayloadMedia = { url?: string; alt?: string } | string | null | undefined;

function mediaFromRel(m: PayloadMedia): ProjectImage | undefined {
  if (!m || typeof m === "string") return undefined;
  return { url: m.url, alt: m.alt };
}

function toSummary(doc: Record<string, unknown>): ProjectSummary {
  const hero = doc.heroImage as PayloadMedia;
  return {
    id: String(doc.id),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    summary: doc.summary ? String(doc.summary) : undefined,
    division: (doc.division as Division) ?? "developments",
    projectType: doc.projectType ? (doc.projectType as ProjectType) : undefined,
    city: doc.city ? String(doc.city) : undefined,
    state: doc.state ? String(doc.state) : undefined,
    completedAt: doc.completedAt ? String(doc.completedAt) : undefined,
    heroImage: mediaFromRel(hero),
    featured: Boolean(doc.featured),
  };
}

function toFull(doc: Record<string, unknown>): ProjectFull {
  const summary = toSummary(doc);
  const gallery = Array.isArray(doc.gallery)
    ? (doc.gallery as { image?: PayloadMedia }[])
        .map((g) => mediaFromRel(g.image))
        .filter((x): x is ProjectImage => !!x)
    : undefined;
  const specs = Array.isArray(doc.specs)
    ? (doc.specs as ProjectSpec[]).filter((s) => s && s.label && s.value)
    : undefined;
  return {
    ...summary,
    story: doc.story,
    gallery,
    specs,
  };
}

/** "May 13, 2026" or "Recently completed". */
export function formatCompletedDate(iso?: string): string {
  if (!iso) return "Recently completed";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Recently completed";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
