import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";
import { ImpactFirstHero } from "@/components/brand/ImpactFirstHero";
import { CaseStudyTriad } from "@/components/brand/CaseStudyTriad";
import { LogoWallProof } from "@/components/brand/LogoWallProof";
import { SustainabilityAggregate } from "@/components/brand/SustainabilityAggregate";
import miningHero from "@/assets/case-studies/mining-hero.jpg";
import dredgingHero from "@/assets/case-studies/dredging-hero.jpg";
import wastewaterHero from "@/assets/case-studies/wastewater-hero.jpg";

const TechComparison = lazy(() => import("@/components/brand/TechComparison"));
const CaseStudies = lazy(() => import("@/components/brand/CaseStudies"));

const ProofPage = () => (
  <>
    <PageBanner
      number="09.B"
      title="Proof"
      subtitle="Field results, technology comparisons, and the reference network."
      meta={["Field outcome", "Copper concentrator", "2024"]}
    >
      <ImpactFirstHero
        embedded
        metric="−14%"
        metricSource="plant operations · 18 mo rolling avg"
        outcome="Tailings water loss, after eighteen months of SDM Eco inline density measurement."
        problem="The site replaced nuclear gauges on three slurry lines. Reclaim improved without process changes; the only variable was measurement fidelity."
      />
    </PageBanner>

    <SectionDivider label="09.B.1" />
    <ScrollSection id="comparison" className="relative">
      <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
        <ErrorBoundary><Suspense fallback={<SectionLoader />}><TechComparison /></Suspense></ErrorBoundary>
      </div>
    </ScrollSection>

    <SectionDivider label="09.B.2" />
    <ScrollSection variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><CaseStudies /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="09.B.3" />
    <ScrollSection id="triads">
      <header className="max-w-3xl mb-10">
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

    <SectionDivider label="09.B.4" />
    <ScrollSection id="references" variant="tinted">
      <LogoWallProof
        totalReferences={312}
        asOf="Q2 2025"
        groups={[
          {
            industry: "Mining & minerals",
            count: 118,
            shown: [
              { name: "ANDES CU", site: "Chile · 4,200 m" },
              { name: "BOREAL FE", site: "Sweden" },
              { name: "PILBARA AU", site: "Australia" },
              { name: "ATACAMA LI", site: "Chile" },
              { name: "SUDBURY NI", site: "Canada" },
              { name: "KOLAR ZN", site: "India" },
            ],
          },
          {
            industry: "Dredging & marine",
            count: 74,
            shown: [
              { name: "NORTH SEA WORKS", site: "NL · BE" },
              { name: "ROTTERDAM PORT", site: "NL" },
              { name: "MAASVLAKTE II", site: "NL" },
              { name: "SUEZ DEEPEN", site: "EG" },
              { name: "MEKONG DELTA", site: "VN" },
            ],
          },
          {
            industry: "Water & wastewater",
            count: 86,
            shown: [
              { name: "AMSTEL WATER", site: "NL" },
              { name: "THAMES TIDEWAY", site: "UK" },
              { name: "RHEIN-MAIN AG", site: "DE" },
              { name: "VEOLIA NORD", site: "FR" },
              { name: "TOKYO BAY WRP", site: "JP" },
            ],
          },
          {
            industry: "Process & semiconductor",
            count: 34,
            shown: [
              { name: "EINDHOVEN FAB", site: "NL" },
              { name: "DRESDEN MEMS", site: "DE" },
              { name: "HSINCHU NODE", site: "TW" },
              { name: "PORTLAND WAFER", site: "US" },
            ],
          },
        ]}
      />
    </ScrollSection>

    <SectionDivider label="09.B.5" />
    <ScrollSection id="sustainability" className="py-0">
      <SustainabilityAggregate
        asOf="FY2024"
        scope="312 plant sites · 24 countries"
        verifier="DNV · ISAE 3000"
        methodology="Rolling 12-month, plant-reported telemetry against pre-installation baselines. Excludes sites with less than 9 months of post-install operation."
        metrics={[
          { value: "2.3", unit: "GWh/yr", label: "Pumping & mixing energy reduced" },
          { value: "18,400", unit: "m³/yr", label: "Process water reclaimed" },
          { value: "14,200", unit: "t CO₂e", label: "Scope-1 emissions avoided" },
          { value: "312", unit: "sites", label: "In verification scope" },
        ]}
      />
    </ScrollSection>

    <SectionDivider label="09.B.x" />

    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="09.B.x"
          questions={[
            "Does every number on this page have a source and an as-of date?",
            "Did we publish the methodology, or just the result?",
            "Could the cited operator verify the quote attributed to them?",
            "Are baselines pre-installation, not a softer comparison year?",
          ]}
        />
        <AdditionalDonts
          code="09.B.y"
          items={[
            "Never publish a metric without a verifier or methodology line.",
            "Never paraphrase an operator quote. Quote or omit.",
            "Never use a logo without written permission from the customer.",
            "Never aggregate sites of fewer than 9 months into the headline.",
            "Never republish a case study without the site re-confirming.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Applications", to: "/applications", description: "Where the proof gets deployed (09.A)" },
        { label: "Resources", to: "/resources", description: "Datasheets and certificates (10)" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "09.B · Proof" },
        { label: "Evidence", value: "312 sites · 24 countries" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ProofPage;
