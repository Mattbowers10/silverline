import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { SectionHeader } from "./SectionHeader";

type Item = {
  title: string;
  body: string;
  image?: { src: string; alt: string };
};

type Props = {
  eyebrow?: string;
  headline: string;
  italicWord?: string;
  sub?: string;
  items: Item[];
};

/**
 * "Secure by design" Slash analog. Two-column: copy left, accordion right.
 * For Silverline: "Why Silverline" with licensed/insured, warranty, single
 * point of contact, etc.
 */
export function WhyAccordion({ eyebrow, headline, italicWord, sub, items }: Props) {
  const defaultOpen = items[0]?.title;
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
        </div>

        <div className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue={defaultOpen}>
            {items.map((item) => (
              <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">{item.body}</p>
                  {item.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[var(--color-line)]">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
