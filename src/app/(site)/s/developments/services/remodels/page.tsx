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
  title: "Home Remodels — Silverline Developments",
  description:
    "Whole-home remodels, kitchens, primary suites, additions, and back-to-studs renovations in East Tennessee.",
  path: "/services/remodels",
});

export default function HomeRemodelsPage() {
  return (
    <>
      <Hero
        eyebrow="Developments · Home remodels"
        headline="Stay in place. Live better."
        italicWord="better."
        sub="Whole-home and selective remodels — kitchens, primaries, additions, and complete back-to-studs transformations. The Silverline remodel team handles every layer, with one project manager and a written schedule."
        emailCapture={{ submitLabel: "Get a remodel quote" }}
        secondaryLink={{ label: "Or see completed remodels", href: "/projects" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What we change"
        headline="Every layer of an existing home — refreshable."
        italicWord="refreshable."
        columns={3}
        features={[
          {
            icon: "🍳",
            title: "Kitchens",
            body: "Layout, cabinetry, counters, appliances, lighting. Often the highest-leverage remodel in the house.",
          },
          {
            icon: "🛏",
            title: "Primary suites",
            body: "Bedroom expansions, custom closets, spa baths. Resort-grade results without leaving home.",
          },
          {
            icon: "➕",
            title: "Additions",
            body: "Bump-outs, second-story additions, attached ADUs, garage conversions. Engineered to feel original.",
          },
          {
            icon: "🛁",
            title: "Bathrooms",
            body: "Wet-room remodels, walk-in showers, freestanding tubs, double vanities, heated floors.",
          },
          {
            icon: "⬚",
            title: "Whole-home",
            body: "Back-to-studs transformations of 1950s–1990s homes. New mechanicals, new finishes, often a new layout.",
          },
          {
            icon: "🏛",
            title: "Historic-sensitive",
            body: "Period-appropriate remodels of older Knoxville homes. We respect what makes them special.",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="The sequence"
        headline="From walk-through to done."
        italicWord="done."
        sub="The Silverline remodel sequence — 6 to 16 weeks typical, with weekly photo updates."
        steps={[
          {
            step: "01 · Plan",
            title: "Walk-through → scope → permits",
            body: "We walk your home with you, write a scope, pull permits, and present a line-item fixed budget.",
          },
          {
            step: "02 · Build",
            title: "Demo through finishes",
            body: "Controlled demolition, dust containment, daily clean-up. Mechanical and finish trades sequenced tight.",
          },
          {
            step: "03 · Warranty",
            title: "Walkthrough → keys back → return visits",
            body: "Final walkthrough, written warranty, return visits at 6 and 12 months. We don't disappear.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Remodel customers"
        headline="What our remodel customers say."
        italicWord="customers"
        testimonials={[
          {
            quote:
              "Silverline took a 1960s rancher and made it feel like a brand-new home. The communication and project management was the best we've ever seen.",
            name: "Placeholder Owner",
            role: "Whole-home remodel · Maryville",
          },
          {
            quote:
              "Our kitchen remodel came in on budget and four days early. They cleaned the site every single afternoon.",
            name: "Placeholder Owner",
            role: "Kitchen remodel · Knoxville",
          },
        ]}
      />

      <FAQ
        eyebrow="Remodel FAQ"
        headline="Remodel questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to our team", href: "/consultation" }}
        items={[
          {
            question: "How long does a remodel take?",
            answer:
              "Kitchen remodels typically run 6–10 weeks. Primary suite remodels 6–12 weeks. Whole-home remodels 12–24 weeks. Additions vary widely. We provide an exact calendar in the proposal.",
          },
          {
            question: "What does a remodel cost in this market?",
            answer:
              "Kitchen remodels typically start around $65K and rise with cabinetry, appliance, and layout complexity. Primary suites start around $50K. Whole-home remodels are scope-dependent — the proposal is fully line-item.",
          },
          {
            question: "Can we stay in the home during the remodel?",
            answer:
              "For selective remodels (kitchen, bath, addition), usually yes — we phase work and contain dust to live around. For whole-home remodels, you'll likely want to relocate during the heaviest weeks.",
          },
          {
            question: "Do you handle permits and HOA approval?",
            answer:
              "Yes — permits, inspections, and HOA submittals are part of our scope.",
          },
        ]}
      />

      <CTABand
        eyebrow="Remodel done right"
        headline="Tell us about your home."
        italicWord="home."
        sub="A walk-through visit, then a line-item proposal within two weeks. The team that quotes it will build it."
        emailCapture={{ submitLabel: "Schedule a walk-through" }}
      />
    </>
  );
}
