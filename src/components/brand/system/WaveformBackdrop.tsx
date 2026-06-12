interface WaveformBackdropProps {
  /** Seed value to vary the waveform across instances. */
  seed?: number;
  className?: string;
}

/**
 * WaveformBackdrop — green ultrasonic trace over a faint green grid,
 * used inside InstrumentPanel as a quiet "live data" texture. Pure
 * SVG, no JS animation (a CSS pulse on the trace hints at liveness).
 */
export const WaveformBackdrop = ({ seed = 0, className = "" }: WaveformBackdropProps) => {
  // Generate a stable pseudo-waveform path.
  const points: string[] = [];
  const width = 600;
  const height = 120;
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const phase = (i + seed) * 0.45;
    const amp =
      Math.sin(phase) * 18 +
      Math.sin(phase * 2.1) * 9 +
      Math.sin(phase * 0.6) * 6;
    const y = height / 2 + amp;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const linePath = points.join(" ");
  const fillPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* faint green grid */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--rho-green) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--rho-green) / 0.06) 1px, transparent 1px)",
          backgroundSize: "32px 24px",
        }}
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id={`wave-fill-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--rho-green))" stopOpacity="0.18" />
            <stop offset="100%" stopColor="hsl(var(--rho-green))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill={`url(#wave-fill-${seed})`} />
        <path
          d={linePath}
          fill="none"
          stroke="hsl(var(--rho-green))"
          strokeWidth="1.5"
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--rho-green) / 0.5))" }}
        />
      </svg>
    </div>
  );
};

export default WaveformBackdrop;
