import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { TelemetryEyebrow } from "@/components/brand/telemetry";

const AboutSystemRefreshed = lazy(() => import("@/components/brand/AboutSystemRefreshed"));
const DesignProcess = lazy(() => import("@/components/brand/DesignProcess"));

const AboutPage = () => (
  <>
    <PageBanner
      number="00"
      title="About This System"
      subtitle="What this is, who it's for, and how to use it."
      meta={["Overview", "v2025"]}
    />

    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <AboutSystemRefreshed />
      </Suspense>
    </ErrorBoundary>

    <SectionDivider label="00.5" />

    {/* Design Process — default surface follows the dark governance band */}
    <ScrollSection id="design-process">
      <TelemetryEyebrow className="mb-4" code="00.5" label="Design process" />
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Design Process</h3>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <DesignProcess />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>
  </>
);

export default AboutPage;
