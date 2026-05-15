import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="px-6 py-24 lg:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          404
        </p>
        <h1 className="mt-5 font-display text-balance text-[length:var(--text-48)] leading-[1.05] tracking-tight md:text-[length:var(--text-64)]">
          That page is{" "}
          <i className="font-display italic text-[var(--color-accent)]">missing.</i>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-[length:var(--text-18)] leading-relaxed text-[var(--color-muted)]">
          The page you&apos;re looking for isn&apos;t here — but the rest of Silverline
          probably is. Try one of these:
        </p>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: "Blog · The Deep End", href: "/blog" },
            { label: "Shop", href: "/shop" },
            { label: "Request consultation", href: "/consultation" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--color-line)] px-5 py-2 text-[length:var(--text-15)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {l.label} <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
