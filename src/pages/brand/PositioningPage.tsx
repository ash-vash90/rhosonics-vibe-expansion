import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const Foundation = lazy(() => import("@/components/brand/Foundation"));
const BrandPrinciples = lazy(() => import("@/components/brand/BrandPrinciples"));
const OriginStory = lazy(() => import("@/components/brand/OriginStory"));

/**
 * 01 Brand Position — the foundation chapter.
 *
 * Composition (deliberate, top-down):
 *   01.1  Foundation: Vision → Mission → 5 Values
 *   01.2  Principles: how the foundation translates into work
 *   01.3  Origin: short, factual, no mythology
 *   01.4  Governance: decision questions + don'ts
 */

const PositioningPage = () => (
  <>
    <PageBanner
      number="01"
      title="Brand Position"
      subtitle="What we believe, what we deliver, and who we deliver it with."
    />

    <ScrollSection id="foundation">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Foundation />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.2" />

    <ScrollSection id="principles" variant="tinted">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <BrandPrinciples />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.3" />

    <ScrollSection id="origin">
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <OriginStory />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="01.4" />

    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="01.4"
          questions={[
            "Does this surface state the vision, mission, or a value verbatim — or does it paraphrase?",
            "Would a senior engineer recognise themselves as the reader?",
            "Have we named at least one thing we refuse to do?",
            "Could a competitor say this sentence about themselves? If yes, sharpen it.",
          ]}
        />
        <AdditionalDonts
          code="01.5"
          items={[
            "Never invent a sixth value. The five are canonical.",
            "Never paraphrase the vision or mission. Quote them verbatim or link to them.",
            "Never describe the company with abstract values (\"passion\", \"excellence\").",
            "Never lead with heritage. Lead with evidence.",
            "Never run internal value statements on a public page.",
          ]}
        />
      </div>
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
