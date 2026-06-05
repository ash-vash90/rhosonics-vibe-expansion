import { cn } from "@/lib/utils";

/**
 * Brand-restricted technical icon family.
 *
 * Geometry rules:
 *   - 96×96 viewBox, snapped to a 4px grid
 *   - 1.5px obsidian strokes, square caps/miter joins — engineering schematic feel
 *   - Sharp corners, NO rounded line caps, NO soft blobs
 *   - One accent fill surface using a brand-restricted accent:
 *       green   = hsl(var(--rho-green))
 *       bronze  = hsl(var(--mineral-bronze))
 *       slate   = hsl(var(--slate-700))
 *   - Tick marks, registration crosses, and dimension lines reinforce the
 *     instrument / blueprint vocabulary. These are engineered symbols, not
 *     decorative illustrations.
 */

type Accent = "green" | "bronze" | "slate";
type Surface = "eco" | "slate" | "none";

export type SolutionIconName =
  | "density"
  | "concentration"
  | "calibration"
  | "sustainability"
  | "massflow"
  | "integration"
  | "telemetry"
  | "compliance";

interface Props {
  name: SolutionIconName;
  accent?: Accent;
  surface?: Surface;
  size?: number;
  className?: string;
  label?: string;
}

const accentToken: Record<Accent, string> = {
  green: "hsl(var(--rho-green))",
  bronze: "hsl(var(--mineral-bronze))",
  slate: "hsl(var(--slate-700))",
};

const surfaceClass: Record<Surface, string> = {
  eco: "bg-[hsl(var(--eco-surface))]",
  slate: "bg-[hsl(var(--slate-100))]",
  none: "",
};

const OUTLINE = "hsl(var(--rho-obsidian))";
const SW = 1.75;

// Shared technical defaults: square caps, miter joins, no smoothing.
const T = {
  stroke: OUTLINE,
  strokeWidth: SW,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
};

const glyphs: Record<SolutionIconName, (accent: string) => JSX.Element> = {
  // Density — hydrometer / graduated cylinder, sharp shoulders
  density: (a) => (
    <>
      {/* cylinder body */}
      <path d="M30 12 H66 V20 H62 V78 H34 V20 H30 Z" fill="hsl(var(--card))" {...T} />
      {/* liquid fill */}
      <rect x="34" y="46" width="28" height="32" fill={a} opacity={0.9} />
      {/* meniscus + level line */}
      <line x1="34" y1="46" x2="62" y2="46" {...T} />
      <line x1="10" y1="46" x2="28" y2="46" {...T} />
      <polygon points="22,42 28,46 22,50" fill={OUTLINE} />
      {/* graduation ticks */}
      {[26, 34, 54, 62, 70].map((y) => (
        <line key={y} x1="58" y1={y} x2="62" y2={y} {...T} />
      ))}
      {[30, 38, 50, 58, 66, 74].map((y) => (
        <line key={`s${y}`} x1="60" y1={y} x2="62" y2={y} {...T} />
      ))}
    </>
  ),

  // Concentration — stacked phase layers with hatch on top layer
  concentration: (a) => (
    <>
      <rect x="14" y="60" width="68" height="18" fill={a} opacity={0.35} {...T} />
      <rect x="14" y="42" width="68" height="18" fill={a} opacity={0.65} {...T} />
      <rect x="14" y="24" width="68" height="18" fill={a} {...T} />
      {/* hatch on top concentrated layer */}
      {[20, 28, 36, 44, 52, 60, 68, 76].map((x) => (
        <line key={x} x1={x} y1="24" x2={x - 8} y2="42" stroke="hsl(var(--card))" strokeWidth={1} opacity={0.5} />
      ))}
      {/* dimension brackets */}
      <line x1="86" y1="24" x2="86" y2="78" {...T} />
      <line x1="84" y1="24" x2="88" y2="24" {...T} />
      <line x1="84" y1="78" x2="88" y2="78" {...T} />
    </>
  ),

  // Calibration — reticle / crosshair with corner brackets
  calibration: (a) => (
    <>
      {/* corner brackets */}
      <polyline points="10,22 10,10 22,10" {...T} fill="none" />
      <polyline points="74,10 86,10 86,22" {...T} fill="none" />
      <polyline points="86,74 86,86 74,86" {...T} fill="none" />
      <polyline points="22,86 10,86 10,74" {...T} fill="none" />
      {/* reticle */}
      <circle cx="48" cy="48" r="22" fill="hsl(var(--card))" {...T} />
      <circle cx="48" cy="48" r="10" fill={a} />
      <rect x="46" y="46" width="4" height="4" fill={OUTLINE} />
      {/* axes */}
      <line x1="48" y1="18" x2="48" y2="78" {...T} />
      <line x1="18" y1="48" x2="78" y2="48" {...T} />
      {/* tick marks */}
      {[26, 34, 62, 70].map((p) => (
        <g key={p}>
          <line x1={p} y1="47" x2={p} y2="49" {...T} />
          <line x1="47" y1={p} x2="49" y2={p} {...T} />
        </g>
      ))}
    </>
  ),

  // Sustainability — angular hex/leaf hybrid with circuit vein
  sustainability: (a) => (
    <>
      <polygon points="48,12 78,28 78,68 48,84 18,68 18,28" fill={a} opacity={0.92} {...T} />
      {/* angular vein */}
      <polyline points="30,68 42,56 42,44 54,32 66,32" fill="none" stroke="hsl(var(--card))" strokeWidth={SW} strokeLinejoin="miter" strokeLinecap="square" />
      <line x1="42" y1="56" x2="52" y2="56" stroke="hsl(var(--card))" strokeWidth={SW} strokeLinecap="square" />
      <line x1="42" y1="44" x2="34" y2="44" stroke="hsl(var(--card))" strokeWidth={SW} strokeLinecap="square" />
      {/* registration node */}
      <rect x="64" y="30" width="4" height="4" fill="hsl(var(--card))" />
    </>
  ),

  // Massflow — pipe section with flow arrow + flow profile bars
  massflow: (a) => (
    <>
      {/* pipe flanges */}
      <rect x="8" y="30" width="6" height="36" fill="hsl(var(--card))" {...T} />
      <rect x="62" y="30" width="6" height="36" fill="hsl(var(--card))" {...T} />
      {/* pipe body */}
      <rect x="14" y="36" width="48" height="24" fill="hsl(var(--card))" {...T} />
      {/* flow profile */}
      {[
        [20, 8],
        [28, 14],
        [36, 18],
        [44, 14],
        [52, 8],
      ].map(([x, h]) => (
        <rect key={x} x={x} y={48 - h / 2} width="4" height={h} fill={a} />
      ))}
      {/* arrow */}
      <line x1="68" y1="48" x2="84" y2="48" {...T} />
      <polygon points="80,42 90,48 80,54" fill={a} stroke={OUTLINE} strokeWidth={SW} strokeLinejoin="miter" />
      {/* bolt holes */}
      {[34, 62].map((y) => (
        <g key={y}>
          <rect x="9" y={y - 1} width="4" height="2" fill={OUTLINE} />
          <rect x="63" y={y - 1} width="4" height="2" fill={OUTLINE} />
        </g>
      ))}
    </>
  ),

  // Integration — node graph / bus topology
  integration: (a) => (
    <>
      {/* bus line */}
      <line x1="10" y1="48" x2="86" y2="48" {...T} />
      {/* drops */}
      <line x1="24" y1="48" x2="24" y2="22" {...T} />
      <line x1="48" y1="48" x2="48" y2="74" {...T} />
      <line x1="72" y1="48" x2="72" y2="22" {...T} />
      {/* nodes - squares not circles */}
      <rect x="16" y="14" width="16" height="16" fill={a} {...T} />
      <rect x="40" y="66" width="16" height="16" fill="hsl(var(--card))" {...T} />
      <rect x="64" y="14" width="16" height="16" fill="hsl(var(--card))" {...T} />
      {/* junction dots */}
      <rect x="22" y="46" width="4" height="4" fill={OUTLINE} />
      <rect x="46" y="46" width="4" height="4" fill={OUTLINE} />
      <rect x="70" y="46" width="4" height="4" fill={OUTLINE} />
      {/* inner detail */}
      <line x1="20" y1="22" x2="28" y2="22" stroke="hsl(var(--card))" strokeWidth={SW} />
      <line x1="44" y1="74" x2="52" y2="74" {...T} />
      <line x1="68" y1="22" x2="76" y2="22" {...T} />
    </>
  ),

  // Telemetry — oscilloscope trace on gridded screen
  telemetry: (a) => (
    <>
      {/* screen frame */}
      <rect x="10" y="14" width="76" height="56" fill="hsl(var(--card))" {...T} />
      {/* grid */}
      {[24, 34, 44, 54, 64].map((y) => (
        <line key={`h${y}`} x1="10" y1={y} x2="86" y2={y} stroke={OUTLINE} strokeWidth={0.5} opacity={0.35} />
      ))}
      {[22, 34, 46, 58, 70].map((x) => (
        <line key={`v${x}`} x1={x} y1="14" x2={x} y2="70" stroke={OUTLINE} strokeWidth={0.5} opacity={0.35} />
      ))}
      {/* trace */}
      <polyline
        points="12,54 22,54 26,30 34,30 38,46 50,46 54,22 62,22 66,42 84,42"
        fill="none"
        stroke={a}
        strokeWidth={SW + 0.5}
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      {/* base / stand */}
      <line x1="32" y1="78" x2="64" y2="78" {...T} />
      <line x1="48" y1="70" x2="48" y2="78" {...T} />
      <rect x="22" y="76" width="52" height="4" fill="hsl(var(--card))" {...T} />
    </>
  ),

  // Compliance — angular shield with stamped checkmark and corner rivets
  compliance: (a) => (
    <>
      <polygon points="48,10 80,20 80,46 48,86 16,46 16,20" fill={a} {...T} />
      {/* inner bevel */}
      <polygon points="48,18 74,26 74,44 48,76 22,44 22,26" fill="none" stroke="hsl(var(--card))" strokeWidth={1} opacity={0.5} />
      {/* check stamp */}
      <polyline points="32,46 44,58 64,34" fill="none" stroke="hsl(var(--card))" strokeWidth={3} strokeLinejoin="miter" strokeLinecap="square" />
      {/* rivets */}
      <rect x="20" y="22" width="3" height="3" fill={OUTLINE} />
      <rect x="73" y="22" width="3" height="3" fill={OUTLINE} />
    </>
  ),
};

export const SolutionIcon = ({
  name,
  accent = "green",
  surface = "slate",
  size = 96,
  className,
  label,
}: Props) => {
  const tile = surfaceClass[surface];
  const a = accentToken[accent];
  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-sm p-3", tile, className)}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 96 96"
        aria-hidden={label ? undefined : true}
        focusable="false"
        shapeRendering="geometricPrecision"
      >
        {glyphs[name](a)}
      </svg>
    </div>
  );
};

export default SolutionIcon;
