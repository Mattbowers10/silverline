import { cn } from "@/lib/cn";

type Props = {
  label: string;
  value: string;
  sub?: string;
  /** % change vs previous window. Positive = green, negative = red. */
  deltaPct?: number | null;
  /** Optional accent override on the value (e.g., accent blue). */
  accent?: boolean;
};

export function KpiCard({ label, value, sub, deltaPct, accent }: Props) {
  return (
    <div className="card-highlight rounded-2xl border border-[var(--color-line)] p-5 md:p-6">
      <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        {label}
      </p>
      <p
        className={cn(
          "mt-3 font-display text-[length:var(--text-40)] leading-none tracking-tight md:text-[length:var(--text-48)]",
          accent && "text-[var(--color-accent)]",
        )}
      >
        {value}
      </p>
      <div className="mt-3 flex items-baseline justify-between gap-3 text-[length:var(--text-13)]">
        <span className="text-[var(--color-muted)]">{sub ?? " "}</span>
        {typeof deltaPct === "number" ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5",
              deltaPct >= 0
                ? "bg-emerald-500/10 text-emerald-300"
                : "bg-red-500/10 text-red-300",
            )}
          >
            {deltaPct >= 0 ? "▲" : "▼"} {Math.abs(deltaPct)}%
          </span>
        ) : null}
      </div>
    </div>
  );
}
