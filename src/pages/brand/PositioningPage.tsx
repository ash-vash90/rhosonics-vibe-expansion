import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader } from "@/components/brand/SectionUtils";
import { TelemetryFooter } from "@/components/brand/telemetry";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const Foundation = lazy(() => import("@/components/brand/Foundation"));
const ValueOperatingRules = lazy(
  () => import("@/components/brand/ValueOperatingRules"),
);

/**
 * 01 Brand Position — the foundation chapter.
 *
 * Composition (industrial offset):
 *   · Foundation hero: chamfered dark Vision (8 col) + Mission rail (4 col)
 *   · Core Values & Operating Rules: 5 rows, value + rule paired
 *
 * No PageBanner — the hero carries its own chapter mark.
 * No origin story, no detached design principles, no governance ceremony.
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

    <SectionCrossLink
      links={[
        { label: "Voice & Tone", to: "/voice", description: "How the foundation sounds in language (02)" },
        { label: "Proof", to: "/proof", description: "The evidence behind every value (09.B)" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "01 · Brand Position" },
        { label: "Scope", value: "Vision · Mission · Values" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Canonical", emphasis: true },
      ]}
    />
  </>
);

export default PositioningPage;
