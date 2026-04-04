import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const IndustryApplications = lazy(() => import("@/components/brand/IndustryApplications"));
const SDMEcoInterface = lazy(() => import("@/components/brand/SDMEcoInterface"));
const EcoComponents = lazy(() => import("@/components/brand/EcoComponents"));
const InterfaceKit = lazy(() => import("@/components/brand/InterfaceKit"));
const EmptyStates = lazy(() => import("@/components/brand/EmptyStates"));

const ApplicationsPage = () => (
  <>
    <PageBanner number="09" title="Applications" subtitle="How the brand system applies to products and industries." />
    <ScrollSection className="py-12 md:py-16">
      <div id="applications" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IndustryApplications /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.1" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="sdm-interface" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SDMEcoInterface /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.2" />
    <ScrollSection className="py-12 md:py-16">
      <div id="components" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><EcoComponents /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.3" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><InterfaceKit /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.4" />
    <ScrollSection className="py-12 md:py-16">
      <div id="empty-states" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><EmptyStates /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default ApplicationsPage;
