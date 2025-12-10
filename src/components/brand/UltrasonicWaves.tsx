import { useEffect, useState } from "react";

interface UltrasonicWavesProps {
  className?: string;
  color?: string;
  waveCount?: number;
  animated?: boolean;
}

export const UltrasonicWaves = ({
  className = "",
  color = "currentColor",
  waveCount = 5,
  animated = true,
}: UltrasonicWavesProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="20%" stopColor={color} stopOpacity="0.6" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="80%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: waveCount }).map((_, i) => {
        const yOffset = 60 + (i - Math.floor(waveCount / 2)) * 12;
        const amplitude = 15 - Math.abs(i - Math.floor(waveCount / 2)) * 3;
        const delay = i * 0.15;
        const opacity = 1 - Math.abs(i - Math.floor(waveCount / 2)) * 0.15;

        return (
          <path
            key={i}
            d={`M0 ${yOffset} Q 50 ${yOffset - amplitude} 100 ${yOffset} T 200 ${yOffset} T 300 ${yOffset} T 400 ${yOffset}`}
            stroke="url(#waveGradient)"
            strokeWidth={2 - Math.abs(i - Math.floor(waveCount / 2)) * 0.3}
            fill="none"
            opacity={opacity}
            className={animated && mounted ? "animate-wave" : ""}
            style={{
              animationDelay: `${delay}s`,
              animationDuration: "3s",
            }}
          />
        );
      })}

      {/* Particle effects */}
      {mounted && animated && (
        <g className="particles">
          {Array.from({ length: 8 }).map((_, i) => (
            <circle
              key={i}
              cx={50 + i * 45}
              cy={60 + Math.sin(i) * 20}
              r={2 - (i % 2) * 0.5}
              fill={color}
              opacity={0.4}
              className="animate-float"
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          ))}
        </g>
      )}
    </svg>
  );
};

export default UltrasonicWaves;
