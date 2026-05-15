import Link from "next/link";
import { cn } from "@/lib/cn";

export type FilterOption = {
  value: string;
  label: string;
  /** Optional count to show in the pill, e.g. " · 14" */
  count?: number;
};

type Props = {
  /** Label rendered above the pill row (e.g. "Division", "Type", "City"). */
  label?: string;
  /** Base href for the filter, e.g. "/projects". Query string is appended. */
  baseHref: string;
  /** Name of the query-string parameter that this filter sets. */
  paramName: string;
  /** Current active value (null/"" → "All"). */
  activeValue?: string | null;
  /** Other query params to preserve when switching this filter. */
  preserveParams?: Record<string, string | undefined>;
  /** Filter options. "All" sentinel is rendered automatically when allLabel set. */
  options: FilterOption[];
  /** Label for the "all" sentinel option. Omit to skip the All chip. */
  allLabel?: string;
};

/**
 * Pill-row filter for /projects pages. Pure server component — each pill is
 * just a Link to the same page with a different query string. Plays nicely
 * with Next caching and ISR.
 */
export function ProjectFilters({
  label,
  baseHref,
  paramName,
  activeValue,
  preserveParams = {},
  options,
  allLabel,
}: Props) {
  const all = (
    <Pill
      key="__all"
      href={makeHref(baseHref, paramName, undefined, preserveParams)}
      active={!activeValue}
    >
      {allLabel} <span className="opacity-60">·</span> All
    </Pill>
  );

  return (
    <div>
      {label ? (
        <p className="mb-3 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          {label}
        </p>
      ) : null}
      <nav aria-label={label ?? "Filter"} className="flex flex-wrap gap-2">
        {allLabel ? all : null}
        {options.map((o) => (
          <Pill
            key={o.value}
            href={makeHref(baseHref, paramName, o.value, preserveParams)}
            active={activeValue === o.value}
          >
            {o.label}
            {typeof o.count === "number" ? (
              <span className="opacity-60"> · {o.count}</span>
            ) : null}
          </Pill>
        ))}
      </nav>
    </div>
  );
}

function Pill({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-5 py-2 text-[length:var(--text-15)] transition-colors",
        active
          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-accent)]"
          : "border-[var(--color-line)] bg-[var(--color-page)] text-[var(--color-text)]/85 hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text)]",
      )}
    >
      {children}
    </Link>
  );
}

function makeHref(
  baseHref: string,
  paramName: string,
  value: string | undefined,
  preserveParams: Record<string, string | undefined>,
): string {
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(preserveParams)) {
    if (v) usp.set(k, v);
  }
  if (value) usp.set(paramName, value);
  else usp.delete(paramName);
  const qs = usp.toString();
  return qs ? `${baseHref}?${qs}` : baseHref;
}
