import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectEmpty } from "@/components/projects/ProjectEmpty";
import { CTABand } from "@/components/sections";
import { listProjects, type ProjectSummary } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Managed Properties — Silverline Properties",
  description:
    "Short-term rentals and managed properties across East Tennessee — operated by the Silverline properties team.",
  path: "/projects",
});

export const revalidate = 60;

export default async function PropertiesProjectsPage() {
  const projects = await listProjects({ division: "properties", limit: 100 });

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Managed properties
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            What we{" "}
            <i className="font-display italic text-[var(--color-accent)]">operate.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            A growing portfolio of short-term rentals across Sevier, Knox, Loudon, and the
            lakes — operated by the same Silverline team that builds and maintains them.
          </p>
        </header>

        <div className="mt-12">
          {projects.length === 0 ? (
            <ProjectEmpty filterLabel="property" />
          ) : (
            <ProjectGrid projects={projects} hrefFor={localHrefFor} />
          )}
        </div>
      </div>

      <CTABand
        eyebrow="Want yours here?"
        headline="Schedule a property walk-through."
        italicWord="walk-through."
        sub="30-minute walk-through and listing audit. We tell you what's working, what's not, and what we'd change."
        emailCapture={{ submitLabel: "Schedule walk-through" }}
      />
    </section>
  );
}

function localHrefFor(p: ProjectSummary): string {
  return `/projects/${p.slug}`;
}
