import { cn } from "@/lib/utils";

/**
 * MacroPhotographySpec — documents the macro-photography treatment used
 * across case studies and product hero sections. Inspired by FLSmidth /
 * Metso / Vaisala: tight, tactile crops of the medium being measured
 * (slurry, tailings, mineral grains, water surface, sensor contact face).
 *
 * Pure documentation component. No new tokens, no new imagery — the spec
 * is enforced via existing photo-treatment grades in ImageryGuidelines.
 */

const RULES = [
  {
    code: "M.01",
    title: "Crop on the medium, not the machine",
    body:
      "Frame the slurry, tailings, mineral, or fluid being measured. The sensor — if visible — sits at the frame edge as evidence of contact, never as hero subject.",
  },
  {
    code: "M.02",
    title: "Subject distance ≤ 40 cm",
    body:
      "True macro. Surface texture, granularity, and reflectivity must read at full resolution. No telephoto compression; no drone-shot industrial overviews.",
  },
  {
    code: "M.03",
    title: "Single directional key light",
    body:
      "One hard or semi-diffused source, 30–60° off-axis, to model the medium's surface. Avoid flat ringlight or composite HDR — they flatten the evidence.",
  },
  {
    code: "M.04",
    title: "Desaturate ambient, preserve true medium colour",
    body:
      "Treatment grade B applies: ambient hue −60%, medium hue preserved. Copper tailings stay copper; slurry stays slurry. The medium is the fact.",
  },
  {
    code: "M.05",
    title: "Negative space reserved for data overlay",
    body:
      "Compose with a clean 1/3 region (top-right by default) so a JetBrains Mono stat or FactFile entry can overlay without scrim or blur.",
  },
  {
    code: "M.06",
    title: "Never stock, never staged",
    body:
      "Field-captured at customer sites only. No agency stock. No studio mockups. If an image cannot be sourced, use a typographic plate instead.",
  },
];

const SPECS = [
  { k: "Crop", v: "1:1 or 3:2, never 16:9" },
  { k: "Distance", v: "≤ 40 cm to subject" },
  { k: "Light", v: "Single key · 30–60° off-axis" },
  { k: "Treatment", v: "Grade B · ambient −60%" },
  { k: "Negative space", v: "≥ 33% reserved" },
  { k: "Source", v: "Field, customer site" },
];

export const MacroPhotographySpec = ({ className }: { className?: string }) => {
  return (
    <div className={cn("space-y-10", className)}>
      <header className="max-w-3xl">
        <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
          Imagery · Macro specimen
        </div>
        <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-[1.1] mb-3">
          Photograph the medium, not the machine.
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Macro is the evidence layer of the photo system. Every case study uses one
          tight, tactile frame of the substance being measured — proof that the
          instrument lives in the real medium, not a brochure.
        </p>
      </header>

      <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
        {RULES.map((r) => (
          <li
            key={r.code}
            className="bg-background p-6 md:p-7 flex flex-col gap-3"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-data text-[10px] uppercase tracking-[0.25em] text-primary">
                {r.code}
              </span>
              <h4 className="font-ui text-base md:text-lg font-semibold text-foreground leading-snug">
                {r.title}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[55ch]">
              {r.body}
            </p>
          </li>
        ))}
      </ol>

      <dl className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
        {SPECS.map((s) => (
          <div
            key={s.k}
            className="flex flex-col gap-1.5 bg-[hsl(var(--slate-100))] px-5 py-4"
          >
            <dt className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {s.k}
            </dt>
            <dd className="font-ui text-sm text-foreground">{s.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default MacroPhotographySpec;
