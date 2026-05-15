import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  headline: string;
  italicWord?: string;
  sub: string;
  /** Left column — the calculator inputs. */
  inputs: React.ReactNode;
  /** Right column — the EstimateGate output. */
  estimate: React.ReactNode;
  /** Optional 'how this is calculated' block below the calculator. */
  methodology?: React.ReactNode;
};

/**
 * Shared page layout for calculator landing pages:
 * editorial header + two-column body (inputs left, gated estimate right)
 * + optional methodology block.
 */
export function CalculatorShell({
  eyebrow,
  headline,
  italicWord,
  sub,
  inputs,
  estimate,
  methodology,
}: Props) {
  let renderedHeadline: React.ReactNode = headline;
  if (italicWord && headline.includes(italicWord)) {
    const [before, after] = headline.split(italicWord);
    renderedHeadline = (
      <>
        {before}
        <i className="font-display italic text-[var(--color-accent)]">{italicWord}</i>
        {after}
      </>
    );
  }

  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px]">
        <header className="max-w-3xl">
          <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {eyebrow}
          </p>
          <h1 className="font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
            {renderedHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
            {sub}
          </p>
        </header>

        <div className={cn("mt-14 grid gap-10 lg:grid-cols-12")}>
          <div className="lg:col-span-7">{inputs}</div>
          <div className="lg:col-span-5">{estimate}</div>
        </div>

        {methodology ? <div className="mt-20">{methodology}</div> : null}
      </div>
    </section>
  );
}
