import { PlaceholderHero } from "@/components/site/PlaceholderHero";

export default function DevelopmentsHome() {
  return (
    <PlaceholderHero
      eyebrow="Silverline Developments · Residential · Commercial · Remodels"
      headline="Built once. Built right."
      italicWord="right."
      sub="Custom homes, commercial spaces, and remodels delivered by one team with a single point of contact from first sketch through final walkthrough."
      primaryCta={{ label: "Start a build", href: "/consultation" }}
      secondaryCta={{ label: "See completed builds", href: "/projects" }}
    />
  );
}
