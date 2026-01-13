import { RhosonicsLogo } from "../RhosonicsLogo";
import { Check, X } from "lucide-react";

interface ExampleCardProps {
  type: 'do' | 'dont';
  title: string;
  children: React.ReactNode;
}

const ExampleCard = ({ type, title, children }: ExampleCardProps) => (
  <div className={`rounded-lg border overflow-hidden ${
    type === 'do' ? 'border-eco-border' : 'border-red-200'
  }`}>
    <div className={`px-4 py-2 flex items-center gap-2 ${
      type === 'do' ? 'bg-eco-surface' : 'bg-red-50'
    }`}>
      {type === 'do' ? (
        <Check className="w-4 h-4 text-primary" />
      ) : (
        <X className="w-4 h-4 text-destructive" />
      )}
      <span className={`font-ui font-medium text-sm ${
        type === 'do' ? 'text-primary' : 'text-destructive'
      }`}>
        {title}
      </span>
    </div>
    <div className="p-4 bg-card">
      {children}
    </div>
  </div>
);

export const DosAndDonts = () => {
  return (
    <section id="dos-donts" className="mb-32">
      <h2 className="section-header">Do's & Don'ts</h2>
      <p className="text-muted-foreground mb-8">
        Mistakes we've witnessed. Guardrails we've installed.
      </p>

      {/* Logo Usage */}
      <h3 className="label-tech text-slate-500 mb-4">LOGO USAGE</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ExampleCard type="do" title="Proper spacing">
          <div className="h-24 flex items-center justify-center bg-slate-50 rounded">
            <div className="border-2 border-dashed border-primary/30 p-4">
              <div className="w-12 h-12">
                <RhosonicsLogo variant="gradient" />
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard type="dont" title="Rotate the logo">
          <div className="h-24 flex items-center justify-center bg-slate-50 rounded">
            <div className="w-12 h-12 rotate-45">
              <RhosonicsLogo variant="gradient" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard type="dont" title="Distort proportions">
          <div className="h-24 flex items-center justify-center bg-slate-50 rounded">
            <div className="w-20 h-10">
              <RhosonicsLogo variant="gradient" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard type="do" title="Use approved colors">
          <div className="h-24 flex items-center justify-center bg-rho-obsidian rounded">
            <div className="w-12 h-12">
              <RhosonicsLogo variant="white" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard type="dont" title="Add effects">
          <div className="h-24 flex items-center justify-center bg-slate-50 rounded">
            <div className="w-12 h-12 drop-shadow-[0_0_10px_rgba(51,153,60,0.8)]">
              <RhosonicsLogo variant="gradient" />
            </div>
          </div>
        </ExampleCard>

        <ExampleCard type="dont" title="Place on busy backgrounds">
          <div className="h-24 flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded">
            <div className="w-12 h-12">
              <RhosonicsLogo variant="white" />
            </div>
          </div>
        </ExampleCard>
      </div>

      {/* Color Usage */}
      <h3 className="label-tech text-slate-500 mb-4">COLOR USAGE</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <ExampleCard type="do" title="Use the brand gradient for CTAs">
          <div className="flex gap-3">
            <button className="chamfer-shape bg-brand-gradient text-primary-foreground px-4 py-2 font-data text-xs uppercase">
              Get Quote
            </button>
          </div>
        </ExampleCard>

        <ExampleCard type="dont" title="Use Lime Accent alone">
          <div className="flex gap-3">
            <button className="chamfer-shape bg-rho-green-accent text-primary-foreground px-4 py-2 font-data text-xs uppercase">
              Get Quote
            </button>
          </div>
        </ExampleCard>

        <ExampleCard type="do" title="Obsidian for dark surfaces">
          <div className="h-20 bg-rho-obsidian rounded flex items-center justify-center">
            <span className="text-slate-100 font-ui">Dark Mode UI</span>
          </div>
        </ExampleCard>

        <ExampleCard type="dont" title="Pure black (#000000)">
          <div className="h-20 bg-black rounded flex items-center justify-center">
            <span className="text-slate-100 font-ui">Dark Mode UI</span>
          </div>
        </ExampleCard>
      </div>

      {/* Typography Usage */}
      <h3 className="label-tech text-slate-500 mb-4">TYPOGRAPHY</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <ExampleCard type="do" title="Unbounded for logo only">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-xl tracking-wide uppercase">RHOSONICS</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Preserves brand distinction</p>
        </ExampleCard>

        <ExampleCard type="dont" title="Unbounded for headings">
          <h3 className="font-logo text-xl">Product Features</h3>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Dilutes logo font uniqueness</p>
        </ExampleCard>

        <ExampleCard type="do" title="JetBrains Mono for data">
          <div className="font-data text-2xl text-foreground">
            1.4502 <span className="text-sm text-muted-foreground">g/L</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Monospace ensures alignment and precision</p>
        </ExampleCard>

        <ExampleCard type="dont" title="System fonts for data">
          <div className="font-sans text-2xl text-foreground">
            1.4502 <span className="text-sm text-muted-foreground">g/L</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Variable width reduces scanability</p>
        </ExampleCard>
      </div>

      {/* Layout Usage */}
      <h3 className="label-tech text-slate-500 mb-4">LAYOUT USAGE</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <ExampleCard type="do" title="Maintain hierarchy">
          <div className="space-y-2 text-left">
            <div className="font-ui font-bold text-lg">Primary Heading</div>
            <div className="font-ui text-sm text-muted-foreground">Supporting description text</div>
            <div className="font-data text-2xl">1.4502 <span className="text-sm">g/L</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Guides the eye predictably</p>
        </ExampleCard>

        <ExampleCard type="dont" title="Center everything">
          <div className="space-y-2 text-center">
            <div className="font-ui font-bold text-lg">Primary Heading</div>
            <div className="font-ui text-sm text-muted-foreground">Supporting description text that wraps</div>
            <div className="font-data text-2xl">1.4502 g/L</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Breaks reading rhythm in dense UI</p>
        </ExampleCard>

        <ExampleCard type="dont" title="Over-cardify data">
          <div className="grid grid-cols-2 gap-1">
            {["Temp", "Flow", "pH", "SG"].map(label => (
              <div key={label} className="bg-slate-100 p-2 rounded text-center text-xs">
                <div className="text-muted-foreground">{label}</div>
                <div className="font-data">0.00</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Creates visual noise, slows scanning</p>
        </ExampleCard>

        <ExampleCard type="do" title="Use consistent grid">
          <div className="grid grid-cols-4 gap-4 text-xs">
            <div><span className="text-muted-foreground">Temp</span><br/><span className="font-data">24.5°C</span></div>
            <div><span className="text-muted-foreground">Flow</span><br/><span className="font-data">1.2 m/s</span></div>
            <div><span className="text-muted-foreground">pH</span><br/><span className="font-data">7.2</span></div>
            <div><span className="text-muted-foreground">SG</span><br/><span className="font-data">1.45</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Aligned data is faster to scan</p>
        </ExampleCard>

        <ExampleCard type="dont" title="Decorative spec tables">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-lg border-2 border-primary/20">
            <div className="text-sm font-ui font-bold text-primary">Specifications</div>
            <div className="text-xs mt-1">Range: 0.8 - 3.0 g/cm³</div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Style competes with content</p>
        </ExampleCard>

        <ExampleCard type="do" title="Clean spec tables">
          <div className="text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-muted-foreground">Range</span>
              <span className="font-data">0.8 - 3.0 g/cm³</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-data">±0.1%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">Why: Data is the interface</p>
        </ExampleCard>
      </div>

      {/* General Guidelines */}
      <h3 className="label-tech text-slate-500 mb-4">GENERAL GUIDELINES</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-base p-6">
          <div className="flex items-center gap-2 mb-4">
            <Check className="w-5 h-5 text-primary" />
            <span className="font-ui font-bold text-lg text-primary">Always</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Maintain minimum clear space around the logo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Use high contrast for data displays</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Include units with all measurements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Use the chamfered button shape for CTAs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Test designs in both light and dark contexts</span>
            </li>
          </ul>
        </div>

        <div className="card-base p-6">
          <div className="flex items-center gap-2 mb-4">
            <X className="w-5 h-5 text-destructive" />
            <span className="font-ui font-bold text-lg text-destructive">Never</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Add drop shadows or glows to the logo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Use decorative or script fonts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Apply gradient to body text</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Use Lime Accent as a standalone color</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Combine multiple patterns on one surface</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DosAndDonts;
