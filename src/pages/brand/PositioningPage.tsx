import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const BrandPositioning = lazy(() => import("@/components/brand/BrandPositioning"));

const PositioningPage = () => (
  <ScrollSection className="py-16 md:py-24">
    <SectionHeader id="positioning" number="01" title="Brand Positioning" subtitle="What the Rhosonics brand must communicate." />
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPositioning /></Suspense></ErrorBoundary>
  </ScrollSection>
);

export default PositioningPage;
