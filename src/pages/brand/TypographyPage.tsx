import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const TypographyScale = lazy(() => import("@/components/brand/TypographyScale"));
const TypographyConstraints = lazy(() => import("@/components/brand/TypographyConstraints"));
const SpacingSystem = lazy(() => import("@/components/brand/SpacingSystem"));

const TypographyPage = () => (
  <>
    <PageBanner number="05" title="Typography" subtitle="Clarity, measurement, and trust." meta={["Visual System", "v2025"]} />
    <ScrollSection id="typography" className="relative">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><TypographyScale /></Suspense></ErrorBoundary>
      </div>
    </ScrollSection>
    <SectionDivider label="05.1" />
    <ScrollSection id="typography-constraints" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><TypographyConstraints /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="05.2" />
    <ScrollSection id="spacing">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SpacingSystem /></Suspense></ErrorBoundary>
    </ScrollSection>
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "05 · Typography" },
        { label: "Scope", value: "Scale + Spacing" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default TypographyPage;
