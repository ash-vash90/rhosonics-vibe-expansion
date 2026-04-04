import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));

const VoicePage = () => (
  <ScrollSection className="py-12 md:py-16">
    <SectionHeader id="voice" number="07" title="Voice & Tone" subtitle="Direct. Technical. Confident. No fluff, no hedging." />
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><VoiceTone /></Suspense></ErrorBoundary>
  </ScrollSection>
);

export default VoicePage;
