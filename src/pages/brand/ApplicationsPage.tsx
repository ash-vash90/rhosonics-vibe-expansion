import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const IndustryApplications = lazy(() => import("@/components/brand/IndustryApplications"));
const SDMEcoInterface = lazy(() => import("@/components/brand/SDMEcoInterface"));
const EcoComponents = lazy(() => import("@/components/brand/EcoComponents"));
const InterfaceKit = lazy(() => import("@/components/brand/InterfaceKit"));
const EmptyStates = lazy(() => import("@/components/brand/EmptyStates"));

const ApplicationsPage = () => (
  <>
    <PageBanner number="09" title="Applications" subtitle="How the brand system applies to products and industries." meta={["Practice", "v2025"]} />
    <ScrollSection id="applications">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IndustryApplications /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.1" />
    <ScrollSection id="sdm-interface" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SDMEcoInterface /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.2" />
    <ScrollSection id="components">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><EcoComponents /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.3" />
    <ScrollSection variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><InterfaceKit /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.4" />
    <ScrollSection id="empty-states">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><EmptyStates /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionCrossLink
      links={[
        { label: "Proof & Case Studies", to: "/proof", description: "Field evidence and outcomes (09.5)" },
        { label: "Resources", to: "/resources", description: "Spec sheets, drawings, certificates" },
      ]}
    />
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "09 · Applications" },
        { label: "Scope", value: "Industries + Kit" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ApplicationsPage;
