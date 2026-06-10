import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));

const ColorPage = () => (
  <>
    <PageBanner
      number="04"
      title="Color"
      subtitle="Obsidian, Slate, Green. Roles, pairings, and contrast — never decoration."
      meta={["Visual System", "v2025"]}
    />

    <ScrollSection id="colors" className="relative">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
      <div className="relative">
        <ErrorBoundary><Suspense fallback={<SectionLoader />}><ColorMatrix /></Suspense></ErrorBoundary>
      </div>
    </ScrollSection>

    <SectionDivider label="04.x" />

    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="04.x"
          questions={[
            "Does every text/background pair clear WCAG AA at 4.5:1?",
            "Is Green being used for measurement or affordance — never decoration?",
            "Did we reach for an opacity step instead of a new hue?",
            "Would the surface still read as ours in greyscale?",
          ]}
        />
        <AdditionalDonts
          code="04.y"
          items={[
            "Never use pure black (#000). Obsidian is the floor.",
            "Never use Green as a background for body copy.",
            "Never invent a new shade — use the 50–900 scale or an opacity step.",
            "Never pair Eco Surface with Obsidian inside the same component.",
            "Never tint photography with brand colours.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Typography", to: "/typography", description: "How colour meets type for contrast (05)" },
        { label: "Iconography", to: "/iconography", description: "One accent per pictogram (06)" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "04 · Color" },
        { label: "Scope", value: "Roles + Tokens" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ColorPage;
