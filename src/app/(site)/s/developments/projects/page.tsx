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
  title: "Build Projects — Silverline Developments",
  description:
    "Recent Silverline custom homes, commercial builds, and remodels across East Tennessee.",
  path: "/projects",
});

export const revalidate = 60;

const DEV_TYPES = TYPES_BY_DIVISION.developments;

type Args = { searchParams: Promise<{ type?: string }> };

export default async function DevelopmentsProjectsPage({ searchParams }: Args) {
  const { type } = await searchParams;
  const activeType = (DEV_TYPES as readonly string[]).includes(type ?? "")
    ? (type as ProjectType)
    : undefined;

  const all = await listProjects({ division: "developments", limit: 100 });
  const filtered = activeType ? all.filter((p) => p.projectType === activeType) : all;
  const counts: Partial<Record<ProjectType, number>> = {};
  for (const p of all) {
    if (p.projectType) counts[p.projectType] = (counts[p.projectType] ?? 0) + 1;
  }

  const typeOptions: FilterOption[] = DEV_TYPES.map((t) => ({
    value: t,
    label: PROJECT_TYPE_LABEL[t],
    count: counts[t],
  }));

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Developments portfolio
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            Every Silverline{" "}
            <i className="font-display italic text-[var(--color-accent)]">build.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Custom homes, commercial fit-outs, and remodels across East Tennessee. Each
            click opens the full build story, finishes, timeline, and final shots.
          </p>
        </header>

        <div className="mt-12">
          <ProjectFilters
            label="Type"
            baseHref="/projects"
            paramName="type"
            activeValue={activeType ?? null}
            options={typeOptions}
            allLabel="Builds"
          />
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <ProjectEmpty
              filterLabel={activeType ? PROJECT_TYPE_LABEL[activeType].toLowerCase() : "build"}
            />
          ) : (
            <ProjectGrid projects={filtered} hrefFor={localHrefFor} />
          )}
        </div>
      </div>

      <CTABand
        eyebrow="Want yours here?"
        headline="Schedule a discovery visit."
        italicWord="discovery"
        sub="90-minute walk of your lot or home. Written, fixed-scope proposal within two weeks."
        emailCapture={{ submitLabel: "Schedule discovery visit" }}
      />
    </section>
  );
}

function localHrefFor(p: ProjectSummary): string {
  return `/projects/${p.slug}`;
}
