import Link from "next/link";
import type { Tenant } from "@/lib/tenants";

type Column = { heading: string; links: { label: string; href: string }[] };

/**
 * NOTE: Company pages (about, careers, contact, legal, etc.) live ONLY on the
 * parent domain. The proxy redirects any request to those paths from a
 * subdomain back to the parent, so we use relative URLs here.
 */
const COMMON_COMPANY: Column = {
  heading: "Company",
  links: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
};

const COMMON_DIVISIONS: Column = {
  heading: "Divisions",
  links: [
    { label: "Pools", href: "https://pools.silverlineind.com" },
    { label: "Developments", href: "https://developments.silverlineind.com" },
    { label: "Properties", href: "https://properties.silverlineind.com" },
  ],
};

const COMMON_RESOURCES: Column = {
  heading: "Resources",
  links: [
    { label: "Service area", href: "/service-area" },
    { label: "Financing", href: "/financing" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Shop", href: "/shop" },
  ],
};

const COMMON_LEGAL: Column = {
  heading: "Legal",
  links: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ],
};

const PER_TENANT: Record<Tenant, Column[]> = {
  parent: [COMMON_DIVISIONS, COMMON_RESOURCES, COMMON_COMPANY, COMMON_LEGAL],
  pools: [
    {
      heading: "Pool services",
      links: [
        { label: "Gunite construction", href: "/services/gunite" },
        { label: "Fiberglass construction", href: "/services/fiberglass" },
        { label: "Service", href: "/services/service" },
        { label: "Maintenance", href: "/services/maintenance" },
        { label: "Remodels", href: "/services/remodels" },
      ],
    },
    COMMON_RESOURCES,
    COMMON_COMPANY,
    COMMON_LEGAL,
  ],
  developments: [
    {
      heading: "Build services",
      links: [
        { label: "Residential", href: "/services/residential" },
        { label: "Commercial", href: "/services/commercial" },
        { label: "Remodels", href: "/services/remodels" },
      ],
    },
    COMMON_RESOURCES,
    COMMON_COMPANY,
    COMMON_LEGAL,
  ],
  properties: [
    {
      heading: "Property services",
      links: [
        { label: "Real estate", href: "/services/real-estate" },
        { label: "STR management", href: "/services/management" },
        { label: "Active listings", href: "/listings" },
      ],
    },
    COMMON_RESOURCES,
    COMMON_COMPANY,
    COMMON_LEGAL,
  ],
};

export function Footer({ tenant }: { tenant: Tenant }) {
  const columns = PER_TENANT[tenant];
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 border-t border-[var(--color-line)] bg-[var(--color-panel)]/50">
      <div className="mx-auto max-w-[1320px] px-6 py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-[length:var(--text-13)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-[length:var(--text-15)] text-[var(--color-text)]/85 transition-colors hover:text-[var(--color-accent)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-10 border-[var(--color-line)]" />

        <div className="flex flex-col gap-4 text-[length:var(--text-13)] text-[var(--color-faint)] md:flex-row md:items-center md:justify-between">
          <p>© {year} Silverline Industries, LLC. All rights reserved.</p>
          <p>Knoxville, Tennessee · Licensed & insured</p>
        </div>
      </div>
    </footer>
  );
}
