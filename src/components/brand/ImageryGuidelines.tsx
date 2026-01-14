import { BrandCallout } from "./BrandCallout";
import { IMAGERY_VALUE_MAPPING } from "@/data/brand-values";
import { ValueBadge } from "./ValueBadge";

export const ImageryGuidelines = () => {
  return (
    <section id="imagery" className="space-y-16">
      {/* Hero Statement */}
      <div>
        <p className="text-lg md:text-xl font-ui text-foreground leading-relaxed max-w-4xl">
          Imagery proves credibility, not decoration. 
          <span className="text-muted-foreground"> We show real environments where measurement happens, and clean abstractions where concepts need clarity.</span>
        </p>
      </div>

      {/* Full-width Context Specimens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Field Context */}
        <div className="bg-rho-obsidian relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-pattern-minerals grayscale"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          <div className="relative p-6 md:p-10 lg:p-16 flex flex-col justify-end min-h-[240px] md:min-h-[320px]">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="label-tech text-primary text-[10px] md:text-xs">01 — FIELD CONTEXT</span>
              <ValueBadge valueId={IMAGERY_VALUE_MAPPING.fieldContext} showIcon className="text-primary/60" />
            </div>
            <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 md:mb-4">Real & Gritty</h3>
            <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-md">
              Authenticity, case studies, proving durability. High contrast, desaturated, selective green accent.
            </p>
          </div>
        </div>

        {/* Engineering Context */}
        <div className="bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-semicon opacity-50"></div>
          <div className="relative p-6 md:p-10 lg:p-16 flex flex-col justify-end min-h-[240px] md:min-h-[320px]">
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <span className="label-tech text-primary text-[10px] md:text-xs">02 — ENGINEERING CONTEXT</span>
              <ValueBadge valueId={IMAGERY_VALUE_MAPPING.engineeringContext} showIcon className="text-primary/60" />
            </div>
            <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">Abstract & Precise</h3>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-md">
              Concepts, technology explainers, "smart" features. Clean lines, perfect lighting, geometric patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Field Image Rule */}
      <BrandCallout variant="info" title="Field Image Rule">
        Field images must show evidence of use: wear, scale, context, or operation.
        Pristine environments without signs of real work reduce credibility.
      </BrandCallout>

      {/* Do's and Don'ts - Side by side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden">
        <div className="p-5 md:p-8 bg-eco-surface md:border-r border-b md:border-b-0 border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg">✓</span>
            <h4 className="font-ui font-bold text-xl text-foreground">Do Use</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Real industrial environments with visible wear",
              "Close-ups of measurement displays and data",
              "Workers in proper PPE interacting with equipment",
              "Clean studio shots for product photography",
              "Abstract 3D renders for technology concepts"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 md:p-8 bg-error-surface">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center text-lg">✕</span>
            <h4 className="font-ui font-bold text-xl text-foreground">Don't Use</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Generic stock photos of businesspeople",
              "Over-saturated 'tech' imagery with lens flares",
              "Cartoonish or overly simplified illustrations",
              "Images with visible competitor branding",
              "Floating holograms or sci-fi aesthetics"
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

export default ImageryGuidelines;
