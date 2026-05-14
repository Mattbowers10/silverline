import {
  Hero,
  FeatureList,
  Testimonials,
  FAQ,
  CTABand,
} from "@/components/sections";
import { HeroComposite } from "@/components/site/HeroComposite";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pool Service & Repair — Silverline Pools",
  description:
    "On-demand pool service and repair in East Tennessee — chemistry, equipment, leaks, openings, closings, and one-off work by the team that builds the best pools in the area.",
  path: "/services/service",
});

export default function ServicePage() {
  return (
    <>
      <Hero
        eyebrow="Pool service · On-demand"
        headline="A pool problem? One call."
        italicWord="One"
        sub="Equipment failures, chemistry issues, leaks, openings, closings, and one-off cleanups. The Silverline service team handles any pool in our area — even ones we didn't build."
        emailCapture={{ submitLabel: "Request service" }}
        secondaryLink={{ label: "Or see maintenance plans", href: "/services/maintenance" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="What we handle"
        headline="The full pool-service toolkit."
        italicWord="toolkit."
        columns={3}
        features={[
          {
            icon: "🧪",
            title: "Chemistry diagnosis",
            body: "Full water panel, balance, and a written report — no guesswork, no over-treating.",
          },
          {
            icon: "⚙",
            title: "Equipment repair",
            body: "Pumps, filters, heaters, salt cells, automation — diagnosed and repaired or replaced by certified techs.",
          },
          {
            icon: "💧",
            title: "Leak detection",
            body: "Pressure testing and dye testing to find structural and plumbing leaks before they cost you more.",
          },
          {
            icon: "🌸",
            title: "Spring openings",
            body: "Remove cover, prime equipment, balance water, equipment check. You come home to a swim-ready pool.",
          },
          {
            icon: "❄",
            title: "Winterizations",
            body: "Blow lines, set winter chemistry, install cover. Spring you'll thank us.",
          },
          {
            icon: "✦",
            title: "One-off cleanups",
            body: "Algae remediation, post-storm cleanup, drain-and-acid for stained plaster. Single visit or short series.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Service customers"
        headline="What service customers say."
        italicWord="customers"
        testimonials={[
          {
            quote:
              "Called Silverline about a heater that wouldn't fire. They had it diagnosed and a new control board on it within 24 hours.",
            name: "Placeholder Owner",
            role: "Service customer · Knoxville",
          },
          {
            quote:
              "Our pool was green from a vacation. They were on site the next morning and had it clear in 48 hours.",
            name: "Placeholder Owner",
            role: "Service customer · Farragut",
          },
        ]}
      />

      <FAQ
        eyebrow="Service FAQ"
        headline="Service questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Request service", href: "/consultation" }}
        items={[
          {
            question: "Do you service pools you didn't build?",
            answer:
              "Yes. We do an initial inspection before quoting work so you know what you're paying for.",
          },
          {
            question: "How fast can you get on site?",
            answer:
              "Most service requests inside our service area get a same-day or next-day visit. Emergency repairs are prioritized.",
          },
          {
            question: "What does a typical service call cost?",
            answer:
              "Service visits start around $150 for chemistry and inspection. Repairs are quoted before work begins.",
          },
          {
            question: "Do you carry parts?",
            answer:
              "Yes — common parts for Pentair, Jandy, and Hayward equipment. Specialty parts are typically next-day.",
          },
        ]}
      />

      <CTABand
        eyebrow="Need a tech today?"
        headline="Tell us what's wrong."
        italicWord="wrong."
        sub="A real tech replies within hours during the swim season. Off-season, same business day."
        emailCapture={{ submitLabel: "Request service" }}
      />
    </>
  );
}
