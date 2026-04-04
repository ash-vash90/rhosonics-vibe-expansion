import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";

const VisualSystemOverview = lazy(() => import("@/components/brand/VisualSystemOverview"));
const ElevationSystem = lazy(() => import("@/components/brand/ElevationSystem"));

const VisualSystemPage = () => (
  <>
    <ScrollSection className="py-16 md:py-24">
      <SectionHeader id="visual-system" number="03" title="The Visual System" subtitle="How the system is structured in layers." />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><VisualSystemOverview /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="03.1" />
    <ScrollSection className="py-12 md:py-16">
      <SectionHeader id="elevation" number="03.1" title="Elevation & Depth" subtitle="Shadows and layering that create visual hierarchy." />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ElevationSystem /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default VisualSystemPage;
