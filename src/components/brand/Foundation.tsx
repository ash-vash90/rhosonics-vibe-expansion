import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — the /position hero.
 *
 * Vision: dark, chamfered, large-scale statement with gradient accent.
 * Mission: lighter surface, large type, green gradient rail.
 *
 * Chamfers used only on these large hero surfaces (allowed under the
 * chamfer rule). Colour used for emphasis on key phrases only.
 */

const VISION_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 56px), calc(100% - 56px) 100%, 0 100%)";

const MISSION_CLIP =
  "polygon(40px 0, 100% 0, 100% 100%, 0 100%, 0 40px)";

export const Foundation = () => {
  return (
    <section aria-labelledby="foundation-heading" className="relative">
      <h2 id="foundation-heading" className="sr-only">
        Vision and mission
      </h2>

      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        {/* Vision — dark chamfered hero */}
        <article className="col-span-12 lg:col-span-7">
          <div
            className="relative overflow-hidden bg-foreground text-background p-10 md:p-14 lg:p-16"
            style={{ clipPath: VISION_CLIP }}
          >
            {/* Soft gradient wash — emphasis only */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                background:
                  "radial-gradient(120% 80% at 100% 0%, hsl(var(--primary) / 0.35), transparent 55%), radial-gradient(80% 60% at 0% 100%, hsl(var(--primary) / 0.18), transparent 60%)",
              }}
            />
            <div className="relative">
              <span className="block font-data text-sm md:text-base tracking-[0.25em] uppercase text-primary mb-8 md:mb-10">
                The Long Horizon — Vision
              </span>
              <p className="font-ui font-semibold tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl">
                Leading the way in what can be{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, hsl(var(--primary)) 0%, hsl(var(--rho-green-accent, var(--primary))) 100%)",
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

        {/* Mission — light chamfered surface, scaled to balance Vision */}
        <article className="col-span-12 lg:col-span-5">
          <div
            className="relative h-full bg-muted/50 p-10 md:p-12 lg:p-14 border-t-4 border-primary"
            style={{ clipPath: MISSION_CLIP }}
          >
            <span className="block font-data text-sm md:text-base tracking-[0.25em] uppercase text-primary mb-8 md:mb-10">
              The Work — Mission
            </span>
            <p className="font-ui font-semibold tracking-tight leading-[1.15] text-2xl md:text-3xl lg:text-[2.5rem] text-foreground">
              Advanced measurement solutions for more{" "}
              <span className="text-primary">efficient</span>,{" "}
              <span className="text-primary">automated</span>, and{" "}
              <span className="text-primary">sustainable</span> operations.
            </p>
            <span className="sr-only">{BRAND_MISSION}</span>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Foundation;
