import { ConsultationForm } from "@/components/lead/ConsultationForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a pool consultation — Silverline Pools",
  description:
    "Schedule a 60-minute site walk with the Silverline pool team. A 3D rendering and a fixed quote follow within days.",
  path: "/consultation",
});

type Args = { searchParams: Promise<{ email?: string }> };

export default async function PoolsConsultationPage({ searchParams }: Args) {
  const { email } = await searchParams;
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Pool consultation
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            A few questions. Then we walk your{" "}
            <i className="font-display italic text-[var(--color-accent)]">yard.</i>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[length:var(--text-18)] text-[var(--color-muted)]">
            We reply to every pool inquiry within one business day. A real Silverline pool
            project manager reads every word.
          </p>
        </header>
        <ConsultationForm
          source="consultation_pools"
          defaultDivision="pools"
          defaultEmail={email}
        />
      </div>
    </section>
  );
}
