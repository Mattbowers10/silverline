import type { Tenant } from "@/lib/tenants";

/**
 * Organization / LocalBusiness JSON-LD. Search Console rewards this with
 * rich results (sitelinks, knowledge-panel, breadcrumbs). One block in the
 * <head> of every public page.
 */
export function StructuredData({ tenant }: { tenant: Tenant }) {
  const url =
    tenant === "parent"
      ? "https://silverlineind.com"
      : `https://${tenant}.silverlineind.com`;

  const name =
    tenant === "parent"
      ? "Silverline Industries"
      : `Silverline ${tenant.charAt(0).toUpperCase()}${tenant.slice(1)}`;

  const description =
    tenant === "pools"
      ? "Gunite and fiberglass pools, service, and maintenance across East Tennessee."
      : tenant === "developments"
      ? "Custom homes, commercial builds, and remodels across East Tennessee."
      : tenant === "properties"
      ? "Real estate buying, selling, and short-term rental management across East Tennessee."
      : "Custom homes, custom pools, and East Tennessee property management.";

  const data = {
    "@context": "https://schema.org",
    "@type": tenant === "parent" ? "LocalBusiness" : "ProfessionalService",
    "@id": `${url}/#org`,
    name,
    legalName: "Silverline Industries, LLC",
    description,
    url,
    logo: `${url}/icon.svg`,
    foundingDate: "2021",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 35.9606,
        longitude: -83.9207,
      },
      // 90 minutes ≈ ~75-100 km depending on terrain; use the upper bound.
      geoRadius: "100000",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Knoxville",
      addressRegion: "TN",
      addressCountry: "US",
    },
    sameAs: [
      "https://pools.silverlineind.com",
      "https://developments.silverlineind.com",
      "https://properties.silverlineind.com",
    ].filter((u) => u !== url),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@silverlineind.com",
      areaServed: "US-TN",
    },
  };

  return (
    <script
      type="application/ld+json"
      // The JSON we control is safe; no user content interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
