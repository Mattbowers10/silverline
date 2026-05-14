import { PlaceholderHero } from "@/components/site/PlaceholderHero";

export default function ParentHome() {
  return (
    <PlaceholderHero
      eyebrow="A full-suite home developer · East Tennessee"
      headline="Built once. Built right."
      italicWord="once."
      sub="Custom homes, custom pools, and the East Tennessee properties that hold their value. One team. One standard."
      primaryCta={{ label: "Request consultation", href: "/consultation" }}
      secondaryCta={{ label: "See our work", href: "/projects" }}
    />
  );
}
