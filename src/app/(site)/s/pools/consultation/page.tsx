import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a pool consultation — Silverline Pools",
  description:
    "Schedule a 60-minute site walk with the Silverline pool team. A 3D rendering and a fixed quote follow within days.",
  path: "/consultation",
});

export default function PoolsConsultationPage() {
  return (
    <PagePlaceholder
      eyebrow="Pool consultation"
      title="A few questions. Then we walk your yard."
      italicWord="yard."
      description="The multi-step intake form (ZIP validation, pool type, budget band, timeline) lands in Week 8. Until then, email us with your project details."
      links={[
        { label: "Contact our pool team", href: "https://silverlineind.com/contact?subject=Pool%20project" },
        { label: "Check the service area", href: "https://silverlineind.com/service-area" },
        { label: "Gunite cost estimator", href: "/calculators/cost-estimator" },
      ]}
    />
  );
}
