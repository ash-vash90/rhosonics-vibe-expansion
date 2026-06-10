import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const ImageryGuidelines = lazy(() => import("@/components/brand/ImageryGuidelines"));
const MotionDesign = lazy(() => import("@/components/brand/MotionDesign"));

const ImageryPage = () => (
  <>
    <PageBanner number="08" title="Imagery & Motion" subtitle="Photography, illustration, and motion principles." meta={["Content", "v2025"]} />
    <ScrollSection id="imagery">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ImageryGuidelines /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="08.1" />
    <ScrollSection id="motion-design" variant="tinted">
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Motion Design</h3>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><MotionDesign /></Suspense></ErrorBoundary>
    </ScrollSection>
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "08 · Imagery" },
        { label: "Scope", value: "Photo + Motion" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ImageryPage;
