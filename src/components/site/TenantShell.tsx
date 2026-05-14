import type { Tenant } from "@/lib/tenants";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";

/** Wraps every tenant page tree with the shared chrome. */
export function TenantShell({
  tenant,
  children,
}: {
  tenant: Tenant;
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar
        text="Silverline raises the bar for East Tennessee — now booking 2026 projects."
        ctaLabel="Request consultation"
        ctaHref="/consultation"
      />
      <Header tenant={tenant} />
      <main className="pt-24 lg:pt-28">{children}</main>
      <Footer tenant={tenant} />
    </>
  );
}
