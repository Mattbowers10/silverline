/** Branded skeleton shown while a (site) page boundary suspends. */
export default function Loading() {
  return (
    <div className="px-6 py-20 lg:py-28" aria-busy="true" aria-live="polite">
      <div className="mx-auto max-w-[1320px]">
        <div className="max-w-3xl">
          <div className="h-3 w-32 animate-pulse rounded-full bg-[var(--color-line)]" />
          <div className="mt-6 h-12 w-2/3 animate-pulse rounded-lg bg-[var(--color-line)]" />
          <div className="mt-3 h-12 w-1/2 animate-pulse rounded-lg bg-[var(--color-line)]" />
          <div className="mt-8 h-4 w-full animate-pulse rounded-full bg-[var(--color-line)]" />
          <div className="mt-2 h-4 w-3/4 animate-pulse rounded-full bg-[var(--color-line)]" />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-2xl bg-[var(--color-line)]"
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
