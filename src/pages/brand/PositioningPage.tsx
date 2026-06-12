import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import {
  SectionLoader,
  SectionDivider,
} from "@/components/brand/SectionUtils";
import {
  ChapterBanner,
  SectionHeader2,
  DarkProofGrid,
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
    <ChapterBanner
      number="01"
      eyebrow="Brand Position · v2026"
      title={
        <>
          Where Rhosonics stands —{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--rho-green-accent)) 0%, hsl(var(--rho-green)) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            and the rules it answers to.
          </span>
        </>
      }
      subtitle="The foundation chapter: vision, mission, values, decision tools, and the audiences this brand actually serves."
    />

    {/* 01.1 Foundation */}
    <ScrollSection id="foundation">
      <SectionHeader2
        eyebrow="Foundation · 01.1"
        title="Vision sets the horizon. Mission is the work."
        intro="The two statements every other chapter answers to. Read them as a pair — one names the destination, one names the route."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Foundation />
        </Suspense>
      </ErrorBoundary>
      <div className="mt-10 md:mt-14">
        <DarkProofGrid
          eyebrow="Foundation by the numbers"
          stats={[
            { value: "5", label: "Canonical values" },
            { value: "5", label: "Design principles" },
            { value: "5", label: "Industries served" },
            { value: "10", label: "ICP slots scaffolded" },
          ]}
        />
      </div>
    </ScrollSection>

    <SectionDivider label="01.2" />

    {/* 01.2 Core Values + Operating Rules */}
    <ScrollSection id="values" variant="tinted">
      <SectionHeader2
        eyebrow="Operating system · 01.2"
        title="Core values, operating rules."
        intro="Five values. Each paired with the rule it enforces on the work — not aspirational language, but a test we apply before something ships."
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
        title="Design principles."
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
        intro="Five industries, ten ICP slots. Pick a tab — the active panel shows the operator profile and the outcome shape the brand is built around."
      />
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <IndustriesICP />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    {/* 01.5 Closer */}
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
