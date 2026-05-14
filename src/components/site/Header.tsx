import Link from "next/link";
import type { Tenant } from "@/lib/tenants";
import { Logo } from "./Logo";

type NavItem = { label: string; href: string };

const NAV: Record<Tenant, NavItem[]> = {
  parent: [
    { label: "Pools", href: "https://pools.silverlineind.com" },
    { label: "Developments", href: "https://developments.silverlineind.com" },
    { label: "Properties", href: "https://properties.silverlineind.com" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  pools: [
    { label: "Gunite", href: "/services/gunite" },
    { label: "Fiberglass", href: "/services/fiberglass" },
    { label: "Service", href: "/services/service" },
    { label: "Maintenance", href: "/services/maintenance" },
    { label: "Remodels", href: "/services/remodels" },
    { label: "Projects", href: "/projects" },
  ],
  developments: [
    { label: "Residential", href: "/services/residential" },
    { label: "Commercial", href: "/services/commercial" },
    { label: "Remodels", href: "/services/remodels" },
    { label: "Projects", href: "/projects" },
  ],
  properties: [
    { label: "Buy & Sell", href: "/services/real-estate" },
    { label: "STR Management", href: "/services/management" },
    { label: "Listings", href: "/listings" },
  ],
};

export function Header({ tenant }: { tenant: Tenant }) {
  const items = NAV[tenant];
  return (
    <header className="fixed left-0 right-0 top-9 z-40 h-14 w-screen bg-[var(--color-page)]/70 backdrop-blur-md lg:h-16">
      <div className="mx-auto flex h-full max-w-[1320px] items-center justify-between px-6">
        <Logo tenant={tenant} />

        <nav aria-label="Primary" className="hidden gap-7 md:flex">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-[length:var(--text-15)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/consultation"
            className="hidden rounded-full bg-white px-4 py-2 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)] md:inline-flex"
          >
            Request consultation
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-text)] md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
