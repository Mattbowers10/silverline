import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Post = {
  title: string;
  href: string;
  category: string;
  publishedAt: string; // ISO date or display string
  readingMinutes?: number;
  coverImage?: { src: string; alt: string };
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  posts: Post[];
  viewAllHref?: string;
};

/**
 * "The Deep End" — blog carousel pulled from Payload Posts collection.
 */
export function RecentPosts({
  eyebrow,
  headline,
  italicWord,
  sub,
  posts,
  viewAllHref = "/blog",
}: Props) {
  return (
    <section className="overflow-hidden px-6 py-24 lg:py-32">
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
            View all posts →
          </Link>
        </div>

        <div className="-mx-6 mt-12 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <ul className="flex w-max gap-6 px-6">
            {posts.map((p) => (
              <li key={p.href} className="w-[340px] shrink-0 snap-start md:w-[400px]">
                <Link
                  href={p.href}
                  className="card-highlight group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)]/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
                    {p.coverImage ? (
                      <Image
                        src={p.coverImage.src}
                        alt={p.coverImage.alt}
                        fill
                        sizes="400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                      <span className="text-[var(--color-accent)]">{p.category}</span>
                      <span aria-hidden>·</span>
                      <span>{p.publishedAt}</span>
                    </div>
                    <h3 className="mt-3 font-display text-[length:var(--text-20)] leading-snug tracking-tight md:text-[length:var(--text-24)]">
                      {p.title}
                    </h3>
                    {p.readingMinutes ? (
                      <p className="mt-auto pt-5 text-[length:var(--text-13)] text-[var(--color-muted)]">
                        ≈ {p.readingMinutes} min read
                      </p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
