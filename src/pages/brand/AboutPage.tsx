import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";

const AboutThisSystem = lazy(() => import("@/components/brand/AboutThisSystem"));
const DesignProcess = lazy(() => import("@/components/brand/DesignProcess"));

const AboutPage = () => (
  <>
    <ScrollSection className="py-12 md:py-16">
      <SectionHeader id="about" number="00" title="About This System" subtitle="What this is, who it's for, and how to use it." />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><AboutThisSystem /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="00.1" />
    <ScrollSection className="py-12 md:py-16">
      <SectionHeader id="design-process" number="00.1" title="Design Process" subtitle="How we approach design decisions, from concept to implementation." />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><DesignProcess /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default AboutPage;
