import { ReactNode } from "react";

interface ChapterBannerProps {
  number: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  /** Right-column slot (e.g. an InstrumentPanel). */
  instrument?: ReactNode;
  /** Below-subtitle slot (e.g. chip row). */
  children?: ReactNode;
}

/**
 * ChapterBanner — the chapter hero treatment lifted from the
 * Claude-generated homepage. Obsidian surface with:
 *  • radial green wash (top)
 *  • 80px grid masked by a radial ellipse
 *  • SVG turbulence noise at low opacity
 *  • optional right-column instrument panel
 *
 * Replaces PageBanner on chapter pages that want the dark hero.
 */
export const ChapterBanner = ({
  number,
  eyebrow,
  title,
  subtitle,
  instrument,
  children,
}: ChapterBannerProps) => (
  <section
    className="relative overflow-hidden -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20 text-[hsl(var(--slate-50))]"
    style={{
      background: "hsl(var(--rho-obsidian))",
      borderBottom: "1px solid hsl(224 18% 18%)",
    }}
  >
    {/* radial green wash */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--rho-green) / 0.18) 0%, transparent 55%)",
      }}
    />
    {/* grid */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(hsl(224 18% 16% / 0.6) 1px, transparent 1px), linear-gradient(90deg, hsl(224 18% 16% / 0.6) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage:
          "radial-gradient(ellipse 60% 80% at 70% 50%, black 20%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 80% at 70% 50%, black 20%, transparent 80%)",
      }}
    />
    {/* noise */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
      }}
    />

    <div className="relative max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 xl:px-20 pt-14 pb-16 md:pt-20 md:pb-24">
      <div
        className={`grid gap-12 lg:gap-16 items-center ${
          instrument ? "lg:grid-cols-[1.1fr_1fr]" : "grid-cols-1"
        }`}
      >
        <div>
          {/* eyebrow row */}
          <div className="inline-flex items-center gap-3 mb-7">
            <span
              aria-hidden="true"
              className="block h-2 w-2 rounded-full bg-primary"
              style={{
                boxShadow: "0 0 0 3px hsl(var(--rho-green) / 0.25)",
                animation: "pulse 2s cubic-bezier(0.16,1,0.3,1) infinite",
              }}
            />
            <span className="font-data text-[11px] md:text-xs font-medium uppercase tracking-[0.14em] text-[hsl(var(--rho-green-accent))]">
              {number}
              {eyebrow ? ` · ${eyebrow}` : ""}
            </span>
          </div>

          <h1
            className="font-ui font-bold text-balance leading-[1.05] text-[hsl(var(--slate-50))] mb-6"
            style={{
              fontSize: "clamp(30px, 3.6vw, 46px)",
              letterSpacing: "-0.022em",
            }}
          >
            {title}
          </h1>
          <p className="text-base md:text-lg leading-[1.55] text-[hsl(var(--slate-300))] max-w-[52ch] mb-8">
            {subtitle}
          </p>
          {children}
        </div>

        {instrument && <div className="relative">{instrument}</div>}
      </div>
    </div>

    <style>{`
      @keyframes pulse {
        0%, 100% { box-shadow: 0 0 0 3px hsl(var(--rho-green) / 0.25); }
        50% { box-shadow: 0 0 0 8px hsl(var(--rho-green) / 0); }
      }
    `}</style>
  </section>
);

export default ChapterBanner;
