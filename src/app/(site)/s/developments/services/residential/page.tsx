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
  title: "Custom Home Construction — Silverline Developments",
  description:
    "Ground-up custom homes in East Tennessee. Design-build under one roof. Lakeside, mountain, urban, and in-town custom residential builds.",
  path: "/services/residential",
});

export default function ResidentialPage() {
  return (
    <>
      <Hero
        eyebrow="Developments · Residential"
        headline="A home built around you."
        italicWord="you."
        sub="Custom homes from dirt up — designed and built by one Silverline team. Lakeside, mountain, urban, or in town. One project manager. One schedule. One written warranty."
        emailCapture={{ submitLabel: "Start your custom home" }}
        secondaryLink={{ label: "Or see completed homes", href: "/projects" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What you get"
        headline="Every Silverline custom home includes:"
        italicWord="Every"
        columns={2}
        features={[
          {
            icon: "✎",
            title: "Architectural design",
            body: "We work with our architectural partner from concept through construction drawings. Or we build to plans you bring.",
          },
          {
            icon: "▢",
            title: "Site engineering",
            body: "Lot survey, grading plan, foundation engineering, septic/sewer, well/water service. Handled by our team, not punted to you.",
          },
          {
            icon: "⌂",
            title: "Construction",
            body: "Foundation, framing, mechanical, finishes, landscape integration. One crew. One schedule.",
          },
          {
            icon: "⚙",
            title: "Mechanical systems",
            body: "HVAC, plumbing, electrical, smart-home wiring. Designed for efficiency (most builds RESNET HERS-rated).",
          },
          {
            icon: "✦",
            title: "Finish selections",
            body: "Curated material library, sample boards, on-site mock-ups. We narrow your choices, you make the call.",
          },
          {
            icon: "★",
            title: "Warranty + return visits",
            body: "Written 1-year workmanship warranty. Return walkthroughs at 6 and 12 months. We fix anything we missed.",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="The build"
        headline="From discovery to keys."
        italicWord="keys."
        sub="The Silverline custom-home sequence — 9 to 14 months, fully documented and visible to you the entire way."
        steps={[
          {
            step: "01 · Design",
            title: "Discovery → drawings → permits",
            body: "Lot walk, programming, concept, construction drawings, permits. You sign a fixed-scope agreement before construction.",
          },
          {
            step: "02 · Build",
            title: "Foundation through punch list",
            body: "Weekly photo updates, Friday status emails, one project manager. Predictable schedule, no surprises.",
          },
          {
            step: "03 · Warranty",
            title: "Walkthrough → keys → returning",
            body: "Final walkthrough, written warranty, return visits at 6 and 12 months. We maintain what we built.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Custom-home owners"
        headline="What our residential customers say."
        italicWord="customers"
        testimonials={[
          {
            quote:
              "We interviewed five builders. Silverline was the only one who walked the lot before quoting. They were also the only ones we'd hire again.",
            name: "Placeholder Owner",
            role: "Lakeside custom · Loudon",
          },
          {
            quote:
              "Our project manager answered every question, every week, on time. The build itself was the easiest hard thing we've ever done.",
            name: "Placeholder Owner",
            role: "West Knox custom · Farragut",
          },
        ]}
      />

      <FAQ
        eyebrow="Residential FAQ"
        headline="Custom-home questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to our team", href: "/consultation" }}
        items={[
          {
            question: "How long does a custom home take?",
            answer:
              "Most Silverline custom homes run 9–14 months from contract to keys — including the design phase. Complex lakeside or mountain builds can run longer. We give you an exact calendar in the proposal.",
          },
          {
            question: "What does a custom home cost in East Tennessee?",
            answer:
              "Custom homes typically start around $325/sqft and rise with lot complexity, finish level, and structural ambition (lakefront, mountain ridge, basement, etc.). The proposal is fully line-item with no vague allowances.",
          },
          {
            question: "Do I need to bring my own architect?",
            answer:
              "No — Silverline runs a design-build model with an in-house architectural partner. If you already have plans, we'll build to them. If you don't, we'll design with you.",
          },
          {
            question: "How are change orders handled?",
            answer:
              "Up front, we lock scope in a line-item contract. Any change you ask for is quoted in writing before we proceed. You never see surprise invoices at handoff.",
          },
        ]}
      />

      <CTABand
        eyebrow="Build it once. Build it right."
        headline="Tell us about your home."
        italicWord="home."
        sub="A 90-minute discovery visit on your lot. A written proposal within two weeks. The team that designs it will build it."
        emailCapture={{ submitLabel: "Schedule discovery visit" }}
      />
    </>
  );
}
