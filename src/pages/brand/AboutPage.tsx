import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const AboutThisSystem = lazy(() => import("@/components/brand/AboutThisSystem"));
const DesignProcess = lazy(() => import("@/components/brand/DesignProcess"));

const AboutPage = () => (
  <>
    <PageBanner number="00" title="About This System" subtitle="What this is, who it's for, and how to use it." />
    <ScrollSection className="py-12 md:py-16">
      <div id="about" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><AboutThisSystem /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="00.1" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="design-process" className="scroll-mt-20" />
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Design Process</h3>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><DesignProcess /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default AboutPage;
