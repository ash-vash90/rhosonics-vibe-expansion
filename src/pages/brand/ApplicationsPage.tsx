import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const IndustryApplications = lazy(() => import("@/components/brand/IndustryApplications"));
const SDMEcoInterface = lazy(() => import("@/components/brand/SDMEcoInterface"));
const EcoComponents = lazy(() => import("@/components/brand/EcoComponents"));
const InterfaceKit = lazy(() => import("@/components/brand/InterfaceKit"));
const EmptyStates = lazy(() => import("@/components/brand/EmptyStates"));

const ApplicationsPage = () => (
  <ScrollSection className="py-16 md:py-24">
    <SectionHeader id="applications" number="09" title="Applications" subtitle="Industry use cases, components, and interface patterns." />
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><IndustryApplications /></Suspense></ErrorBoundary>
    <div id="sdm-interface" className="scroll-mt-20 md:scroll-mt-24 mt-12 md:mt-16">
      <div className="mb-6 md:mb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-data text-sm font-bold text-primary">09.1</span>
          <div className="h-px flex-1 bg-border max-w-12" />
        </div>
        <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">SDM Eco Interface</h3>
        <p className="text-sm text-muted-foreground">Embedded touchscreen interface design system.</p>
      </div>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SDMEcoInterface /></Suspense></ErrorBoundary>
    </div>
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><EcoComponents /></Suspense></ErrorBoundary>
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><InterfaceKit /></Suspense></ErrorBoundary>
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><EmptyStates /></Suspense></ErrorBoundary>
  </ScrollSection>
);

export default ApplicationsPage;
