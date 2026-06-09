import { cn } from "@/lib/utils";
import { Check, AlertTriangle } from "@/lib/icons";

/**
 * HeroTypeScaleAudit — Phase 4 deliverable.
 *
 * Codifies the canonical four-tier display hierarchy and audits the
 * actual usage across the codebase. Hierarchy is strictly stepped: each
 * tier is at least one Tailwind step smaller than the one above at every
 * breakpoint, so adjacent levels never visually compete.
 *
 *   Tier  Role               sm        md         lg         xl
 *   ----  -----------------  --------  ---------  ---------  ---------
 *   H0    Site hero (root)   text-5xl  text-6xl   text-7xl   text-8xl
 *   H1    Page banner        text-4xl  text-5xl   text-6xl   text-7xl
 *   H2    Section title      text-3xl  text-4xl   text-5xl   text-6xl
 *   H3    Sub-section        text-2xl  text-3xl   text-4xl   text-4xl
 *
 *   Data display (numerals only, JetBrains Mono):
 *   D0    Impact-first stat  text-7xl  text-8xl   text-9xl   text-9xl
 *   D1    Stat callout       text-3xl  text-4xl   text-5xl   text-5xl
 *
 * Pure documentation. No new tokens. No runtime behaviour.
 */

interface ScaleRow {
  tier: string;
  role: string;
  scale: string;
  example: string;
  font: "ui" | "data";
}

const TYPE_SCALE: ScaleRow[] = [
  { tier: "H0", role: "Site hero (BrandLayout root)", scale: "5xl · 6xl · 7xl · 8xl", example: "Measurement is trust.", font: "ui" },
  { tier: "H1", role: "Page banner (PageBanner)", scale: "4xl · 5xl · 6xl · 7xl", example: "Proof & Examples", font: "ui" },
  { tier: "H2", role: "Section title (SectionUtils)", scale: "3xl · 4xl · 5xl · 6xl", example: "Industry applications", font: "ui" },
  { tier: "H3", role: "Sub-section heading", scale: "2xl · 3xl · 4xl · 4xl", example: "Liquid profiles", font: "ui" },
];

const DATA_SCALE: ScaleRow[] = [
  { tier: "D0", role: "Impact-first metric (ImpactFirstHero)", scale: "7xl · 8xl · 9xl · 9xl", example: "−14%", font: "data" },
  { tier: "D1", role: "Stat callout (StatCallout, ImpactBar)", scale: "3xl · 4xl · 5xl · 5xl", example: "±0.05%", font: "data" },
];

interface AuditRow {
  file: string;
  current: string;
  expected: string;
  status: "ok" | "fixed" | "warn";
  note: string;
}

const AUDIT: AuditRow[] = [
  {
    file: "BrandLayout · hero H1",
    current: "5xl · 6xl · 7xl · 8xl",
    expected: "H0 · 5xl · 6xl · 7xl · 8xl",
    status: "ok",
    note: "Site-level hero. Only one H0 per page.",
  },
  {
    file: "PageBanner · H1",
    current: "4xl · 5xl · 6xl · 7xl",
    expected: "H1 · 4xl · 5xl · 6xl · 7xl",
    status: "ok",
    note: "One H1 per route. Watermark numeral scales with viewport.",
  },
  {
    file: "SectionUtils · SectionTitle H2",
    current: "3xl · 4xl · 5xl · 6xl",
    expected: "H2 · 3xl · 4xl · 5xl · 6xl",
    status: "fixed",
    note: "Was tied with PageBanner H1 (4xl→7xl) — stepped down one tier in Phase 4.",
  },
  {
    file: "SectionFullBleedMock · h2",
    current: "3xl · 5xl · 6xl",
    expected: "H1/H2 hybrid · acceptable for full-bleed",
    status: "ok",
    note: "Centered marquee variant — visually distinct, no adjacency conflict.",
  },
  {
    file: "ImpactFirstHero · metric",
    current: "7xl · 8xl · 9xl",
    expected: "D0 · 7xl · 8xl · 9xl · 9xl",
    status: "ok",
    note: "Data tier. Sits beside (not in place of) the H1 banner.",
  },
  {
    file: "TypographyScale · display row",
    current: "3xl · 4xl · 5xl",
    expected: "D1 · matches stat callout (label only)",
    status: "warn",
    note: "Documentation row uses D1 scale; that is intentional preview shrinkage.",
  },
];

const statusBadge = (s: AuditRow["status"]) => {
  if (s === "ok")
    return (
      <span className="inline-flex items-center gap-1.5 font-data text-[10px] uppercase tracking-[0.2em] text-primary">
        <Check className="w-3 h-3" /> Pass
      </span>
    );
  if (s === "fixed")
    return (
      <span className="inline-flex items-center gap-1.5 font-data text-[10px] uppercase tracking-[0.2em] text-primary">
        <Check className="w-3 h-3" /> Fixed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 font-data text-[10px] uppercase tracking-[0.2em] text-foreground/70">
      <AlertTriangle className="w-3 h-3" /> Note
    </span>
  );
};

export const HeroTypeScaleAudit = ({ className }: { className?: string }) => (
  <div className={cn("space-y-12", className)}>
    <header className="max-w-3xl">
      <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
        05.3 · Hero type-scale audit
      </div>
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-[1.1] mb-3">
        Four UI tiers, two data tiers. Adjacent ones never tie.
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        Display headings step down by exactly one Tailwind size at every
        breakpoint. If two tiers ever land on the same ramp the hierarchy
        flattens — the reader can no longer tell page from section from
        sub-section at a glance.
      </p>
    </header>

    {/* Canonical scale */}
    <section aria-labelledby="canonical-ui" className="space-y-4">
      <h4 id="canonical-ui" className="font-data text-[11px] uppercase tracking-[0.25em] text-foreground/70">
        UI display tiers
      </h4>
      <div className="grid grid-cols-1 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
        {TYPE_SCALE.map((r) => (
          <div key={r.tier} className="bg-background grid grid-cols-12 gap-4 items-baseline px-5 py-5">
            <span className="col-span-12 md:col-span-1 font-data text-xs uppercase tracking-[0.2em] text-primary">
              {r.tier}
            </span>
            <span className="col-span-12 md:col-span-4 font-ui text-sm text-foreground/80">{r.role}</span>
            <span className="col-span-12 md:col-span-3 font-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {r.scale}
            </span>
            <span className={cn(
              "col-span-12 md:col-span-4 font-ui font-bold tracking-tight leading-[1.0] text-foreground truncate",
              r.tier === "H0" && "text-4xl",
              r.tier === "H1" && "text-3xl",
              r.tier === "H2" && "text-2xl",
              r.tier === "H3" && "text-xl",
            )}>
              {r.example}
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* Data scale */}
    <section aria-labelledby="canonical-data" className="space-y-4">
      <h4 id="canonical-data" className="font-data text-[11px] uppercase tracking-[0.25em] text-foreground/70">
        Data display tiers
      </h4>
      <div className="grid grid-cols-1 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
        {DATA_SCALE.map((r) => (
          <div key={r.tier} className="bg-background grid grid-cols-12 gap-4 items-baseline px-5 py-5">
            <span className="col-span-12 md:col-span-1 font-data text-xs uppercase tracking-[0.2em] text-primary">
              {r.tier}
            </span>
            <span className="col-span-12 md:col-span-4 font-ui text-sm text-foreground/80">{r.role}</span>
            <span className="col-span-12 md:col-span-3 font-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {r.scale}
            </span>
            <span className={cn(
              "col-span-12 md:col-span-4 font-data font-bold uppercase tracking-tight leading-none text-foreground",
              r.tier === "D0" && "text-5xl",
              r.tier === "D1" && "text-3xl",
            )}>
              {r.example}
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* Audit table */}
    <section aria-labelledby="audit-results" className="space-y-4">
      <h4 id="audit-results" className="font-data text-[11px] uppercase tracking-[0.25em] text-foreground/70">
        Codebase audit results
      </h4>
      <div className="grid grid-cols-1 gap-px bg-[hsl(var(--slate-200))] rounded overflow-hidden">
        {AUDIT.map((a) => (
          <div key={a.file} className="bg-background grid grid-cols-12 gap-4 items-start px-5 py-5">
            <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
              <span className="font-ui text-sm font-semibold text-foreground">{a.file}</span>
              {statusBadge(a.status)}
            </div>
            <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
              <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Current</span>
              <span className="font-data text-xs uppercase tracking-wider text-foreground/85">{a.current}</span>
            </div>
            <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
              <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Expected</span>
              <span className="font-data text-xs uppercase tracking-wider text-foreground/85">{a.expected}</span>
            </div>
            <p className="col-span-12 md:col-span-2 text-xs text-muted-foreground leading-relaxed">
              {a.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default HeroTypeScaleAudit;
