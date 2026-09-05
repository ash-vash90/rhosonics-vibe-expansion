/**
 * 02.2 Before / After Rewrite Table — the central teaching tool (Klarna model).
 *
 * Each row is an illustrative writing exercise, not approved product copy. The
 * voice on the right. The "pattern" column makes the rewrite generalizable.
 */

interface Rewrite {
  before: string;
  after: string;
  pattern: string;
}

const ROWS: Rewrite[] = [
  {
    before:
      "Our advanced sensor technology leverages multi-axis measurement capabilities to deliver actionable insights.",
    after: "Measures slurry density inline. [Approved tolerance] under [test conditions]. Source: [datasheet revision].",
    pattern: "Replace adjectives with specifications.",
  },
  {
    before: "Rhosonics is proud to be a trusted partner for industrial customers worldwide.",
    after: "[Verified installation count] across [defined regions], as of [date]. Source: [record].",
    pattern: "Replace pride with evidence.",
  },
  {
    before: "Significantly reduce chemical consumption with our innovative inline solution.",
    after: "Polymer use changed by [measured amount] versus [baseline] over [period]. Source: [approved report].",
    pattern: "State the number, name the verifier.",
  },
  {
    before:
      "Enable seamless integration with your existing control infrastructure for unparalleled operational efficiency.",
    after: "Connects through [supported interfaces for this configuration]. Source: [integration guide revision].",
    pattern: "Drop \"seamless\". List the protocols.",
  },
  {
    before: "Discover how our cutting-edge density meter is revolutionizing the dredging industry.",
    after: "[Approved site], [date]: [measured outcome] with density-controlled loading. Source: [field report].",
    pattern: "One site, one outcome, one date.",
  },
  {
    before: "We are committed to sustainability through environmentally responsible practices.",
    after: "[Reporting period]: [measured energy saving] against [baseline]. Method and verification: [report link].",
    pattern: "Commitment is a number with a verifier.",
  },
  {
    before: "Get in touch to learn more about how we can help your business succeed.",
    after: "Discuss your process with our team. Include the medium, pipe size and operating conditions.",
    pattern: "Give the reader a useful next step.",
  },
];

export const RewriteTable = () => (
  <div className="grid gap-px bg-[hsl(var(--slate-200))]">
    {/* Header */}
    <div className="hidden md:grid grid-cols-[1fr_1fr_240px] bg-background">
      <div className="px-5 py-3 font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Before
      </div>
      <div className="px-5 py-3 font-data text-[10px] uppercase tracking-[0.25em] text-primary">
        After
      </div>
      <div className="px-5 py-3 font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        Pattern
      </div>
    </div>

    {ROWS.map((r, i) => (
      <article
        key={i}
        className="grid grid-cols-1 md:grid-cols-[1fr_1fr_240px] bg-background"
      >
        <div className="px-5 py-5 md:py-6 border-b md:border-b-0 md:border-r border-[hsl(var(--slate-200))]">
          <div className="md:hidden font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
            Before
          </div>
          <p className="text-foreground/55 italic line-through decoration-foreground/25 text-sm md:text-base leading-relaxed">
            {r.before}
          </p>
        </div>
        <div className="px-5 py-5 md:py-6 border-b md:border-b-0 md:border-r border-[hsl(var(--slate-200))]">
          <div className="md:hidden font-data text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
            After
          </div>
          <p className="text-foreground font-medium text-sm md:text-base leading-relaxed">{r.after}</p>
        </div>
        <div className="px-5 py-5 md:py-6 bg-[hsl(var(--slate-100))]/60">
          <div className="md:hidden font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
            Pattern
          </div>
          <p className="font-data text-[11px] uppercase tracking-[0.18em] text-foreground/75 leading-relaxed">
            {r.pattern}
          </p>
        </div>
      </article>
    ))}
  </div>
);

export default RewriteTable;
