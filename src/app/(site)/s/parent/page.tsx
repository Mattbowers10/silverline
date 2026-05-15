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
import { listPosts, CATEGORY_LABEL, formatPubDate } from "@/lib/posts";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Silverline — Custom Homes, Pools, and Properties in East Tennessee",
  description:
    "Silverline builds custom luxury homes, custom pools, and manages East Tennessee properties. One team. One standard. 85+ years of combined craftsmanship.",
  path: "/",
});

/**
 * Parent home page — silverlineind.com
 *
 * Slash's 14 sections, mapped to Silverline. All copy and imagery here is
 * placeholder until the brand pass / photography drop lands. Each section
 * is a self-contained component; swap props as content is finalized.
 */
const PLACEHOLDER_POSTS = [
  {
    title: "Gunite vs. fiberglass: the East Tennessee answer (placeholder)",
    href: "/blog/gunite-vs-fiberglass",
    category: "Pools",
    publishedAt: "May 13, 2026",
    readingMinutes: 12,
  },
  {
    title: "Cost per square foot for custom homes in Knox County (placeholder)",
    href: "/blog/cost-per-sqft-knox",
    category: "Developments",
    publishedAt: "May 11, 2026",
    readingMinutes: 14,
  },
  {
    title: "Short-term rental yields by zip in 2026 (placeholder)",
    href: "/blog/str-yields-2026",
    category: "Properties",
    publishedAt: "May 9, 2026",
    readingMinutes: 9,
  },
  {
    title: "Pool maintenance schedules that actually work (placeholder)",
    href: "/blog/pool-maintenance-schedules",
    category: "Pools",
    publishedAt: "May 7, 2026",
    readingMinutes: 8,
  },
];

export default async function ParentHome() {
  // Pull the latest 4 published posts. Falls back to placeholders if none.
  const livePosts = await listPosts({ limit: 4 });
  const posts =
    livePosts.length > 0
      ? livePosts.map((p) => ({
          title: p.title,
          href: `/blog/${p.slug}`,
          category: CATEGORY_LABEL[p.category],
          publishedAt: formatPubDate(p.publishedAt),
          readingMinutes: p.readingMinutes,
          coverImage: p.coverImageUrl
            ? { src: p.coverImageUrl, alt: p.coverImageAlt ?? p.title }
            : undefined,
        }))
      : PLACEHOLDER_POSTS;

  return (
    <>
      <Hero
        eyebrow="A full-suite home developer · East Tennessee"
        headline="Built once. Built right."
        italicWord="once."
        sub="Custom homes, custom pools, and the East Tennessee properties that hold their value. One team. One standard."
        emailCapture={{
          placeholder: "What's your email?",
          submitLabel: "Request consultation",
        }}
        secondaryLink={{ label: "Or see our work", href: "/projects" }}
        heroSlot={<HeroComposite />}
        metric={{
          value: "85+",
          label: "years of combined craftsmanship across our team",
        }}
        logos={[
          { name: "Knox Chamber" },
          { name: "BBB A+" },
          { name: "NAHB" },
          { name: "Master Pools Guild" },
          { name: "ENERGY STAR" },
          { name: "Visa-licensed financing partners" },
        ]}
      />

      <ForWho
        eyebrow="Where Silverline builds"
        headline="From Knoxville to the lakes."
        italicWord="lakes."
        sub="Serving every major city inside a 90-minute radius of Knoxville. If your project is on this map, we can build it."
        cards={[
          { label: "Knoxville", sub: "Downtown + West Knox" },
          { label: "Farragut", sub: "Concord · Northshore" },
          { label: "Maryville", sub: "Blount County" },
          { label: "Sevierville", sub: "Pigeon Forge · Gatlinburg" },
          { label: "Oak Ridge", sub: "Anderson County" },
          { label: "Lenoir City", sub: "Tellico Village" },
          { label: "Loudon", sub: "Tellico Lake" },
          { label: "Crossville", sub: "Cumberland Plateau" },
        ]}
      />

      <DivisionCards
        eyebrow="One company. Three divisions."
        headline="A full-suite home developer."
        italicWord="full-suite"
        sub="Whether it's a single backyard pool or a multi-property STR portfolio, Silverline handles it end-to-end with one point of contact."
        cards={[
          {
            tag: "Pools",
            title: "Gunite, fiberglass, service & remodels.",
            body: "Custom-engineered pools backed by lifetime craftsmanship support and a maintenance team that knows your build inside out.",
            href: "https://pools.silverlineind.com",
            external: true,
          },
          {
            tag: "Developments",
            title: "Residential, commercial, and remodels.",
            body: "Ground-up custom homes, commercial builds, and remodels delivered by a single team from first sketch to final walkthrough.",
            href: "https://developments.silverlineind.com",
            external: true,
          },
          {
            tag: "Properties",
            title: "Real estate and STR management.",
            body: "Buy with the team that builds. Operate with the team that maintains. Silverline closes the loop on every property you own.",
            href: "https://properties.silverlineind.com",
            external: true,
          },
        ]}
      />

      <ProcessSteps
        eyebrow="Our discipline"
        headline="Built around your vision."
        italicWord="vision."
        sub="Every Silverline project follows the same disciplined sequence — designed to remove guesswork and keep you informed at every stage."
        steps={[
          {
            step: "01 · Design",
            title: "Discovery → renderings",
            body: "We meet on site, listen, and return with concept renderings, material boards, and a transparent budget.",
          },
          {
            step: "02 · Build",
            title: "One team, one schedule",
            body: "Our crews — not unknown subs — execute the build with weekly progress updates and a single point of contact.",
          },
          {
            step: "03 · Maintain",
            title: "Lifetime craftsmanship support",
            body: "Pools get a maintenance plan; homes get a warranty and a return visit. We don't disappear after handoff.",
          },
        ]}
      />

      <Testimonials
        eyebrow="Real owners. Real projects."
        headline="They trusted Silverline. So can you."
        italicWord="trusted"
        sub="Every name below is a real East Tennessee homeowner. Click through for the full story."
        testimonials={[
          {
            quote:
              "We interviewed five builders before choosing Silverline. The communication and craftsmanship were on another level.",
            name: "Placeholder Owner",
            role: "Custom home · Farragut",
          },
          {
            quote:
              "Our pool came in on time, on budget, and looks better than the renderings. Their service team has been just as good.",
            name: "Placeholder Owner",
            role: "Gunite pool · Knoxville",
          },
          {
            quote:
              "Silverline rebuilt our STR top to bottom and now manages it. Bookings doubled in our first season.",
            name: "Placeholder Owner",
            role: "STR remodel · Sevierville",
          },
        ]}
      />

      <MetricsRow
        eyebrow="The numbers"
        metrics={[
          { value: "85+", label: "years of combined experience" },
          { value: "100+", label: "completed projects" },
          { value: "4.9★", label: "across 100+ reviews" },
          { value: "30+", label: "East Tennessee cities served" },
        ]}
      />

      <ToolsGrid
        eyebrow="Free tools"
        headline="Plan before you build."
        italicWord="Plan"
        sub="Use our calculators to put a realistic number on your project before you ever pick up the phone."
        tools={[
          {
            name: "Pool cost estimator",
            description: "Gunite vs. fiberglass cost comparison, sized to your yard.",
            href: "https://pools.silverlineind.com/calculators/cost-estimator",
            badge: "Pools",
          },
          {
            name: "Home build estimator",
            description: "Cost-per-sqft estimator tuned to East Tennessee market data.",
            href: "https://developments.silverlineind.com/calculators/home-build",
            badge: "Developments",
          },
          {
            name: "STR ROI calculator",
            description: "Project rental income, occupancy, and net yield by zip.",
            href: "https://properties.silverlineind.com/calculators/str-roi",
            badge: "Properties",
          },
          {
            name: "Service-area lookup",
            description: "Check whether your address falls inside our 90-minute radius.",
            href: "/service-area",
          },
          {
            name: "Financing options",
            description: "Pre-vetted construction lenders and pool-financing partners.",
            href: "/financing",
          },
          {
            name: "Project planner",
            description: "Multi-step intake that drops directly into our pipeline.",
            href: "/consultation",
          },
        ]}
      />

      <WhyAccordion
        eyebrow="Why Silverline"
        headline="Built on standards, not shortcuts."
        italicWord="standards,"
        sub="Five reasons our clients choose Silverline over the cheaper option — and stay with us across multiple projects."
        items={[
          {
            title: "Licensed & insured in every division",
            body: "Pools, developments, and properties all carry their own licensing and insurance. Ask for our certificates anytime.",
          },
          {
            title: "85+ years of combined craftsmanship",
            body: "Our 10-person team carries the equivalent of nine careers of pool, construction, and real estate experience.",
          },
          {
            title: "Lifetime craftsmanship support",
            body: "We don't disappear at handoff. Every pool gets a maintenance plan; every home gets a warranty and a return visit.",
          },
          {
            title: "Local team, no anonymous subs",
            body: "The crew that bid your project is the crew that builds it. No surprise faces on site, ever.",
          },
          {
            title: "Single point of contact",
            body: "One project manager. One phone number. One inbox. From the first call through the final walkthrough.",
          },
        ]}
      />

      <HowWeWork
        eyebrow="From inquiry to handoff"
        headline="How we work."
        italicWord="work."
        sub="A predictable, four-step process — no surprises, no scope creep, no ghosting."
        steps={[
          {
            n: "01",
            title: "Discovery call",
            body: "30 minutes on the phone or on site. We listen, we ask, we take notes.",
          },
          {
            n: "02",
            title: "Design & proposal",
            body: "Renderings, scope, transparent budget, timeline. Signed before we lift a hammer.",
          },
          {
            n: "03",
            title: "Build",
            body: "One crew, one schedule, weekly updates. Photos to your inbox every Friday.",
          },
          {
            n: "04",
            title: "Handoff & maintain",
            body: "Final walkthrough, warranty, maintenance plan — and our number stays in your phone.",
          },
        ]}
      />

      <Partners
        headline="Trusted by partners across East Tennessee."
        logos={[
          { name: "Knoxville Chamber" },
          { name: "BBB A+" },
          { name: "NAHB" },
          { name: "Master Pools Guild" },
          { name: "ENERGY STAR" },
          { name: "Visa-Licensed Lenders" },
        ]}
      />

      <FAQ
        eyebrow="FAQ"
        headline="Common questions."
        italicWord="questions."
        ctaLink={{ label: "Contact our team", href: "/contact" }}
        items={[
          {
            question: "What's the minimum project size you'll take on?",
            answer:
              "On pools we'll handle service calls of any size. For new construction and remodels we typically start around $50,000.",
          },
          {
            question: "Do you build outside the Knoxville area?",
            answer:
              "We serve every major city inside a 90-minute drive of downtown Knoxville. If your address is on our service-area map, the answer is yes.",
          },
          {
            question: "What's a typical project timeline?",
            answer:
              "Custom pools run 8–14 weeks. Remodels run 6–16 weeks. Custom homes typically run 9–14 months. We give you a calendar on day one and update weekly.",
          },
          {
            question: "Do you offer financing?",
            answer:
              "We don't lend directly, but we maintain relationships with construction lenders and pool-financing partners who understand our work and our timelines.",
          },
          {
            question: "Will I work with the same person from start to finish?",
            answer:
              "Yes. One project manager owns your project from the discovery call to the final walkthrough. They know your details and they answer your phone.",
          },
          {
            question: "What separates Silverline from cheaper builders?",
            answer:
              "Our crews — not subs we've never met. Our materials — not the cheapest option that fits the spec. Our warranty — not the legal minimum.",
          },
        ]}
      />

      <RecentPosts
        eyebrow="The Deep End"
        headline="Modern building insights."
        italicWord="building"
        sub="Project breakdowns, cost guides, and East Tennessee market reporting from the Silverline team."
        posts={posts}
      />

      <ProjectGallery
        eyebrow="Recent work"
        headline="Our portfolio. Across every division."
        italicWord="portfolio."
        sub="Six recent Silverline projects — one click each for the full case study."
        projects={[
          {
            title: "Lakeside estate, Tellico Village",
            division: "developments",
            city: "Loudon",
            href: "/projects/tellico-estate",
          },
          {
            title: "Gunite pool & spa, Northshore",
            division: "pools",
            city: "Farragut",
            href: "/projects/northshore-pool",
          },
          {
            title: "Mountain rental remodel",
            division: "properties",
            city: "Sevierville",
            href: "/projects/sevier-str",
          },
          {
            title: "Commercial fit-out",
            division: "developments",
            city: "Knoxville",
            href: "/projects/west-knox-commercial",
          },
          {
            title: "Fiberglass pool install",
            division: "pools",
            city: "Maryville",
            href: "/projects/maryville-fiberglass",
          },
          {
            title: "STR portfolio onboarding",
            division: "properties",
            city: "Pigeon Forge",
            href: "/projects/pigeon-forge-portfolio",
          },
        ]}
      />

      <CTABand
        eyebrow="Tell us about your project"
        headline="Apply in less than 10 minutes."
        italicWord="10 minutes."
        sub="Three minutes to share your project. Twenty-four hours to a reply from a real person on our team."
        emailCapture={{ submitLabel: "Start consultation" }}
      />
    </>
  );
}
