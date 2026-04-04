import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const TechComparison = lazy(() => import("@/components/brand/TechComparison"));
const CaseStudies = lazy(() => import("@/components/brand/CaseStudies"));

const ProofPage = () => (
  <>
    <PageBanner number="10" title="Proof & Examples" subtitle="Technology comparisons, case studies, and brand gallery." />
    <ScrollSection className="py-12 md:py-16 relative">
      <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
        <div id="proof" className="scroll-mt-20" />
        <ErrorBoundary><Suspense fallback={<SectionLoader />}><TechComparison /></Suspense></ErrorBoundary>
      </div>
    </ScrollSection>
    <SectionDivider label="10.1" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><CaseStudies /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default ProofPage;
