import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const BrandPrinciples = lazy(() => import("@/components/brand/BrandPrinciples"));

const PrinciplesPage = () => (
  <ScrollSection className="py-12 md:py-16">
    <SectionHeader id="principles" number="02" title="Brand Principles" subtitle="Decision-making tools for resolving design ambiguity." />
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPrinciples /></Suspense></ErrorBoundary>
  </ScrollSection>
);

export default PrinciplesPage;
