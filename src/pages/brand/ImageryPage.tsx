import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const ImageryGuidelines = lazy(() => import("@/components/brand/ImageryGuidelines"));
const MotionDesign = lazy(() => import("@/components/brand/MotionDesign"));

const ImageryPage = () => (
  <ScrollSection className="py-16 md:py-24">
    <SectionHeader id="imagery" number="08" title="Imagery & Motion" subtitle="Photography, illustration, and animation guidelines." />
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><ImageryGuidelines /></Suspense></ErrorBoundary>
    <div id="motion-design" className="scroll-mt-20 md:scroll-mt-24 mt-12 md:mt-16">
      <div className="mb-6 md:mb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-data text-sm font-bold text-primary">08.1</span>
          <div className="h-px flex-1 bg-border max-w-12" />
        </div>
        <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">Motion Design</h3>
        <p className="text-sm text-muted-foreground">Animation that communicates cause and effect.</p>
      </div>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><MotionDesign /></Suspense></ErrorBoundary>
    </div>
  </ScrollSection>
);

export default ImageryPage;
