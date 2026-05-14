import { SectionHeader } from "./SectionHeader";

type Feature = {
  /** Single-letter or short symbol — rendered in a circular accent badge. */
  icon?: string;
  title: string;
  body: string;
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  features: Feature[];
  /** Number of columns at desktop width. Defaults to 2. */
  columns?: 2 | 3 | 4;
  align?: "left" | "center";
};

const COLS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Icon + title + body grid — used heavily on service pages.
 * No real icons yet; the `icon` string is rendered in a circular accent badge.
 */
export function FeatureList({
  eyebrow,
  headline,
  italicWord,
  sub,
  features,
  columns = 2,
  align = "left",
}: Props) {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader
          eyebrow={eyebrow}
          headline={headline}
          italicWord={italicWord}
          sub={sub}
          align={align}
        />

        <ul className={`mt-16 grid gap-x-10 gap-y-12 ${COLS[columns]}`}>
          {features.map((f) => (
            <li key={f.title} className="flex gap-5">
              <span
                aria-hidden
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-accent)]/15 text-[length:var(--text-15)] font-medium text-[var(--color-accent)]"
              >
                {f.icon ?? "·"}
              </span>
              <div>
                <h3 className="font-display text-[length:var(--text-20)] leading-tight tracking-tight text-[var(--color-text)]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
                  {f.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
