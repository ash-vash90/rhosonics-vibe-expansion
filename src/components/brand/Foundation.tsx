import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision + Mission as paired statement panels.
 * Page-level chapter header lives in PositioningPage via SectionHeader.
 *
 * Vision: dark chamfered hero with gradient wash and elevated shadow.
 * Mission: light surface, green rail, balanced typographic weight.
 */

const VISION_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 56px), calc(100% - 56px) 100%, 0 100%)";

const MISSION_CLIP =
  "polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)";

export const Foundation = () => {
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-10">
      {/* Vision — dark chamfered hero */}
      <article className="col-span-12 lg:col-span-7">
        <div
          className="relative overflow-hidden bg-foreground text-background p-10 md:p-14 lg:p-16 min-h-[420px] lg:min-h-[480px]"
          style={{
            clipPath: VISION_CLIP,
            boxShadow: "var(--shadow-elevated)",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70 pointer-events-none"
            style={{
              background:
                "radial-gradient(120% 80% at 100% 0%, hsl(var(--primary) / 0.4), transparent 55%), radial-gradient(80% 60% at 0% 100%, hsl(var(--rho-green-accent) / 0.22), transparent 60%)",
            }}
          />
          {/* Hairline grid texture for depth */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--background)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--background)) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative h-full flex flex-col">
            <div className="flex items-baseline gap-3 mb-10 md:mb-14">
              <span className="font-data text-xs tracking-[0.3em] uppercase text-primary">
                01.1.a
              </span>
              <span className="font-data text-[10px] tracking-[0.25em] uppercase text-background/60">
                Vision — The Long Horizon
              </span>
            </div>
            <p className="font-ui font-semibold tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl">
              Leading the way in what can be{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(110deg, hsl(var(--primary)) 0%, hsl(var(--rho-green-accent)) 100%)",
                }}
              >
                measured, controlled, and optimized
              </span>
              .
            </p>
            <span className="sr-only">{BRAND_VISION}</span>
          </div>
        </div>
      </article>

      {/* Mission — light chamfered surface */}
      <article className="col-span-12 lg:col-span-5">
        <div
          className="relative h-full bg-card p-10 md:p-12 lg:p-14 min-h-[420px] lg:min-h-[480px] flex flex-col"
          style={{
            clipPath: MISSION_CLIP,
            boxShadow: "var(--shadow-card)",
          }}
        >
          <div className="flex items-baseline gap-3 mb-10 md:mb-14">
            <span className="font-data text-xs tracking-[0.3em] uppercase text-primary">
              01.1.b
            </span>
            <span className="font-data text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
              Mission — The Work
            </span>
          </div>
          <p className="font-ui font-semibold tracking-tight leading-[1.15] text-2xl md:text-3xl lg:text-[2.25rem] text-foreground">
            Advanced measurement solutions for more{" "}
            <span className="text-primary">efficient</span>,{" "}
            <span className="text-primary">automated</span>, and{" "}
            <span className="text-primary">sustainable</span> operations.
          </p>
          <span className="sr-only">{BRAND_MISSION}</span>
        </div>
      </article>
    </div>
  );
};

export default Foundation;
