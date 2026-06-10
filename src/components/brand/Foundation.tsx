import { BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — Vision (obsidian, chamfered, dotted green) + Mission
 * (light surface, green rail). Matches the selected v2 "console-grid"
 * direction. Tokens only — no hardcoded hex.
 */

const VISION_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 48px), calc(100% - 48px) 100%, 0 100%)";

export const Foundation = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {/* Vision — obsidian, chamfered corner, green dot grid */}
    <article
      className="relative overflow-hidden bg-foreground text-background p-10 md:p-12 min-h-[360px] flex flex-col"
      style={{
        clipPath: VISION_CLIP,
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      {/* Green dot field */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Soft green wash, top-right */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--primary) / 0.35), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative z-10 flex flex-col h-full">
        <span className="block font-data text-xs tracking-[0.3em] uppercase text-primary mb-8">
          01.1 / Vision
        </span>
        <h2 className="font-ui font-semibold leading-[1.1] tracking-tight text-3xl md:text-4xl lg:text-5xl">
          Leading the way in what can be{" "}
          <span className="text-primary">
            measured, controlled, and optimized.
          </span>
        </h2>
        <div className="mt-8 h-1 w-24 bg-primary" />
        <span className="sr-only">{BRAND_VISION}</span>
      </div>
    </article>

    {/* Mission — light surface, green left rail */}
    <article
      className="relative bg-card p-10 md:p-12 min-h-[360px] flex flex-col border-l-4 border-primary"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <span className="block font-data text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">
        01.2 / Mission
      </span>
      <h3 className="font-ui font-semibold leading-[1.2] tracking-tight text-2xl md:text-3xl lg:text-[2.25rem] text-foreground mt-auto">
        Advanced measurement solutions for more{" "}
        <span className="bg-primary/10 px-1.5 text-primary">
          efficient, automated,
        </span>{" "}
        and{" "}
        <span className="bg-primary/10 px-1.5 text-primary">sustainable</span>{" "}
        operations.
      </h3>
      <span className="sr-only">{BRAND_MISSION}</span>
    </article>
  </div>
);

export default Foundation;
