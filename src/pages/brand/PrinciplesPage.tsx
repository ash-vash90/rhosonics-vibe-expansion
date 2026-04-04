import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const BrandPrinciples = lazy(() => import("@/components/brand/BrandPrinciples"));

const PrinciplesPage = () => (
  <>
    <PageBanner number="02" title="Brand Principles" subtitle="Decision-making tools for resolving design ambiguity." />
    <ScrollSection className="py-12 md:py-16">
      <div id="principles" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPrinciples /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default PrinciplesPage;
