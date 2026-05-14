import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  description: string;
  /** Optional list of next-step links shown as small chips. */
  links?: { label: string; href: string }[];
};

/**
 * Shared template for stub pages — until real content lands.
 * Renders as a generous centered hero with a description and optional links.
 */
export function PagePlaceholder({
  eyebrow,
  title,
  italicWord,
  description,
  links,
}: Props) {
  let renderedTitle: React.ReactNode = title;
  if (italicWord && title.includes(italicWord)) {
    const [before, after] = title.split(italicWord);
    renderedTitle = (
      <>
        {before}
        <i className="font-display italic text-[var(--color-accent)]">{italicWord}</i>
        {after}
      </>
    );
  }

  return (
    <section className="px-6 py-24 lg:py-40">
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <p className="mb-6 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
          {renderedTitle}
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
          {description}
        </p>
        {links?.length ? (
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] px-5 py-2 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {l.label} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
