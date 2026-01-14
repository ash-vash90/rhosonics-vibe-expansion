import { Zap, MapPin, Layers } from "lucide-react";

const VisualSystemOverview = () => {
  return (
    <section className="space-y-16">
      {/* Intro */}
      <p className="text-lg text-muted-foreground max-w-2xl">
        The visual system is built from clearly defined layers, each with a specific role.
        Not every element carries the same weight or authority.
      </p>

      {/* Three layers - distinct visual treatment per layer */}
      <div className="grid md:grid-cols-3 gap-0 -mx-6">
        {/* Foundations - solid, grounded */}
        <div className="p-8 bg-slate-900 text-white">
          <Layers className="w-8 h-8 text-white/60 mb-6" />
          <div className="flex items-center gap-3 mb-4">
            <h4 className="font-ui text-xl font-bold">Foundations</h4>
            <span className="font-data text-[10px] bg-white/20 px-2 py-0.5">CONSTANT</span>
          </div>
          <p className="text-white/70 mb-6">The constant base of the brand:</p>
          <div className="flex flex-wrap gap-2">
            {["Primary neutrals", "Core typography", "Spacing", "Layout rules"].map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/10 text-white/80 text-xs">{tag}</span>
            ))}
          </div>
        </div>

        {/* Signals - vibrant, action-oriented */}
        <div className="p-8 bg-primary text-white">
          <Zap className="w-8 h-8 text-white/60 mb-6" />
          <div className="flex items-center gap-3 mb-4">
            <h4 className="font-ui text-xl font-bold">Signals</h4>
            <span className="font-data text-[10px] bg-white/20 px-2 py-0.5">INTENTIONAL</span>
          </div>
          <p className="text-white/80 mb-6">Communicates action, state, or emphasis:</p>
          <div className="flex flex-wrap gap-2">
            {["Action colors", "Status indicators", "Interactive highlights"].map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/20 text-white text-xs">{tag}</span>
            ))}
          </div>
        </div>

        {/* Contextual - warm, environmental */}
        <div className="p-8 bg-mineral-surface border-y border-r border-mineral-neutral/30">
          <MapPin className="w-8 h-8 text-mineral-deep/60 mb-6" />
          <div className="flex items-center gap-3 mb-4">
            <h4 className="font-ui text-xl font-bold text-mineral-deep">Contextual</h4>
            <span className="font-data text-[10px] bg-mineral-neutral text-white px-2 py-0.5">SITUATIONAL</span>
          </div>
          <p className="text-mineral-deep/70 mb-6">Provides situational relevance:</p>
          <div className="flex flex-wrap gap-2">
            {["Field neutrals", "Eco indicators", "Textures"].map(tag => (
              <span key={tag} className="px-2 py-1 bg-white/80 text-mineral-deep text-xs">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Slate vs Mineral - side by side comparison */}
      <div className="grid lg:grid-cols-2 gap-0 border border-border overflow-hidden rounded-lg">
        <div className="p-8 bg-slate-100">
          <h4 className="font-ui font-semibold text-foreground mb-3">Slate = Software</h4>
          <p className="text-muted-foreground mb-4">
            UI structure, text, forms, navigation, data containers.
          </p>
          <p className="text-sm text-muted-foreground">Cool, blue-biased, chromatically neutral.</p>
        </div>
        <div className="p-8 bg-mineral-surface border-l border-mineral-neutral/30">
          <h4 className="font-ui font-semibold text-mineral-deep mb-3">Mineral = Environment</h4>
          <p className="text-mineral-deep/80 mb-4">
            Field modules, industry panels, outdoor contexts.
          </p>
          <p className="text-sm text-mineral-deep/60">Warm-neutral, olive, stone-like tones.</p>
        </div>
      </div>

      {/* What this enables - inline bullets */}
      <div>
        <h3 className="font-ui text-lg font-semibold text-foreground mb-6">What this enables</h3>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Remains expressive", desc: "without becoming inconsistent" },
            { num: "02", title: "Supports multiple environments", desc: "without visual drift" },
            { num: "03", title: "Makes design decisions", desc: "repeatable and explainable" },
          ].map(item => (
            <div key={item.num} className="flex items-start gap-4">
              <span className="font-data text-sm text-primary">{item.num}</span>
              <div>
                <p className="text-foreground font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualSystemOverview;
