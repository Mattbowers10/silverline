import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  /** Full headline. The substring matching `italicWord` is wrapped in <i>. */
  headline: string;
  italicWord?: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Shared section header. Caudex display headline with one italic accent word.
 */
export function SectionHeader({
  eyebrow,
  headline,
  italicWord,
  sub,
  align = "center",
  className,
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

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
    <header className={cn("max-w-3xl", alignClass, className)}>
      {eyebrow ? (
        <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-balance text-[length:var(--text-40)] leading-[1.1] tracking-tight md:text-[length:var(--text-48)] lg:text-[length:var(--text-52)]">
        {renderedHeadline}
      </h2>
      {sub ? (
        <p className="mt-5 text-pretty text-[length:var(--text-16)] leading-relaxed text-[var(--color-muted)] md:text-[length:var(--text-18)]">
          {sub}
        </p>
      ) : null}
    </header>
  );
}
