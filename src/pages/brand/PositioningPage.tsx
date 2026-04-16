import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const BrandPositioning = lazy(() => import("@/components/brand/BrandPositioning"));
const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));

const PositioningPage = () => (
  <>
    <PageBanner number="01" title="Brand Positioning" subtitle="What the Rhosonics brand must communicate." />
    <ScrollSection className="py-12 md:py-16">
      <div id="positioning" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPositioning /></Suspense></ErrorBoundary>
    </ScrollSection>
    <ScrollSection className="py-12 md:py-16">
      <div id="voice" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><VoiceTone /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default PositioningPage;
