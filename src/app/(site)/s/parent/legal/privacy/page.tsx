import { PagePlaceholder } from "@/components/site/PagePlaceholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Silverline privacy policy.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      eyebrow="Legal"
      title="Privacy Policy"
      description="The full policy is being finalized with counsel. The short version: we don't sell your data, we use analytics to improve the site, and you can email us anytime to be removed from our systems."
      links={[{ label: "Email us about data", href: "mailto:hello@silverlineind.com" }]}
    />
  );
}
