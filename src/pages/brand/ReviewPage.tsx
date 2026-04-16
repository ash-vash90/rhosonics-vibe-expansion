import { ScrollSection } from "@/components/brand/ScrollSection";
import { BRAND_VALUES } from "@/data/brand-values";
import { Target, Eye, MessageSquare, FileText, Headphones, Megaphone } from "@/lib/icons";

const ReviewPage = () => (
  <>
    {/* Header */}
    <ScrollSection className="pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="max-w-3xl">
        <span className="font-data text-[10px] uppercase tracking-widest text-primary block mb-4">
          Internal Review
        </span>
        <h1 className="font-ui text-3xl md:text-4xl font-bold text-foreground mb-4">
          Brand Strategy — Decision Points
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl">
          Seven touchpoints that need alignment and sign-off. Scroll through each to review and discuss.
        </p>
      </div>
    </ScrollSection>

    {/* 01 — Mission & Vision */}
    <ScrollSection className="py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="h-px bg-border mb-10" />
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">01</span>
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">Mission & Vision</h2>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">Needs sign-off</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg border border-border/50 bg-muted/20">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="font-data text-[10px] uppercase tracking-widest text-primary">Mission</span>
                </div>
                <h3 className="font-ui text-xl font-bold text-foreground mb-2">Measure What Matters</h3>
                <p className="text-sm text-muted-foreground">
                  We build ultrasonic measurement systems in partnership with the industries that rely on them. Better measurement leads to better decisions.
                </p>
              </div>
              <div className="p-6 rounded-lg border border-border/50 bg-foreground text-background">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-primary" />
                  <span className="font-data text-[10px] uppercase tracking-widest text-primary">Vision</span>
                </div>
                <h3 className="font-ui text-xl font-bold mb-2">Progress That Matters</h3>
                <p className="text-sm opacity-70">
                  Every process optimized, every industry more sustainable. Through partnership, expertise, and measurable impact.
                </p>
              </div>
            </div>

            <DecisionList items={[
              "Confirm or revise the mission statement",
              "Confirm or revise the vision statement",
              "Align on how these appear in external communications",
            ]} />
          </div>
        </div>
      </div>
    </ScrollSection>

    {/* 02 — Four Core Values */}
    <ScrollSection className="py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="h-px bg-border mb-10" />
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">02</span>
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">Four Core Values</h2>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">Needs sign-off</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BRAND_VALUES.map((value) => (
                <div key={value.id} className="p-5 rounded-lg border border-border/50 bg-muted/20">
                  <div className="flex items-center gap-3 mb-3">
                    <value.icon className="w-5 h-5 text-primary" />
                    <span className="font-data text-xs text-muted-foreground">{value.num}</span>
                  </div>
                  <h4 className="font-ui font-bold text-foreground mb-1">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.desc.split('.')[0]}.</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {value.keywords.slice(0, 3).map((k) => (
                      <span key={k} className="font-data text-[10px] uppercase tracking-wider text-muted-foreground/60 bg-muted/30 px-1.5 py-0.5 rounded">{k}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <DecisionList items={[
              "Approve the four proposed values",
              "Decide if any values should be reworded or replaced",
              "Confirm hierarchy / priority order",
            ]} />
          </div>
        </div>
      </div>
    </ScrollSection>

    {/* 03 — Two Proposed ICPs */}
    <ScrollSection className="py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="h-px bg-border mb-10" />
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">03</span>
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">Two Proposed ICPs</h2>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">Working direction</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg border border-primary/20 bg-primary/5">
                <span className="font-data text-[10px] uppercase tracking-widest text-primary block mb-2">Primary</span>
                <h4 className="font-ui font-bold text-lg text-foreground mb-1">Senior Process Engineer</h4>
                <p className="text-sm text-muted-foreground mb-3">15+ years experience · Evaluates on spec sheets, not brochures</p>
                <ul className="space-y-1.5">
                  {[
                    "Skeptical of marketing claims — wants falsifiable data",
                    "Reads technical documentation before sales material",
                    "Decides based on ±0.1% accuracy, not brand prestige",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 bg-primary/50 rounded-full mt-1.5 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 rounded-lg border border-border/50 bg-muted/20">
                <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-2">Secondary</span>
                <h4 className="font-ui font-bold text-lg text-foreground mb-1">Operations Manager</h4>
                <p className="text-sm text-muted-foreground mb-3">ROI-focused · Needs data to justify procurement internally</p>
                <ul className="space-y-1.5">
                  {[
                    "Translates technical value into business outcomes",
                    "Needs clear before/after metrics for budget approval",
                    "Measures success in uptime, not feature lists",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 bg-primary/50 rounded-full mt-1.5 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/20 border border-border/50">
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">Target Verticals</span>
              <div className="flex flex-wrap gap-2">
                {["Mining", "Semiconductor", "Dredging", "Wastewater"].map((v) => (
                  <span key={v} className="text-sm text-foreground bg-muted/40 px-3 py-1 rounded">{v}</span>
                ))}
              </div>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-2 mt-4">Target Roles</span>
              <div className="flex flex-wrap gap-2">
                {["Engineer", "Plant Manager", "Procurement"].map((r) => (
                  <span key={r} className="text-sm text-foreground bg-muted/40 px-3 py-1 rounded">{r}</span>
                ))}
              </div>
            </div>

            <DecisionList items={[
              "Validate primary vs secondary persona priority",
              "Confirm or adjust target verticals",
              "Add or remove specific job titles",
            ]} />
          </div>
        </div>
      </div>
    </ScrollSection>

    {/* 04 — Brand Personality */}
    <ScrollSection className="py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="h-px bg-border mb-10" />
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">04</span>
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">Brand Personality</h2>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">Working direction</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Authoritative", "Collaborative", "Problem-Solving", "Warm"].map((trait) => (
                <div key={trait} className="p-4 rounded-lg border border-border/50 bg-muted/20 text-center">
                  <span className="font-ui font-semibold text-sm text-foreground">{trait}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg border border-border/50 bg-muted/20">
                <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">The Persona</span>
                <h4 className="font-ui font-bold text-foreground mb-1">Senior Engineer</h4>
                <p className="text-sm text-muted-foreground">Direct. Knowledgeable. Skeptical of marketing claims. They skip to the specifications.</p>
              </div>
              <div className="p-5 rounded-lg border border-border/50 bg-muted/20">
                <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">The Aesthetic</span>
                <h4 className="font-ui font-bold text-foreground mb-1">Lab in the Field</h4>
                <p className="text-sm text-muted-foreground">Clean white space meets heavy industrial textures. High contrast data displays.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic border-l-2 border-border pl-4">
              "Experienced social engineer" meets "Senior Engineer, skeptical of marketing"
            </p>

            <DecisionList items={[
              "Agree on the personality traits",
              "Decide if tone leans more technical or approachable",
              "Validate the archetype framing",
            ]} />
          </div>
        </div>
      </div>
    </ScrollSection>

    {/* 05 — Voice Pillars */}
    <ScrollSection className="py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="h-px bg-border mb-10" />
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">05</span>
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">Voice Pillars</h2>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">Defined</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-border/50 rounded-lg overflow-hidden">
              {[
                { num: "01", title: "Direct", desc: "Lead with the point. Respect the reader's time." },
                { num: "02", title: "Educational", desc: "Explain how and why, not just what." },
                { num: "03", title: "Evidence-Based", desc: "Measurable impact over abstract claims." },
                { num: "04", title: "Partnership-First", desc: "The reader's success is our success." },
              ].map((p, i) => (
                <div key={p.num} className={`p-4 ${i > 0 ? 'border-l border-border/50' : ''}`}>
                  <span className="font-data text-lg text-primary/40">{p.num}</span>
                  <h4 className="font-ui font-bold text-foreground mt-1">{p.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Terminology sample */}
            <div>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">Preferred Terminology (sample)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  ["Cutting-edge", "Ultrasonic measurement"],
                  ["Revolutionary", "Proven"],
                  ["Solution", "System / Sensor"],
                  ["Best-in-class", "[Cite specific metric]"],
                ].map(([avoid, prefer]) => (
                  <div key={avoid} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground line-through">{avoid}</span>
                    <span className="text-foreground text-xs">→</span>
                    <span className="text-xs text-foreground font-medium">{prefer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tone by context sample */}
            <div>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">Tone by Context</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: FileText, context: "Technical Docs", tone: "Precise & Instructive", ex: "Connect the 4-20mA output to terminals 3 and 4." },
                  { icon: Megaphone, context: "Sales & Marketing", tone: "Confident & Benefit-Focused", ex: "Reduce reagent consumption by 15-25% through real-time density monitoring." },
                  { icon: Headphones, context: "Customer Support", tone: "Helpful & Direct", ex: "This error occurs when flow rate drops below 0.5 m/s." },
                  { icon: MessageSquare, context: "Social Media", tone: "Factual & Engaging", ex: "40 years of density measurement. 10,000+ installations. One obsession: accuracy." },
                ].map((item) => (
                  <div key={item.context} className="p-3 rounded-lg bg-muted/20 border border-border/50">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-ui font-semibold text-xs text-foreground">{item.context}</span>
                    </div>
                    <span className="font-data text-[10px] text-primary uppercase tracking-wider">{item.tone}</span>
                    <p className="text-xs text-muted-foreground italic mt-1">"{item.ex}"</p>
                  </div>
                ))}
              </div>
            </div>

            <DecisionList items={[
              "Approve the four voice pillars",
              "Review preferred terminology list",
              "Confirm tone-by-context guidelines",
            ]} />
          </div>
        </div>
      </div>
    </ScrollSection>

    {/* 06 — Visual Identity */}
    <ScrollSection className="py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="h-px bg-border mb-10" />
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">06</span>
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">Visual Identity & "Lab in the Field"</h2>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">Working direction</span>
            </div>

            {/* Colour */}
            <div>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">Colour Palette</span>
              <div className="flex gap-3">
                {[
                  { name: "Obsidian", color: "bg-rho-obsidian", hex: "#14171F" },
                  { name: "Green", color: "bg-primary", hex: "#33993C" },
                  { name: "Slate 100", color: "bg-slate-100", hex: "#F1F5F9" },
                  { name: "Slate 500", color: "bg-slate-500", hex: "#64748B" },
                  { name: "Mineral", color: "bg-[#7a7a5c]", hex: "#7A7A5C" },
                ].map((c) => (
                  <div key={c.name} className="text-center">
                    <div className={`w-12 h-12 rounded ${c.color} border border-border/30`} />
                    <span className="font-data text-[9px] text-muted-foreground mt-1 block">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">Typography</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                  <span className="font-ui text-lg font-bold text-foreground">Instrument Sans</span>
                  <p className="text-xs text-muted-foreground mt-1">UI text · Never all-caps</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                  <span className="font-data text-lg text-foreground">JETBRAINS MONO</span>
                  <p className="text-xs text-muted-foreground mt-1">Data · Always all-caps</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                  <span className="text-lg font-bold text-foreground" style={{ fontFamily: 'Unbounded' }}>Unbounded</span>
                  <p className="text-xs text-muted-foreground mt-1">Logo only</p>
                </div>
              </div>
            </div>

            {/* Photo treatment */}
            <div>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">Photo Treatment (4-Step)</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { step: "01", label: "Desaturate", desc: "−40% saturation" },
                  { step: "02", label: "Contrast", desc: "+15% contrast" },
                  { step: "03", label: "Grain", desc: "Subtle texture" },
                  { step: "04", label: "Green Tint", desc: "Brand overlay" },
                ].map((s) => (
                  <div key={s.step} className="p-3 rounded bg-muted/20 border border-border/50 text-center">
                    <span className="font-data text-xs text-primary/40">{s.step}</span>
                    <p className="font-ui font-semibold text-xs text-foreground mt-1">{s.label}</p>
                    <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <DecisionList items={[
              "Approve primary colour palette (Obsidian, Slate, Green)",
              "Confirm typography choices and roles",
              "Validate photo treatment grades",
            ]} />
          </div>
        </div>
      </div>
    </ScrollSection>

    {/* 07 — Imagery Direction */}
    <ScrollSection className="py-12 md:py-16">
      <div className="max-w-3xl">
        <div className="h-px bg-border mb-10" />
        <div className="flex items-start gap-4 md:gap-6">
          <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">07</span>
          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">Imagery Direction</h2>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">In progress</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg border border-border/50 bg-muted/20">
                <span className="font-data text-[10px] uppercase tracking-widest text-primary block mb-2">Real & Gritty</span>
                <h4 className="font-ui font-bold text-foreground mb-1">Field Photography</h4>
                <p className="text-sm text-muted-foreground">Authentic industrial environments: mining sites, control rooms, dredging vessels. Shows the product in context.</p>
              </div>
              <div className="p-5 rounded-lg border border-border/50 bg-muted/20">
                <span className="font-data text-[10px] uppercase tracking-widest text-primary block mb-2">Abstract & Precise</span>
                <h4 className="font-ui font-bold text-foreground mb-1">Technical Visuals</h4>
                <p className="text-sm text-muted-foreground">Ultrasonic wave patterns, sensor close-ups, data visualizations. Clean, controlled, lab-grade aesthetic.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="font-data text-[10px] uppercase tracking-widest text-amber-600 block mb-1">Note</span>
              <p className="text-sm text-foreground">Current imagery is AI-generated placeholder. Real photography replacement is needed for final brand assets.</p>
            </div>

            <DecisionList items={[
              "Review current AI placeholder imagery",
              "Plan real photography shoot timeline and locations",
              "Approve photo treatment and overlay rules",
            ]} />
          </div>
        </div>
      </div>
    </ScrollSection>
  </>
);

const DecisionList = ({ items }: { items: string[] }) => (
  <div>
    <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
      Decisions needed
    </span>
    <ul className="space-y-1.5">
      {items.map((d) => (
        <li key={d} className="flex items-start gap-2 text-sm text-foreground">
          <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mt-1.5 flex-shrink-0" />
          {d}
        </li>
      ))}
    </ul>
  </div>
);

export default ReviewPage;
