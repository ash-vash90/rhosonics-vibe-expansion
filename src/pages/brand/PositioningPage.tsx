import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const BrandPositioning = lazy(() => import("@/components/brand/BrandPositioning"));
const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));

const PositioningPage = () => (
  <>
    <PageBanner number="01" title="Brand Positioning" subtitle="What the Rhosonics brand must communicate." meta={["Story", "v2025"]} />
    <ScrollSection id="positioning">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPositioning /></Suspense></ErrorBoundary>
    </ScrollSection>
    <ScrollSection id="voice">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><VoiceTone /></Suspense></ErrorBoundary>
    </ScrollSection>
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "01 · Positioning" },
        { label: "Scope", value: "Voice + Position" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default PositioningPage;
