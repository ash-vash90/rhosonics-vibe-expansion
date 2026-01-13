import { Zap, MapPin, Layers } from "lucide-react";

const VisualSystemOverview = () => {
  return (
    <section className="space-y-12">
      {/* Intro - full width */}
      <p className="text-lg text-slate-600">
        The visual system is built from clearly defined layers, each with a specific role.
        Not every element carries the same weight or authority.
      </p>

      {/* Three layers grid - full width */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Foundations */}
        <div className="p-6 bg-slate-50 border-2 border-slate-300 rounded-lg">
          <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-ui text-lg font-bold text-foreground">Foundations</h4>
            <span className="font-data text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded">CONSTANT</span>
          </div>
          <p className="text-sm text-slate-600 mb-4">The constant base of the brand:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">Primary neutrals</span>
            <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">Core typography</span>
            <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">Spacing</span>
            <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded">Layout rules</span>
          </div>
        </div>

        {/* Signals */}
        <div className="p-6 bg-slate-50 border-2 border-primary/30 rounded-lg">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-primary/25">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-ui text-lg font-semibold text-foreground">Signals</h4>
            <span className="font-data text-[10px] bg-primary text-white px-2 py-0.5 rounded">INTENTIONAL</span>
          </div>
          <p className="text-sm text-slate-600 mb-4">Communicates action, state, or emphasis:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-primary/15 text-primary text-xs rounded">Action colors</span>
            <span className="px-2 py-1 bg-primary/15 text-primary text-xs rounded">Status indicators</span>
            <span className="px-2 py-1 bg-primary/15 text-primary text-xs rounded">Interactive highlights</span>
          </div>
        </div>

        {/* Contextual */}
        <div className="p-6 bg-mineral-surface border border-mineral-neutral/40 rounded-lg">
          <div className="w-12 h-12 bg-mineral-neutral rounded-lg flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-white/90" />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-ui text-lg font-semibold text-foreground/90">Contextual</h4>
            <span className="font-data text-[10px] bg-mineral-neutral text-white px-2 py-0.5 rounded">SITUATIONAL</span>
          </div>
          <p className="text-sm text-slate-500 mb-4">Provides situational relevance:</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-white/60 text-mineral-deep text-xs rounded">Field neutrals</span>
            <span className="px-2 py-1 bg-white/60 text-mineral-deep text-xs rounded">Eco indicators</span>
            <span className="px-2 py-1 bg-white/60 text-mineral-deep text-xs rounded">Textures</span>
          </div>
        </div>
      </div>

      {/* Slate vs Mineral + What this enables */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Slate vs Mineral */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 bg-slate-100 border border-slate-300 rounded-lg">
            <h4 className="font-ui font-semibold text-foreground mb-2">Slate = Software</h4>
            <p className="text-sm text-slate-600">
              UI structure, text, forms, navigation, data containers. Cool, blue-biased, chromatically neutral.
            </p>
          </div>
          <div className="p-5 bg-mineral-surface border border-mineral-neutral/30 rounded-lg">
            <h4 className="font-ui font-semibold text-foreground mb-2">Mineral = Environment</h4>
            <p className="text-sm text-slate-600">
              Field modules, industry panels, outdoor contexts. Warm-neutral, olive, stone-like tones.
            </p>
          </div>
        </div>

        {/* What this enables */}
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg">
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
