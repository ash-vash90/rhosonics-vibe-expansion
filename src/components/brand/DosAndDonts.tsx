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
        </ExampleCard>

        <ExampleCard type="dont" title="Unbounded for headings">
          <h3 className="font-logo text-xl">Product Features</h3>
        </ExampleCard>

        <ExampleCard type="do" title="JetBrains Mono for data">
          <div className="font-data text-2xl text-foreground">
            1.4502 <span className="text-sm text-muted-foreground">g/L</span>
          </div>
        </ExampleCard>

        <ExampleCard type="dont" title="System fonts for data">
          <div className="font-sans text-2xl text-foreground">
            1.4502 <span className="text-sm text-muted-foreground">g/L</span>
          </div>
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
