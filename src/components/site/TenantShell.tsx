import type { Tenant } from "@/lib/tenants";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SkipLink } from "./SkipLink";

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
      <SkipLink />
      <AnnouncementBar
        text="Silverline raises the bar for East Tennessee — now booking 2026 projects."
        ctaLabel="Request consultation"
        ctaHref="/consultation"
      />
      <Header tenant={tenant} />
      <main id="content" className="pt-24 lg:pt-28">
        {children}
      </main>
      <Footer tenant={tenant} />
    </>
  );
}
