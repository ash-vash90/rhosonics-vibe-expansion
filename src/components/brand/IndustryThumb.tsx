interface IndustryThumbProps {
  id: string;
}

/**
 * IndustryThumb — abstract obsidian thumbnail per industry, drawn
 * with green strokes only. Borrowed from customer.io's capability
 * card pattern (image header + title + sentence) but rendered as
 * inline SVG so it stays brand-restricted (no stock photography).
 *
 * 16:9 aspect, currentColor stroke so it picks up text-primary.
 */
export const IndustryThumb = ({ id }: IndustryThumbProps) => {
  const stroke = "currentColor";
  const w = 320;
  const h = 180;

  const mark = (() => {
    switch (id) {
      case "minerals":
        // Hydrocyclone / concentrator schematic
        return (
          <g fill="none" stroke={stroke} strokeWidth="1.5">
            <path d="M120 40 L200 40 L160 130 Z" />
            <line x1="100" y1="60" x2="120" y2="60" />
            <line x1="100" y1="60" x2="100" y2="40" />
            <line x1="160" y1="130" x2="160" y2="155" />
            <circle cx="160" cy="40" r="3" fill={stroke} />
            <circle cx="160" cy="155" r="3" fill={stroke} />
            <line x1="220" y1="50" x2="260" y2="50" strokeDasharray="3 3" />
          </g>
        );
      case "semiconductor":
        // Wafer + grid
        return (
          <g fill="none" stroke={stroke} strokeWidth="1.5">
            <circle cx="160" cy="90" r="55" />
            <line x1="105" y1="90" x2="215" y2="90" />
            <line x1="160" y1="35" x2="160" y2="145" />
            <line x1="125" y1="55" x2="195" y2="125" />
            <line x1="195" y1="55" x2="125" y2="125" />
            <line x1="220" y1="100" x2="240" y2="100" />
          </g>
        );
      case "dredging":
        // Hopper hull profile + waterline
        return (
          <g fill="none" stroke={stroke} strokeWidth="1.5">
            <path d="M70 80 L250 80 L230 130 L90 130 Z" />
            <line x1="60" y1="100" x2="260" y2="100" strokeDasharray="4 4" />
            <line x1="120" y1="80" x2="120" y2="50" />
            <line x1="200" y1="80" x2="200" y2="50" />
            <circle cx="160" cy="105" r="4" fill={stroke} />
          </g>
        );
      case "wastewater":
        // Clarifier (concentric rings)
        return (
          <g fill="none" stroke={stroke} strokeWidth="1.5">
            <circle cx="160" cy="90" r="55" />
            <circle cx="160" cy="90" r="35" />
            <circle cx="160" cy="90" r="15" />
            <line x1="105" y1="90" x2="215" y2="90" strokeDasharray="2 4" />
            <line x1="160" y1="35" x2="160" y2="145" strokeDasharray="2 4" />
          </g>
        );
      case "mining":
        // Paste-fill pipeline + slope
        return (
          <g fill="none" stroke={stroke} strokeWidth="1.5">
            <path d="M60 60 L160 60 L220 130 L260 130" />
            <path d="M60 70 L160 70 L220 140 L260 140" />
            <circle cx="100" cy="65" r="3" fill={stroke} />
            <circle cx="240" cy="135" r="3" fill={stroke} />
            <line x1="170" y1="40" x2="170" y2="60" />
          </g>
        );
      default:
        return null;
    }
  })();

  return (
    <div
      aria-hidden="true"
      className="relative w-full aspect-[16/9] bg-foreground text-primary overflow-hidden"
    >
      {/* faint grid texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
      </svg>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="xMidYMid meet"
        className="relative w-full h-full"
      >
        {mark}
      </svg>
    </div>
  );
};

export default IndustryThumb;
