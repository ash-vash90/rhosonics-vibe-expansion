import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const VisualSystemOverview = lazy(() => import("@/components/brand/VisualSystemOverview"));
const ElevationSystem = lazy(() => import("@/components/brand/ElevationSystem"));

const VisualSystemPage = () => (
  <>
    <PageBanner number="03" title="The Visual System" subtitle="How the system is structured in layers." />
    <ScrollSection className="py-12 md:py-16">
      <div id="visual-system" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><VisualSystemOverview /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="03.1" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="elevation" className="scroll-mt-20" />
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Elevation & Depth</h3>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ElevationSystem /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default VisualSystemPage;
