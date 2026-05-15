import { ProjectFilters, type FilterOption } from "@/components/projects/ProjectFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectEmpty } from "@/components/projects/ProjectEmpty";
import { CTABand } from "@/components/sections";
import {
  DIVISION_LABEL,
  listProjects,
  type Division,
  type ProjectSummary,
} from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects — Silverline",
  description:
    "Every Silverline pool, home, and managed property — completed builds across Knox, Blount, Sevier, and the rest of East Tennessee.",
  path: "/projects",
});

export const revalidate = 60;

const VALID: Division[] = ["pools", "developments", "properties"];

type Args = { searchParams: Promise<{ division?: string }> };

export default async function ProjectsPage({ searchParams }: Args) {
  const { division } = await searchParams;
  const activeDivision = VALID.includes(division as Division)
    ? (division as Division)
    : undefined;

  const all = await listProjects({ limit: 200 });
  const counts: Record<Division, number> = { pools: 0, developments: 0, properties: 0 };
  for (const p of all) counts[p.division]++;

  const filtered = activeDivision
    ? all.filter((p) => p.division === activeDivision)
    : all;

  const divisionOptions: FilterOption[] = VALID.map((d) => ({
    value: d,
    label: DIVISION_LABEL[d],
    count: counts[d] || undefined,
  }));

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Recent work
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            The Silverline{" "}
            <i className="font-display italic text-[var(--color-accent)]">portfolio.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Every completed pool, custom home, commercial build, and managed property —
            across Knox, Blount, Sevier, Loudon, and the rest of East Tennessee.
          </p>
        </header>

        <div className="mt-12">
          <ProjectFilters
            label="Division"
            baseHref="/projects"
            paramName="division"
            activeValue={activeDivision ?? null}
            options={divisionOptions}
            allLabel="Projects"
          />
        </div>

        <div className="mt-10">
          {filtered.length === 0 ? (
            <ProjectEmpty
              filterLabel={
                activeDivision ? DIVISION_LABEL[activeDivision].toLowerCase() : undefined
              }
            />
          ) : (
            <ProjectGrid projects={filtered} hrefFor={parentHrefFor} />
          )}
        </div>
      </div>

      <CTABand
        eyebrow="Want yours here?"
        headline="Tell us about your project."
        italicWord="project."
        sub="Three minutes to share details. A real reply within one business day from a Silverline team member."
        emailCapture={{ submitLabel: "Request consultation" }}
      />
    </section>
  );
}

/** Parent /projects links cross-subdomain to the case study on the right host. */
function parentHrefFor(p: ProjectSummary): string {
  return `https://${p.division}.silverlineind.com/projects/${p.slug}`;
}
