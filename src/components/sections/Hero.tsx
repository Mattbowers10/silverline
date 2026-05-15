import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoMarqueeItem = { name: string; src?: string };

type Props = {
  eyebrow?: string;
  /** Full headline; the substring matching italicWord is rendered italic + accent. */
  headline: string;
  italicWord?: string;
  sub: string;
  emailCapture?: {
    placeholder?: string;
    submitLabel?: string;
    /** GHL form action URL (optional — falls back to /consultation if omitted) */
    action?: string;
  };
  /** Optional secondary text link below the email pill */
  secondaryLink?: { label: string; href: string };
  /** Optional hero composite image */
  heroImage?: { src: string; alt: string };
  /** Optional JSX slot for a custom hero visual (overrides heroImage) */
  heroSlot?: React.ReactNode;
  /** Optional impact stat ($X spent / X projects completed) */
  metric?: { value: string; label: string };
  /** Optional infinite logo marquee of partners/customers */
  logos?: LogoMarqueeItem[];
  className?: string;
};

export function Hero({
  eyebrow,
  headline,
  italicWord,
  sub,
  emailCapture,
  secondaryLink,
  heroImage,
  heroSlot,
  metric,
  logos,
  className,
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
    <section
      className={cn(
        "relative overflow-hidden px-6 pb-24 pt-20 lg:pb-32 lg:pt-28",
        className,
      )}
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Copy column */}
          <div className="lg:col-span-6">
            {eyebrow ? (
              <p className="mb-6 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {eyebrow}
              </p>
            ) : null}

            <h1 className="font-display text-balance text-[length:var(--text-52)] leading-[1.05] tracking-tight md:text-[64px] lg:text-[76px]">
              {renderedHeadline}
            </h1>

            <p className="mt-8 max-w-xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)] md:text-[length:var(--text-20)]">
              {sub}
            </p>

            {emailCapture ? (
              <form
                action={emailCapture.action ?? "/consultation"}
                method="get"
                className="mt-10 flex max-w-md items-center rounded-full border border-[var(--color-line)] bg-[var(--color-panel)]/60 p-1"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={emailCapture.placeholder ?? "What's your email?"}
                  className="flex-1 bg-transparent px-5 py-3 text-[length:var(--text-15)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-3 text-[length:var(--text-15)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
                >
                  {emailCapture.submitLabel ?? "Get Started"}
                </button>
              </form>
            ) : null}

            {secondaryLink ? (
              <p className="mt-4 text-[length:var(--text-15)] text-[var(--color-muted)]">
                <Link
                  href={secondaryLink.href}
                  className="text-[var(--color-text)] underline-offset-4 transition-colors hover:text-[var(--color-accent)] hover:underline"
                >
                  {secondaryLink.label} →
                </Link>
              </p>
            ) : null}
          </div>

          {/* Visual column — JSX slot takes precedence over image */}
          {heroSlot ? (
            <div className="relative lg:col-span-6">{heroSlot}</div>
          ) : heroImage ? (
            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Metric + logo marquee strip */}
        {(metric || logos?.length) && (
          <div className="mt-20 grid items-end gap-10 border-t border-[var(--color-line)] pt-10 lg:grid-cols-12">
            {metric ? (
              <div className="lg:col-span-4">
                <p className="font-display text-[length:var(--text-48)] leading-none tracking-tight md:text-[length:var(--text-52)]">
                  {metric.value}
                </p>
                <p className="mt-3 text-[length:var(--text-15)] text-[var(--color-muted)]">
                  {metric.label}
                </p>
              </div>
            ) : null}

            {logos?.length ? (
              <div className="lg:col-span-8">
                <p className="mb-5 text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  Trusted by clients across East Tennessee
                </p>
                <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div className="animate-marquee flex w-max gap-12">
                    {/* duplicate items so the marquee loop is seamless */}
                    {[...logos, ...logos].map((l, i) => (
                      <span
                        key={`${l.name}-${i}`}
                        className="whitespace-nowrap text-[length:var(--text-20)] text-[var(--color-muted)]/80"
                      >
                        {l.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
