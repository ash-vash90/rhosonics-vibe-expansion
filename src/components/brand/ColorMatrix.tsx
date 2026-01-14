import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandCallout } from "./BrandCallout";

gsap.registerPlugin(ScrollTrigger);

// Horizontal specimen row component
const ColorSpecimen = ({ 
  name, 
  hex, 
  rgb, 
  hsl, 
  bg, 
  use, 
  textLight = false,
  border = "border-transparent"
}: { 
  name: string; 
  hex: string; 
  rgb: string; 
  hsl: string; 
  bg: string; 
  use: string; 
  textLight?: boolean;
  border?: string;
}) => (
  <div className="group flex items-stretch gap-0 hover:bg-muted/30 transition-colors -mx-4 px-4">
    {/* Color swatch - square, no rounded corners for specimens */}
    <div className={`w-20 h-20 ${bg} ${border} border flex-shrink-0 flex items-end justify-start p-2`}>
      {textLight && <span className="font-data text-[10px] text-white/60">{hex}</span>}
      {!textLight && <span className="font-data text-[10px] text-foreground/40">{hex}</span>}
    </div>
    {/* Specs inline */}
    <div className="flex-1 flex items-center py-4 pl-6 border-b border-border/30">
      <div className="flex-1">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="font-ui font-semibold text-foreground">{name}</span>
          <span className="text-sm text-muted-foreground">{use}</span>
        </div>
        <div className="font-data text-xs text-muted-foreground flex gap-4">
          <span>rgb({rgb})</span>
          <span className="text-border">|</span>
          <span>hsl({hsl})</span>
        </div>
      </div>
    </div>
  </div>
);

export const ColorMatrix = () => {
  const foundationsRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const contextualRef = useRef<HTMLDivElement>(null);
  const gradientsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each section on scroll
      const sections = [foundationsRef, signalsRef, contextualRef, gradientsRef];
      sections.forEach((ref) => {
        if (ref.current) {
          gsap.fromTo(ref.current,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: { trigger: ref.current, start: "top 85%" }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="colors" className="space-y-20">
      <p className="text-muted-foreground text-lg max-w-3xl">
        Color follows the same layer philosophy as the visual system: Foundations establish structure, 
        Signals communicate action and state, Contextual elements provide situational relevance.
      </p>

      {/* ═══ FOUNDATIONS ═══ */}
      <div ref={foundationsRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-4 h-4 bg-slate-900" />
          <h3 className="font-ui text-xl font-semibold text-foreground">Foundations</h3>
          <span className="font-data text-[10px] bg-slate-900 text-white px-2 py-0.5">CONSTANT</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Slate Scale */}
          <div>
            <h4 className="font-data text-xs text-muted-foreground uppercase tracking-wider mb-6">Slate — Software UI</h4>
            <div className="space-y-0">
              <ColorSpecimen name="Slate 50" hex="#F8FAFC" rgb="248, 250, 252" hsl="210 40% 98%" bg="bg-slate-50" use="Page backgrounds" border="border-slate-200" />
              <ColorSpecimen name="Slate 200" hex="#E2E8F0" rgb="226, 232, 240" hsl="214 32% 91%" bg="bg-slate-200" use="Borders, dividers" border="border-slate-300" />
              <ColorSpecimen name="Slate 600" hex="#475569" rgb="71, 85, 105" hsl="215 19% 35%" bg="bg-slate-600" use="Secondary text" textLight />
              <ColorSpecimen name="Slate 900" hex="#0F172A" rgb="15, 23, 42" hsl="222 47% 11%" bg="bg-slate-900" use="Primary text" textLight />
            </div>
          </div>

          {/* Obsidian */}
          <div>
            <h4 className="font-data text-xs text-muted-foreground uppercase tracking-wider mb-6">Obsidian — Hardware & Dark UI</h4>
            <div className="space-y-0 mb-8">
              <ColorSpecimen name="Obsidian" hex="#111522" rgb="17, 21, 34" hsl="226 33% 10%" bg="bg-rho-obsidian" use="Dark surfaces, devices" textLight />
              <ColorSpecimen name="Obsidian Light" hex="#1E2433" rgb="30, 36, 51" hsl="226 25% 15%" bg="bg-[#1E2433]" use="Dark panels, cards" textLight />
            </div>
            <p className="text-sm text-muted-foreground border-l-2 border-slate-300 pl-4">
              <strong className="text-foreground">Never use pure black (#000).</strong> Obsidian's blue tint creates visual cohesion with the Slate scale.
            </p>
          </div>
        </div>
      </div>

      {/* ═══ SIGNALS ═══ */}
      <div ref={signalsRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-4 h-4 bg-primary" />
          <h3 className="font-ui text-xl font-semibold text-foreground">Signals</h3>
          <span className="font-data text-[10px] bg-primary text-white px-2 py-0.5">INTENTIONAL</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid lg:grid-cols-3 gap-16 mb-10">
          {/* Primary Brand */}
          <div>
            <h4 className="font-data text-xs text-primary uppercase tracking-wider mb-6">Brand</h4>
            <div className="space-y-0">
              <ColorSpecimen name="Rhosonics Green" hex="#33993C" rgb="51, 153, 60" hsl="125 50% 40%" bg="bg-primary" use="Primary actions" textLight />
              <ColorSpecimen name="Lime Accent" hex="#73B82E" rgb="115, 184, 46" hsl="90 60% 45%" bg="bg-rho-green-accent" use="Gradients, highlights" textLight />
            </div>
          </div>

          {/* State: Positive */}
          <div>
            <h4 className="font-data text-xs text-green-600 uppercase tracking-wider mb-6">State — Positive</h4>
            <ColorSpecimen name="Success Green" hex="#16A34A" rgb="22, 163, 74" hsl="142 72% 36%" bg="bg-green-600" use="Confirmations" textLight />
          </div>

          {/* State: Negative */}
          <div>
            <h4 className="font-data text-xs text-red-600 uppercase tracking-wider mb-6">State — Negative</h4>
            <div className="space-y-0">
              <ColorSpecimen name="Warning Amber" hex="#D97706" rgb="217, 119, 6" hsl="32 95% 44%" bg="bg-amber-600" use="Cautions" textLight />
              <ColorSpecimen name="Error Red" hex="#DC2626" rgb="220, 38, 38" hsl="0 84% 51%" bg="bg-red-600" use="Failures, critical" textLight />
            </div>
          </div>
        </div>

        <BrandCallout variant="rule" title="State Color Rule">
          State colors communicate operational status only. They must never be used decoratively or to "add visual interest."
        </BrandCallout>
      </div>

      {/* ═══ CONTEXTUAL ═══ */}
      <div ref={contextualRef}>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-4 h-4 bg-mineral-neutral" />
          <h3 className="font-ui text-xl font-semibold text-foreground">Contextual</h3>
          <span className="font-data text-[10px] bg-mineral-neutral text-white px-2 py-0.5">SITUATIONAL</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Mineral Scale */}
          <div>
            <h4 className="font-data text-xs text-mineral-deep uppercase tracking-wider mb-2">Mineral — Field Environments</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Olive/stone tones for industrial and outdoor contexts. Never substitute for Slate in software UI.
            </p>
            <div className="space-y-0">
              <ColorSpecimen name="Mineral Surface" hex="#EBEADF" rgb="235, 234, 223" hsl="55 15% 91%" bg="bg-mineral-surface" use="Backgrounds" border="border-mineral-neutral/30" />
              <ColorSpecimen name="Mineral Neutral" hex="#848058" rgb="132, 128, 88" hsl="60 12% 48%" bg="bg-mineral-neutral" use="Accents, borders" textLight />
              <ColorSpecimen name="Mineral Deep" hex="#565443" rgb="86, 84, 67" hsl="65 14% 32%" bg="bg-mineral-deep" use="Text, emphasis" textLight />
              <ColorSpecimen name="Mineral Bronze" hex="#746C4D" rgb="116, 108, 77" hsl="55 20% 38%" bg="bg-mineral-bronze" use="Earthy accents" textLight />
            </div>
          </div>

          {/* Eco Tints */}
          <div>
            <h4 className="font-data text-xs text-primary uppercase tracking-wider mb-2">Eco — Sustainability</h4>
            <p className="text-sm text-muted-foreground mb-6">
              Subtle green tints for environmental metrics. Used sparingly and always tied to measurable data.
            </p>
            <div className="space-y-0 mb-8">
              <ColorSpecimen name="Eco Surface" hex="#ECFDF0" rgb="236, 253, 240" hsl="125 43% 95%" bg="bg-eco-surface" use="Eco card backgrounds" border="border-eco-border" />
              <ColorSpecimen name="Eco Border" hex="#C6F7D0" rgb="198, 247, 208" hsl="125 50% 90%" bg="bg-[#C6F7D0]" use="Eco component borders" border="border-primary/20" />
            </div>

            <BrandCallout variant="avoid" title="Contextual Constraint">
              Contextual colors are not brand identifiers. They help users orient to a specific environment or domain — nothing more.
            </BrandCallout>
          </div>
        </div>
      </div>

      {/* ═══ GRADIENTS ═══ */}
      <div ref={gradientsRef}>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Gradients</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          Flat color is preferred. Gradients add depth or signal transition — never used for decoration. 
          Reserved for hero elements and primary CTAs.
        </p>
        
        {/* Full-width gradient bands */}
        <div className="space-y-4">
          <div className="flex items-stretch -mx-4">
            <div className="w-full h-16 bg-brand-gradient" />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-ui font-semibold text-foreground">Primary Gradient</span>
              <span className="text-muted-foreground ml-3">Hero CTAs, featured content</span>
            </div>
            <span className="font-data text-xs text-muted-foreground">linear-gradient(135deg, #73B82E 0%, #33993C 100%)</span>
          </div>
          
          <div className="flex items-stretch -mx-4 mt-8">
            <div className="w-full h-16 bg-obsidian-gradient" />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-ui font-semibold text-foreground">Obsidian Gradient</span>
              <span className="text-muted-foreground ml-3">Dark panels, hardware UI</span>
            </div>
            <span className="font-data text-xs text-muted-foreground">linear-gradient(180deg, #1E2433 0%, #111522 100%)</span>
          </div>
          
          <div className="flex items-stretch -mx-4 mt-8">
            <div className="w-full h-16 rounded-none" style={{ background: 'linear-gradient(145deg, #9A9573 0%, #848058 100%)' }} />
          </div>
          <div className="flex justify-between text-sm">
            <div>
              <span className="font-ui font-semibold text-foreground">Mineral Gradient</span>
              <span className="text-muted-foreground ml-3">Field contexts only</span>
            </div>
            <span className="font-data text-xs text-muted-foreground">linear-gradient(145deg, #9A9573 0%, #848058 100%)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorMatrix;
