import { BRAND_SYSTEM } from "@/data/brand-system";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const LogoAssets = lazy(() => import("@/components/brand/LogoAssets"));

const LogoAssetsPage = () => (
  <>
    <PageBanner
      number="03"
      title="Logo"
      subtitle="The mark. Its construction, clearspace, misuse, and downloadable files."
      meta={["Visual System", `v${BRAND_SYSTEM.version}`]}
    />

    <ScrollSection id="logo">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><LogoAssets /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="03.1" />

    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="03.1"
          questions={[
            "Is the icon-to-wordmark ratio exactly 135%?",
            "Does clearspace match the cap-height of the wordmark on all four sides?",
            "Is the mark sitting on an approved surface from chapter 04?",
            "If a partner asked for a co-brand lock-up, would this be the file we'd send?",
          ]}
        />
        <AdditionalDonts
          code="03.2"
          items={[
            "Never stretch, skew, or re-colour the mark outside of approved variants.",
            "Never place the mark on photography without a flat panel beneath it.",
            "Never animate the wordmark independently of the icon.",
            "Never re-draw the mark to fit a layout — change the layout.",
            "Never use the icon alone in body copy as a substitute for the company name.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Iconography", to: "/iconography", description: "UI icons and pictograms (06)" },
        { label: "Color", to: "/color", description: "Approved surfaces the mark may sit on (04)" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "03 · Logo" },
        { label: "Scope", value: "Mark + Files" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: BRAND_SYSTEM.status, emphasis: true },
      ]}
    />
  </>
);

export default LogoAssetsPage;
