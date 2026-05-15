"use client";

import * as React from "react";

type Props = {
  /** Full Calendly URL — e.g., https://calendly.com/silverline/consultation */
  url?: string;
  /** Height in pixels; default suits a typical scheduling widget. */
  height?: number;
};

/**
 * Inline Calendly scheduling embed. Lazy-loads the Calendly inline-widget
 * script only when the component mounts (so /contact stays fast on first paint).
 * Renders a clean fallback when no URL is configured.
 */
export function CalendlyEmbed({ url, height = 720 }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!url || !ref.current) return;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src*="calendly.com/assets/external/widget.js"]',
    );
    if (existing) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, [url]);

  if (!url) {
    return (
      <div className="card-highlight grid place-items-center rounded-2xl border border-[var(--color-line)] p-10 text-center">
        <div>
          <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Calendly slot
          </p>
          <p className="mt-3 max-w-md text-[length:var(--text-15)] text-[var(--color-muted)]">
            Calendly embeds here once <code className="text-[var(--color-text)]">NEXT_PUBLIC_CALENDLY_URL</code> is set in your env.
            Drop it in <code className="text-[var(--color-text)]">.env</code> and restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="calendly-inline-widget overflow-hidden rounded-2xl border border-[var(--color-line)]"
      data-url={url}
      style={{ minWidth: 320, height }}
    />
  );
}
