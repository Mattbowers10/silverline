import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Work at Silverline. We're a 10-person East Tennessee team and we hire slowly. When we do, this page will list what's open.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <PagePlaceholder
      eyebrow="Careers"
      title="We hire slowly. We hire well."
      italicWord="well."
      description="Ten people today. Open roles get posted here when they exist. If your craft is exceptional, we'll always read your résumé."
      links={[
        { label: "Email us about a role", href: "/contact?subject=Careers" },
        { label: "About Silverline", href: "/about" },
      ]}
    />
  );
}
