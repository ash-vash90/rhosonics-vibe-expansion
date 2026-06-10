import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryEyebrow, TelemetryFooter } from "@/components/brand/telemetry";
import { SolutionIcon, type SolutionIconName } from "@/components/brand/icons/SolutionIcon";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const IconGuidelines = lazy(() => import("@/components/brand/IconGuidelines").then(m => ({ default: m.IconGuidelines })));

const PICTOGRAMS: { name: SolutionIconName; label: string }[] = [
  { name: "density", label: "Density" },
  { name: "concentration", label: "Concentration" },
  { name: "calibration", label: "Calibration" },
  { name: "sustainability", label: "Sustainability" },
  { name: "massflow", label: "Massflow" },
  { name: "integration", label: "Integration" },
  { name: "telemetry", label: "Telemetry" },
  { name: "compliance", label: "Compliance" },
];

const IconographyPage = () => (
  <>
    <PageBanner
      number="06"
      title="Iconography"
      subtitle="Two icon systems with shared DNA. UI icons do work; pictograms communicate."
      meta={["Visual System", "v2025"]}
    />

    {/* 06.1 UI Icons */}
    <ScrollSection id="ui-icons">
      <header className="max-w-3xl mb-10">
        <TelemetryEyebrow className="mb-3" code="06.1" label="UI Icons" />
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          Small. Functional. Replaceable.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          UI icons are utility — they identify actions and states inside interfaces. Drawn from the Lucide set,
          governed for stroke weight and grid alignment.
        </p>
      </header>
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><IconGuidelines /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="06.2" />

    {/* 06.2 Pictograms */}
    <ScrollSection id="pictograms" variant="tinted">
      <header className="max-w-3xl mb-10">
        <TelemetryEyebrow className="mb-3" code="06.2" label="Pictograms" />
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          Engineered geometry, brand-restricted.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Pictograms carry capability stories — density, calibration, massflow, compliance. Built on a 96×96
          grid, 1.75px obsidian strokes, square caps, one accent surface per icon.
        </p>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-[hsl(var(--slate-200))]">
        {PICTOGRAMS.map((p, i) => (
          <article
            key={p.name}
            className="flex flex-col items-center justify-center gap-4 bg-background p-6 md:p-8"
          >
            <SolutionIcon
              name={p.name}
              accent={i % 3 === 0 ? "bronze" : i % 3 === 1 ? "green" : "slate"}
              surface="none"
              size={84}
              label={p.label}
            />
            <div className="text-center">
              <div className="font-ui text-sm font-semibold text-foreground">{p.label}</div>
              <div className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                PCT.{String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </article>
        ))}
      </div>
    </ScrollSection>

    <SectionDivider label="06.3" />

    {/* 06.3 Governance */}
    <ScrollSection id="governance">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="06.3"
          questions={[
            "Does the icon survive being shrunk to 16px without losing meaning?",
            "Is every vertex on the 4px grid?",
            "Did we resist the urge to make it look \"smart\" or \"AI\"?",
            "Would an engineer recognize the referenced object?",
          ]}
        />
        <AdditionalDonts
          code="06.4"
          items={[
            "No rounded line caps. Use square caps and miter joins.",
            "Never use a UI icon at pictogram scale, or vice versa.",
            "No more than one accent colour per icon.",
            "Never combine multiple pictograms into a composite mark.",
            "Never animate pictograms in a way that pulses or breathes.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Tools — Icon Library", to: "/tools", description: "Browse the full UI icon set" },
        { label: "Imagery", to: "/imagery", description: "How icons relate to photography" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "06 · Iconography" },
        { label: "Scope", value: "UI + Pictograms" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: "Active", emphasis: true },
      ]}
    />
  </>
);

export default IconographyPage;
