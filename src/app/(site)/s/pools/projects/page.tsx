import { ProjectFilters, type FilterOption } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectEmpty } from "@/components/projects/ProjectEmpty";
import { CTABand } from "@/components/sections";
import {
  PROJECT_TYPE_LABEL,
  TYPES_BY_DIVISION,
  listProjects,
  type ProjectSummary,
  type ProjectType,
} from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pool Projects — Silverline Pools",
  description:
    "Recent Silverline pool builds across East Tennessee — gunite, fiberglass, and pool remodels.",
  path: "/projects",
});

export const revalidate = 60;

const POOL_TYPES = TYPES_BY_DIVISION.pools;

type Args = { searchParams: Promise<{ type?: string }> };

export default async function PoolsProjectsPage({ searchParams }: Args) {
  const { type } = await searchParams;
  const activeType = (POOL_TYPES as readonly string[]).includes(type ?? "")
    ? (type as ProjectType)
    : undefined;

  const all = await listProjects({ division: "pools", limit: 100 });
  const filtered = activeType ? all.filter((p) => p.projectType === activeType) : all;
  const counts: Partial<Record<ProjectType, number>> = {};
  for (const p of all) {
    if (p.projectType) counts[p.projectType] = (counts[p.projectType] ?? 0) + 1;
  }

  const typeOptions: FilterOption[] = POOL_TYPES.map((t) => ({
    value: t,
    label: PROJECT_TYPE_LABEL[t],
    count: counts[t],
  }));

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Pool portfolio
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            Every Silverline{" "}
            <i className="font-display italic text-[var(--color-accent)]">pool.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Pools we&apos;ve built across Knox, Blount, Sevier, and Loudon counties.
            Click any project for the full build story, finishes, and final shots.
          </p>
        </header>

        <div className="mt-12">
          <ProjectFilters
            label="Type"
            baseHref="/projects"
            paramName="type"
            activeValue={activeType ?? null}
            options={typeOptions}
            allLabel="Pools"
          />
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <ProjectEmpty
              filterLabel={activeType ? PROJECT_TYPE_LABEL[activeType].toLowerCase() : "pool"}
            />
          ) : (
            <ProjectGrid projects={filtered} hrefFor={localHrefFor} />
          )}
        </div>
      </div>

      <CTABand
        eyebrow="Want one of your own?"
        headline="Schedule a site walk."
        italicWord="site walk."
        sub="A 60-minute walk of your yard. A true-to-scale 3D rendering. A line-item quote that matches the build."
        emailCapture={{ submitLabel: "Schedule site walk" }}
      />
    </section>
  );
}

function localHrefFor(p: ProjectSummary): string {
  return `/projects/${p.slug}`;
}
