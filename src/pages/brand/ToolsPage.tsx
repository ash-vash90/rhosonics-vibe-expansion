import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryEyebrow, TelemetryFooter } from "@/components/brand/telemetry";

const PhotoTreatmentTool = lazy(() => import("@/components/brand/PhotoTreatmentTool"));
const IconPicker = lazy(() => import("@/components/brand/IconPicker").then(m => ({ default: m.IconPicker })));
const ExportSection = lazy(() => import("@/components/brand/ExportSection"));
const DownloadableAssets = lazy(() => import("@/components/brand/DownloadableAssets"));
const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));

/**
 * Tools — consolidated utilities (appendix, not a chapter).
 *
 * Everything interactive in the brand system lives here. Specs and rules live
 * in their canonical chapters; this page is where teammates actually do work.
 */

const ToolsPage = () => (
  <>
    <PageBanner
      number="AP"
      title="Tools"
      subtitle="Every interactive utility in the system, consolidated. Specs live in their chapters; work happens here."
      meta={["Appendix", "v2025"]}
    />

    {/* AP.1 Photo Treatment */}
    <ScrollSection id="photo-treatment">
      <header className="max-w-3xl mb-8">
        <TelemetryEyebrow className="mb-3" code="AP.1" label="Photo treatment" />
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Photo Treatment Tool
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Apply the Rhosonics colour grading process to your own photography. Upload, adjust, export.
        </p>
      </header>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><PhotoTreatmentTool /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="AP.2" />

    {/* AP.2 Icon Library */}
    <ScrollSection id="icon-picker" variant="tinted">
      <header className="max-w-3xl mb-8">
        <TelemetryEyebrow className="mb-3" code="AP.2" label="Icon library" />
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Icon Library
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Browse, search, and copy icons from the approved Lucide set. Click any icon to copy its import code.
        </p>
      </header>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IconPicker /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="AP.3" />

    {/* AP.3 Color Matrix */}
    <ScrollSection id="color-matrix">
      <header className="max-w-3xl mb-8">
        <TelemetryEyebrow className="mb-3" code="AP.3" label="Colour matrix" />
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Colour Pairing Matrix
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Live pairing checker. Picks any two brand tokens and reports the contrast ratio against WCAG AA.
        </p>
      </header>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ColorMatrix /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="AP.4" />

    {/* AP.4 Design tokens & exports */}
    <ScrollSection id="exports" variant="tinted">
      <header className="max-w-3xl mb-8">
        <TelemetryEyebrow className="mb-3" code="AP.4" label="Design tokens" />
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Design Token Exports
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Tokens Studio JSON, Style Dictionary JSON, colour swatch SVG, typography specimen SVG, and the full
          Figma asset pack — all generated client-side, no account needed.
        </p>
      </header>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ExportSection /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="AP.5" />

    {/* AP.5 Asset downloads */}
    <ScrollSection id="downloads">
      <header className="max-w-3xl mb-8">
        <TelemetryEyebrow className="mb-3" code="AP.5" label="Asset downloads" />
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Asset Downloads
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          CSS variables, Tailwind config, font files, and starter packs for partners and integrators.
        </p>
      </header>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><DownloadableAssets /></Suspense></ErrorBoundary>
    </ScrollSection>

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "AP · Tools" },
        { label: "Scope", value: "Utilities + Exports" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ToolsPage;
