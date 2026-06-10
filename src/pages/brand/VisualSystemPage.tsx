import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const VisualSystemOverview = lazy(() => import("@/components/brand/VisualSystemOverview"));
const ElevationSystem = lazy(() => import("@/components/brand/ElevationSystem"));

const VisualSystemPage = () => (
  <>
    <PageBanner number="03" title="The Visual System" subtitle="How the system is structured in layers." meta={["Visual System", "v2025"]} />
    <ScrollSection id="visual-system">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><VisualSystemOverview /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="03.1" />
    <ScrollSection id="elevation" variant="tinted" className="relative">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Elevation & Depth</h3>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ElevationSystem /></Suspense></ErrorBoundary>
      </div>
    </ScrollSection>
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "03 · Visual System" },
        { label: "Scope", value: "Layers + Depth" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default VisualSystemPage;
