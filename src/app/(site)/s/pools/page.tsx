import { PlaceholderHero } from "@/components/site/PlaceholderHero";

export default function PoolsHome() {
  return (
    <PlaceholderHero
      eyebrow="Silverline Pools · Gunite · Fiberglass · Service"
      headline="Built to outlast the season."
      italicWord="outlast"
      sub="Gunite and fiberglass pools designed and built by the most experienced team in East Tennessee. Backed by lifetime craftsmanship support."
      primaryCta={{ label: "Get a pool quote", href: "/consultation" }}
      secondaryCta={{ label: "Browse projects", href: "/projects" }}
    />
  );
}
