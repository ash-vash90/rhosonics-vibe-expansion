import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const TechComparison = lazy(() => import("@/components/brand/TechComparison"));
const CaseStudies = lazy(() => import("@/components/brand/CaseStudies"));

const ProofPage = () => (
  <ScrollSection className="py-12 md:py-16 relative">
    <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
    <div className="relative">
      <SectionHeader id="proof" number="10" title="Proof & Examples" subtitle="Technology comparisons, case studies, and brand gallery." />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><TechComparison /></Suspense></ErrorBoundary>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><CaseStudies /></Suspense></ErrorBoundary>
    </div>
  </ScrollSection>
);

export default ProofPage;
