import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryEyebrow, TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const ImageryGuidelines = lazy(() => import("@/components/brand/ImageryGuidelines"));
const MacroPhotographySpec = lazy(() =>
  import("@/components/brand/MacroPhotographySpec").then(m => ({ default: m.MacroPhotographySpec })),
);

interface Ratio {
  code: string;
  category: string;
  share: number;
  body: string;
}

// Photography proportion ratios — the Herman Miller / B&O move. Photography is
// a fixed budget, not an open palette. Each category gets a target share of any
// asset spread (site, deck, datasheet).
const RATIOS: Ratio[] = [
  {
    code: "IMG.A",
    category: "Macro of medium",
    share: 40,
    body: "Slurry, sediment, tailings, sludge — photographed at distance under directional light. The subject of the brand is what we measure, not what we measure it with.",
  },
  {
    code: "IMG.B",
    category: "Site documentation",
    share: 30,
    body: "Plant, dredge, concentrator, wastewater works. Wide enough to show context, never stylised. Operators in frame where consented.",
  },
  {
    code: "IMG.C",
    category: "Instrument in situ",
    share: 20,
    body: "The product mounted in the line — never as hero, always inside its work. No isolated product shots on white.",
  },
  {
    code: "IMG.D",
    category: "Technical / cutaway",
    share: 10,
    body: "Engineered renders and section drawings used to explain construction. Treat as illustration, not photography.",
  },
];

const ImageryPage = () => (
  <>
    <PageBanner
      number="07"
      title="Imagery"
      subtitle="Four categories. Fixed proportions. Photograph the medium, not the marketing."
      meta={["Visual System", "v2025"]}
    />

    {/* 07.1 Proportion ratios */}
    <ScrollSection id="ratios">
      <header className="max-w-3xl mb-10">
        <TelemetryEyebrow className="mb-3" code="07.1" label="Proportion ratios" />
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          The image budget.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Photography is rationed, not chosen by mood. Any asset that contains more than three
          images must hit the proportions below — measured across the spread, not per image.
        </p>
      </header>

      <div className="grid gap-px bg-[hsl(var(--slate-200))]">
        {RATIOS.map((r) => (
          <article
            key={r.code}
            className="bg-background grid grid-cols-1 md:grid-cols-[140px_1fr_72px] gap-4 md:gap-8 p-5 md:p-6 items-start"
          >
            <div className="font-data text-[11px] uppercase tracking-[0.22em] text-primary">
              {r.code} · {r.category}
            </div>
            <p className="font-ui text-sm md:text-base text-foreground/85 leading-relaxed">{r.body}</p>
            <div className="font-data text-2xl md:text-3xl text-foreground md:text-right">
              {r.share}<span className="text-muted-foreground text-base">%</span>
            </div>
          </article>
        ))}
      </div>
    </ScrollSection>

    <SectionDivider label="07.2" />

    {/* 07.2 Treatment & technique */}
    <ScrollSection id="treatment" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ImageryGuidelines /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="07.3" />

    {/* 07.3 Macro of medium — full spec */}
    <ScrollSection id="macro">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><MacroPhotographySpec /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="07.x" />

    {/* 07.x Governance */}
    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="07.x"
          questions={[
            "Across the full spread, do the four categories add up to 100% within ±5%?",
            "Is the medium the hero of the macro shot — not the instrument?",
            "Did the site shot get consent for any operator visible in frame?",
            "Could a stock photographer have shot this? If yes, reshoot.",
          ]}
        />
        <AdditionalDonts
          code="07.y"
          items={[
            "Never use stock photography of generic \"industry\".",
            "Never composite logos, charts, or icons onto photography.",
            "Never duotone photography with brand Green.",
            "Never photograph the instrument on white — always in situ.",
            "Never crop a face out of a wide site shot to avoid consent paperwork.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Proof & Case Studies", to: "/proof", description: "Where the photography is deployed (09.B)" },
        { label: "Color", to: "/color", description: "Why brand colours never tint photos (04)" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "07 · Imagery" },
        { label: "Scope", value: "Categories + Treatment + Macro" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ImageryPage;
