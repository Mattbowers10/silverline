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
  title: "Pool Remodels & Upgrades — Silverline Pools",
  description:
    "Replaster, retile, re-equip, and reshape — Silverline brings tired East Tennessee pools back to resort condition.",
  path: "/services/remodels",
});

export default function RemodelsPage() {
  return (
    <>
      <Hero
        eyebrow="Pool service · Remodels & upgrades"
        headline="Bring it back to new."
        italicWord="new."
        sub="A Silverline pool remodel takes a tired finish, dated tile, or failing equipment and brings it back to resort condition — often in a single off-season."
        emailCapture={{ submitLabel: "Get a remodel quote" }}
        secondaryLink={{ label: "Or see remodel projects", href: "/projects" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What we change"
        headline="Every layer of an existing pool — refreshable."
        italicWord="refreshable."
        columns={3}
        features={[
          {
            icon: "✦",
            title: "Replaster / repebble",
            body: "Strip and refinish with new plaster, Pebble Tec, glass bead, or custom aggregate. The single biggest visual upgrade.",
          },
          {
            icon: "▦",
            title: "Tile & coping",
            body: "New waterline tile and coping. Modern materials, premium grout, and a clean install line.",
          },
          {
            icon: "⚙",
            title: "Equipment upgrade",
            body: "Variable-speed pumps, salt systems, heaters, automation. Cut energy use and chemical cost.",
          },
          {
            icon: "💡",
            title: "Lighting & water features",
            body: "Color-changing LED lights, bubblers, scuppers, spillover spas — added or replaced.",
          },
          {
            icon: "🜨",
            title: "Decking & hardscape",
            body: "Tear up and replace concrete decking with stamped concrete, travertine, pavers, or stone.",
          },
          {
            icon: "↺",
            title: "Reshape & add",
            body: "Convert a rectangle to a freeform, add a spa, deepen for diving, or extend a sun shelf.",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="The remodel sequence"
        headline="From assessment to done."
        italicWord="done."
        sub="Most Silverline pool remodels finish inside a single off-season. Here's the path."
        steps={[
          {
            step: "01 · Assess",
            title: "Inspection + scope",
            body: "We drain or partially drain, inspect, and document. You get a written scope and fixed quote.",
          },
          {
            step: "02 · Strip & rebuild",
            title: "Tear-out and re-finish",
            body: "Demolition where needed, prep, then re-tile, re-coping, re-plaster, equipment changeout.",
          },
          {
            step: "03 · Refill & start up",
            title: "Water and walkthrough",
            body: "Refill with metered water, balance chemistry, prime new equipment, full walkthrough.",
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
              "Our pool was 20 years old and showing it. Silverline brought it back to looking newer than the day it was built.",
            name: "Placeholder Owner",
            role: "Replaster + retile · Knoxville",
          },
          {
            quote:
              "We added a spillover spa and replaced all the equipment. The pool feels like a brand-new build for a fraction of the cost.",
            name: "Placeholder Owner",
            role: "Spa addition + equipment · Maryville",
          },
        ]}
      />

      <FAQ
        eyebrow="Remodel FAQ"
        headline="Remodel questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to our remodel team", href: "/consultation" }}
        items={[
          {
            question: "How long does a pool remodel take?",
            answer:
              "Most plaster + tile remodels run 3–5 weeks. Larger jobs with new decking or shape changes typically run 5–8 weeks.",
          },
          {
            question: "What does a remodel cost?",
            answer:
              "A standard replaster + retile in our market typically lands between $18,000 and $35,000. Adding new equipment, decking, or shape changes scales from there.",
          },
          {
            question: "When's the best time to remodel?",
            answer:
              "Late fall through early spring — between swim seasons. We schedule the bulk of remodel work October through March.",
          },
          {
            question: "Can you remodel a pool you didn't build?",
            answer:
              "Yes. The majority of our remodels are pools we didn't originally build. We inspect first, then quote.",
          },
        ]}
      />

      <CTABand
        eyebrow="Don't replace it. Renew it."
        headline="Tell us about your pool."
        italicWord="pool."
        sub="A 30-minute inspection. A written scope. A fixed quote. The remodel can typically start within weeks."
        emailCapture={{ submitLabel: "Schedule an inspection" }}
      />
    </>
  );
}
