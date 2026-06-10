import { BRAND_VALUES, BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — the /position hero.
 *
 * Two-part composition:
 *  · Vision: dark, chamfered, large-scale statement (left, 8 cols)
 *  · Mission: green hairline-rail, bottom-aligned (right, 4 cols)
 *
 * Chamfer on the Vision panel is intentional — it's a large hero surface
 * and qualifies under the chamfer rule. The Mission column is plain.
 */

const VISION_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)";

export const Foundation = () => {
  return (
    <section aria-labelledby="foundation-heading" className="relative">
      <p className="font-data text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">
        01 — Brand Position
      </p>
      <h2 id="foundation-heading" className="sr-only">
        Vision and mission
      </h2>

      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {/* Vision — dark chamfered hero panel */}
        <article className="col-span-12 lg:col-span-8">
          <div
            className="bg-foreground text-background p-10 md:p-14 lg:p-16"
            style={{ clipPath: VISION_CLIP }}
          >
            <span className="block font-data text-[10px] tracking-[0.2em] uppercase text-primary mb-6">
              The Long Horizon
            </span>
            <p className="font-ui font-semibold tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl">
              {BRAND_VISION}
            </p>
          </div>
        </article>

        {/* Mission — calm, present-tense, green rail */}
        <article className="col-span-12 lg:col-span-4 flex flex-col justify-end lg:pl-2 pb-2">
          <div className="border-l-2 border-primary pl-6 md:pl-8">
            <span className="block font-data text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              The Mission
            </span>
            <p className="font-ui text-lg md:text-xl text-foreground/80 leading-relaxed">
              {BRAND_MISSION}
            </p>
          </div>
        </article>
      </div>

      {/* Hidden values payload — consumed by ValueOperatingRules below.
          Kept silent here so the hero stays a hero. */}
      <span className="sr-only">
        {BRAND_VALUES.map((v) => `${v.num} ${v.title}. ${v.desc} `).join("")}
      </span>
    </section>
  );
};

export default Foundation;
