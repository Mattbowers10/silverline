import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Tool = {
  name: string;
  description: string;
  href: string;
  image?: { src: string; alt: string };
  badge?: string;
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  tools: Tool[];
};

/**
 * Tools / calculator tile grid — Slash "Coupled with intelligent tools" analog.
 * Each tile = screenshot + name + 1-line description. Acts as lead magnets:
 * cost estimators, ROI calculators, financing tools, service-area lookup.
 */
export function ToolsGrid({ eyebrow, headline, italicWord, sub, tools }: Props) {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader
          eyebrow={eyebrow}
          headline={headline}
          italicWord={italicWord}
          sub={sub}
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <li key={t.name}>
              <Link
                href={t.href}
                className="card-highlight group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
                  {t.image ? (
                    <Image
                      src={t.image.src}
                      alt={t.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : null}
                  {t.badge ? (
                    <span className="absolute left-4 top-4 rounded-full bg-[var(--color-accent)]/15 px-3 py-1 text-[length:var(--text-13)] text-[var(--color-accent)]">
                      {t.badge}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[length:var(--text-18)] font-medium text-[var(--color-text)]">
                    {t.name}
                  </h3>
                  <p className="mt-2 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
                    {t.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                    Open tool <span aria-hidden>→</span>
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
