import { PlaceholderHero } from "@/components/site/PlaceholderHero";

export default function PropertiesHome() {
  return (
    <PlaceholderHero
      eyebrow="Silverline Properties · Real Estate · STR Management"
      headline="Buy smart. Earn more."
      italicWord="smart."
      sub="East Tennessee real estate purchases and short-term rental management — by a team that builds, maintains, and operates the homes you own."
      primaryCta={{ label: "Talk to a property advisor", href: "/consultation" }}
      secondaryCta={{ label: "Explore listings", href: "/listings" }}
    />
  );
}
