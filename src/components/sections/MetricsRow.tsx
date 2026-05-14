type Metric = { value: string; label: string };

type Props = {
  metrics: Metric[];
  /** Optional small heading shown above the row */
  eyebrow?: string;
};

/**
 * Four (or N) hero stats in a single row — Slash metrics ticker analog.
 */
export function MetricsRow({ metrics, eyebrow }: Props) {
  return (
    <section className="px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] border-y border-[var(--color-line)] py-12 lg:py-16">
        {eyebrow ? (
          <p className="mb-8 text-center text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <ul className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {metrics.map((m) => (
            <li key={m.label} className="text-center">
              <p className="font-display text-[length:var(--text-48)] leading-none tracking-tight md:text-[length:var(--text-52)]">
                {m.value}
              </p>
              <p className="mt-3 text-[length:var(--text-15)] text-[var(--color-muted)]">
                {m.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
