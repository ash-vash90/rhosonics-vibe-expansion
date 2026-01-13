import { BrandCallout } from "./BrandCallout";

export const ImageryGuidelines = () => {
  return (
    <section id="imagery" className="mb-32">
      <h2 className="section-header">Imagery Guidelines</h2>
      
      {/* Two-column: Content + Callout */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <p className="text-muted-foreground text-lg mb-8">
            Imagery proves credibility, not decoration. We show real environments where measurement happens, 
            and clean abstractions where concepts need clarity.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Field Context */}
            <div>
              <div className="mb-4 h-48 rounded-lg overflow-hidden relative bg-rho-obsidian flex items-center justify-center">
                <div className="absolute inset-0 opacity-40 bg-pattern-minerals grayscale"></div>
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                <div className="z-10 text-slate-100 text-center">
                  <span className="label-tech border border-slate-100/30 px-2 py-1 mb-2 inline-block">
                    FIELD CONTEXT
                  </span>
                  <h3 className="font-ui text-2xl font-bold">Real & Gritty</h3>
                </div>
              </div>
              <h4 className="font-ui font-bold text-foreground mb-2">Use Real Images For:</h4>
              <p className="text-sm text-muted-foreground">
                Authenticity, case studies, proving durability. High contrast, desaturated, selective green accent.
              </p>
            </div>

            {/* Engineering Context */}
            <div>
              <div className="mb-4 h-48 rounded-lg overflow-hidden relative bg-card border border-border flex items-center justify-center">
                <div className="absolute inset-0 bg-pattern-semicon opacity-50"></div>
                <div className="z-10 text-foreground text-center">
                  <span className="label-tech border border-border px-2 py-1 mb-2 inline-block">
                    ENGINEERING CONTEXT
                  </span>
                  <h3 className="font-ui text-2xl font-bold">Abstract & Precise</h3>
                </div>
              </div>
              <h4 className="font-ui font-bold text-foreground mb-2">Use Abstract/3D For:</h4>
              <p className="text-sm text-muted-foreground">
                Concepts, technology explainers, "smart" features. Clean lines, perfect lighting, geometric patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <BrandCallout variant="rule" title="Field Image Rule">
            Field images must show evidence of use: wear, scale, context, or operation.
            Pristine environments without signs of real work reduce credibility.
          </BrandCallout>
        </div>
      </div>

      {/* Do's and Don'ts - full width */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-eco-surface rounded-lg border border-eco-border">
          <h4 className="font-ui font-bold text-lg mb-4 flex items-center gap-2 text-primary">
            <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm">✓</span>
            Do Use
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Real industrial environments with visible wear</li>
            <li>• Close-ups of measurement displays and data</li>
            <li>• Workers in proper PPE interacting with equipment</li>
            <li>• Clean studio shots for product photography</li>
            <li>• Abstract 3D renders for technology concepts</li>
          </ul>
        </div>

        <div className="p-6 bg-red-50 rounded-lg border border-red-100">
          <h4 className="font-ui font-bold text-lg mb-4 flex items-center gap-2 text-destructive">
            <span className="w-6 h-6 bg-destructive text-primary-foreground rounded-full flex items-center justify-center text-sm">✕</span>
            Don't Use
          </h4>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Generic stock photos of businesspeople</li>
            <li>• Over-saturated "tech" imagery with lens flares</li>
            <li>• Cartoonish or overly simplified illustrations</li>
            <li>• Images with visible competitor branding</li>
            <li>• Floating holograms or sci-fi aesthetics</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImageryGuidelines;
