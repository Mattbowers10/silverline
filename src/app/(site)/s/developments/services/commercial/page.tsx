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
  title: "Commercial Construction — Silverline Developments",
  description:
    "Commercial fit-outs and ground-up builds in East Tennessee — retail, restaurants, offices, and mixed-use. Disciplined scheduling, fixed scope, weekly status.",
  path: "/services/commercial",
});

export default function CommercialPage() {
  return (
    <>
      <Hero
        eyebrow="Developments · Commercial"
        headline="Open on time. Stay open."
        italicWord="on time."
        sub="Commercial fit-outs and ground-up builds for East Tennessee operators who care about the long-term result. Restaurants, retail, offices, and mixed-use — finished on schedule and built to outlast the lease."
        emailCapture={{ submitLabel: "Get a commercial quote" }}
        secondaryLink={{ label: "Or see commercial builds", href: "/projects" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What we handle"
        headline="Commercial work, end to end."
        italicWord="end"
        columns={3}
        features={[
          {
            icon: "🍽",
            title: "Restaurants",
            body: "Front-of-house, back-of-house, hood systems, walk-ins. We've delivered downtown Knox restaurants on schedule for opening night.",
          },
          {
            icon: "🛍",
            title: "Retail",
            body: "Storefronts, fixtures, lighting design. We build for high-foot-traffic durability and brand alignment.",
          },
          {
            icon: "🏢",
            title: "Office fit-outs",
            body: "From single-tenant offices to multi-floor renovations. Conference rooms, IT closets, acoustic treatments.",
          },
          {
            icon: "🏠",
            title: "Mixed-use",
            body: "Ground-floor retail with residential above. We handle the complexity so you only have one number to call.",
          },
          {
            icon: "📐",
            title: "Permitting + code",
            body: "ADA, fire, health-department, and life-safety reviews handled by our team — not punted to your architect.",
          },
          {
            icon: "⏱",
            title: "Schedule discipline",
            body: "Weekly status calls with you, your designer, and your operator. Critical-path scheduling, not Gantt-chart theater.",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="The sequence"
        headline="From lease signing to open night."
        italicWord="open"
        sub="The Silverline commercial sequence — 3 to 6 months on most fit-outs, fully documented and accountable."
        steps={[
          {
            step: "01 · Plan",
            title: "Design coordination + permits",
            body: "We coordinate with your designer, run permit packages, and produce a fixed-scope budget and calendar.",
          },
          {
            step: "02 · Build",
            title: "Demo through punch list",
            body: "Disciplined trade sequencing, weekly status reviews with all stakeholders, photo updates.",
          },
          {
            step: "03 · Open",
            title: "Final inspection → opening night",
            body: "We coordinate health, fire, and ADA inspections. Punch list cleared the week before opening.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Commercial owners"
        headline="What operators say."
        italicWord="operators"
        testimonials={[
          {
            quote:
              "Our commercial fit-out came in three weeks ahead of schedule. The crew was professional and clean from day one.",
            name: "Placeholder Operator",
            role: "Restaurant · Downtown Knoxville",
          },
          {
            quote:
              "The communication was the best we've had on any commercial project. Status calls every Friday, photos every day.",
            name: "Placeholder Operator",
            role: "Office fit-out · West Knox",
          },
        ]}
      />

      <FAQ
        eyebrow="Commercial FAQ"
        headline="Commercial questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to our team", href: "/consultation" }}
        items={[
          {
            question: "What types of commercial projects do you take on?",
            answer:
              "Restaurants, retail, offices, medical, and mixed-use. Both fit-outs (in existing shells) and ground-up. We've delivered hood systems, walk-ins, ADA bathrooms, and storefronts.",
          },
          {
            question: "How fast can you start?",
            answer:
              "Most commercial projects can break ground within 2–4 weeks of contract signing, assuming permits are in hand or close. We can run permitting in parallel with mobilization.",
          },
          {
            question: "Do you carry commercial bonding and insurance?",
            answer:
              "Yes — commercial general liability, builder's risk, and bond capacity for the scope we typically take on. Certificates available on request.",
          },
          {
            question: "Can you build outside Knoxville?",
            answer:
              "Yes — we work across the 90-minute East Tennessee service area. We've delivered commercial projects from Sevierville to Crossville to Maryville.",
          },
        ]}
      />

      <CTABand
        eyebrow="Opening soon?"
        headline="Let's get you open on time."
        italicWord="on time."
        sub="A site visit and a fixed-scope proposal within 10 business days. We move at the speed your lease demands."
        emailCapture={{ submitLabel: "Schedule a site visit" }}
      />
    </>
  );
}
