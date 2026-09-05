import { BRAND_SYSTEM } from "@/data/brand-system";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
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
  role: string;
  body: string;
}

// Photography proportion ratios — the Herman Miller / B&O move. Photography is
// a fixed budget, not an open palette. Each category gets a target share of any
// asset spread (site, deck, datasheet).
const RATIOS: Ratio[] = [
  {
    code: "IMG.A",
    category: "Macro of medium",
    role: "Medium",
    body: "Show the relevant material when it helps explain the measurement. Preserve its true colour and texture.",
  },
  {
    code: "IMG.B",
    category: "Site documentation",
    role: "Process",
    body: "Plant, dredge, concentrator, wastewater works. Wide enough to show context, never stylised. Operators in frame where consented.",
  },
  {
    code: "IMG.C",
    category: "Instrument portraits and installations",
    role: "Product",
    body: "Use accurate product portraits on white, neutral or transparent backgrounds for product pages, datasheets and partners. Installation photographs explain process fit. Products may be the hero.",
  },
  {
    code: "IMG.D",
    category: "Technical / cutaway",
    role: "Mechanism",
    body: "Engineered renders and section drawings used to explain construction. Treat as illustration, not photography.",
  },
];

const ImageryPage = () => (
  <>
    <PageBanner
      number="07"
      title="Imagery"
      subtitle="Show the process, the instrument and the measurement. Choose imagery for the application."
      meta={["Visual System", `v${BRAND_SYSTEM.version}`]}
    />

    {/* 07.1 Proportion ratios */}
    <ScrollSection id="ratios">
      <header className="max-w-3xl mb-10">
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          Choose the right image for the job.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Use these categories according to the communication task, without fixed quotas. A product sheet may lead with the instrument; a field result may lead with the process. Cleanroom and chemical applications should reflect their actual controlled environments.
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
              <span className="text-sm">{r.role}</span>
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

    <SectionDivider label="07.4" />

    {/* 07.4 Governance */}
    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="07.4"
          questions={[
            "Does each image explain the relevant process, product or measurement?",
            "Is the medium the hero of the macro shot — not the instrument?",
            "Did the site shot get consent for any operator visible in frame?",
            "Is the image accurately sourced and appropriate to this industry?",
          ]}
        />
        <AdditionalDonts
          code="07.5"
          items={[
            "Never use stock photography of generic \"industry\".",
            "Never composite logos, charts, or icons onto photography.",
            "Never duotone photography with brand Green.",
            "Never alter product proportions, screen content or connections to improve a composition.",
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
        { label: "Status", value: BRAND_SYSTEM.status, emphasis: true },
      ]}
    />
  </>
);

export default ImageryPage;
