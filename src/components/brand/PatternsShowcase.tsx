import {
  SectionDefault,
  SectionTinted,
  SectionEco,
  SectionDark,
  SectionSplit,
  SectionFullBleedMock,
} from "@/components/brand/sections/SectionVariants";
import { SolutionIcon, type SolutionIconName } from "@/components/brand/icons/SolutionIcon";
import { ProductPreviewCard } from "@/components/brand/ProductPreviewCard";
import { StatCallout, StatCalloutRow } from "@/components/brand/StatCallout";
import { PinnedCapability } from "@/components/brand/PinnedCapability";
import { ProofMarquee } from "@/components/brand/ProofMarquee";

/**
 * Patterns Showcase
 * Demonstrates the Customer.io-inspired system primitives layered onto our
 * industrial brand: six section rhythms, brand-restricted icon family,
 * eco-tinted product preview cards, stat callouts, pinned capability,
 * and the proof marquee. Section variants alternate deliberately.
 */

const ICONS: { name: SolutionIconName; title: string; body: string }[] = [
  { name: "density", title: "Density", body: "Real-time slurry density to the third decimal." },
  { name: "concentration", title: "Concentration", body: "Mass and volume concentration in a single read." },
  { name: "calibration", title: "Calibration", body: "Field calibration without removing the meter." },
  { name: "sustainability", title: "Sustainability", body: "Cut chemical waste by tightening control loops." },
  { name: "massflow", title: "Massflow", body: "Inline mass flow paired with density for true throughput." },
  { name: "integration", title: "Integration", body: "PLC, SCADA, OPC-UA. No proprietary bridges." },
  { name: "telemetry", title: "Telemetry", body: "Continuous diagnostics surfaced as engineer-grade signals." },
  { name: "compliance", title: "Compliance", body: "ATEX, IECEx, hygienic — designed in, not bolted on." },
];

const PROOF_ITEMS = [
  "PROCESS PLANTS",
  "MINING",
  "DREDGING",
  "FOOD & BEVERAGE",
  "PHARMA",
  "PULP & PAPER",
  "CERAMICS",
  "WASTEWATER",
];

export const PatternsShowcase = () => {
  return (
    <div className="-mx-4 md:-mx-8 lg:-mx-12 xl:-mx-20">
      {/* 1. DEFAULT — capability grid with icon family */}
      <SectionDefault id="patterns-capabilities" ariaLabel="Capabilities">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <header className="max-w-3xl mb-12 md:mb-16">
            <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">Capabilities</div>
            <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl mb-4">
              Everything an SDM&nbsp;Eco does
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Eight capabilities, one inline sensor. Engineered to be read at a glance and trusted on the line.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {ICONS.map((it, i) => (
              <article key={it.name} className="flex flex-col gap-4">
                <SolutionIcon
                  name={it.name}
                  accent={i % 3 === 0 ? "bronze" : i % 3 === 1 ? "green" : "slate"}
                  surface={i % 2 === 0 ? "slate" : "eco"}
                  size={64}
                  label={it.title}
                />
                <div>
                  <h3 className="font-ui font-semibold text-foreground text-base mb-1">{it.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{it.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionDefault>

      {/* 2. ECO — full-bleed product mock */}
      <SectionFullBleedMock
        id="patterns-product"
        ariaLabel="Product preview"
        eyebrow="HMI"
        title="A control surface engineers actually trust"
        caption="High-legibility light-mode HMI built for low-PPI panels and gloved hands."
        mock={
          <ProductPreviewCard
            surface="eco"
            caption="Liquid Profile A — Limestone slurry, 1.42 SG nominal. Massflow integration enabled."
            meta="SDM_ECO · v2025.04"
          >
            <div className="bg-card aspect-[16/9] p-8 grid grid-cols-3 gap-6 text-foreground">
              <div className="col-span-2 flex flex-col justify-between border-r border-border pr-6">
                <div>
                  <div className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    Density · Live
                  </div>
                  <div className="font-data font-bold tabular-nums leading-none text-6xl md:text-8xl text-foreground">
                    1.428
                  </div>
                  <div className="font-data text-xs uppercase tracking-widest text-muted-foreground mt-2">G/CM³</div>
                </div>
                <div className="grid grid-cols-3 gap-4 font-data text-[10px] uppercase tracking-widest">
                  {[
                    ["Temp", "24.6 °C"],
                    ["Flow", "82.4 m³/h"],
                    ["Status", "STABLE"],
                  ].map(([k, v], i) => (
                    <div key={k}>
                      <div className="text-muted-foreground mb-1">{k}</div>
                      <div className={i === 2 ? "text-primary" : "text-foreground"}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="font-data text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Trend · 60 min
                </div>
                <svg viewBox="0 0 120 60" className="w-full h-24 my-2">
                  <polyline
                    fill="none"
                    stroke="hsl(var(--rho-green))"
                    strokeWidth="2"
                    points="0,42 15,38 30,40 45,32 60,28 75,30 90,24 105,22 120,20"
                  />
                </svg>
                <div className="grid grid-cols-2 font-data text-[10px] uppercase tracking-widest">
                  <div>
                    <div className="text-muted-foreground mb-1">Min</div>
                    <div className="text-foreground">1.401</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground mb-1">Max</div>
                    <div className="text-foreground">1.434</div>
                  </div>
                </div>
              </div>
            </div>
          </ProductPreviewCard>
        }
      />

      {/* 3. TINTED — stat callouts */}
      <SectionTinted id="patterns-proof" ariaLabel="Proof">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <header className="max-w-3xl mb-12 md:mb-16">
            <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">Field evidence</div>
            <h2 className="font-ui font-bold text-foreground tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl mb-4">
              Numbers from the line
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Operator-reported results from sites running the SDM Eco in production. No projections.
            </p>
          </header>
          <StatCalloutRow>
            <StatCallout value="±0.001" label="Density accuracy in calibrated range" source="Lab Report 2024-Q3" emphasis="primary" />
            <StatCallout value="14%" label="Reduction in chemical dosing waste" source="Site A · 6 mo" />
            <StatCallout value="0" label="Recalibrations needed in first year" source="Site B · 12 mo" />
            <StatCallout value="9.2yr" label="Median MTBF across the install base" source="Service log 2024" />
          </StatCalloutRow>
        </div>
      </SectionTinted>

      {/* 4. SPLIT — pinned capability */}
      <SectionDefault id="patterns-pinned" ariaLabel="Pinned capability">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <PinnedCapability
            eyebrow="How it works"
            heading="From raw acoustic data to operator-grade signal"
            intro="A single inline sensor doing the work of three traditional instruments — without bolt-on logic."
            visual={
              <ProductPreviewCard surface="slate" meta="PROCESS DIAGRAM">
                <div className="bg-card aspect-square p-8 flex items-center justify-center">
                  <SolutionIcon name="integration" accent="green" surface="none" size={220} label="Integration diagram" />
                </div>
              </ProductPreviewCard>
            }
            blocks={[
              {
                meta: "01 · ACQUIRE",
                title: "Acoustic measurement, in-process",
                body: "The sensor reads slurry properties directly through the pipe wall. No bypass loop, no sample line, no moving parts in contact with the medium.",
              },
              {
                meta: "02 · INTERPRET",
                title: "Liquid Profiles do the math",
                body: "Stored fluid models translate raw signal into the values an operator actually wants — density, concentration, massflow — without manual conversion.",
              },
              {
                meta: "03 · DELIVER",
                title: "Signals every control system speaks",
                body: "4-20mA, HART, Modbus, OPC-UA. The same SDM Eco talks to a 1980s PLC and a 2026 cloud historian without an integration project.",
              },
            ]}
          />
        </div>
      </SectionDefault>

      {/* 5. DARK — voice / philosophy */}
      <SectionDark id="patterns-voice" ariaLabel="Philosophy">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="font-data text-[11px] uppercase tracking-[0.3em] text-primary mb-4">Engineering principle</div>
              <h2 className="font-ui font-bold text-white tracking-tight leading-[1.05] text-3xl md:text-5xl lg:text-6xl">
                Designed to be ignored.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                A well-designed inline sensor disappears into the line. Engineers stop thinking about it. That's the
                bar.
              </p>
              <p className="text-slate-400">
                We design every screen, label, and signal so the only attention the instrument earns is the alarm it
                raises — never the one it causes by being unclear.
              </p>
              <div className="flex flex-wrap gap-3 pt-4 font-data text-[10px] uppercase tracking-[0.25em] text-slate-500">
                <span className="px-3 py-1 border border-slate-700 rounded">CLARITY</span>
                <span className="px-3 py-1 border border-slate-700 rounded">EVIDENCE</span>
                <span className="px-3 py-1 border border-slate-700 rounded">RESTRAINT</span>
              </div>
            </div>
          </div>
        </div>
      </SectionDark>

      {/* 6. DEFAULT — proof marquee strip */}
      <SectionDefault id="patterns-marquee" ariaLabel="Industries served" density="compact">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20">
          <div className="font-data text-[11px] uppercase tracking-[0.3em] text-muted-foreground text-center mb-8">
            Deployed across
          </div>
          <ProofMarquee
            ariaLabel="Industries deployed across"
            items={PROOF_ITEMS.map((label) => (
              <span key={label} className="font-data text-sm md:text-base uppercase tracking-[0.25em]">
                {label}
              </span>
            ))}
          />
        </div>
      </SectionDefault>
    </div>
  );
};

export default PatternsShowcase;
