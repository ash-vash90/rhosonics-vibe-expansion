import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const PhotoTreatmentTool = lazy(() => import("@/components/brand/PhotoTreatmentTool"));
const IconPicker = lazy(() => import("@/components/brand/IconPicker").then(m => ({ default: m.IconPicker })));
const ExportSection = lazy(() => import("@/components/brand/ExportSection"));
const DownloadableAssets = lazy(() => import("@/components/brand/DownloadableAssets"));

const ToolsPage = () => (
  <>
    <PageBanner number="12" title="Tools & Downloads" subtitle="Interactive utilities for applying the brand system." />

    <ScrollSection className="py-12 md:py-16">
      <div id="photo-treatment" className="scroll-mt-20" />
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">Photo Treatment Tool</h3>
      <p className="text-muted-foreground text-base mb-8 max-w-2xl">
        Apply the Rhosonics color grading process to your own photography. Upload, adjust, and export brand-consistent imagery.
      </p>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><PhotoTreatmentTool /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="12.1" />

    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="icon-picker" className="scroll-mt-20" />
      <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">Icon Library</h3>
      <p className="text-muted-foreground text-base mb-8 max-w-2xl">
        Browse, search, and copy icons from the approved Lucide set. Click any icon to copy its import code.
      </p>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IconPicker /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="12.2" />

    <ScrollSection className="py-12 md:py-16">
      <div id="exports" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ExportSection /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="12.3" />

    <ScrollSection className="py-12 md:py-16" variant="tinted">
      <div id="downloads" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><DownloadableAssets /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default ToolsPage;
