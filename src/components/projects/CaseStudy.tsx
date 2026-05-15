import Link from "next/link";
import Image from "next/image";
import { PostBody } from "@/components/site/PostBody";
import { PlaceholderArt } from "@/components/site/PlaceholderArt";
import {
  DIVISION_LABEL,
  PROJECT_TYPE_LABEL,
  formatCompletedDate,
  type ProjectFull,
} from "@/lib/projects";

const KIND_BY_DIVISION = {
  pools: "pool",
  developments: "house",
  properties: "landscape",
} as const;

type Props = {
  project: ProjectFull;
  backHref: string;
  backLabel: string;
};

/**
 * Shared editorial case-study layout for a single project.
 * Mounted at /projects/[slug] on each subdomain.
 */
export function CaseStudy({ project, backHref, backLabel }: Props) {
  const p = project;

  return (
    <article>
      {/* Hero header */}
      <header className="px-6 pb-10 pt-12 lg:pb-14 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            <span className="text-[var(--color-accent)]">
              {DIVISION_LABEL[p.division]}
              {p.projectType ? ` · ${PROJECT_TYPE_LABEL[p.projectType]}` : ""}
            </span>
            {p.city ? (
              <>
                <span aria-hidden> · </span>
                {p.city}
                {p.state ? `, ${p.state}` : ""}
              </>
            ) : null}
            <span aria-hidden> · </span>
            {formatCompletedDate(p.completedAt)}
          </p>

          <h1 className="mt-6 font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            {p.title}
          </h1>

          {p.summary ? (
            <p className="mt-6 text-pretty text-[length:var(--text-20)] leading-relaxed text-[var(--color-muted)]">
              {p.summary}
            </p>
          ) : null}
        </div>
      </header>

      {/* Hero image */}
      <div className="px-6">
        <div className="relative mx-auto aspect-[16/9] max-w-[1100px] overflow-hidden rounded-2xl border border-[var(--color-line)]">
          {p.heroImage?.url ? (
            <Image
              src={p.heroImage.url}
              alt={p.heroImage.alt ?? p.title}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
            />
          ) : (
            <PlaceholderArt kind={KIND_BY_DIVISION[p.division]} seed={hashSeed(p.slug)} />
          )}
        </div>
      </div>

      {/* Body + specs sidebar */}
      <div className="px-6 py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PostBody content={p.story} />
          </div>

          {(p.specs && p.specs.length > 0) ? (
            <aside className="lg:col-span-4">
              <div className="card-highlight sticky top-32 rounded-2xl border border-[var(--color-line)] p-6">
                <p className="mb-4 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  Project specs
                </p>
                <dl className="divide-y divide-[var(--color-line)]">
                  {p.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-baseline justify-between gap-4 py-2.5 text-[length:var(--text-15)]"
                    >
                      <dt className="text-[var(--color-muted)]">{s.label}</dt>
                      <dd className="text-right text-[var(--color-text)]">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          ) : null}
        </div>
      </div>

      {/* Gallery */}
      {p.gallery && p.gallery.length > 0 ? (
        <section className="border-t border-[var(--color-line)] px-6 py-20 lg:py-24">
          <div className="mx-auto max-w-[1320px]">
            <h2 className="font-display text-[length:var(--text-32)] leading-tight tracking-tight md:text-[length:var(--text-40)]">
              Gallery.
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {p.gallery.map((img, i) => (
                <li
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--color-line)]"
                >
                  {img.url ? (
                    <Image
                      src={img.url}
                      alt={img.alt ?? `${p.title} — image ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Back to portfolio */}
      <div className="border-t border-[var(--color-line)] px-6 py-10 text-center">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[length:var(--text-15)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          <span aria-hidden>←</span> {backLabel}
        </Link>
      </div>
    </article>
  );
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 9) + 1;
}
