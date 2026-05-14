import {
  Hero,
  FeatureList,
  ProcessSteps,
  Testimonials,
  FAQ,
  CTABand,
} from "@/components/sections";
import { HeroComposite } from "@/components/site/HeroComposite";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gunite Pool Construction — Silverline Pools",
  description:
    "Custom gunite pool construction in East Tennessee. Fully customizable shape, depth, and finish — built by a Master Pools Guild crew.",
  path: "/services/gunite",
});

export default function GunitePage() {
  return (
    <>
      <Hero
        eyebrow="Pool service · Gunite construction"
        headline="The pool. The shape. The finish you want."
        italicWord="want."
        sub="Gunite is the premium method for pools that last decades — and the only method that lets you choose every line, depth, and detail. A Silverline gunite pool is engineered around your yard, your lifestyle, and your design taste."
        emailCapture={{ submitLabel: "Get a gunite quote" }}
        secondaryLink={{ label: "Or see gunite pool projects", href: "/projects" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What you get"
        headline="Everything a Silverline gunite pool includes."
        italicWord="includes."
        sub="Premium structural, premium finish, premium equipment — and the same crew servicing it for life."
        columns={2}
        features={[
          {
            icon: "▢",
            title: "Custom shape & depth",
            body: "Any shape from a strict rectangle to a freeform with islands. Depth tuned to your needs — diving, lap, swim-up.",
          },
          {
            icon: "◆",
            title: "Premium finishes",
            body: "Plaster, Pebble Tec, glass bead, or custom aggregate. Tile and coping from a curated material library.",
          },
          {
            icon: "⚙",
            title: "Variable-speed equipment",
            body: "Pentair, Jandy, or Hayward VS pumps standard. Automation and LED lighting included on every Silverline build.",
          },
          {
            icon: "♨",
            title: "Spa integration",
            body: "Spillover spa, raised spa, or fully integrated — engineered as part of the pool from day one, not bolted on.",
          },
          {
            icon: "🜨",
            title: "Hardscape continuity",
            body: "Coping, decking, and surrounds designed in 3D alongside the pool. One project. One look.",
          },
          {
            icon: "★",
            title: "Lifetime craftsmanship support",
            body: "Structural and finish warranty plus our own workmanship promise. The crew that built it services it.",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="The build"
        headline="From excavation to first swim."
        italicWord="first"
        sub="The Silverline gunite sequence — 10 to 14 weeks, weather permitting, with weekly photo updates."
        steps={[
          {
            step: "01 · Dig & form",
            title: "Excavation, steel, plumbing",
            body: "Excavate to design, set rebar steel cage, install plumbing and electrical conduits, inspect.",
          },
          {
            step: "02 · Shoot & finish",
            title: "Gunite, tile, coping, plaster",
            body: "Pneumatically apply gunite. Cure. Set tile and coping. Apply final plaster or pebble finish.",
          },
          {
            step: "03 · Fill & start up",
            title: "Water, balance, walkthrough",
            body: "Fill with metered water, balance chemistry, prime equipment, full walkthrough with you on site.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Gunite owners"
        headline="What our gunite customers say."
        italicWord="customers"
        testimonials={[
          {
            quote:
              "Silverline did exactly what they said they'd do. The renderings matched the finished pool. The crew was clean, on time, and skilled.",
            name: "Placeholder Owner",
            role: "Gunite pool · Knoxville",
          },
          {
            quote:
              "The lifetime craftsmanship promise sold us. Two years in, they came back to redo a tile we damaged. No charge.",
            name: "Placeholder Owner",
            role: "Gunite pool · Sevierville",
          },
        ]}
      />

      <FAQ
        eyebrow="Gunite FAQ"
        headline="Gunite questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to our gunite team", href: "/consultation" }}
        items={[
          {
            question: "How long does a gunite pool take to build?",
            answer:
              "Ten to fourteen weeks from contract signing to first swim, weather permitting. We give you an exact calendar in the proposal and we hit it.",
          },
          {
            question: "What does a gunite pool cost in East Tennessee?",
            answer:
              "Most Silverline gunite pools land between $85,000 and $250,000+ depending on size, depth, finish, and integrated features like spas, water features, and infinity edges. We give a fixed line-item quote — no change-order traps.",
          },
          {
            question: "What's the difference between gunite and shotcrete?",
            answer:
              "Both are pneumatically applied concrete. We use the dry-mix gunite method for tighter quality control on the finish. Either way, it's a structural concrete pool that will outlast the warranty.",
          },
          {
            question: "Can you build on a sloped lot?",
            answer:
              "Yes. Sloped and lakefront lots are some of our most rewarding builds. We engineer retaining walls, drainage, and structural footings as part of the design phase.",
          },
        ]}
      />

      <CTABand
        eyebrow="Ready to build?"
        headline="A site walk, a rendering, a real number."
        italicWord="real"
        sub="60 minutes in your yard. A true-to-scale 3D rendering. A fixed quote with no surprises."
        emailCapture={{ submitLabel: "Schedule a site walk" }}
      />
    </>
  );
}
