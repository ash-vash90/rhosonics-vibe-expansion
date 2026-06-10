import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const Foundation = lazy(() => import("@/components/brand/Foundation"));
const ValueOperatingRules = lazy(
  () => import("@/components/brand/ValueOperatingRules"),
);

/**
 * 01 Brand Position — the foundation chapter.
 *
 * Vision + Mission (side-by-side) → the five values → the operating
 * rules each value demands. Nothing else. No origin mythology, no
 * detached design principles, no governance ceremony.
 */

const PositioningPage = () => (
  <>
    <PageBanner
      number="01"
      title="Brand Position"
      subtitle="The vision, the mission, the five values, and the behaviour they demand."
    />

    <ScrollSection id="foundation">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Foundation />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.2" />

    <ScrollSection id="operating-rules" variant="tinted">
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
