import Link from "next/link";
import Image from "next/image";
import { PlaceholderArt } from "@/components/site/PlaceholderArt";
import {
  DIVISION_LABEL,
  PROJECT_TYPE_LABEL,
  formatCompletedDate,
  type ProjectSummary,
} from "@/lib/projects";

const KIND_BY_DIVISION = {
  pools: "pool",
  developments: "house",
  properties: "landscape",
} as const;

type Props = {
  projects: ProjectSummary[];
  /**
   * Where to point each card. Pass a function so parent /projects can route
   * cross-subdomain (https://pools.silverlineind.com/projects/<slug>) while
   * subdomain /projects pages link locally to /projects/<slug>.
   */
  hrefFor: (p: ProjectSummary) => string;
};

export function ProjectGrid({ projects, hrefFor }: Props) {
  return (
    <ul className="grid auto-rows-[280px] gap-6 md:grid-cols-3 md:auto-rows-[320px]">
      {projects.map((p, i) => {
        const wide = i % 7 === 0; // every 7th tile spans 2 cols
        return (
          <li
            key={p.id}
            className={`relative overflow-hidden rounded-2xl border border-[var(--color-line)] ${
              wide ? "md:col-span-2" : ""
            }`}
          >
            <Link href={hrefFor(p)} className="group block h-full w-full">
              {p.heroImage?.url ? (
                <Image
                  src={p.heroImage.url}
                  alt={p.heroImage.alt ?? p.title}
                  fill
                  sizes={wide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <PlaceholderArt kind={KIND_BY_DIVISION[p.division]} seed={hashSeed(p.slug)} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {DIVISION_LABEL[p.division]}
                  {p.projectType ? ` · ${PROJECT_TYPE_LABEL[p.projectType]}` : ""}
                  {p.city ? ` · ${p.city}` : ""}
                </p>
                <h3 className="mt-2 font-display text-[length:var(--text-20)] leading-tight tracking-tight text-white md:text-[length:var(--text-24)]">
                  {p.title}
                </h3>
                <p className="mt-1 text-[length:var(--text-13)] text-white/70">
                  {formatCompletedDate(p.completedAt)}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 9) + 1;
}
