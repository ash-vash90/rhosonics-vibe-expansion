import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const LogoAssets = lazy(() => import("@/components/brand/LogoAssets"));
const IconGuidelines = lazy(() => import("@/components/brand/IconGuidelines"));

const LogoAssetsPage = () => (
  <ScrollSection className="py-12 md:py-16">
    <SectionHeader id="logo-assets" number="06" title="Logo & Assets" subtitle="Logo system, icons, and brand marks." />
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><LogoAssets /></Suspense></ErrorBoundary>
    <div id="icon-guidelines" className="scroll-mt-20 md:scroll-mt-24 mt-12 md:mt-16">
      <div className="mb-6 md:mb-8">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="font-data text-sm font-bold text-primary">06.1</span>
          <div className="h-px flex-1 bg-border max-w-12" />
        </div>
        <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 tracking-tight">Icon Guidelines</h3>
        <p className="text-sm text-muted-foreground">Geometric symbols engineered for clarity.</p>
      </div>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IconGuidelines /></Suspense></ErrorBoundary>
    </div>
  </ScrollSection>
);

export default LogoAssetsPage;
