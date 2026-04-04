import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));

const ColorPage = () => (
  <>
    <PageBanner number="04" title="Color Roles" subtitle="How color functions inside the system." />
    <ScrollSection className="py-12 md:py-16">
      <div id="colors" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><ColorMatrix /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default ColorPage;
