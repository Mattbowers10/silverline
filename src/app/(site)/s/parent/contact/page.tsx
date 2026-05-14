import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach the Silverline team. Project inquiries, press, careers, and general questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Contact"
      title="Tell us about your project."
      italicWord="project."
      description="Real humans on the other end. Most consultation requests get a reply within a single business day."
      links={[
        { label: "Request consultation", href: "/consultation" },
        { label: "Service area", href: "/service-area" },
        { label: "Careers", href: "/careers" },
      ]}
    />
  );
}
