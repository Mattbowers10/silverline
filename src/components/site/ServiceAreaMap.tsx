/**
 * Hand-drawn SVG of the East-TN service area.
 * Centered roughly on Knoxville (35.96° N, 83.92° W) with a stylized 90-minute
 * radius polygon. Cities marked at approximate positions.
 *
 * Replace with a real Mapbox isochrone render once NEXT_PUBLIC_MAPBOX_TOKEN is set.
 */
const CITIES: { name: string; x: number; y: number; major?: boolean }[] = [
  { name: "Knoxville", x: 410, y: 300, major: true },
  { name: "Farragut", x: 350, y: 310 },
  { name: "Maryville", x: 420, y: 360 },
  { name: "Oak Ridge", x: 340, y: 250 },
  { name: "Sevierville", x: 510, y: 340 },
  { name: "Pigeon Forge", x: 540, y: 360 },
  { name: "Gatlinburg", x: 560, y: 390 },
  { name: "Lenoir City", x: 330, y: 360 },
  { name: "Loudon", x: 310, y: 380 },
  { name: "Crossville", x: 170, y: 320 },
  { name: "Newport", x: 600, y: 320 },
  { name: "Dandridge", x: 530, y: 270 },
  { name: "Clinton", x: 360, y: 220 },
  { name: "Norris", x: 380, y: 180 },
  { name: "Harriman", x: 270, y: 290 },
  { name: "Madisonville", x: 380, y: 440 },
];

export function ServiceAreaMap() {
  return (
    <div className="card-highlight overflow-hidden rounded-2xl border border-[var(--color-line)] p-4 md:p-8">
      <svg
        viewBox="0 0 800 540"
        className="h-auto w-full"
        role="img"
        aria-label="Map of Silverline's East Tennessee service area, roughly a 90-minute drive from Knoxville"
      >
        <defs>
          <pattern id="sa-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
          <radialGradient id="sa-glow" cx="51%" cy="55%" r="55%">
            <stop offset="0%" stopColor="rgba(130,216,249,0.18)" />
            <stop offset="60%" stopColor="rgba(130,216,249,0.06)" />
            <stop offset="100%" stopColor="rgba(130,216,249,0)" />
          </radialGradient>
        </defs>

        {/* background grid */}
        <rect width="800" height="540" fill="url(#sa-grid)" />

        {/* service-area glow + outline */}
        <ellipse cx="410" cy="300" rx="280" ry="200" fill="url(#sa-glow)" />
        <ellipse
          cx="410"
          cy="300"
          rx="280"
          ry="200"
          fill="none"
          stroke="rgba(130,216,249,0.5)"
          strokeWidth="1.25"
          strokeDasharray="4 6"
        />

        {/* approximate TN border-ish lines (stylized) */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth="0.75" fill="none">
          <path d="M 30 480 Q 200 460, 380 470 T 770 460" />
          <path d="M 30 130 Q 200 110, 380 120 T 770 110" />
        </g>

        {/* compass rose */}
        <g transform="translate(740,480)" stroke="rgba(255,255,255,0.4)" fill="none">
          <circle r="20" />
          <path d="M 0 -14 L 4 4 L 0 -2 L -4 4 Z" fill="rgba(255,255,255,0.65)" stroke="none" />
          <text
            x="0"
            y="-24"
            textAnchor="middle"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
            fill="rgba(255,255,255,0.6)"
            letterSpacing="0.12em"
          >
            N
          </text>
        </g>

        {/* city dots + labels */}
        {CITIES.map((c) => (
          <g key={c.name}>
            <circle
              cx={c.x}
              cy={c.y}
              r={c.major ? 5 : 3}
              fill={c.major ? "var(--color-accent)" : "rgba(255,255,255,0.85)"}
              stroke="rgba(0,0,0,0.4)"
              strokeWidth="0.5"
            />
            <text
              x={c.x + (c.major ? 9 : 7)}
              y={c.y + 3}
              fontSize={c.major ? 13 : 11}
              fontFamily="var(--font-sans), sans-serif"
              fontWeight={c.major ? 600 : 400}
              fill={c.major ? "#fff" : "rgba(255,255,255,0.75)"}
            >
              {c.name}
            </text>
          </g>
        ))}

        {/* legend */}
        <g transform="translate(24,500)">
          <rect width="280" height="24" rx="12" fill="rgba(11,12,14,0.85)" stroke="rgba(27,27,32,1)" />
          <circle cx="14" cy="12" r="4" fill="var(--color-accent)" />
          <text
            x="26"
            y="16"
            fontSize="11"
            fontFamily="var(--font-sans), sans-serif"
            fill="rgba(255,255,255,0.8)"
          >
            90-minute drive · ~280 mi² of East Tennessee
          </text>
        </g>
      </svg>
    </div>
  );
}
