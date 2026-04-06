import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));

const VoicePage = () => (
  <>
    <PageBanner number="07" title="Voice & Tone" subtitle="How the brand sounds across contexts." />
    <ScrollSection className="py-12 md:py-16">
      <div id="voice" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><VoiceTone /></Suspense></ErrorBoundary>
      <SectionCrossLink links={[
        { label: "Brand Positioning", to: "/positioning", description: "The promise that shapes our voice" },
        { label: "Proof & Results", to: "/proof", description: "Case studies that demonstrate our tone in action" },
      ]} />
    </ScrollSection>
  </>
);

export default VoicePage;
