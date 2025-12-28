import { useEffect, useState, useRef } from "react";

interface AnalogGaugeProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const AnalogGauge = ({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  size = "md",
  className = "",
}: AnalogGaugeProps) => {
  const [animatedValue, setAnimatedValue] = useState(min);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-36 h-36",
    lg: "w-48 h-48",
  };

  const fontSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const valueSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  // Calculate rotation angle (-135 to 135 degrees for a 270-degree sweep)
  const percentage = ((animatedValue - min) / (max - min)) * 100;
  const rotation = -135 + (percentage / 100) * 270;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            // Animate value
            const startTime = Date.now();
            const duration = 1500;
            const startValue = min;

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              setAnimatedValue(startValue + (value - startValue) * easeProgress);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (gaugeRef.current) {
      observer.observe(gaugeRef.current);
    }

    return () => observer.disconnect();
  }, [value, min]);

  // Generate tick marks
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const angle = -135 + i * 27;
    const isMain = i % 2 === 0;
    return { angle, isMain };
  });

  return (
    <div
      ref={gaugeRef}
      className={`relative ${sizeClasses[size]} ${className}`}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={label}
    >
      {/* Gauge background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg border border-slate-700">
        {/* Inner ring */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-800 border border-slate-600">
          {/* Tick marks */}
          {ticks.map(({ angle, isMain }, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                transform: `rotate(${angle}deg) translateY(-50%)`,
                width: "50%",
              }}
            >
              <div
                className={`absolute right-1 ${
                  isMain
                    ? "w-3 h-0.5 bg-slate-300"
                    : "w-2 h-px bg-slate-500"
                }`}
                style={{ transformOrigin: "right center" }}
              />
            </div>
          ))}

          {/* Color arc indicator */}
          <svg
            className="absolute inset-3"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="hsl(var(--slate-700))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="198 66"
              transform="rotate(135 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 198} ${264 - (percentage / 100) * 198}`}
              transform="rotate(135 50 50)"
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--rho-green))" />
                <stop offset="100%" stopColor="hsl(var(--rho-green-accent))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Needle */}
          <div
            className="absolute top-1/2 left-1/2 origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${rotation}deg)`,
              transformOrigin: "center bottom",
            }}
          >
            <div className="w-0.5 h-8 bg-gradient-to-t from-red-500 to-red-400 rounded-t-full shadow-md" />
            <div className="w-2 h-2 -mt-0.5 -ml-[3px] rounded-full bg-red-500 shadow" />
          </div>

          {/* Center cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-b from-slate-500 to-slate-700 shadow-inner border border-slate-600" />

          {/* Value display */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
            <div className={`${valueSizes[size]} font-bold font-data text-slate-100`}>
              {Math.round(animatedValue)}
            </div>
            {unit && (
              <div className={`${fontSizes[size]} text-slate-400 font-data uppercase tracking-wider -mt-1`}>
                {unit}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Label */}
      {label && (
        <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap ${fontSizes[size]} font-data text-slate-500 uppercase tracking-wider`}>
          {label}
        </div>
      )}
    </div>
  );
};

export default AnalogGauge;
