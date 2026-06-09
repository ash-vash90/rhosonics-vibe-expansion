import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { ImpactFirstHero } from "@/components/brand/ImpactFirstHero";
import { CaseStudyTriad } from "@/components/brand/CaseStudyTriad";
import { MacroPhotographySpec } from "@/components/brand/MacroPhotographySpec";
import miningHero from "@/assets/case-studies/mining-hero.jpg";
import dredgingHero from "@/assets/case-studies/dredging-hero.jpg";
import wastewaterHero from "@/assets/case-studies/wastewater-hero.jpg";

const TechComparison = lazy(() => import("@/components/brand/TechComparison"));
const CaseStudies = lazy(() => import("@/components/brand/CaseStudies"));

const ProofPage = () => (
  <>
    <PageBanner number="10" title="Proof & Examples" subtitle="Technology comparisons, case studies, and brand gallery." />

    {/* Impact-first hero — the outcome leads, the headline supports */}
    <ScrollSection className="py-0">
      <ImpactFirstHero
        eyebrow="10.0 · Field outcome · Copper concentrator · 2024"
        metric="−14%"
        metricSource="plant operations · 18 mo rolling avg"
        outcome="Tailings water loss, after eighteen months of SDM Eco inline density measurement."
        problem="The site replaced nuclear gauges on three slurry lines. Reclaim improved without process changes; the only variable was measurement fidelity."
      />
    </ScrollSection>

    <SectionDivider label="10.1" />
    <ScrollSection className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
        <div id="proof" className="scroll-mt-20" />
        <ErrorBoundary><Suspense fallback={<SectionLoader />}><TechComparison /></Suspense></ErrorBoundary>
      </div>
    </ScrollSection>

    <SectionDivider label="10.2" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><CaseStudies /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="10.3" />
    <ScrollSection className="py-12 md:py-16">
      <div id="case-triads" className="scroll-mt-20" />
      <header className="max-w-3xl mb-10">
        <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
          10.3 · Case study triad
        </div>
        <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-[1.1] mb-3">
          Three pieces of evidence, side by side.
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Each triad presents one macro photograph of the medium, one measured
          outcome, and one operator quote — no marketing line between them.
        </p>
      </header>
      <div className="space-y-6">
        <CaseStudyTriad
          industry="Mining"
          site="Andes copper concentrator · Chile"
          year="2024"
          image={miningHero}
          imageAlt="Copper tailings slurry at point of discharge"
          metric="−14%"
          metricLabel="Tailings water loss, 18-month rolling average"
          metricSource="plant operations"
          quote="We stopped guessing at solids in the line. The number is just there, all the time."
          attribution="Process engineer · 22 yrs concentrator ops"
        />
        <CaseStudyTriad
          industry="Dredging"
          site="North Sea capital project"
          year="2023"
          image={dredgingHero}
          imageAlt="Sediment-laden water at dredge hopper outflow"
          metric="+42%"
          metricLabel="Cycle efficiency on sediment density-controlled loading"
          metricSource="vessel telemetry"
          quote="The controller used to overshoot on every pour. Now it doesn't."
          attribution="Dredge master · Northern Europe fleet"
        />
        <CaseStudyTriad
          industry="Wastewater"
          site="Municipal sludge plant · NL"
          year="2024"
          image={wastewaterHero}
          imageAlt="Activated sludge surface under directional light"
          metric="−28%"
          metricLabel="Polymer dosing cost, density-paced dewatering"
          metricSource="purchasing · 12 mo"
          quote="Procurement noticed before operations did. That tells you everything."
          attribution="Plant manager · NL water authority"
        />
      </div>
    </ScrollSection>

    <SectionDivider label="10.4" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="macro-photography" className="scroll-mt-20" />
      <MacroPhotographySpec />
    </ScrollSection>
  </>
);

export default ProofPage;
