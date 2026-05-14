import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Card = {
  label: string;
  image?: { src: string; alt: string };
  /** Optional badge or sub-label, e.g., "Knoxville, TN" */
  sub?: string;
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  cards: Card[];
};

/**
 * Horizontal card carousel — Slash's "Who we're built for" pattern.
 * Each card = AI-rendered or photographed image + label overlay.
 * Uses CSS scroll-snap; arrows can be wired in client variant later.
 */
export function ForWho({ eyebrow, headline, italicWord, sub, cards }: Props) {
  return (
    <section className="overflow-hidden px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader
          eyebrow={eyebrow}
          headline={headline}
          italicWord={italicWord}
          sub={sub}
          align="left"
        />

        <div className="-mx-6 mt-12 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <ul className="flex w-max gap-6 px-6">
            {cards.map((c) => (
              <li
                key={c.label}
                className="relative h-[420px] w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]"
              >
                {c.image ? (
                  <Image
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="300px"
                    className="object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="font-display text-[length:var(--text-24)] leading-tight tracking-tight text-white">
                    {c.label}
                  </p>
                  {c.sub ? (
                    <p className="mt-1 text-[length:var(--text-13)] text-white/80">
                      {c.sub}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
