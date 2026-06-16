import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import {
  SectionLoader,
  SectionDivider,
} from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import {
  SectionHeader2,
} from "@/components/brand/system";

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
const OriginStory = lazy(() => import("@/components/brand/OriginStory"));
const ApplyFoundationCTA = lazy(
  () => import("@/components/brand/ApplyFoundationCTA"),
);


/**
 * 01 Brand Position — chapter built on the new shared system kit
 * (src/components/brand/system). Patterns reverse-engineered from
 * the Claude-generated Homepage + SDM ECO bundles: green-hairline
 * eyebrows, dark instrument panels, hairline-divided stat strips,
 * ICP-style tabbed switchers.
 */

const PositioningPage = () => (
  <>
    <PageBanner
      number="01"
      title="Brand Position"
      subtitle="The foundation chapter: vision, mission, values, decision tools, and the audiences this brand actually serves."
      meta={["Foundation", "v2026"]}
    />

    {/* 01.1 Foundation — Vision & Mission, with what changed */}
    <ScrollSection id="foundation">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Foundation />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.2" />

    {/* 01.2 Core Values */}
    <ScrollSection id="values" variant="tinted">
      <SectionHeader2
        eyebrow="Foundation · 01.2"
        title="Core values."
        intro="The five principles that shape how we work and what we prioritize."
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
      <SectionHeader2
        eyebrow="Decision tools · 01.3"
        title="Design principles"
        intro="Five decision tools, one per value. When two options compete, these tell us which one ships."
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
      <SectionHeader2
        eyebrow="Audiences · 01.4"
        title="Industries and ideal customers."
        intro="Four industries, two product lines. Each panel describes the measurement context and where Rhosonics sits in it."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <IndustriesICP />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.5" />

    {/* 01.5 Heritage — origin and continuity */}
    <ScrollSection id="heritage">
      <SectionHeader2
        eyebrow="Heritage · 01.5"
        title="Where this started"
        intro="The company was founded around one instrument. Knowing what that was — and what carried forward — clarifies what the brand still stands for."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <OriginStory />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    {/* 01.6 Closer */}
    <ScrollSection id="apply">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <ApplyFoundationCTA />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

  </>
);


export default PositioningPage;
