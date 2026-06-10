import { BRAND_VALUES, BRAND_VISION, BRAND_MISSION } from "@/data/brand-values";

/**
 * Foundation — the single, deliberate composition of the
 * canonical brand foundation: Vision, Mission, and the five values.
 *
 * Used on the Brand Position chapter. Linked from HomePage.
 * No decoration without reason. Greyscale-legible. Chamfer-free.
 */
export const Foundation = () => {
  return (
    <section aria-labelledby="foundation-heading" className="space-y-20 md:space-y-28">
      {/* Vision — the long horizon */}
      <div>
        <div className="flex items-baseline gap-4 mb-6">
          <span className="font-data text-xs text-primary">VISION</span>
          <div className="h-px flex-1 bg-border max-w-24" />
        </div>
        <h2
          id="foundation-heading"
          className="font-ui font-bold text-foreground tracking-tight leading-[0.95] text-4xl md:text-6xl lg:text-7xl max-w-5xl"
        >
          {BRAND_VISION}
        </h2>
      </div>

      {/* Mission — the operating commitment */}
      <div>
        <div className="flex items-baseline gap-4 mb-6">
          <span className="font-data text-xs text-primary">MISSION</span>
          <div className="h-px flex-1 bg-border max-w-24" />
        </div>
        <p className="font-ui font-semibold text-foreground tracking-tight leading-[1.1] text-2xl md:text-4xl lg:text-5xl max-w-4xl">
          {BRAND_MISSION}
        </p>
      </div>

      {/* Values — five, in canonical order */}
      <div>
        <div className="flex items-baseline gap-4 mb-10">
          <span className="font-data text-xs text-primary">VALUES</span>
          <div className="h-px flex-1 bg-border max-w-24" />
        </div>

        <ol className="divide-y divide-border border-t border-b border-border">
          {BRAND_VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <li
                key={value.id}
                className="grid grid-cols-[auto_auto_1fr] md:grid-cols-[6rem_auto_1fr] items-baseline gap-x-4 md:gap-x-8 gap-y-2 py-8 md:py-10"
              >
                <span className="font-data text-xs md:text-sm text-muted-foreground">
                  {value.num}
                </span>
                <div className="flex items-center gap-3 md:gap-4">
                  <Icon
                    className="w-4 h-4 md:w-5 md:h-5 text-foreground/60"
                    aria-hidden
                  />
                  <h3 className="font-ui font-bold text-foreground tracking-tight text-2xl md:text-3xl lg:text-4xl">
                    {value.title}
                  </h3>
                </div>
                <p className="col-span-3 md:col-start-3 md:col-end-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {value.desc}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Foundation;
