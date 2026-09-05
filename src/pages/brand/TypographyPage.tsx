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

const TypographyScale = lazy(() => import("@/components/brand/TypographyScale"));
const TypographyConstraints = lazy(() => import("@/components/brand/TypographyConstraints"));
const SpacingSystem = lazy(() => import("@/components/brand/SpacingSystem"));

const TypographyPage = () => (
  <>
    <PageBanner
      number="05"
      title="Typography"
      subtitle="Three typefaces with three jobs. Logo, UI, Data. Never overlap."
      meta={["Visual System", `v${BRAND_SYSTEM.version}`]}
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

    <SectionDivider label="05.3" />

    <ScrollSection id="numbers-and-units" variant="tinted">
      <h2 className="font-ui text-2xl font-semibold mb-4">Numbers, units and product names</h2>
      <p className="text-base text-muted-foreground max-w-prose mb-6">Use JetBrains Mono for measurements without changing the case of unit symbols. Keep a space between a value and its unit, and report only the precision supported by the measurement. Product names retain their approved spelling.</p>
      <div className="overflow-x-auto"><table className="w-full text-left text-base"><thead><tr><th className="p-3">Context</th><th className="p-3">Example</th><th className="p-3">Rule</th></tr></thead><tbody>
        {[
          ['Density', '1.450 g/cm³', 'Preserve g and cm; use the correct unit and precision.'],
          ['Temperature', '25.7 °C', 'Preserve the degree sign and uppercase C.'],
          ['Concentration', '[value] % w/w', 'State whether the percentage is by mass, volume or another defined basis.'],
          ['Missing reading', '—', 'Show an unavailable state; never substitute zero.'],
          ['Product names', 'SDM ECO · CCM SMART', 'Preserve approved spelling in headings and body copy.'],
        ].map(([context, example, rule]) => <tr key={context} className="border-t border-border"><td className="p-3">{context}</td><td className="p-3 font-data normal-case">{example}</td><td className="p-3">{rule}</td></tr>)}
      </tbody></table></div>
      <p className="text-sm text-muted-foreground mt-4">Numeric examples demonstrate formatting, not product specifications.</p>
    </ScrollSection>
    <SectionDivider label="05.4" />
    <ScrollSection id="governance">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="05.4"
          questions={[
            "Are measurements set in JetBrains Mono, with the correct case for every unit symbol?",
            "Is UI text Instrument Sans, sentence case, never SCREAMING?",
            "Did the measure (line length) stay between 45 and 75 characters?",
            "Did we step down one tier when nesting headings, never skipping two?",
          ]}
        />
        <AdditionalDonts
          code="05.5"
          items={[
            "Never set body copy in JetBrains Mono.",
            "Never use Instrument Sans for numbers in a table.",
            "Use sentence-case headings. Uppercase labels must not change product names or unit symbols.",
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
        { label: "Status", value: BRAND_SYSTEM.status, emphasis: true },
      ]}
    />
  </>
);

export default TypographyPage;
