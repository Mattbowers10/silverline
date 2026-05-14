import Link from "next/link";

type Props = {
  eyebrow?: string;
  /** The full headline. Word inside <i>…</i> renders italic + accent. */
  headline: string;
  italicWord: string;
  sub: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

/**
 * Placeholder Slash-style hero — Caudex display headline with one italic
 * accent word, sub copy, two CTAs. Replace with full Hero section in Week 2.
 */
export function PlaceholderHero({
  eyebrow,
  headline,
  italicWord,
  sub,
  primaryCta,
  secondaryCta,
}: Props) {
  // Split headline around the italic word for inline rendering.
  const [before, after] = headline.includes(italicWord)
    ? headline.split(italicWord)
    : [headline, ""];

  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-20 lg:pt-28">
      <div className="mx-auto max-w-[1320px]">
        {eyebrow ? (
          <p className="mb-6 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="font-display text-balance text-[length:var(--text-52)] leading-[1.05] tracking-tight md:text-[64px] lg:text-[80px]">
          {before}
          <i className="font-display italic text-[var(--color-accent)]">
            {italicWord}
          </i>
          {after}
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)] md:text-[length:var(--text-20)]">
          {sub}
        </p>

        {(primaryCta || secondaryCta) && (
          <div className="mt-12 flex flex-wrap items-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-white px-6 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-[var(--color-line)] px-6 py-3 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
