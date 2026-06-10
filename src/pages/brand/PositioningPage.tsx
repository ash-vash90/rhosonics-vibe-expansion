import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";

const Foundation = lazy(() => import("@/components/brand/Foundation"));
const ValueOperatingRules = lazy(
  () => import("@/components/brand/ValueOperatingRules"),
);

/**
 * 01 Brand Position — the foundation chapter.
 *
 * Hero (Vision + Mission) then values + operating rules.
 * BrandLayout already provides the page footer — no telemetry footer
 * or cross-link block here (avoids stacking three footers).
 */

const PositioningPage = () => (
  <>
    <ScrollSection id="foundation" className="pt-12 md:pt-16">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Foundation />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <ScrollSection id="operating-rules">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <ValueOperatingRules />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>
  </>
);

export default PositioningPage;
