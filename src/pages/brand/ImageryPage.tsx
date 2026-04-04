import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const ImageryGuidelines = lazy(() => import("@/components/brand/ImageryGuidelines"));
const MotionDesign = lazy(() => import("@/components/brand/MotionDesign"));

const ImageryPage = () => (
  <>
    <PageBanner number="08" title="Imagery & Motion" subtitle="Photography, illustration, and motion principles." />
    <ScrollSection className="py-12 md:py-16">
      <div id="imagery" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ImageryGuidelines /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="08.1" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="motion-design" className="scroll-mt-20" />
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Motion Design</h3>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><MotionDesign /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default ImageryPage;
