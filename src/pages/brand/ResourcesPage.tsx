import { BRAND_SYSTEM } from "@/data/brand-system";
import { Link } from "@/lib/router-compat";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { SectionLoader, SectionDivider } from "@/components/brand/SectionUtils";
import { PageBanner } from "@/components/brand/PageBanner";
import { TelemetryFooter } from "@/components/brand/telemetry";

const ResourceLibraryGrid = lazy(() =>
  import("@/components/brand/ResourceLibraryGrid").then(m => ({ default: m.ResourceLibraryGrid })),
);

interface ContactRow {
  scope: string;
  who: string;
  email: string;
}

const CONTACTS: ContactRow[] = [
  { scope: "Brand exceptions, partner lock-ups", who: "MarComms", email: "brand@rhosonics.com" },
  { scope: "Engineering datasheets, drawings", who: "Engineering", email: "engineering@rhosonics.com" },
  { scope: "Sustainability methodology, verifier", who: "Sustainability", email: "esg@rhosonics.com" },
  { scope: "Press, conference, speaking", who: "Communications", email: "press@rhosonics.com" },
];

interface ChangeEntry {
  date: string;
  scope: string;
  summary: string;
}

const CHANGELOG: ChangeEntry[] = [
  { date: BRAND_SYSTEM.updated, scope: "Consistency review", summary: "Unified colour specifications and exports, reconciled guidance, labelled examples and clarified unavailable resources." },
  { date: "2026-06-10", scope: "System", summary: "Reorganised into ten chapters, with Applications and Proof under chapter 09, plus a Tools appendix." },
  { date: "2026-04-12", scope: "Voice", summary: "Lexicon and Before/After Rewrites primitives added." },
  { date: "2026-02-20", scope: "Color", summary: "Green 50–900 scale finalized." },
  { date: "2025-11-04", scope: "Imagery", summary: "Macro photography spec codified for case studies." },
  { date: "2025-09-30", scope: "Iconography", summary: "Pictogram family v7 released with shared 96-grid DNA." },
];

const ResourcesPage = () => (
  <>
    <PageBanner
      number="10"
      title="Resources"
      subtitle="Brand assets, resource availability, responsible teams and version history."
      meta={["Reference", `v${BRAND_SYSTEM.version}`]}
    />

    {/* 10.1 Resource library */}
    <ScrollSection id="downloads">
      <header className="max-w-3xl mb-10">
        <h2 className="font-ui text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.05] mb-4">
          Datasheets, drawings, certificates.
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Product files below are awaiting approved uploads. File sizes, revisions and certification details appear only when the actual documents are available.
        </p>
      </header>
      <p className="mb-6 text-base"><Link to="/logo" className="text-action underline">Download approved logo variants</Link>{" · "}<Link to="/tools" className="text-action underline">Open brand asset tools</Link></p>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <ResourceLibraryGrid
            items={[
              {
                kind: "datasheet",
                code: "DS.SDM-ECO",
                title: "SDM ECO inline density meter",
                summary: "Full mechanical, electrical and process spec for the SDM ECO family.",
                format: "PDF",

                unavailableReason: "Awaiting an approved file and revision.",
              },
              {
                kind: "drawing",
                code: "STEP.SDM-ECO",
                title: "SDM ECO — CAD drawing",
                summary: "3D STEP file for plant CAD integration.",
                format: "STEP",

                unavailableReason: "Awaiting an approved file and revision.",
              },
              {
                kind: "certificate",
                code: "CERT.SDM-ECO",
                title: "Product certificates",
                summary: "Only released certificates for the specific product and configuration will be listed.",
                format: "PDF",

                unavailableReason: "Awaiting an approved file and revision.",
              },
            ]}
          />
        </Suspense>
      </ErrorBoundary>
    </ScrollSection>

    <SectionDivider label="10.2" />

    {/* 10.2 Contacts */}
    <ScrollSection id="contacts" variant="tinted">
      <header className="max-w-3xl mb-8">
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
          Responsible teams.
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          These are the existing team contacts. A named approver and approval date must be recorded for each released asset; listing a department does not establish individual approval.
        </p>
      </header>
      <div className="grid gap-px bg-[hsl(var(--slate-200))] max-w-4xl">
        {CONTACTS.map((c) => (
          <article
            key={c.email}
            className="bg-background grid grid-cols-1 md:grid-cols-[1fr_180px_240px] gap-2 md:gap-6 p-4 md:p-5 items-baseline"
          >
            <span className="font-ui text-sm md:text-base text-foreground">{c.scope}</span>
            <span className="font-data text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {c.who}
            </span>
            <a
              href={`mailto:${c.email}`}
              className="font-data text-sm text-action dark:text-primary-400 hover:underline"
            >
              {c.email}
            </a>
          </article>
        ))}
      </div>
    </ScrollSection>

    <SectionDivider label="10.3" />

    {/* 10.3 Changelog */}
    <ScrollSection id="changelog">
      <header className="max-w-3xl mb-8">
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-4">
          Versioned, public, dated.
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          The system evolves. Every meaningful change appears here.
        </p>
      </header>
      <ol className="border-l-2 border-[hsl(var(--slate-200))] pl-6 space-y-6 max-w-3xl">
        {CHANGELOG.map((e) => (
          <li key={e.date + e.summary} className="relative">
            <span className="absolute -left-[33px] top-1 w-3 h-3 rounded-full bg-primary" aria-hidden />
            <div className="flex items-baseline gap-3 mb-1">
              <time className="font-data text-[11px] uppercase tracking-[0.2em] text-foreground">
                {e.date}
              </time>
              <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                · {e.scope}
              </span>
            </div>
            <p className="font-ui text-sm md:text-base text-foreground/80 leading-relaxed">{e.summary}</p>
          </li>
        ))}
      </ol>
    </ScrollSection>

    <TelemetryFooter
      className="mt-16 md:mt-20"
      items={[
        { label: "Section", value: "10 · Resources" },
        { label: "Scope", value: "Downloads + Owners + Version" },
        { label: "Owner", value: "MarComms" },
        { label: "Status", value: BRAND_SYSTEM.status, emphasis: true },
      ]}
    />
  </>
);

export default ResourcesPage;
