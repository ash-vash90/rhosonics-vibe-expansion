import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import {
  SectionLoader,
  SectionDivider,
} from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DotEyebrowHeader } from "@/components/brand/DotEyebrowHeader";
import { HeroChipRow } from "@/components/brand/HeroChipRow";
import { FoundationStats } from "@/components/brand/FoundationStats";
import { ApplyFoundationCTA } from "@/components/brand/ApplyFoundationCTA";

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
 * Section patterns adapted from customer.io: dot-eyebrow headers,
 * KPI stat strip, capability-style cards, big quote card, closing
 * CTA band. Brand-restricted: green only, no glassmorphism.
 */

const PositioningPage = () => (
  <>
    <PageBanner
      number="01"
      title="Brand Position"
      subtitle="Where Rhosonics stands, what it stands for, and the rules every downstream decision answers to."
    >
      <HeroChipRow
        chips={[
          "5 values",
          "5 principles",
          "5 industries",
          "Active · v2026",
        ]}
      />
    </PageBanner>

    {/* 01.1 Foundation — Vision + Mission + KPI strip */}
    <ScrollSection id="foundation">
      <DotEyebrowHeader
        eyebrow="Foundation"
        num="01.1"
        title="Vision sets the horizon. Mission is the work."
        subtitle="The two statements every other chapter answers to. Read them as a pair — one names the destination, one names the route."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Foundation />
        </Suspense>
      </ErrorBoundary>
      <FoundationStats />
    </ScrollSection>

    <SectionDivider label="01.2" />

    {/* 01.2 Core Values + Operating Rules */}
    <ScrollSection id="values" variant="tinted">
      <DotEyebrowHeader
        eyebrow="Operating system"
        num="01.2"
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
      <DotEyebrowHeader
        eyebrow="Decision tools"
        num="01.3"
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
      <DotEyebrowHeader
        eyebrow="Audiences"
        num="01.4"
        title="Industries and ideal customers."
        subtitle="The audiences this brand actually serves. ICP slots are scaffolded; final operator profiles co-author with the commercial team."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <IndustriesICP />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    {/* 01.5 Closer band — next chapters */}
    <ScrollSection id="apply">
      <ApplyFoundationCTA />
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
