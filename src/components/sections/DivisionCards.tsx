import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Card = {
  /** Division accent label, e.g., "Pools" */
  tag: string;
  title: string;
  body: string;
  href: string;
  /** External target (subdomain) — opens in same tab but marks rel */
  external?: boolean;
  image?: { src: string; alt: string };
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  /** Exactly three for the home page (pools / developments / properties). */
  cards: Card[];
};

/**
 * Foundation analog — three big dark cards routing to each subdomain.
 * This is the parent home's primary cross-sell into Pools / Developments / Properties.
 */
export function DivisionCards({ eyebrow, headline, italicWord, sub, cards }: Props) {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader
          eyebrow={eyebrow}
          headline={headline}
          italicWord={italicWord}
          sub={sub}
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <li key={c.tag} className="group">
              <Link
                href={c.href}
                {...(c.external ? { rel: "noopener", target: "_self" } : {})}
                className="card-highlight flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]/40"
              >
                {c.image ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {c.tag}
                  </span>
                  <h3 className="mt-3 font-display text-[length:var(--text-24)] leading-tight tracking-tight md:text-[length:var(--text-32)]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
                    {c.body}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                    Explore {c.tag.toLowerCase()} <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
