import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a build consultation — Silverline Developments",
  description:
    "Schedule a 90-minute discovery visit with the Silverline build team. A written, fixed-scope proposal follows within two weeks.",
  path: "/consultation",
});

export default function DevelopmentsConsultationPage() {
  return (
    <PagePlaceholder
      eyebrow="Build consultation"
      title="A few questions. Then we walk your lot."
      italicWord="lot."
      description="The multi-step intake form (ZIP validation, build type, budget band, timeline) lands in Week 8. Until then, email us with your project details."
      links={[
        { label: "Contact the build team", href: "https://silverlineind.com/contact?subject=Build%20project" },
        { label: "Check the service area", href: "https://silverlineind.com/service-area" },
        { label: "Home build cost estimator", href: "/calculators/home-build" },
      ]}
    />
  );
}
