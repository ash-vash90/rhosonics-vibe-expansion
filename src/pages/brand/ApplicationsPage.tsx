import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const IndustryApplications = lazy(() => import("@/components/brand/IndustryApplications"));
const SDMEcoInterface = lazy(() => import("@/components/brand/SDMEcoInterface"));
const EcoComponents = lazy(() => import("@/components/brand/EcoComponents"));
const InterfaceKit = lazy(() => import("@/components/brand/InterfaceKit"));
const EmptyStates = lazy(() => import("@/components/brand/EmptyStates"));

const ApplicationsPage = () => (
  <>
    <PageBanner
      number="09.A"
      title="Applications"
      subtitle="How the brand system applies to products, interfaces, and industries."
      meta={["Practice", "v2025"]}
    />
    <ScrollSection id="applications">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IndustryApplications /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.A.1" />
    <ScrollSection id="sdm-interface" variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><SDMEcoInterface /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.A.2" />
    <ScrollSection id="components">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><EcoComponents /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.A.3" />
    <ScrollSection variant="tinted">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><InterfaceKit /></Suspense></ErrorBoundary>
    </ScrollSection>
    <SectionDivider label="09.A.4" />
    <ScrollSection id="empty-states">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><EmptyStates /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="09.A.x" />

    <ScrollSection id="governance" variant="tinted">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="09.A.x"
          questions={[
            "Does the interface read in three seconds from across a control room?",
            "Are status colours used for status — never decoration?",
            "Is every metric tile sourced and dated?",
            "If the screen lost colour, would the hierarchy still hold?",
          ]}
        />
        <AdditionalDonts
          code="09.A.y"
          items={[
            "Never use chamfered components in HMI surfaces. Rounded 4px only.",
            "Never use glassmorphism or blur effects in operational UI.",
            "Never show an empty state without a next action.",
            "Never animate a critical metric on update — value flips, not slides.",
            "Never put marketing copy in an HMI surface.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Proof", to: "/proof", description: "Field evidence and outcomes (09.B)" },
        { label: "Resources", to: "/resources", description: "Datasheets, drawings, certificates (10)" },
      ]}
    />
    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "09.A · Applications" },
        { label: "Scope", value: "Industries + Interface Kit" },
        { label: "Owner", value: "MarComms × Engineering" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default ApplicationsPage;
