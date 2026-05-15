import Link from "next/link";
import { CalendlyEmbed } from "@/components/lead/CalendlyEmbed";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach the Silverline team. Project inquiries, press, careers, and general questions.",
  path: "/contact",
});

export default function ContactPage() {
  const calendly = process.env.NEXT_PUBLIC_CALENDLY_URL;
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Contact
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            Tell us about your{" "}
            <i className="font-display italic text-[var(--color-accent)]">project.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Real humans on the other end. Most consultation requests get a reply within a
            single business day. Prefer to schedule yourself? Pick a time below.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <DetailBlock
              label="General"
              email="hello@silverlineind.com"
              note="Project inquiries, partnerships, anything else."
            />
            <DetailBlock
              label="Press"
              email="press@silverlineind.com"
              note="Interviews, brand assets, story pitches."
            />
            <DetailBlock
              label="Careers"
              email="careers@silverlineind.com"
              note="Open roles and résumés."
            />
            <div className="card-highlight rounded-2xl border border-[var(--color-line)] p-6">
              <p className="mb-3 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Prefer a form?
              </p>
              <p className="text-[length:var(--text-15)] text-[var(--color-text)]/85">
                The full consultation intake takes about three minutes.
              </p>
              <Link
                href="/consultation"
                className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
              >
                Open consultation form
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="mb-4 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
              Schedule directly
            </p>
            <CalendlyEmbed url={calendly} />
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailBlock({
  label,
  email,
  note,
}: {
  label: string;
  email: string;
  note: string;
}) {
  return (
    <div className="border-b border-[var(--color-line)] pb-6 last:border-b-0">
      <p className="mb-2 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
        {label}
      </p>
      <a
        href={`mailto:${email}`}
        className="block text-[length:var(--text-20)] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
      >
        {email}
      </a>
      <p className="mt-1 text-[length:var(--text-15)] text-[var(--color-muted)]">{note}</p>
    </div>
  );
}
