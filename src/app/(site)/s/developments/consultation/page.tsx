import { ConsultationForm } from "@/components/lead/ConsultationForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Request a build consultation — Silverline Developments",
  description:
    "Schedule a 90-minute discovery visit with the Silverline build team. A written, fixed-scope proposal follows within two weeks.",
  path: "/consultation",
});

type Args = { searchParams: Promise<{ email?: string }> };

export default async function DevelopmentsConsultationPage({ searchParams }: Args) {
  const { email } = await searchParams;
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Build consultation
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            A few questions. Then we walk your{" "}
            <i className="font-display italic text-[var(--color-accent)]">lot.</i>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[length:var(--text-18)] text-[var(--color-muted)]">
            We reply to every build inquiry within one business day. A real Silverline
            project manager reads every word.
          </p>
        </header>
        <ConsultationForm
          source="consultation_developments"
          defaultDivision="developments"
          defaultEmail={email}
        />
      </div>
    </section>
  );
}
