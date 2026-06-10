import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const LogoAssets = lazy(() => import("@/components/brand/LogoAssets"));
const IconGuidelines = lazy(() => import("@/components/brand/IconGuidelines"));

const LogoAssetsPage = () => (
  <>
    <PageBanner number="06" title="Logo & Assets" subtitle="The mark, its rules, and downloadable assets." meta={["Visual System", "v2025"]} />
    <ScrollSection id="logo-assets">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><LogoAssets /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="06.1" />
    <ScrollSection id="icon-guidelines" variant="tinted">
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Icon Guidelines</h3>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IconGuidelines /></Suspense></ErrorBoundary>
    </ScrollSection>
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "06 · Logo & Assets" },
        { label: "Scope", value: "Mark + Icons" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default LogoAssetsPage;
