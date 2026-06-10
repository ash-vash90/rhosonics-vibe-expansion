import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));

const ColorPage = () => (
  <>
    <PageBanner number="04" title="Color Roles" subtitle="How color functions inside the system." meta={["Visual System", "v2025"]} />
    <ScrollSection id="colors" className="relative">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ColorMatrix /></Suspense></ErrorBoundary>
      <SectionCrossLink links={[
        { label: "Applications", to: "/applications", description: "See how color functions in real industry contexts" },
        { label: "Visual System", to: "/visual-system", description: "Elevation, depth, and spatial hierarchy" },
      ]} />
      </div>
    </ScrollSection>
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "04 · Color" },
        { label: "Scope", value: "Roles + Tokens" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ColorPage;
