import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const LogoAssets = lazy(() => import("@/components/brand/LogoAssets"));
const IconGuidelines = lazy(() => import("@/components/brand/IconGuidelines"));

const LogoAssetsPage = () => (
  <>
    <PageBanner number="06" title="Logo & Assets" subtitle="The mark, its rules, and downloadable assets." />
    <ScrollSection className="py-12 md:py-16">
      <div id="logo-assets" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><LogoAssets /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="06.1" />
    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="icon-guidelines" className="scroll-mt-20" />
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-6">Icon Guidelines</h3>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IconGuidelines /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default LogoAssetsPage;
