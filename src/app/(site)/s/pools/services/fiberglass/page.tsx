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
  title: "Fiberglass Pool Installation — Silverline Pools",
  description:
    "Pre-engineered fiberglass pools installed in weeks, not months. Lower maintenance, faster cure, and the same Silverline craftsmanship.",
  path: "/services/fiberglass",
});

export default function FiberglassPage() {
  return (
    <>
      <Hero
        eyebrow="Pool service · Fiberglass installation"
        headline="Swim by summer."
        italicWord="summer."
        sub="A fiberglass pool is the fastest path from contract to first swim. Three to six weeks, lower lifetime maintenance, and a smooth gel-coat finish that's easier on feet and chemistry. Engineered shells from premium U.S. manufacturers, installed by the same crew that handles our gunite builds."
        emailCapture={{ submitLabel: "Get a fiberglass quote" }}
        secondaryLink={{ label: "Browse fiberglass shapes", href: "/projects" }}
        heroSlot={<HeroComposite />}
      />

      <FeatureList
        eyebrow="Why fiberglass"
        headline="Faster, smoother, easier to live with."
        italicWord="easier"
        columns={3}
        features={[
          {
            icon: "⏱",
            title: "3–6 week install",
            body: "Pre-engineered shell, fast site prep. We can usually have you swimming before the season ends.",
          },
          {
            icon: "✦",
            title: "Smooth gel-coat finish",
            body: "Non-porous surface. Easier on feet, easier on chemistry, no plaster repair cycles.",
          },
          {
            icon: "🜔",
            title: "Lower chemical use",
            body: "Less acid, less chlorine, less algae. Owners report ~30% lower chemical costs vs. gunite.",
          },
          {
            icon: "⚙",
            title: "Premium equipment",
            body: "Same VS pump and automation package as our gunite builds. No equipment downgrade.",
          },
          {
            icon: "⬡",
            title: "Curated shape library",
            body: "We work with a curated set of premium U.S. manufacturers. Dozens of shapes and sizes.",
          },
          {
            icon: "★",
            title: "Lifetime craftsmanship support",
            body: "Structural and gel-coat warranties from the manufacturer, plus our own workmanship promise.",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="The install"
        headline="From dig to first swim."
        italicWord="first"
        sub="The Silverline fiberglass sequence — 3 to 6 weeks, weather permitting, with daily photos on excavation days."
        steps={[
          {
            step: "01 · Dig & set",
            title: "Excavate and place shell",
            body: "Excavate to spec, build base, set the fiberglass shell to design elevation, anchor, level.",
          },
          {
            step: "02 · Plumb & deck",
            title: "Equipment, plumbing, decking",
            body: "Install equipment pad, plumbing, electrical, and the surrounding decking and coping.",
          },
          {
            step: "03 · Fill & start up",
            title: "Water, balance, walkthrough",
            body: "Fill, balance chemistry, prime equipment, full walkthrough on site with you.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Fiberglass owners"
        headline="What our fiberglass customers say."
        italicWord="customers"
        testimonials={[
          {
            quote:
              "Fiberglass was the right call for our timeline. Silverline had it in the ground in three weeks — and the crew was meticulous.",
            name: "Placeholder Owner",
            role: "Fiberglass pool · Maryville",
          },
          {
            quote:
              "Two summers in and we love it. Easier on the chemistry, easier on the feet, and the install was uneventful.",
            name: "Placeholder Owner",
            role: "Fiberglass pool · Oak Ridge",
          },
        ]}
      />

      <FAQ
        eyebrow="Fiberglass FAQ"
        headline="Fiberglass questions, answered."
        italicWord="answered."
        ctaLink={{ label: "Talk to our pool team", href: "/consultation" }}
        items={[
          {
            question: "How long does a fiberglass pool last?",
            answer:
              "Premium gel-coat shells routinely last 25+ years with proper maintenance. Most manufacturers we work with offer 25-year structural and 10–15 year gel-coat warranties.",
          },
          {
            question: "What does a fiberglass pool cost?",
            answer:
              "Most Silverline fiberglass installs land between $60,000 and $120,000 fully installed with decking and equipment. Pricing varies by shape, size, and finishes.",
          },
          {
            question: "Is fiberglass less customizable than gunite?",
            answer:
              "Yes — fiberglass is selected from a shape catalog, not custom-poured. But the catalog is large, and you can integrate spas, water features, sun shelves, and benches. We'll walk you through both options before you choose.",
          },
          {
            question: "Can you install on a sloped lot?",
            answer:
              "Yes, but the structural and retaining requirements may shift the cost calculus toward gunite. We'll model both during the proposal phase.",
          },
        ]}
      />

      <CTABand
        eyebrow="Faster builds. Same standards."
        headline="Tell us about your yard."
        italicWord="yard."
        sub="Schedule a site walk and we'll model both gunite and fiberglass for your space — so you can choose with real numbers in front of you."
        emailCapture={{ submitLabel: "Schedule a site walk" }}
      />
    </>
  );
}
