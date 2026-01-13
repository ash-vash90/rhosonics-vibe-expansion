import { BrandCallout } from "./BrandCallout";

export const ColorMatrix = () => {
  return (
    <section id="colors" className="mb-32">
      <h2 className="section-header">Color Roles</h2>
      <p className="text-muted-foreground mb-12 max-w-2xl">
        Color communicates State, Structure, or Context. 
        Mood and decoration without meaning are not permitted.
      </p>

      {/* Color Role Hierarchy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="p-5 bg-slate-100 border border-slate-300 rounded-lg">
          <span className="label-tech text-slate-500 mb-2 block">SLATE</span>
          <p className="font-ui font-semibold text-lg text-foreground mb-1">Software</p>
          <p className="text-sm text-muted-foreground">UI structure, text, forms, navigation</p>
        </div>
        <div className="p-5 bg-mineral-surface border border-mineral-neutral/30 rounded-lg">
          <span className="label-tech text-mineral-deep mb-2 block">MINERAL</span>
          <p className="font-ui font-semibold text-lg text-foreground mb-1">Environment</p>
          <p className="text-sm text-muted-foreground">Field modules, industry panels, outdoor contexts</p>
        </div>
        <div className="p-5 bg-rho-obsidian rounded-lg">
          <span className="label-tech text-slate-400 mb-2 block">OBSIDIAN</span>
          <p className="font-ui font-semibold text-lg text-slate-100 mb-1">Hardware</p>
          <p className="text-sm text-slate-400">Device surfaces, dark UI, physical products</p>
        </div>
      </div>

      {/* Signal Colors */}
      <h3 className="label-tech text-primary mb-4">SIGNAL COLORS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="card-base p-6">
          <div className="w-full h-16 bg-primary rounded-md mb-4"></div>
          <h4 className="font-ui font-bold text-foreground">Rhosonics Green</h4>
          <code className="label-tech text-muted-foreground">#33993c</code>
          <p className="text-sm text-muted-foreground mt-2">Core identifier. Actions and active states.</p>
        </div>
        <div className="card-base p-6">
          <div className="w-full h-16 bg-rho-green-accent rounded-md mb-4"></div>
          <h4 className="font-ui font-bold text-foreground">Lime Accent</h4>
          <code className="label-tech text-muted-foreground">#73B82E</code>
          <p className="text-sm text-muted-foreground mt-2">Supporting tone for gradient depth.</p>
        </div>
        <div className="card-base p-6">
          <div className="w-full h-16 bg-rho-obsidian rounded-md mb-4"></div>
          <h4 className="font-ui font-bold text-foreground">Obsidian</h4>
          <code className="label-tech text-muted-foreground">#111522</code>
          <p className="text-sm text-muted-foreground mt-2">Blue-tinted black. Never pure #000.</p>
        </div>
      </div>

      <BrandCallout variant="avoid" title="Critical Separation" className="mb-12">
        Mineral colors are warm-neutral environmental tones. 
        They must never substitute for Slate in UI elements.
      </BrandCallout>

      {/* Slate Scale */}
      <h3 className="label-tech text-slate-500 mb-4">SLATE SCALE — UI STRUCTURE</h3>
      <div className="grid grid-cols-5 lg:grid-cols-10 gap-2 mb-12">
        {[
          { name: "50", bg: "bg-slate-50", text: "text-slate-600" },
          { name: "100", bg: "bg-slate-100", text: "text-slate-600" },
          { name: "200", bg: "bg-slate-200", text: "text-slate-600" },
          { name: "300", bg: "bg-slate-300", text: "text-slate-700" },
          { name: "400", bg: "bg-slate-400", text: "text-slate-100" },
          { name: "500", bg: "bg-slate-500", text: "text-slate-100" },
          { name: "600", bg: "bg-slate-600", text: "text-slate-100" },
          { name: "700", bg: "bg-slate-700", text: "text-slate-100" },
          { name: "800", bg: "bg-slate-800", text: "text-slate-100" },
          { name: "900", bg: "bg-slate-900", text: "text-slate-100" }
        ].map(shade => (
          <div key={shade.name} className={`aspect-square ${shade.bg} ${shade.text} rounded flex items-center justify-center`}>
            <span className="font-data text-xs font-bold">{shade.name}</span>
          </div>
        ))}
      </div>

      {/* Gradients */}
      <h3 className="label-tech text-slate-500 mb-4">BRAND GRADIENTS</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xl">
        Flat color is preferred. Gradients add depth or signal transition — never decoration.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-24 bg-brand-gradient rounded-lg flex items-end p-4">
          <span className="font-ui font-bold text-primary-foreground">Primary</span>
        </div>
        <div className="h-24 bg-obsidian-gradient rounded-lg flex items-end p-4">
          <span className="font-ui font-bold text-slate-100">Obsidian</span>
        </div>
        <div className="h-24 rounded-lg flex items-end p-4" style={{
          background: 'linear-gradient(145deg, hsl(45 10% 58%) 0%, hsl(45 8% 52%) 100%)'
        }}>
          <span className="font-ui font-bold text-white">Mineral</span>
        </div>
      </div>
    </section>
  );
};

export default ColorMatrix;
