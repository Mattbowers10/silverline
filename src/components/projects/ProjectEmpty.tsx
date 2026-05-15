import Link from "next/link";

type Props = {
  /** Optional label for what's being filtered (e.g. "gunite", "Sevierville"). */
  filterLabel?: string;
};

export function ProjectEmpty({ filterLabel }: Props) {
  return (
    <div className="card-highlight rounded-2xl border border-[var(--color-line)] p-10 text-center md:p-16">
      <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        Portfolio · Photography in progress
      </p>
      <h2 className="mt-4 font-display text-[length:var(--text-32)] leading-tight tracking-tight md:text-[length:var(--text-40)]">
        {filterLabel ? (
          <>
            No <i className="font-display italic text-[var(--color-accent)]">{filterLabel}</i> projects published yet.
          </>
        ) : (
          <>
            Projects publishing <i className="font-display italic text-[var(--color-accent)]">soon.</i>
          </>
        )}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[length:var(--text-15)] text-[var(--color-muted)]">
        Our in-house team is photographing and writing up the most recent Silverline
        builds. Case studies will populate here as they go live. In the meantime, ask us
        for samples directly.
      </p>
      <Link
        href="/consultation"
        className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
      >
        Request portfolio samples
      </Link>
    </div>
  );
}
