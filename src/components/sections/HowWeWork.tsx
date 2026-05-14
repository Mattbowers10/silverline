import { SectionHeader } from "./SectionHeader";

type Step = { n: string; title: string; body: string };

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  steps: Step[];
};

/**
 * "How we work" — 4-step process strip. Replaces Slash's pricing tier section
 * since Silverline is custom-quote, not productized SaaS.
 */
export function HowWeWork({ eyebrow, headline, italicWord, sub, steps }: Props) {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader
          eyebrow={eyebrow}
          headline={headline}
          italicWord={italicWord}
          sub={sub}
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="card-highlight flex flex-col p-7">
              <span className="font-display text-[length:var(--text-40)] leading-none tracking-tight text-[var(--color-accent)]">
                {s.n}
              </span>
              <h3 className="mt-5 text-[length:var(--text-18)] font-medium text-[var(--color-text)]">
                {s.title}
              </h3>
              <p className="mt-2 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
