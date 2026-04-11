import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";

const SocialMediaGuidelines = lazy(() => import("@/components/brand/SocialMediaGuidelines"));

const SocialMediaPage = () => (
  <>
    <PageBanner number="11" title="Social Media" subtitle="LinkedIn templates, formats, and brand-consistent social assets." />
    <ScrollSection className="py-12 md:py-16">
      <div id="social-media" className="scroll-mt-20" />
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SocialMediaGuidelines /></Suspense></ErrorBoundary>
    </ScrollSection>
  </>
);

export default SocialMediaPage;
