import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const BrandPrinciples = lazy(() => import("@/components/brand/BrandPrinciples"));

const PrinciplesPage = () => (
  <>
    <PageBanner number="02" title="Brand Principles" subtitle="Decision-making tools for resolving design ambiguity." meta={["Story", "v2025"]} />
    <ScrollSection id="principles">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPrinciples /></Suspense></ErrorBoundary>
    </ScrollSection>
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "02 · Principles" },
        { label: "Scope", value: "Decision rules" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default PrinciplesPage;
