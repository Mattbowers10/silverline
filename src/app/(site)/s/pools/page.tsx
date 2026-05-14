import {
  Hero,
  ForWho,
  DivisionCards,
  ProcessSteps,
  Testimonials,
  MetricsRow,
  ToolsGrid,
  WhyAccordion,
  HowWeWork,
  Partners,
  FAQ,
  RecentPosts,
  ProjectGallery,
  CTABand,
} from "@/components/sections";
import { HeroComposite } from "@/components/site/HeroComposite";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Silverline Pools — Gunite, Fiberglass & Service in East Tennessee",
  description:
    "Custom gunite and fiberglass pools, service, and maintenance across East Tennessee. Designed to outlast the season — built once, built right.",
  path: "/",
});

export default function PoolsHome() {
  return (
    <>
      <Hero
        eyebrow="Silverline Pools · Knoxville & East Tennessee"
        headline="Built to outlast the season."
        italicWord="outlast"
        sub="Custom gunite and fiberglass pools designed and built by the most experienced pool team in East Tennessee — and serviced by the same crew long after handoff."
        emailCapture={{
          placeholder: "What's your email?",
          submitLabel: "Get a pool quote",
        }}
        secondaryLink={{ label: "Or browse our pool projects", href: "/projects" }}
        heroSlot={<HeroComposite />}
        metric={{
          value: "4M+",
          label: "gallons of pool water built and maintained across our portfolio",
        }}
        logos={[
          { name: "Master Pools Guild" },
          { name: "APSP-Certified" },
          { name: "Pentair Pro" },
          { name: "Jandy Pro" },
          { name: "BBB A+" },
          { name: "ENERGY STAR" },
        ]}
      />

      <ForWho
        eyebrow="Pool styles"
        headline="From classic to contemporary."
        italicWord="contemporary."
        sub="Every Silverline pool starts with your yard, your style, and your budget. Here are the shapes we build most often."
        cards={[
          { label: "Classic rectangle", sub: "Clean lines, swim lanes" },
          { label: "Freeform", sub: "Organic, natural-edge" },
          { label: "L-shape", sub: "Yard-friendly footprint" },
          { label: "Infinity edge", sub: "Lakefront views" },
          { label: "Plunge pool", sub: "Small lots, big impact" },
          { label: "Spa-integrated", sub: "Pool + spillover spa" },
          { label: "Lap pool", sub: "Performance + design" },
          { label: "Beach entry", sub: "Resort-style entry" },
        ]}
      />

      <DivisionCards
        eyebrow="Our pool services"
        headline="One pool team. Five services."
        italicWord="five"
        sub="Whether you're building a new pool or keeping an existing one in resort shape, the same Silverline pool crew handles it end-to-end."
        cards={[
          {
            tag: "Gunite",
            title: "Custom shotcrete pools.",
            body: "The premium structural method for pools that last decades. Fully customizable shape, depth, and finish.",
            href: "/services/gunite",
            placeholderKind: "pool",
          },
          {
            tag: "Fiberglass",
            title: "Faster install, lower maintenance.",
            body: "Pre-engineered shells installed in weeks rather than months — for owners who want the build done before summer.",
            href: "/services/fiberglass",
            placeholderKind: "pool",
          },
          {
            tag: "Service & maintenance",
            title: "Crystal-clear, year-round.",
            body: "Weekly, biweekly, and on-demand service plans handled by the same team that builds the best pools in East Tennessee.",
            href: "/services/maintenance",
            placeholderKind: "pool",
          },
        ]}
      />

      <ProcessSteps
        eyebrow="How a Silverline pool gets built"
        headline="Six weeks. One crew. No surprises."
        italicWord="surprises."
        sub="The Silverline pool construction sequence — disciplined, scheduled, and visible to you the entire way."
        steps={[
          {
            step: "01 · Design",
            title: "Site visit + 3D rendering",
            body: "We walk your yard, photograph the elevation, and return with a true-to-scale 3D rendering before you sign anything.",
          },
          {
            step: "02 · Build",
            title: "Excavation through plaster",
            body: "Excavation, steel, plumbing, electrical, gunite, tile, coping, and plaster — by one crew on a single schedule.",
          },
          {
            step: "03 · Maintain",
            title: "Lifetime craftsmanship support",
            body: "The crew that built your pool maintains it. A maintenance plan starts the day we hand over the keys.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Real pool owners. Real builds."
        headline="They trusted us with their backyard."
        italicWord="trusted"
        sub="A few of the 50+ pool owners across East Tennessee who chose Silverline."
        testimonials={[
          {
            quote:
              "Our pool came in on time, on budget, and looks better than the renderings. Their service team has been just as good.",
            name: "Placeholder Owner",
            role: "Gunite pool · Knoxville",
          },
          {
            quote:
              "We interviewed three pool builders before choosing Silverline. They were the only ones who actually walked the yard.",
            name: "Placeholder Owner",
            role: "Freeform pool · Farragut",
          },
          {
            quote:
              "Fiberglass was the right call for our timeline. Silverline had it in the ground in three weeks — and the crew was meticulous.",
            name: "Placeholder Owner",
            role: "Fiberglass pool · Maryville",
          },
        ]}
      />

      <MetricsRow
        eyebrow="The pool division"
        metrics={[
          { value: "50+", label: "pools built in East Tennessee" },
          { value: "4M+", label: "gallons under maintenance" },
          { value: "4.9★", label: "across pool reviews" },
          { value: "12 wks", label: "typical gunite build window" },
        ]}
      />

      <ToolsGrid
        eyebrow="Free pool tools"
        headline="Plan before you dig."
        italicWord="dig."
        sub="Use our calculators to put a realistic number on your pool project before the first phone call."
        tools={[
          {
            name: "Gunite vs. fiberglass cost estimator",
            description: "Compare both methods, sized to your yard and finish.",
            href: "/calculators/cost-estimator",
            badge: "Pools",
          },
          {
            name: "Pool maintenance plan estimator",
            description: "Weekly, biweekly, or on-demand — see your annual cost.",
            href: "/calculators/maintenance-plan",
            badge: "Service",
          },
          {
            name: "Service-area lookup",
            description: "Check whether your address falls inside our 90-minute radius.",
            href: "https://silverlineind.com/service-area",
          },
        ]}
      />

      <WhyAccordion
        eyebrow="Why Silverline Pools"
        headline="Engineered to outlast the warranty."
        italicWord="outlast"
        sub="What separates a Silverline pool from a cheaper build — and why our service customers stay for years."
        items={[
          {
            title: "Master Pools Guild–trained crew",
            body: "Our lead builders carry MPG and APSP certifications. Most regional builders can't claim either.",
          },
          {
            title: "Same crew builds and services your pool",
            body: "The team that pours your gunite is the same team that opens it each spring. No handoff, no learning curve.",
          },
          {
            title: "Lifetime craftsmanship support",
            body: "If a tile we set ever pops, we replace it. If our plaster fails the workmanship standard, we re-plaster.",
          },
          {
            title: "Premium equipment, not the cheapest spec",
            body: "Pentair, Jandy, and Hayward variable-speed pumps standard. We don't bid against the lowest equipment.",
          },
          {
            title: "Single point of contact, start to finish",
            body: "One project manager. One phone number. From the site walk to the maintenance plan.",
          },
        ]}
      />

      <HowWeWork
        eyebrow="From inquiry to first swim"
        headline="How a Silverline pool gets started."
        italicWord="started."
        sub="A predictable, four-step path from your first email to your first swim."
        steps={[
          {
            n: "01",
            title: "Site visit",
            body: "60 minutes in your yard. We listen, photograph, measure, and discuss budget honestly.",
          },
          {
            n: "02",
            title: "3D design + proposal",
            body: "True-to-scale 3D rendering, finish samples, transparent line-item budget, and a calendar.",
          },
          {
            n: "03",
            title: "Build",
            body: "Excavation through plaster. Weekly photo updates. One crew, one schedule, no surprises.",
          },
          {
            n: "04",
            title: "Open & maintain",
            body: "We fill, balance, and hand over a pool ready to swim — and a maintenance plan if you want one.",
          },
        ]}
      />

      <Partners
        headline="Built with the brands the pool industry trusts most."
        logos={[
          { name: "Pentair" },
          { name: "Jandy" },
          { name: "Hayward" },
          { name: "Master Pools Guild" },
          { name: "APSP" },
          { name: "BBB A+" },
        ]}
      />

      <FAQ
        eyebrow="Pool FAQ"
        headline="What pool owners ask us."
        italicWord="ask"
        ctaLink={{ label: "Talk to our pool team", href: "/consultation" }}
        items={[
          {
            question: "Gunite or fiberglass — which is right for my yard?",
            answer:
              "Gunite for any custom shape, depth, or finish. Fiberglass for a faster install and lower maintenance over time. Most yards can accept either — we'll walk you through both before you choose.",
          },
          {
            question: "How long does a pool build take from contract to first swim?",
            answer:
              "Gunite typically runs 10–14 weeks weather permitting. Fiberglass typically runs 3–6 weeks. We give you an exact calendar in the proposal.",
          },
          {
            question: "What does a Silverline pool cost?",
            answer:
              "Gunite pools in our market start around $85K and rise with size, finish, and features (spa, infinity edge, water features). Fiberglass starts around $60K. Both numbers include everything required to swim — no surprise change orders.",
          },
          {
            question: "Do you service pools you didn't build?",
            answer:
              "Yes. Our weekly, biweekly, and on-demand service plans accept any pool in our service area. We'll do an initial inspection before quoting a plan.",
          },
          {
            question: "Do you offer pool financing?",
            answer:
              "We don't lend directly. We work with pool-financing partners who understand our timelines and can pre-qualify you in 24 hours.",
          },
          {
            question: "Is there a warranty?",
            answer:
              "Yes — structural and finish warranties on the build, equipment warranties from the manufacturers, and our own lifetime craftsmanship promise on workmanship.",
          },
        ]}
      />

      <RecentPosts
        eyebrow="The Deep End — pools"
        headline="What pool owners read first."
        italicWord="first."
        sub="Build guides, cost breakdowns, and maintenance playbooks from the Silverline pool team."
        viewAllHref="https://silverlineind.com/blog?category=pools"
        posts={[
          {
            title: "Gunite vs. fiberglass: the East Tennessee answer (placeholder)",
            href: "https://silverlineind.com/blog/gunite-vs-fiberglass",
            category: "Pools",
            publishedAt: "May 13, 2026",
            readingMinutes: 12,
          },
          {
            title: "Pool maintenance schedules that actually work (placeholder)",
            href: "https://silverlineind.com/blog/pool-maintenance-schedules",
            category: "Pools",
            publishedAt: "May 7, 2026",
            readingMinutes: 8,
          },
          {
            title: "How big should your pool actually be? (placeholder)",
            href: "https://silverlineind.com/blog/pool-sizing-guide",
            category: "Pools",
            publishedAt: "May 5, 2026",
            readingMinutes: 10,
          },
          {
            title: "Variable-speed pumps: the one upgrade we always recommend (placeholder)",
            href: "https://silverlineind.com/blog/variable-speed-pumps",
            category: "Pools",
            publishedAt: "May 2, 2026",
            readingMinutes: 7,
          },
        ]}
      />

      <ProjectGallery
        eyebrow="Recent pool builds"
        headline="Our pool portfolio."
        italicWord="pool"
        sub="Six recent Silverline pools — one click each for the build story, materials, and final shots."
        viewAllHref="/projects"
        projects={[
          {
            title: "Gunite pool & spa, Northshore",
            division: "pools",
            city: "Farragut",
            href: "/projects/northshore-pool",
          },
          {
            title: "Freeform with infinity edge",
            division: "pools",
            city: "Loudon",
            href: "/projects/loudon-infinity",
          },
          {
            title: "Fiberglass pool install",
            division: "pools",
            city: "Maryville",
            href: "/projects/maryville-fiberglass",
          },
          {
            title: "Plunge pool, downtown lot",
            division: "pools",
            city: "Knoxville",
            href: "/projects/knox-plunge",
          },
          {
            title: "Beach entry with spillover spa",
            division: "pools",
            city: "Sevierville",
            href: "/projects/sevier-beach-entry",
          },
          {
            title: "Lap pool with stone coping",
            division: "pools",
            city: "Oak Ridge",
            href: "/projects/oak-ridge-lap",
          },
        ]}
      />

      <CTABand
        eyebrow="Ready to start your pool?"
        headline="Tell us about your yard."
        italicWord="yard."
        sub="A 60-minute site walk and a 3D rendering on us. The crew that builds your pool will be the one walking it with you."
        emailCapture={{ submitLabel: "Schedule site walk" }}
      />
    </>
  );
}
