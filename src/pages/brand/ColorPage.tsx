import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));

const ColorPage = () => (
  <>
    <PageBanner number="04" title="Color Roles" subtitle="How color functions inside the system." />
    <ScrollSection className="py-12 md:py-16">
      <div id="colors" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ColorMatrix /></Suspense></ErrorBoundary>
      <SectionCrossLink links={[
        { label: "Applications", to: "/applications", description: "See how color functions in real industry contexts" },
        { label: "Visual System", to: "/visual-system", description: "Elevation, depth, and spatial hierarchy" },
      ]} />
    </ScrollSection>
  </>
);

export default ColorPage;
