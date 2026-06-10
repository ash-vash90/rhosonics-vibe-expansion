import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import {
  SectionLoader,
  SectionDivider,
  SectionHeader,
} from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const Foundation = lazy(() => import("@/components/brand/Foundation"));
const ValueOperatingRules = lazy(
  () => import("@/components/brand/ValueOperatingRules"),
);
const DesignPrinciples = lazy(
  () => import("@/components/brand/DesignPrinciples"),
);
const IndustriesICP = lazy(
  () => import("@/components/brand/IndustriesICP"),
);

/**
 * 01 Brand Position — the foundation chapter.
 *
 * PageBanner (01) → Foundation (01.1) → Values (01.2) →
 * Design Principles (01.3) → Industries & ICPs (01.4) →
 * TelemetryFooter. BrandLayout supplies the global footer.
 */

const PositioningPage = () => (
  <>
    <PageBanner
      number="01"
      title="Brand Position"
      subtitle="Where Rhosonics stands, what it stands for, and the rules every downstream decision answers to."
      meta={["Foundation", "v2026"]}
    />

    {/* 01.1 Foundation — Vision + Mission */}
    <ScrollSection id="foundation">
      <SectionHeader
        number="01.1"
        title="Foundation."
        subtitle="The Vision sets the horizon. The Mission is the work we do to get there."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Foundation />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.2" />

    {/* 01.2 Core Values + Operating Rules */}
    <ScrollSection id="values" variant="tinted">
      <SectionHeader
        number="01.2"
        title="Core values, operating rules."
        subtitle="Five values. Each paired with the rule it enforces on the work — not aspirational language, but a test we apply before something ships."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <ValueOperatingRules />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.3" />

    {/* 01.3 Design Principles */}
    <ScrollSection id="design-principles">
      <SectionHeader
        number="01.3"
        title="Design principles."
        subtitle="Five decision tools, one per value. When two options compete, these tell us which one ships."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <DesignPrinciples />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.4" />

    {/* 01.4 Industries & ICPs */}
    <ScrollSection id="industries" variant="tinted">
      <SectionHeader
        number="01.4"
        title="Industries & ideal customers."
        subtitle="The audiences this brand actually serves. ICP slots are scaffolded; final operator profiles co-author with the commercial team."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <IndustriesICP />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "01 · Brand Position" },
        { label: "Scope", value: "Foundation, values, principles, audiences" },
        { label: "Owner", value: "Brand Council" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default PositioningPage;
