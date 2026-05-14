import Image from "next/image";

type Logo = {
  name: string;
  /** Optional logo SVG/PNG; otherwise the name is rendered as text. */
  src?: string;
};

type Props = {
  /** Single-line heading, centered. */
  headline: string;
  italicWord?: string;
  logos: Logo[];
};

/**
 * "Trusted by …" logo row — Slash partners section analog.
 * Renders SVG/PNG when provided, otherwise the name in a muted tone.
 */
export function Partners({ headline, italicWord, logos }: Props) {
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
    <section className="px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <p className="text-balance text-center text-[length:var(--text-15)] text-[var(--color-muted)] md:text-[length:var(--text-16)]">
          {renderedHeadline}
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((l) => (
            <li
              key={l.name}
              className="text-[length:var(--text-15)] text-[var(--color-muted)]/80"
            >
              {l.src ? (
                <span className="relative inline-block h-8 w-28 grayscale opacity-80 transition hover:opacity-100">
                  <Image
                    src={l.src}
                    alt={l.name}
                    fill
                    sizes="112px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span className="font-display tracking-wide">{l.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
