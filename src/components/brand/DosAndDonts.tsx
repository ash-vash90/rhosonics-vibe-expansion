import { RhosonicsLogo } from "../RhosonicsLogo";
import { Check, X } from "lucide-react";

interface ExampleCardProps {
  type: 'do' | 'dont';
  title: string;
  children: React.ReactNode;
}

const ExampleCard = ({ type, title, children }: ExampleCardProps) => (
  <div className="group">
    <div className="mb-3">{children}</div>
    <div className="flex items-center gap-2">
      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
        type === 'do' ? 'bg-primary' : 'bg-destructive'
      }`}>
        {type === 'do' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      </span>
      <span className={`font-ui text-sm font-medium ${type === 'do' ? 'text-primary' : 'text-destructive'}`}>
        {title}
      </span>
    </div>
  </div>
);

export const DosAndDonts = () => {
  return (
    <section id="dos-donts" className="space-y-16 pt-16">
      {/* Logo Usage - Horizontal specimens */}
      <div>
        <h3 className="label-tech text-muted-foreground mb-6">LOGO USAGE</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border rounded-lg overflow-hidden">
        <div className="bg-background p-6">
          <ExampleCard type="do" title="Proper spacing">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border">
              <div className="border-2 border-dashed border-primary/30 p-3">
                <div className="w-10 h-10"><RhosonicsLogo variant="gradient" /></div>
              </div>
            </div>
          </ExampleCard>
        </div>

        <div className="bg-background p-6">
          <ExampleCard type="do" title="Approved colors">
            <div className="h-24 flex items-center justify-center bg-rho-obsidian rounded">
              <div className="w-10 h-10"><RhosonicsLogo variant="white" /></div>
            </div>
          </ExampleCard>
        </div>

        <div className="bg-background p-6">
          <ExampleCard type="dont" title="Rotate">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border">
              <div className="w-10 h-10 rotate-45"><RhosonicsLogo variant="gradient" /></div>
            </div>
          </ExampleCard>
        </div>

        <div className="bg-background p-6">
          <ExampleCard type="dont" title="Distort">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border">
              <div className="w-16 h-8"><RhosonicsLogo variant="gradient" /></div>
            </div>
          </ExampleCard>
        </div>

        <div className="bg-background p-6">
          <ExampleCard type="dont" title="Add effects">
            <div className="h-24 flex items-center justify-center bg-slate-50 rounded border border-border">
              <div className="w-10 h-10 drop-shadow-[0_0_10px_rgba(51,153,60,0.8)]"><RhosonicsLogo variant="gradient" /></div>
            </div>
          </ExampleCard>
        </div>

        <div className="bg-background p-6">
          <ExampleCard type="dont" title="Busy backgrounds">
            <div className="h-24 flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded">
              <div className="w-10 h-10"><RhosonicsLogo variant="white" /></div>
            </div>
          </ExampleCard>
        </div>
        </div>
      </div>

      {/* Typography - Side by side */}
      <div>
        <h3 className="label-tech text-muted-foreground mb-6">TYPOGRAPHY</h3>
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        <div className="bg-background p-8">
          <div className="flex items-center gap-2 mb-6">
            <Check className="w-5 h-5 text-primary" />
            <span className="font-ui font-bold text-lg text-primary">Correct Usage</span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="label-tech text-muted-foreground mb-2">UNBOUNDED FOR LOGO</div>
              <div className="flex items-center gap-2 p-4 bg-slate-50 rounded border border-border">
                <div className="w-6 h-6"><RhosonicsLogo variant="gradient" /></div>
                <span className="font-logo text-xl tracking-wide uppercase">RHOSONICS</span>
              </div>
            </div>
            <div>
              <div className="label-tech text-muted-foreground mb-2">JETBRAINS MONO FOR DATA</div>
              <div className="p-4 bg-slate-50 rounded border border-border">
                <span className="font-data text-2xl text-foreground">1.4502</span>
                <span className="font-data text-sm text-muted-foreground ml-2">g/L</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background p-8">
          <div className="flex items-center gap-2 mb-6">
            <X className="w-5 h-5 text-destructive" />
            <span className="font-ui font-bold text-lg text-destructive">Incorrect Usage</span>
          </div>
          <div className="space-y-6">
            <div>
              <div className="label-tech text-muted-foreground mb-2">UNBOUNDED FOR HEADINGS</div>
              <div className="p-4 bg-red-50/50 rounded border border-red-100">
                <span className="font-logo text-xl">Product Features</span>
              </div>
            </div>
            <div>
              <div className="label-tech text-muted-foreground mb-2">SYSTEM FONTS FOR DATA</div>
              <div className="p-4 bg-red-50/50 rounded border border-red-100">
                <span className="font-sans text-2xl text-foreground">1.4502</span>
                <span className="text-sm text-muted-foreground ml-2">g/L</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* General Guidelines - Side by side lists */}
      <div className="grid md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden">
        <div className="p-8 bg-eco-surface border-r border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <h4 className="font-ui font-bold text-xl text-foreground">Always</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Maintain minimum clear space around the logo",
              "Use high contrast for data displays",
              "Include units with all measurements",
              "Use chamfered button shape for CTAs"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 bg-red-50/50">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-destructive text-white rounded-full flex items-center justify-center">
              <X className="w-4 h-4" />
            </span>
            <h4 className="font-ui font-bold text-xl text-foreground">Never</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Add drop shadows or glows to the logo",
              "Use decorative or script fonts",
              "Apply gradient to body text",
              "Use Lime Accent as a standalone color"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DosAndDonts;