import { BRAND_SYSTEM } from "@/data/brand-system";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";
import { LexiconTable } from "@/components/brand/voice/LexiconTable";
import { RewriteTable } from "@/components/brand/voice/RewriteTable";
import { DecisionQuestions } from "@/components/brand/DecisionQuestions";
import { AdditionalDonts } from "@/components/brand/AdditionalDonts";
import SectionCrossLink from "@/components/brand/SectionCrossLink";

const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));

const VoicePage = () => (
  <>
    <PageBanner
      number="02"
      title="Voice & Tone"
      subtitle="Clear, technically credible, practical and collaborative. Adapt the emphasis to the reader."
      meta={["Story", `v${BRAND_SYSTEM.version}`]}
    />

    {/* 02.0 Principles */}
    <ScrollSection id="voice-principles">
      <ErrorBoundary><Suspense fallback={<SectionLoader />}><VoiceTone /></Suspense></ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="02.1" />

    {/* 02.1 Lexicon — use / avoid */}
    <ScrollSection id="lexicon" variant="tinted">
      <header className="max-w-3xl mb-10">
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          Choose words for their meaning.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Prefer specific explanations over vague claims. These examples guide usage; ordinary words such as customer, advanced and case study are allowed when accurate. Preserve approved product names, including SDM ECO and CCM SMART.
        </p>
      </header>
      <LexiconTable />
    </ScrollSection>

    <SectionDivider label="02.2" />

    {/* 02.2 Before / After rewrites */}
    <ScrollSection id="rewrites">
      <header className="max-w-3xl mb-10">
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          The voice in motion.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          These illustrative rewrites demonstrate the approach. Bracketed fields require approved evidence before publication; they are not product specifications or customer results.
        </p>
      </header>
      <RewriteTable />
    </ScrollSection>

    <SectionDivider label="02.3" />

    {/* 02.3 Funnel rule */}
    <ScrollSection id="funnel-rule" variant="tinted">
      <header className="max-w-3xl mb-8">
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          One voice, different emphasis.
        </h2>
      </header>
      <div className="grid md:grid-cols-2 gap-px bg-[hsl(var(--slate-200))] max-w-5xl">
        <article className="bg-background p-6 md:p-8">
          <div className="font-data text-[10px] uppercase tracking-[0.25em] text-primary mb-3">Upper funnel</div>
          <h3 className="font-ui text-xl font-semibold text-foreground mb-2">Lead with the outcome.</h3>
          <p className="text-foreground/75 leading-relaxed text-sm md:text-base">
            Trade press, conference talks, web hero copy. Frame the implication first; let the technology earn its
            reveal. Metaphor is permitted when it sharpens, not when it decorates.
          </p>
        </article>
        <article className="bg-background p-6 md:p-8">
          <div className="font-data text-[10px] uppercase tracking-[0.25em] text-primary mb-3">Lower funnel</div>
          <h3 className="font-ui text-xl font-semibold text-foreground mb-2">Pure specification.</h3>
          <p className="text-foreground/75 leading-relaxed text-sm md:text-base">
            Datasheets, integration documents and drawings lead with specifications, conditions and limitations. Product pages connect those facts to process relevance. Keep unsupported promotional claims out of technical documentation.
          </p>
        </article>
      </div>
    </ScrollSection>

    <SectionDivider label="02.4" />

    {/* 02.4 Decision Questions + Additional Don'ts */}
    <ScrollSection id="governance">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <DecisionQuestions
          code="02.4"
          questions={[
            "If we removed the brand name, would this still sound like us?",
            "Did we replace a soft word with a measurable one?",
            "Can we say it in fewer words without losing meaning?",
            "Are we describing what we did, or what the customer can now do?",
            "Did we cite the source for every number?",
          ]}
        />
        <AdditionalDonts
          code="02.5"
          items={[
            "Never use superlatives without a citation. \"Industry-leading\" is not a fact.",
            "Never describe a product with adjectives a competitor could equally use.",
            "Never start a sentence with \"We are proud to…\".",
            "Never use exclamation marks in technical contexts.",
            "Never paraphrase a measurement. State it.",
          ]}
        />
      </div>
    </ScrollSection>

    <SectionCrossLink
      links={[
        { label: "Brand Position", to: "/position", description: "The principles the voice operates from" },
        { label: "Typography", to: "/typography", description: "How the voice looks on the page" },
      ]}
    />

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "02 · Voice & Tone" },
        { label: "Scope", value: "Verbal identity" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: BRAND_SYSTEM.status, emphasis: true },
      ]}
    />
  </>
);

export default VoicePage;
