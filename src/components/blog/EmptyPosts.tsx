import Link from "next/link";

export function EmptyPosts({ category }: { category?: string }) {
  return (
    <div className="card-highlight rounded-2xl border border-[var(--color-line)] p-10 text-center md:p-16">
      <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        The Deep End · Coming soon
      </p>
      <h2 className="mt-4 font-display text-[length:var(--text-32)] leading-tight tracking-tight md:text-[length:var(--text-40)]">
        {category ? (
          <>
            No <i className="font-display italic text-[var(--color-accent)]">{category}</i> posts yet.
          </>
        ) : (
          <>
            No posts yet — <i className="font-display italic text-[var(--color-accent)]">but soon.</i>
          </>
        )}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-[length:var(--text-15)] text-[var(--color-muted)]">
        We&apos;re shipping five posts a week starting this season — build guides, cost
        breakdowns, and East Tennessee market reporting from the Silverline team. Subscribe
        for the first drop.
      </p>
      <Link
        href="/contact?subject=Newsletter"
        className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
      >
        Subscribe for updates
      </Link>
    </div>
  );
}
