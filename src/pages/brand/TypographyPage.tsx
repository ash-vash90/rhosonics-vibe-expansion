import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const TypographyScale = lazy(() => import("@/components/brand/TypographyScale"));
const TypographyConstraints = lazy(() => import("@/components/brand/TypographyConstraints"));
const SpacingSystem = lazy(() => import("@/components/brand/SpacingSystem"));

const TypographyPage = () => (
  <>
    <PageBanner
      number="05"
      title="Typography"
      subtitle="Three typefaces with three jobs. Logo, UI, Data. Never overlap."
      meta={["Visual System", "v2025"]}
    />

    <ScrollSection id="typography" className="relative">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
        <ErrorBoundary><Suspense fallback={<SectionLoader />}><TypographyScale /></Suspense></ErrorBoundary>
      </div>
    </ScrollSection>

    <SectionDivider label="05.1" />

    <ScrollSection id="typography-constraints" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><TypographyConstraints /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="05.2" />

    <ScrollSection id="spacing">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SpacingSystem /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="05.x" />

    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="05.x"
          questions={[
            "Is every number set in JetBrains Mono and rendered uppercase?",
            "Is UI text Instrument Sans, sentence case, never SCREAMING?",
            "Did the measure (line length) stay between 45 and 75 characters?",
            "Did we step down one tier when nesting headings, never skipping two?",
          ]}
        />
        <AdditionalDonts
          code="05.y"
          items={[
            "Never set body copy in JetBrains Mono.",
            "Never use Instrument Sans for numbers in a table.",
            "Never set headings in ALL CAPS — that's reserved for Data.",
            "Never set body smaller than 14px on screen, 9pt in print.",
            "Never letter-space body copy; tracking belongs to Data only.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Voice & Tone", to: "/voice", description: "What the type is saying (02)" },
        { label: "Data Visualization", to: "/data-viz", description: "How numbers are set in charts (08)" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "05 · Typography" },
        { label: "Scope", value: "Roles + Scale + Spacing" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default TypographyPage;
