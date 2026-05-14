/**
 * Pure-JSX hero visual — an architectural blueprint composite.
 * Stand-in for the real drone / hero photography (in-house team to deliver).
 * Designed to feel intentional rather than placeholder.
 */
export function HeroComposite() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)]">
      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 0%, rgba(130,216,249,0.10), transparent 55%), radial-gradient(80% 60% at 20% 100%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />

      {/* Blueprint grid */}
      <svg
        aria-hidden
        viewBox="0 0 800 600"
        className="absolute inset-0 h-full w-full text-[var(--color-line)]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </pattern>
          <pattern id="hero-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.8"
            />
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#hero-grid)" />
        <rect width="800" height="600" fill="url(#hero-grid-major)" />
      </svg>

      {/* Stylized floorplan + pool — abstracted, in-line strokes */}
      <svg
        aria-hidden
        viewBox="0 0 800 600"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* House outline */}
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none">
          <rect x="120" y="180" width="380" height="220" rx="2" />
          {/* Interior walls */}
          <line x1="280" y1="180" x2="280" y2="320" />
          <line x1="280" y1="320" x2="500" y2="320" />
          <line x1="380" y1="320" x2="380" y2="400" />
          {/* Door swing */}
          <path d="M 250 400 A 30 30 0 0 1 280 370" />
          {/* Garage */}
          <rect x="120" y="400" width="160" height="80" rx="2" />
        </g>

        {/* Pool — rounded rectangle with diving end */}
        <g stroke="rgba(130,216,249,0.85)" strokeWidth="1.75" fill="none">
          <path d="M 540 220 L 700 220 Q 740 220 740 260 L 740 340 Q 740 380 700 380 L 540 380 Q 500 380 500 340 L 500 260 Q 500 220 540 220 Z" />
          {/* Ladder */}
          <line x1="560" y1="220" x2="560" y2="240" />
          <line x1="570" y1="220" x2="570" y2="240" />
          {/* Spa offset */}
          <circle cx="720" cy="200" r="22" />
          <line x1="720" y1="178" x2="720" y2="222" strokeDasharray="2 3" />
        </g>

        {/* Hardscape path */}
        <g stroke="rgba(255,255,255,0.35)" strokeWidth="1" fill="none" strokeDasharray="4 6">
          <path d="M 500 480 L 700 480 L 700 400" />
          <path d="M 380 400 L 380 480 L 500 480" />
        </g>

        {/* Compass / North marker */}
        <g transform="translate(700,520)">
          <circle r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" />
          <path
            d="M 0 -16 L 5 4 L 0 -2 L -5 4 Z"
            fill="rgba(255,255,255,0.7)"
            stroke="rgba(255,255,255,0.7)"
          />
          <text
            x="0"
            y="-26"
            textAnchor="middle"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fill="rgba(255,255,255,0.7)"
            letterSpacing="0.1em"
          >
            N
          </text>
        </g>

        {/* Dimension lines */}
        <g stroke="rgba(255,255,255,0.3)" strokeWidth="0.5">
          <line x1="120" y1="160" x2="500" y2="160" />
          <line x1="120" y1="156" x2="120" y2="164" />
          <line x1="500" y1="156" x2="500" y2="164" />
        </g>
        <text
          x="310"
          y="150"
          textAnchor="middle"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          fill="rgba(255,255,255,0.5)"
          letterSpacing="0.18em"
        >
          38&apos;-0&quot;
        </text>
      </svg>

      {/* Floating "project status" pill — Slash-style UI overlay */}
      <div className="absolute right-6 top-6 flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-3 py-1.5 text-[length:var(--text-13)] text-[var(--color-muted)] backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        Project · In design
      </div>

      {/* Bottom-left address tag */}
      <div className="absolute bottom-5 left-5 max-w-[60%] rounded-xl border border-[var(--color-line)] bg-[var(--color-panel)]/85 p-4 backdrop-blur">
        <p className="text-[length:var(--text-13)] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Sample plan
        </p>
        <p className="mt-1 font-display text-[length:var(--text-20)] leading-tight tracking-tight text-white">
          4-bed lakeside, custom pool &amp; spa
        </p>
        <p className="mt-1 text-[length:var(--text-13)] text-[var(--color-muted)]">
          Tellico Village · 3,800 sqft · 2026
        </p>
      </div>
    </div>
  );
}
