import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const TypographyScale = lazy(() => import("@/components/brand/TypographyScale"));
const TypographyConstraints = lazy(() => import("@/components/brand/TypographyConstraints"));
const SpacingSystem = lazy(() => import("@/components/brand/SpacingSystem"));

const TypographyPage = () => (
  <>
    <PageBanner number="05" title="Typography" subtitle="Clarity, measurement, and trust." />
    <ScrollSection className="py-12 md:py-16">
      <div id="typography" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><TypographyScale /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="05.1" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><TypographyConstraints /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="05.2" />
    <ScrollSection className="py-12 md:py-16">
      <div id="spacing" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SpacingSystem /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default TypographyPage;
