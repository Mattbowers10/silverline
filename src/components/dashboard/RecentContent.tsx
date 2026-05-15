import Link from "next/link";
import { EmptyNudge } from "./EmptyNudge";
import type { ContentRow } from "@/lib/dashboard";

type Props = {
  title: string;
  rows: ContentRow[];
  emptyTitle: string;
  emptyBody: string;
  emptyCta: { label: string; href: string };
  viewAllHref: string;
};

export function RecentContent({
  title,
  rows,
  emptyTitle,
  emptyBody,
  emptyCta,
  viewAllHref,
}: Props) {
  return (
    <section className="card-highlight rounded-2xl border border-[var(--color-line)]">
      <header className="flex items-center justify-between border-b border-[var(--color-line)] px-5 py-4">
        <h2 className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="text-[length:var(--text-13)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
        >
          Manage →
        </Link>
      </header>
      {rows.length === 0 ? (
        <div className="p-5">
          <EmptyNudge title={emptyTitle} body={emptyBody} cta={emptyCta} />
        </div>
      ) : (
        <ul className="divide-y divide-[var(--color-line)]">
          {rows.map((r) => (
            <li key={r.id}>
              <Link
                href={r.href}
                className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
              >
                <div className="min-w-0">
                  <p className="truncate text-[length:var(--text-15)] text-[var(--color-text)]">
                    {r.title}
                  </p>
                  <p className="text-[length:var(--text-13)] text-[var(--color-muted)]">
                    {r.meta || "—"}
                  </p>
                </div>
                {r.publishedAt ? (
                  <time
                    dateTime={r.publishedAt}
                    className="shrink-0 text-[length:var(--text-13)] text-[var(--color-muted)]"
                  >
                    {new Date(r.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "2-digit",
                    })}
                  </time>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
