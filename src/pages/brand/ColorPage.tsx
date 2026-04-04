import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionHeader, SectionLoader } from "@/components/brand/SectionUtils";

const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));

const ColorPage = () => (
  <ScrollSection className="py-12 md:py-16">
    <SectionHeader id="colors" number="04" title="Color Roles" subtitle="How color functions inside the system." />
    <ErrorBoundary><Suspense fallback={<SectionLoader />}><ColorMatrix /></Suspense></ErrorBoundary>
  </ScrollSection>
);

export default ColorPage;
