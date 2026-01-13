import { Zap, MapPin, Layers } from "lucide-react";

const VisualSystemOverview = () => {
  return (
    <section className="space-y-12">
      {/* Intro */}
      <p className="text-lg text-slate-600 max-w-3xl">
        The visual system is built from clearly defined layers, each with a specific role.
        Not every element carries the same weight or authority.
      </p>

      {/* Three layers - cleaner cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Foundations */}
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-ui text-lg font-semibold text-foreground">Foundations</h4>
              <span className="font-data text-[10px] text-slate-500 uppercase tracking-wide">Constant</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">The stable base of the brand:</p>
          <ul className="text-sm text-slate-500 space-y-1">
            <li>Primary neutrals</li>
            <li>Core typography</li>
            <li>Spacing &amp; layout rules</li>
          </ul>
        </div>

        {/* Signals */}
        <div className="border border-primary/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-ui text-lg font-semibold text-foreground">Signals</h4>
              <span className="font-data text-[10px] text-primary uppercase tracking-wide">Intentional</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">Communicates action, state, or emphasis:</p>
          <ul className="text-sm text-slate-500 space-y-1">
            <li>Action colors</li>
            <li>Status indicators</li>
            <li>Interactive highlights</li>
          </ul>
        </div>

        {/* Contextual */}
        <div className="border border-mineral-neutral/40 rounded-lg p-6 bg-mineral-surface/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-mineral-neutral rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white/90" />
            </div>
            <div>
              <h4 className="font-ui text-lg font-semibold text-foreground">Contextual</h4>
              <span className="font-data text-[10px] text-mineral-deep uppercase tracking-wide">Situational</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">Provides situational relevance:</p>
          <ul className="text-sm text-slate-500 space-y-1">
            <li>Field neutrals</li>
            <li>Eco indicators</li>
            <li>Textures</li>
          </ul>
        </div>
      </div>

      {/* Slate vs Mineral + What this enables */}
      <div className="grid lg:grid-cols-2 gap-12 pt-8 border-t border-border">
        {/* Slate vs Mineral */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Slate = Software</h4>
            <p className="text-sm text-slate-600">
              UI structure, text, forms, navigation, data containers. Cool, blue-biased, chromatically neutral.
            </p>
          </div>
          <div>
            <h4 className="font-ui font-semibold text-foreground mb-2">Mineral = Environment</h4>
            <p className="text-sm text-slate-600">
              Field modules, industry panels, outdoor contexts. Warm-neutral, olive, stone-like tones.
            </p>
          </div>
        </div>

        {/* What this enables */}
        <div>
          <h4 className="font-ui font-semibold text-foreground mb-4">What this enables</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="font-data text-sm text-primary font-medium">1</span>
              <p className="text-sm text-slate-600">
                <strong className="text-foreground">Remains expressive</strong> without becoming inconsistent
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-data text-sm text-primary font-medium">2</span>
              <p className="text-sm text-slate-600">
                <strong className="text-foreground">Supports multiple environments</strong> without visual drift
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-data text-sm text-primary font-medium">3</span>
              <p className="text-sm text-slate-600">
                <strong className="text-foreground">Makes design decisions</strong> repeatable and explainable
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualSystemOverview;
