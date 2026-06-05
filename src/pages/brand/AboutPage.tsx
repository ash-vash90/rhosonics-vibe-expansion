import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { SectionDefault } from "@/components/brand/sections/SectionVariants";

const AboutSystemRefreshed = lazy(() => import("@/components/brand/AboutSystemRefreshed"));
const DesignProcess = lazy(() => import("@/components/brand/DesignProcess"));

const AboutPage = () => (
  <>
    <PageBanner number="00" title="About This System" subtitle="What this is, who it's for, and how to use it." />

    <ErrorBoundary>
      <Suspense fallback={<SectionLoader />}>
        <AboutSystemRefreshed />
      </Suspense>
    </ErrorBoundary>

    {/* Design Process — default surface follows the dark governance band */}
    <SectionDefault id="design-process" ariaLabel="Design process">
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Design Process</h3>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <DesignProcess />
        </Suspense>
      </ErrorBoundary>
    </SectionDefault>
  </>
);

export default AboutPage;
