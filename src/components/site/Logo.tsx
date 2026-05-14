import Link from "next/link";
import type { Tenant } from "@/lib/tenants";

const SUB_LABEL: Record<Tenant, string | null> = {
  parent: null,
  pools: "Pools",
  developments: "Developments",
  properties: "Properties",
};

/**
 * Placeholder wordmark — Caudex display set, optionally with a small
 * division tag (e.g. "Silverline · Pools"). Replace SVG when final mark lands.
 */
export function Logo({ tenant }: { tenant: Tenant }) {
  const sub = SUB_LABEL[tenant];
  return (
    <Link href="/" className="group inline-flex items-baseline gap-x-2">
      <span className="font-display text-[length:var(--text-24)] font-bold tracking-tight text-[var(--color-text)]">
        Silverline
      </span>
      {sub ? (
        <span className="text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]">
          · {sub}
        </span>
      ) : null}
    </Link>
  );
}
