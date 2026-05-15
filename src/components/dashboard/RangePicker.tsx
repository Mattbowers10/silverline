import Link from "next/link";
import { cn } from "@/lib/cn";
import { RANGE_OPTIONS } from "@/lib/dashboard";

type Props = {
  active: string;
  /** Path the picker links to (defaults to /dashboard). */
  baseHref?: string;
};

/** Pure server-component pill row — each option is a Link with ?range=… */
export function RangePicker({ active, baseHref = "/dashboard" }: Props) {
  return (
    <nav aria-label="Date range" className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] p-1">
      {RANGE_OPTIONS.map((o) => {
        const isActive = active === o.value;
        const href = o.value === "7d" ? baseHref : `${baseHref}?range=${o.value}`;
        return (
          <Link
            key={o.value}
            href={href}
            className={cn(
              "rounded-full px-4 py-1.5 text-[length:var(--text-13)] transition-colors",
              isActive
                ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-text)]",
            )}
          >
            {o.label}
          </Link>
        );
      })}
    </nav>
  );
}
