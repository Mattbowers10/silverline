import Link from "next/link";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import { ServiceAreaCheck } from "@/components/lead/ServiceAreaCheck";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service area",
  description:
    "Silverline serves every city within a 90-minute drive of downtown Knoxville. Check whether your address qualifies.",
  path: "/service-area",
});

const CITY_LIST = [
  "Knoxville",
  "Farragut",
  "Maryville",
  "Alcoa",
  "Oak Ridge",
  "Clinton",
  "Lenoir City",
  "Loudon",
  "Tellico Village",
  "Sevierville",
  "Pigeon Forge",
  "Gatlinburg",
  "Newport",
  "Dandridge",
  "Jefferson City",
  "Strawberry Plains",
  "Norris",
  "Bean Station",
  "Rutledge",
  "Maynardville",
  "Harriman",
  "Kingston",
  "Wartburg",
  "Crossville",
  "Madisonville",
  "Tellico Plains",
  "LaFollette",
  "Caryville",
  "Jacksboro",
];

export default function ServiceAreaPage() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Service area
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            90 minutes. Door to{" "}
            <i className="font-display italic text-[var(--color-accent)]">door.</i>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            Silverline serves every major East Tennessee city inside a 90-minute drive of
            downtown Knoxville — Knox, Blount, Sevier, Anderson, Loudon, Roane, Monroe,
            Cocke, Jefferson, Grainger, Union, Campbell, Morgan, and Cumberland counties.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ServiceAreaMap />
          </div>
          <div className="lg:col-span-4 space-y-8">
            <ServiceAreaCheck />
            <div>
              <p className="mb-3 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Cities we serve
              </p>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[length:var(--text-15)] text-[var(--color-text)]/85">
                {CITY_LIST.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p className="mt-4 text-[length:var(--text-13)] text-[var(--color-muted)]">
                Not on the list?{" "}
                <Link
                  href="/contact"
                  className="text-[var(--color-text)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
                >
                  Get in touch
                </Link>
                {" "}— we review every lead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
