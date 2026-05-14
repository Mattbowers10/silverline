import Link from "next/link";

type Props = { text: string; ctaLabel?: string; ctaHref?: string };

/** Fixed thin bar at the very top — matches Slash's pattern. */
export function AnnouncementBar({ text, ctaLabel, ctaHref }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-9 w-screen items-center justify-center gap-x-4 overflow-hidden bg-[var(--color-page)] text-[length:var(--text-13)] text-[var(--color-muted)]">
      <span className="text-balance text-center">{text}</span>
      {ctaLabel && ctaHref ? (
        <>
          <span className="text-[var(--color-faint)]">|</span>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1 text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </>
      ) : null}
    </div>
  );
}
