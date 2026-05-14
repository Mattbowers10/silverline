import Image from "next/image";
import { SectionHeader } from "./SectionHeader";

type Step = {
  step: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  steps: Step[];
};

/**
 * Three feature cards with deliverable snippets — the "Amplified with modern
 * capabilities" Slash analog. For Silverline: Design → Build → Maintain.
 */
export function ProcessSteps({ eyebrow, headline, italicWord, sub, steps }: Props) {
  return (
    <section className="overflow-hidden px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader
          eyebrow={eyebrow}
          headline={headline}
          italicWord={italicWord}
          sub={sub}
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.step}
              className="card-highlight flex flex-col overflow-hidden rounded-2xl border border-[var(--color-line)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-black/30">
                {s.image ? (
                  <Image
                    src={s.image.src}
                    alt={s.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-[length:var(--text-24)] leading-tight tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-[length:var(--text-15)] leading-relaxed text-[var(--color-muted)]">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
