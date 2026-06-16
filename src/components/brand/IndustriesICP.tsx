import { IndustryThumb } from "./IndustryThumb";
import { OperatorQuoteCard } from "./OperatorQuoteCard";
import { TabbedSwitcher, type SwitcherTab } from "./system/TabbedSwitcher";


/**
 * IndustriesICP — four industries we serve. Each tab describes the
 * measurement context in that industry and Rhosonics' position
 * within it, with the matched product. Not a landing-page card —
 * a short brief.
 */

interface Industry {
  id: string;
  num: string;
  name: string;
  /** What the industry is, in measurement terms. */
  context: string;
  /** Where Rhosonics sits in that picture. */
  position: string;
  product: { code: string; name: string };
}

const INDUSTRIES: Industry[] = [
  {
    id: "minerals",
    num: "01",
    name: "Mineral Processing",
    context:
      "Concentrators run on slurry density. Grinding circuits, hydrocyclones, thickeners and tailings lines all key off the same number, and the number drifts the moment the ore body does.",
    position:
      "We replace nuclear density gauges on the main slurry pipes with a non-radioactive ultrasonic measurement. Same point in the process, same accuracy band, no source licence, no decay curve.",
    product: { code: "SDM", name: "Slurry Density Meter" },
  },
  {
    id: "semiconductor",
    num: "02",
    name: "Semiconductor",
    context:
      "CMP slurry and chemical baths sit on tight concentration windows. A drift of a few tenths of a percent shows up later as yield loss, and inline measurement on dilute, abrasive media is hard to get right.",
    position:
      "Our concentration measurement runs inline on CMP slurry and process chemicals, so fabs can hold the recipe at the point of use instead of correcting from offline lab samples.",
    product: { code: "CCM", name: "Chemical Concentration Meter" },
  },
  {
    id: "flatpanel",
    num: "03",
    name: "Flat Panel Display",
    context:
      "Etch, strip and clean chemistries on display lines have to stay on spec across long campaigns. Bath composition changes continuously as glass is processed, and titration cycles can't keep up with line speed.",
    position:
      "We measure bath concentration inline and continuously, so the line controls dose against a live number instead of a sampled one. Fewer dump-and-recharge cycles, less chemistry to neutralise.",
    product: { code: "CCM", name: "Chemical Concentration Meter" },
  },
  {
    id: "chemicals",
    num: "04",
    name: "Chemicals",
    context:
      "Blending, dilution and reaction steps depend on knowing how much active is in the line right now. Many of these streams are aggressive, opaque or two-phase, which rules out most optical and conductivity methods.",
    position:
      "We sit on the pipe, not on a sample loop. The CCM gives producers a continuous concentration signal on streams that other inline techniques struggle with, with no consumables and no sample conditioning.",
    product: { code: "CCM", name: "Chemical Concentration Meter" },
  },
];

const tabs: SwitcherTab[] = INDUSTRIES.map((ind) => {
  return {
    id: ind.id,
    num: ind.num,
    name: ind.name,
    sub: ind.product.code,
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
        {/* left: photo */}
        <div className="lg:border-r border-border h-full min-h-[280px]">
          <IndustryThumb id={ind.id} />
        </div>

        {/* right: brief */}
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col gap-6 sm:gap-7">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {ind.num} · {ind.name}
            </span>
          </div>

          <div>
            <span className="block font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-2">
              The measurement
            </span>
            <p className="text-[15px] leading-relaxed text-foreground/85 max-w-[58ch]">
              {ind.context}
            </p>
          </div>

          <div>
            <span className="block font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground mb-2">
              Where we sit
            </span>
            <p className="text-[15px] leading-relaxed text-foreground/85 max-w-[58ch]">
              {ind.position}
            </p>
          </div>

          <div className="mt-auto pt-6 border-t border-border flex items-baseline gap-3">
            <span className="font-data text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Matched product
            </span>
            <span className="font-data text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
              {ind.product.code}
            </span>
            <span className="text-sm text-muted-foreground">
              {ind.product.name}
            </span>
          </div>
        </div>
      </div>
    ),
  };
});

export const IndustriesICP = () => (
  <div>
    <TabbedSwitcher tabs={tabs} ariaLabel="Industries we serve" />
    <OperatorQuoteCard />
  </div>
);

export default IndustriesICP;
