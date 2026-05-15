"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sticky bottom-right "Request consultation" pill that appears after 25%
 * scroll on long pages. Dismissible per-session via sessionStorage.
 * Hidden on /consultation (redundant) and any /shop/checkout-ish path.
 */
const HIDDEN_PREFIXES = ["/consultation", "/shop/cart", "/shop/success"];

export function FloatingCTA() {
  const pathname = usePathname() ?? "";
  const hiddenForRoute = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("silverline:cta-dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const onScroll = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? scrollY / max : 0;
      setVisible(ratio > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || hiddenForRoute) return null;

  return (
    <div
      role="region"
      aria-label="Quick consultation"
      className={`pointer-events-none fixed bottom-4 right-4 z-40 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)]/95 p-1.5 pl-4 shadow-2xl backdrop-blur">
        <span className="hidden text-[length:var(--text-13)] text-[var(--color-muted)] sm:inline">
          Tell us about your project
        </span>
        <Link
          href="/consultation"
          className="rounded-full bg-white px-4 py-2 text-[length:var(--text-13)] font-medium text-black transition-colors hover:bg-[var(--color-accent)]"
        >
          Request consultation
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            sessionStorage.setItem("silverline:cta-dismissed", "1");
            setDismissed(true);
          }}
          className="ml-1 grid h-7 w-7 place-items-center rounded-full text-[var(--color-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-text)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path
              d="M2 2 L10 10 M10 2 L2 10"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
