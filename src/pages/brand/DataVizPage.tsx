import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

/**
 * 08 Data Visualization — first-class brand discipline.
 * A sensor company's product output is data; how we draw it is a brand decision.
 */

const PRINCIPLES = [
  {
    code: "P.01",
    title: "Understandable",
    body: "A chart is read in three seconds or it has failed. Strip embellishment before adding clarity.",
  },
  {
    code: "P.02",
    title: "Essential",
    body: "Choose the chart type that answers the question. Bar for comparison, line for trend, area only when magnitude matters more than the boundary.",
  },
  {
    code: "P.03",
    title: "Honest",
    body: "Axes start at zero unless a non-zero baseline is named in the caption. Sample size and as-of date appear on every chart.",
  },
  {
    code: "P.04",
    title: "Consistent",
    body: "The same metric uses the same colour, scale, and unit across every appearance in the system.",
  },
  {
    code: "P.05",
    title: "Contextual",
    body: "An engineer in a control room reads differently than a board reading a quarterly review. The chart adapts to the reader.",
  },
];

const DataVizPage = () => (
  <>
    <PageBanner
      number="08"
      title="Data Visualization"
      subtitle="A sensor company's primary product output is data. How we render it is a brand decision, not a dashboard feature."
      meta={["Visual System", "v2025"]}
    />

    {/* 08.1 Principles */}
    <ScrollSection id="principles">
      <header className="max-w-3xl mb-10">
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          Five rules for every chart.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Adapted from IBM's data-viz canon with a sixth lens added for our context: honesty. Charts that flatter
          us by omission damage the brand more than charts that look plain.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[hsl(var(--slate-200))]">
        {PRINCIPLES.map((p) => (
          <article key={p.code} className="bg-background p-6 md:p-8">
            <div className="font-data text-[10px] uppercase tracking-[0.25em] text-primary mb-3">{p.code}</div>
            <h3 className="font-ui text-lg md:text-xl font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-foreground/75 text-sm md:text-base leading-relaxed">{p.body}</p>
          </article>
        ))}
      </div>
    </ScrollSection>

    <SectionDivider label="08.2" />

    {/* 08.2 Honesty rules */}
    <ScrollSection id="honesty" variant="tinted">
      <header className="max-w-3xl mb-10">
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          A misdrawn chart is a misstatement.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          The rules below are non-negotiable. They survive every chart, in every channel, regardless of who drew
          it or where it appears.
        </p>
      </header>

      <ul className="grid md:grid-cols-2 gap-px bg-[hsl(var(--slate-200))] max-w-5xl">
        {[
          "Y-axis starts at zero unless the caption names the non-zero baseline.",
          "Sample size (n=) appears in the caption of every chart.",
          "Time-series charts always show the as-of date and the rolling window.",
          "Comparative charts cite the source for every series.",
          "Uncertainty bounds shown wherever the measurement has them.",
          "Truncated axes use a visible break mark — never a smooth scale.",
        ].map((rule, i) => (
          <li key={rule} className="bg-background p-5 md:p-6 flex items-start gap-4">
            <span className="font-data text-[11px] uppercase tracking-[0.2em] text-primary shrink-0 mt-1">
              H.{String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-ui text-sm md:text-base text-foreground/85 leading-relaxed">{rule}</span>
          </li>
        ))}
      </ul>
    </ScrollSection>

    <SectionDivider label="08.3" />

    {/* 08.3 Implementation note */}
    <ScrollSection id="implementation">
      <div className="max-w-3xl">
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight mb-4">
          billboard.js. Never Recharts.
        </h2>
        <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
          The library is locked: <span className="font-data uppercase tracking-wider">billboard.js</span> renders
          every chart in the system. Recharts is banned (see Removed Sections Log). The choice is not aesthetic —
          it is operational stability across the marketing site, partner portal, and embedded HMI views.
        </p>
      </div>
    </ScrollSection>

    <SectionDivider label="08.4" />

    {/* 08.4 Governance */}
    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="08.4"
          questions={[
            "Would an engineer trust this chart enough to act on it?",
            "Is the as-of date visible without zooming?",
            "Did we choose the chart type because of the question, or the aesthetic?",
            "If a competitor drew the same data, would the result look different?",
          ]}
        />
        <AdditionalDonts
          code="08.5"
          items={[
            "Never use 3D charts. Ever.",
            "Never use pie charts with more than four slices.",
            "Never use dual y-axes without a strong reason and a clear label.",
            "Never animate a chart on load in a way that distorts the reading.",
            "Never colour a single series across multiple brand colours.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Proof & Case Studies", to: "/proof", description: "Charts in production (10.x)" },
        { label: "Color", to: "/color", description: "The palette charts draw from" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "08 · Data Visualization" },
        { label: "Library", value: "billboard.js" },
        { label: "Owner", value: "MarComms × Engineering" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default DataVizPage;
