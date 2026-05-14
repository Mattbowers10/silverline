type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  /** Optional email pill (mirrors the hero email capture). */
  emailCapture?: {
    placeholder?: string;
    submitLabel?: string;
    action?: string;
  };
};

/**
 * Closing CTA strip — "Tell us about your project."
 * Lives just above the footer on every page.
 */
export function CTABand({
  eyebrow,
  headline,
  italicWord,
  sub,
  emailCapture,
}: Props) {
  let renderedHeadline: React.ReactNode = headline;
  if (italicWord && headline.includes(italicWord)) {
    const [before, after] = headline.split(italicWord);
    renderedHeadline = (
      <>
        {before}
        <i className="font-display italic text-[var(--color-accent)]">{italicWord}</i>
        {after}
      </>
    );
  }

  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <p className="mb-6 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-balance text-[length:var(--text-40)] leading-[1.1] tracking-tight md:text-[length:var(--text-52)]">
          {renderedHeadline}
        </h2>
        {sub ? (
          <p className="mt-5 text-pretty text-[length:var(--text-18)] text-[var(--color-muted)]">
            {sub}
          </p>
        ) : null}

        {emailCapture ? (
          <form
            action={emailCapture.action ?? "/consultation"}
            method="post"
            className="mx-auto mt-10 flex max-w-md items-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)]/60 p-1"
          >
            <input
              type="email"
              name="email"
              required
              placeholder={emailCapture.placeholder ?? "What's your email?"}
              className="flex-1 bg-transparent px-5 py-3 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
            >
              {emailCapture.submitLabel ?? "Get Started"}
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
}
