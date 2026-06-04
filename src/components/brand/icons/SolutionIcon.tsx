import { cn } from "@/lib/utils";

/**
 * Brand-restricted multicoloured icon family.
 *
 * Geometry rules:
 *   - 96×96 viewBox, snapped to a 4px grid
 *   - 2px obsidian outline / structural strokes
 *   - One accent fill surface using a brand-restricted accent:
 *       green   = hsl(var(--rho-green))
 *       bronze  = hsl(var(--mineral-bronze))
 *       slate   = hsl(var(--slate-700))
 *   - Sit on a 4px-rounded tile (eco / slate-100) — no border
 *
 * NEVER introduce a hue outside this set. The icons read as a system
 * because they share geometry and a tight palette, not because they're
 * vivid. Restriction is the point.
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

const glyphs: Record<SolutionIconName, (accent: string) => JSX.Element> = {
  // Density — beaker with a tinted liquid level
  density: (a) => (
    <>
      <path d="M32 16h32v20l16 36a8 8 0 0 1-7.4 11H23.4A8 8 0 0 1 16 72l16-36V16Z" fill="hsl(var(--card))" stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
      <path d="M22 56h52l7 16a4 4 0 0 1-3.7 5.5H18.7A4 4 0 0 1 15 72l7-16Z" fill={a} opacity={0.92} />
      <path d="M28 16h40" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      <circle cx="42" cy="68" r="2.5" fill="hsl(var(--card))" />
      <circle cx="58" cy="64" r="1.8" fill="hsl(var(--card))" />
    </>
  ),
  // Concentration — three stacked layers
  concentration: (a) => (
    <>
      <rect x="14" y="60" width="68" height="18" rx="3" fill={a} opacity={0.5} stroke={OUTLINE} strokeWidth={3} />
      <rect x="18" y="42" width="60" height="18" rx="3" fill={a} opacity={0.75} stroke={OUTLINE} strokeWidth={3} />
      <rect x="22" y="24" width="52" height="18" rx="3" fill={a} stroke={OUTLINE} strokeWidth={3} />
      <line x1="48" y1="14" x2="48" y2="24" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  // Calibration — crosshair with tick marks
  calibration: (a) => (
    <>
      <circle cx="48" cy="48" r="28" fill="hsl(var(--card))" stroke={OUTLINE} strokeWidth={3} />
      <circle cx="48" cy="48" r="14" fill={a} opacity={0.85} />
      <circle cx="48" cy="48" r="4" fill={OUTLINE} />
      <line x1="48" y1="10" x2="48" y2="22" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      <line x1="48" y1="74" x2="48" y2="86" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      <line x1="10" y1="48" x2="22" y2="48" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
      <line x1="74" y1="48" x2="86" y2="48" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" />
    </>
  ),
  // Sustainability — leaf
  sustainability: (a) => (
    <>
      <path d="M20 76C20 42 42 20 76 20c0 34-22 56-56 56Z" fill={a} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
      <path d="M28 68C44 52 60 44 72 40" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" fill="none" />
    </>
  ),
  // Massflow — pipe with arrow
  massflow: (a) => (
    <>
      <rect x="8" y="36" width="60" height="24" rx="4" fill="hsl(var(--card))" stroke={OUTLINE} strokeWidth={3} />
      <rect x="14" y="42" width="48" height="12" rx="2" fill={a} opacity={0.9} />
      <path d="M68 30l20 18-20 18V30Z" fill={a} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
      <circle cx="24" cy="48" r="2.5" fill="hsl(var(--card))" />
      <circle cx="40" cy="48" r="2.5" fill="hsl(var(--card))" />
      <circle cx="56" cy="48" r="2.5" fill="hsl(var(--card))" />
    </>
  ),
  // Integration — two interlinked nodes
  integration: (a) => (
    <>
      <rect x="10" y="20" width="36" height="36" rx="4" fill="hsl(var(--card))" stroke={OUTLINE} strokeWidth={3} />
      <rect x="50" y="40" width="36" height="36" rx="4" fill={a} stroke={OUTLINE} strokeWidth={3} />
      <path d="M28 56v6h22" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" fill="none" />
      <circle cx="28" cy="38" r="4" fill={a} />
      <circle cx="68" cy="58" r="4" fill="hsl(var(--card))" />
    </>
  ),
  // Telemetry — bar chart with trend
  telemetry: (a) => (
    <>
      <rect x="14" y="56" width="14" height="26" rx="2" fill={a} opacity={0.5} stroke={OUTLINE} strokeWidth={3} />
      <rect x="34" y="44" width="14" height="38" rx="2" fill={a} opacity={0.75} stroke={OUTLINE} strokeWidth={3} />
      <rect x="54" y="30" width="14" height="52" rx="2" fill={a} stroke={OUTLINE} strokeWidth={3} />
      <path d="M16 36l20-10 18 6 22-14" stroke={OUTLINE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="76" cy="18" r="3.5" fill={a} stroke={OUTLINE} strokeWidth={2} />
    </>
  ),
  // Compliance — shield with check
  compliance: (a) => (
    <>
      <path d="M48 12l32 10v22c0 18-14 32-32 40-18-8-32-22-32-40V22l32-10Z" fill={a} opacity={0.92} stroke={OUTLINE} strokeWidth={3} strokeLinejoin="round" />
      <path d="M34 48l10 10 18-22" stroke="hsl(var(--card))" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
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
      className={cn("inline-flex items-center justify-center rounded p-3", tile, className)}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <svg width={size} height={size} viewBox="0 0 96 96" aria-hidden={label ? undefined : true} focusable="false">
        {glyphs[name](a)}
      </svg>
    </div>
  );
};

export default SolutionIcon;
