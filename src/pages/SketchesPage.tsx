import { ArrowRight } from "@/lib/icons";
import { FieldNote } from "@/components/brand/FieldNote";
import { VerifierByline } from "@/components/brand/VerifierByline";
import dredgingHero from "@/assets/case-studies/dredging-hero.jpg";
import miningHero from "@/assets/case-studies/mining-hero.jpg";

const SketchesPage = () => {
  return (
    <div className="min-h-screen bg-background py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-24">
        <header className="space-y-3">
          <span className="font-data text-xs uppercase tracking-[0.2em] text-primary">
            SKETCH / NOT SHIPPED
          </span>
          <h1 className="font-ui text-4xl font-semibold text-foreground">
            Adding humanity to the brand system
          </h1>
          <p className="font-ui text-base text-muted-foreground max-w-prose leading-relaxed">
            Two concepts for injecting real people into the visual language.
            Both use only existing brand tokens (Instrument Sans italic, JetBrains Mono, primary
            green, rho-obsidian) — no new fonts, no decoration, no glassmorphism.
          </p>
        </header>

        {/* =============================================== */}
        {/* CONCEPT 1 — FieldNote                            */}
        {/* =============================================== */}
        <section className="space-y-8">
          <div className="flex items-baseline gap-4">
            <span className="font-data text-sm text-primary uppercase tracking-wider">01</span>
            <h2 className="font-ui text-2xl font-semibold text-foreground">Field note</h2>
          </div>
          <p className="font-ui text-sm text-muted-foreground max-w-prose leading-relaxed">
            A margin-note component for punctuating long-form pages. Slight -0.4°
            rotation suggests it was pinned to the page by a real person, not typeset
            by a designer. Italic Instrument Sans for the human voice, font-data for
            the technical stamp and signature.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <FieldNote
              stamp="2024-03-14 · ANTOFAGASTA, CL"
              quote="Dropped the SDM into the thickener return line on a Tuesday. Dosing was under control by Friday. First time in four years I didn't get a 3 AM call."
              name="Carlos M."
              role="Process engineer · Sierra Gorda Cu"
              initials="CM"
            />
            <FieldNote
              stamp="2023-11-02 · ROTTERDAM, NL"
              quote="We tried three density meters on this dredger. The other two fouled within a week. This one is still reading inside spec after eighteen months."
              name="Pieter H."
              role="Ship engineer · Van Oord dredging"
              initials="PH"
            />
          </div>

          <div className="pt-4">
            <p className="font-data text-[10px] uppercase tracking-wider text-muted-foreground">
              Usage intent
            </p>
            <p className="font-ui text-sm text-muted-foreground max-w-prose mt-1 leading-relaxed">
              Once per long-form page (origin story, deep case study). Not a card
              grid — loses its "one person said this" weight when repeated.
            </p>
          </div>
        </section>

        {/* =============================================== */}
        {/* CONCEPT 2 — VerifierByline on existing cards     */}
        {/* =============================================== */}
        <section className="space-y-8">
          <div className="flex items-baseline gap-4">
            <span className="font-data text-sm text-primary uppercase tracking-wider">02</span>
            <h2 className="font-ui text-2xl font-semibold text-foreground">
              Verifier byline
            </h2>
          </div>
          <p className="font-ui text-sm text-muted-foreground max-w-prose leading-relaxed">
            A metadata footer added to every case study card. Forces the claim to
            have a person's name attached — "42% efficiency increase" becomes
            "42% efficiency increase, verified by a named engineer at a named site."
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Light variant — adapted from existing CaseStudies markup */}
            <article className="group relative overflow-hidden rounded-lg shadow-md border border-border bg-card flex flex-col">
              <div className="relative h-40 overflow-hidden bg-card">
                <img
                  src={miningHero}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-data text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-rho-obsidian text-primary-foreground">
                    MINING
                  </span>
                </div>
              </div>
              <div className="relative p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <div className="font-data text-4xl md:text-5xl mb-1 text-primary">
                    31%
                  </div>
                  <div className="text-sm font-medium text-slate-600">Water savings</div>
                </div>
                <h3 className="text-lg font-semibold font-ui mb-2 text-foreground">
                  Copper Tailings Optimization
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 flex-1">
                  Continuous density measurement improved water recovery.
                </p>

                <VerifierByline
                  name="Carlos M."
                  role="Sierra Gorda · CL"
                  initials="CM"
                  variant="light"
                />

                <button className="-mx-6 -mb-6 mt-5 px-6 py-4 w-[calc(100%+3rem)] flex items-center justify-center gap-2 text-sm font-medium text-primary border-t border-border hover:bg-muted/50 transition-colors">
                  <span className="font-ui">Read full study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* Dark variant */}
            <article className="group relative overflow-hidden rounded-lg shadow-md border border-border/30 bg-rho-obsidian flex flex-col">
              <div className="relative h-40 overflow-hidden bg-rho-obsidian">
                <img
                  src={dredgingHero}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rho-obsidian via-rho-obsidian/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="font-data text-[11px] uppercase tracking-wider px-2.5 py-1 rounded bg-rho-obsidian text-primary-foreground">
                    DREDGING
                  </span>
                </div>
              </div>
              <div className="relative p-6 flex flex-col flex-1">
                <div className="mb-4">
                  <div className="font-data text-4xl md:text-5xl mb-1 text-primary">
                    42%
                  </div>
                  <div className="text-sm font-medium text-slate-300">Efficiency increase</div>
                </div>
                <h3 className="text-lg font-semibold font-ui mb-2 text-white">
                  North Sea Sediment Monitoring
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 flex-1">
                  Real-time slurry density monitoring enabled precise dredging operations.
                </p>

                <VerifierByline
                  name="Pieter H."
                  role="Van Oord · NL"
                  initials="PH"
                  variant="dark"
                />

                <button className="-mx-6 -mb-6 mt-5 px-6 py-4 w-[calc(100%+3rem)] flex items-center justify-center gap-2 text-sm font-medium text-primary border-t border-slate-700 hover:bg-slate-800/40 transition-colors">
                  <span className="font-ui">Read full study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          </div>

          <div className="pt-4">
            <p className="font-data text-[10px] uppercase tracking-wider text-muted-foreground">
              Usage intent
            </p>
            <p className="font-ui text-sm text-muted-foreground max-w-prose mt-1 leading-relaxed">
              Every case study card. Becomes structural — every metric claim must
              cite the person who verified it.
            </p>
          </div>
        </section>

        {/* =============================================== */}
        {/* Decision prompt                                  */}
        {/* =============================================== */}
        <section className="pt-8 border-t border-border space-y-4">
          <h2 className="font-ui text-xl font-semibold text-foreground">Pick a direction</h2>
          <ul className="space-y-2 text-sm text-muted-foreground max-w-prose">
            <li className="flex gap-3">
              <span className="font-data text-primary">A.</span>
              <span>Ship <span className="text-foreground font-medium">Concept 2</span> as infrastructure, keep 1 as a special-case component.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-data text-primary">B.</span>
              <span>Ship only <span className="text-foreground font-medium">Concept 1</span> — sparingly, on long-form pages.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-data text-primary">C.</span>
              <span>Kill both. Try a different angle (texture, failure-case honesty, signature motion).</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SketchesPage;
