import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const BrandPositioning = lazy(() => import("@/components/brand/BrandPositioning"));
const BrandPrinciples = lazy(() => import("@/components/brand/BrandPrinciples"));
const MissionVision = lazy(() => import("@/components/brand/MissionVision"));
const OriginStory = lazy(() => import("@/components/brand/OriginStory"));

/**
 * 01 Brand Position — merged chapter holding what used to live across
 * /about, /positioning, and /principles. Voice now has its own chapter (02).
 */

const PositioningPage = () => (
  <>
    <PageBanner
      number="01"
      title="Brand Position"
      subtitle="Where the brand sits, what it stands for, who it speaks to, and what it refuses to do."
      meta={["Story", "v2025"]}
    />

    {/* 01.1 Position & Purpose */}
    <ScrollSection id="positioning">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPositioning /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.2" />

    {/* 01.2 Principles */}
    <ScrollSection id="principles" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><BrandPrinciples /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.3" />

    {/* 01.3 Mission & Vision */}
    <ScrollSection id="mission">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><MissionVision /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.4" />

    {/* 01.4 Origin */}
    <ScrollSection id="origin" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><OriginStory /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.5" />

    {/* 01.5 Governance */}
    <ScrollSection id="governance">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="01.5"
          questions={[
            "Could this brand-position statement equally describe a competitor? If yes, sharpen it.",
            "Does the language assume the reader is a senior engineer, not a marketer?",
            "Have we named the audience by their work, not their job title?",
            "Is there at least one thing we explicitly refuse to do?",
          ]}
        />
        <AdditionalDonts
          code="01.6"
          items={[
            "Never frame the brand against named competitors.",
            "Never invoke heritage as a substitute for current evidence.",
            "Never describe the company with abstract values (\"passion\", \"excellence\").",
            "Never write a positioning line longer than fifteen words.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Voice & Tone", to: "/voice", description: "How the position sounds in language (02)" },
        { label: "Proof & Case Studies", to: "/proof", description: "The evidence behind the position (09.4)" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "01 · Brand Position" },
        { label: "Scope", value: "Purpose · Principles · Origin" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default PositioningPage;
