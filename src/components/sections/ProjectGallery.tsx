import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./SectionHeader";

type Project = {
  title: string;
  href: string;
  /** Division tag — drives the accent color/label */
  division: "pools" | "developments" | "properties";
  city?: string;
  image: { src: string; alt: string };
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  /** Best when exactly 6 projects for the bento layout. */
  projects: Project[];
  viewAllHref?: string;
};

const DIVISION_LABEL = {
  pools: "Pools",
  developments: "Developments",
  properties: "Properties",
} as const;

/**
 * Bento-grid project showcase — replaces Slash's demo iframe section.
 * Designed for 6 cards: 1 large + 5 standard. Renders any count gracefully.
 */
export function ProjectGallery({
  eyebrow,
  headline,
  italicWord,
  sub,
  projects,
  viewAllHref = "/projects",
}: Props) {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow={eyebrow}
            headline={headline}
            italicWord={italicWord}
            sub={sub}
            align="left"
          />
          <Link
            href={viewAllHref}
            className="text-[length:var(--text-15)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            View all projects →
          </Link>
        </div>

        <ul className="mt-12 grid auto-rows-[260px] grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[280px]">
          {projects.map((p, i) => {
            const wide = i === 0;
            return (
              <li
                key={p.href}
                className={cn(
                  "relative overflow-hidden rounded-2xl border border-[var(--color-line)]",
                  wide && "md:col-span-2 md:row-span-2",
                )}
              >
                <Link href={p.href} className="group block h-full w-full">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes={wide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      {DIVISION_LABEL[p.division]}
                      {p.city ? ` · ${p.city}` : ""}
                    </p>
                    <h3 className="mt-2 font-display text-[length:var(--text-20)] leading-tight tracking-tight text-white md:text-[length:var(--text-24)]">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
