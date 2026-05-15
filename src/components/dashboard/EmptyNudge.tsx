type Props = {
  title: string;
  body: string;
  /** Optional small CTA shown as a muted link. */
  cta?: { label: string; href: string };
};

export function EmptyNudge({ title, body, cta }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--color-line)] p-8 text-center text-[length:var(--text-13)] text-[var(--color-muted)]">
      <p className="font-display text-[length:var(--text-18)] text-[var(--color-text)]">
        {title}
      </p>
      <p className="mt-2 max-w-md mx-auto leading-relaxed">{body}</p>
      {cta ? (
        <a
          href={cta.href}
          className="mt-4 inline-flex text-[var(--color-text)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:underline"
        >
          {cta.label} →
        </a>
      ) : null}
    </div>
  );
}
