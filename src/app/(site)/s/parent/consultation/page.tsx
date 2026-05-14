import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request consultation",
  description:
    "Tell us about your project. Three minutes to share, one business day to a reply from a real Silverline team member.",
  path: "/consultation",
});

export default function ConsultationPage() {
  return (
    <PagePlaceholder
      eyebrow="Request consultation"
      title="A few questions. Then we talk."
      italicWord="talk."
      description="The multi-step intake form lands in Week 8 with ZIP validation, project type, and budget bands. Until then, drop us a note via contact."
      links={[
        { label: "Contact us directly", href: "/contact" },
        { label: "Check the service area first", href: "/service-area" },
      ]}
    />
  );
}
