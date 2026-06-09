import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { ImpactFirstHero } from "@/components/brand/ImpactFirstHero";
import { CaseStudyTriad } from "@/components/brand/CaseStudyTriad";
import { MacroPhotographySpec } from "@/components/brand/MacroPhotographySpec";
import { LogoWallProof } from "@/components/brand/LogoWallProof";
import { SustainabilityAggregate } from "@/components/brand/SustainabilityAggregate";
import { ResourceLibraryGrid } from "@/components/brand/ResourceLibraryGrid";
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

    <SectionDivider label="10.5" />
    <ScrollSection className="py-12 md:py-16">
      <div id="references" className="scroll-mt-20" />
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

    <SectionDivider label="10.6" />
    <ScrollSection className="py-0">
      <div id="sustainability" className="scroll-mt-20" />
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

    <SectionDivider label="10.7" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="resources" className="scroll-mt-20" />
      <header className="max-w-3xl mb-10">
        <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-3">
          10.7 · Resource library
        </div>
        <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-[1.1] mb-3">
          Datasheets, drawings, and certificates.
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Format, revision and size live on the card face — engineers vet
          provenance before they download. No gating, no email walls.
        </p>
      </header>
      <ResourceLibraryGrid
        items={[
          {
            kind: "datasheet",
            code: "DS.SDM-ECO.04",
            title: "SDM Eco inline density meter",
            summary: "Full mechanical, electrical and process spec for the SDM Eco family, including all wetted-part options.",
            format: "PDF",
            sizeKb: 2840,
            pages: 12,
            revision: "Rev 4 · 2024-11",
            href: "#",
          },
          {
            kind: "guide",
            code: "AG.TAILINGS.02",
            title: "Tailings line calibration — copper",
            summary: "Field calibration procedure for SDM Eco on copper tailings between 12–55 % solids by weight.",
            format: "PDF",
            sizeKb: 1620,
            pages: 22,
            revision: "Rev 2 · 2025-02",
            href: "#",
          },
          {
            kind: "whitepaper",
            code: "WP.NUCLEAR-REPLACE.01",
            title: "Replacing nuclear gauges with inline acoustic",
            summary: "Comparative study across 18 sites: regulatory burden, MTBF, and measurement fidelity over 24 months.",
            format: "PDF",
            sizeKb: 3120,
            pages: 34,
            revision: "Rev 1 · 2025-04",
            href: "#",
          },
          {
            kind: "drawing",
            code: "DWG.SDM-ECO.DN80",
            title: "SDM Eco DN80 installation drawing",
            summary: "2D installation drawing including mounting flange, clearance envelope and wiring entry positions.",
            format: "DWG",
            sizeKb: 580,
            revision: "Rev 3 · 2024-09",
            href: "#",
          },
          {
            kind: "drawing",
            code: "STEP.SDM-ECO.DN80",
            title: "SDM Eco DN80 — STEP model",
            summary: "3D STEP file for plant CAD integration. Includes process connections and electrical entries.",
            format: "STEP",
            sizeKb: 4480,
            revision: "Rev 3 · 2024-09",
            href: "#",
          },
          {
            kind: "certificate",
            code: "CERT.SDM-ECO.IECEX",
            title: "IECEx Ex db certificate",
            summary: "Hazardous area certification for SDM Eco in Zone 1 and Zone 2 installations.",
            format: "PDF",
            sizeKb: 940,
            pages: 6,
            revision: "Rev 1 · 2024-07",
            href: "#",
          },
        ]}
      />
    </ScrollSection>
  </>
);

export default ProofPage;
