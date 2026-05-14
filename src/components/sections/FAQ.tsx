import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { SectionHeader } from "./SectionHeader";

type Item = { question: string; answer: React.ReactNode };

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  /** Sub copy with optional CTA link */
  sub?: string;
  ctaLink?: { label: string; href: string };
  items: Item[];
};

export function FAQ({
  eyebrow,
  headline,
  italicWord,
  sub,
  ctaLink,
  items,
}: Props) {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow={eyebrow}
            headline={headline}
            italicWord={italicWord}
            sub={sub}
            align="left"
          />
          {ctaLink ? (
            <p className="mt-6 text-[length:var(--text-15)] text-[var(--color-muted)]">
              Still have questions?{" "}
              <Link
                href={ctaLink.href}
                className="text-[var(--color-text)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:underline"
              >
                {ctaLink.label} →
              </Link>
            </p>
          ) : null}
        </div>
        <div className="lg:col-span-7">
          <Accordion type="single" collapsible>
            {items.map((it) => (
              <AccordionItem key={it.question} value={it.question}>
                <AccordionTrigger>{it.question}</AccordionTrigger>
                <AccordionContent>{it.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
