import { cn } from "@/lib/utils";

/**
 * SectionRhythmGuide — documents the Data / Power / Action rotation that
 * sits above the existing six section variants.
 *
 * Adjacency rules:
 *   - Never two consecutive sections from the same MODE.
 *   - Never two consecutive sections sharing the same VARIANT
 *     (already enforced at dev-time by assertSectionRhythm).
 */

type Mode = "data" | "power" | "action";

const MODES: { mode: Mode; title: string; variants: string[]; use: string }[] = [
  {
    mode: "data",
    title: "Data",
    variants: ["default", "tinted", "eco"],
    use: "Evidence-dense reading. Specs, charts, capability grids, sustainability metrics.",
  },
  {
    mode: "power",
    title: "Power",
    variants: ["dark"],
    use: "Statement. Used sparingly — never adjacent, never more than once per ~5 sections.",
  },
  {
    mode: "action",
    title: "Action",
    variants: ["split", "fullBleedMock"],
    use: "Interactive or product-forward. HMIs, asymmetric scaffolds, signup CTAs.",
  },
];

const modeAccent: Record<Mode, string> = {
  data: "bg-[hsl(var(--slate-100))] text-foreground",
  power: "bg-rho-obsidian text-slate-100",
  action: "bg-[hsl(var(--eco-surface))] text-foreground",
};

export const SectionRhythmGuide = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col gap-8", className)}>
    <header className="max-w-3xl">
      <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
        Rhythm · Data / Power / Action
      </div>
      <h3 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-2xl md:text-4xl mb-3">
        Three modes above six variants
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        The six section variants resolve into three reading modes. Pages
        alternate modes — never two adjacent sections from the same mode,
        and never two adjacent sections sharing the same variant.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
      {MODES.map(({ mode, title, variants, use }) => (
        <div
          key={mode}
          className={cn("flex flex-col gap-3 p-6 md:p-8", modeAccent[mode])}
        >
          <div className="font-data text-[10px] uppercase tracking-[0.3em] opacity-70">
            Mode
          </div>
          <div className="font-ui font-bold text-xl md:text-2xl">{title}</div>
          <div className="font-data text-[11px] uppercase tracking-[0.2em] opacity-80">
            {variants.join(" · ")}
          </div>
          <p className="text-sm leading-relaxed opacity-90 max-w-[34ch]">{use}</p>
        </div>
      ))}
    </div>

    <pre className="font-data text-[11px] md:text-xs uppercase tracking-[0.15em] text-muted-foreground bg-[hsl(var(--slate-100))] rounded p-5 overflow-x-auto">
{`Data  →  Action  →  Data  →  Power  →  Action  →  Data
default   split      tinted   dark      fullBleed   eco`}
    </pre>
  </div>
);

export default SectionRhythmGuide;
