import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "Silverline terms of service.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Terms of Service"
      description="The full terms are being finalized with counsel. By using this site you agree to standard service-of-website terms."
      links={[{ label: "Email us about terms", href: "mailto:hello@silverlineind.com" }]}
    />
  );
}
