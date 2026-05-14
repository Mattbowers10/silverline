import { cn } from "@/lib/cn";

type Kind = "pool" | "house" | "landscape" | "tool";

type Props = {
  kind?: Kind;
  /** Deterministic seed so re-renders are stable. */
  seed?: number;
  className?: string;
  label?: string;
};

/**
 * Inline-SVG placeholder art. Intentional-looking abstract architectural
 * graphics — no /window.svg garbage. Used until real photography lands.
 */
export function PlaceholderArt({ kind = "house", seed = 1, className, label }: Props) {
  // Rotate hue slightly per seed so cards aren't identical.
  const hueShift = (seed * 7) % 18;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-[var(--color-panel)]",
        className,
      )}
      style={{
        background: `radial-gradient(120% 80% at 30% 0%, hsla(${200 + hueShift}, 60%, 20%, 0.55), transparent 55%),
                     radial-gradient(80% 60% at 80% 100%, hsla(${210 - hueShift}, 50%, 14%, 0.7), transparent 60%),
                     #0b0c0e`,
      }}
    >
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={`pa-grid-${seed}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#pa-grid-${seed})`} />
        {kind === "pool" && <PoolArt seed={seed} />}
        {kind === "house" && <HouseArt seed={seed} />}
        {kind === "landscape" && <LandscapeArt seed={seed} />}
        {kind === "tool" && <ToolArt seed={seed} />}
      </svg>
      {label ? (
        <span className="absolute right-3 top-3 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] backdrop-blur">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function PoolArt({ seed }: { seed: number }) {
  const xOffset = (seed * 5) % 14;
  return (
    <g stroke="rgba(130,216,249,0.7)" strokeWidth="1.25" fill="none">
      <path
        d={`M ${100 + xOffset} 110 L 290 110 Q 320 110 320 140 L 320 200 Q 320 230 290 230 L ${100 + xOffset} 230 Q 70 230 70 200 L 70 140 Q 70 110 ${100 + xOffset} 110 Z`}
      />
      <circle cx="300" cy="100" r="14" />
      <line x1="110" y1="110" x2="110" y2="125" />
      <line x1="120" y1="110" x2="120" y2="125" />
    </g>
  );
}

function HouseArt({ seed }: { seed: number }) {
  const w = 180 + (seed * 3) % 30;
  return (
    <g stroke="rgba(255,255,255,0.6)" strokeWidth="1.25" fill="none">
      <rect x="100" y="100" width={w} height="120" />
      <line x1="170" y1="100" x2="170" y2="180" />
      <line x1="170" y1="180" x2={100 + w} y2="180" />
      <line x1="220" y1="180" x2="220" y2="220" />
      <rect x="100" y="220" width="70" height="30" />
    </g>
  );
}

function LandscapeArt({ seed }: { seed: number }) {
  return (
    <g stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none">
      {/* Topo contour lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M 0 ${200 - i * 18 + (seed % 8)} Q 100 ${170 - i * 18} 200 ${190 - i * 18} T 400 ${200 - i * 18}`}
          opacity={1 - i * 0.15}
        />
      ))}
    </g>
  );
}

function ToolArt({ seed }: { seed: number }) {
  // Mini-chart with bars
  const bars = [60, 30, 80, 50, 70, 40, 90, 55];
  return (
    <g>
      <g stroke="rgba(255,255,255,0.25)" strokeWidth="1">
        <line x1="60" y1="80" x2="60" y2="220" />
        <line x1="60" y1="220" x2="340" y2="220" />
      </g>
      <g fill="rgba(130,216,249,0.5)">
        {bars.map((h, i) => {
          const x = 80 + i * 32;
          const variance = (seed * (i + 1)) % 16;
          return (
            <rect
              key={i}
              x={x}
              y={220 - h - variance}
              width="20"
              height={h + variance}
            />
          );
        })}
      </g>
    </g>
  );
}
