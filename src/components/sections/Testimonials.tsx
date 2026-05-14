import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  customerPhoto?: { src: string; alt: string };
  projectImage?: { src: string; alt: string };
  /** Optional link to a full case study */
  href?: string;
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  testimonials: Testimonial[];
};

/**
 * Horizontal testimonial carousel — Slash "Real words, real impact" analog.
 */
export function Testimonials({
  eyebrow,
  headline,
  italicWord,
  sub,
  testimonials,
}: Props) {
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
            {testimonials.map((t, i) => (
              <li
                key={`${t.name}-${i}`}
                className="card-highlight flex w-[420px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] md:w-[480px]"
              >
                {t.projectImage ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={t.projectImage.src}
                      alt={t.projectImage.alt}
                      fill
                      sizes="480px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <blockquote className="flex flex-1 flex-col p-7">
                  <p className="font-display text-balance text-[length:var(--text-20)] leading-snug tracking-tight text-[var(--color-text)] md:text-[length:var(--text-24)]">
                    “{t.quote}”
                  </p>

                  <footer className="mt-6 flex items-center gap-3 pt-6 border-t border-[var(--color-line)]">
                    {t.customerPhoto ? (
                      <span className="relative h-10 w-10 overflow-hidden rounded-full bg-[var(--color-panel)]">
                        <Image
                          src={t.customerPhoto.src}
                          alt={t.customerPhoto.alt}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-panel)] text-[length:var(--text-13)] text-[var(--color-muted)]">
                        {t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </span>
                    )}
                    <div>
                      <p className="text-[length:var(--text-15)] font-medium text-[var(--color-text)]">
                        {t.name}
                      </p>
                      {t.role ? (
                        <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
                          {t.role}
                        </p>
                      ) : null}
                    </div>
                    {t.href ? (
                      <Link
                        href={t.href}
                        className="ml-auto text-[length:var(--text-13)] text-[var(--color-text)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:underline"
                      >
                        Read story →
                      </Link>
                    ) : null}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
