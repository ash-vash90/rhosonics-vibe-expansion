export const ImageryGuidelines = () => {
  return (
    <section id="imagery" className="mb-32">
      <h2 className="section-header">Imagery Guidelines</h2>
      <p className="text-muted-foreground mb-8">
        Our visual language balances authentic industrial photography with clean technical illustrations. 
        This duality represents the "Lab in the Field" concept.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* The Field */}
        <div>
          <div className="mb-4 h-64 rounded-lg overflow-hidden relative bg-rho-obsidian flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-pattern-minerals grayscale"></div>
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            <div className="z-10 text-slate-100 text-center">
              <span className="label-tech border border-slate-100/30 px-2 py-1 mb-2 inline-block">
                THE FIELD
              </span>
              <h3 className="font-ui text-2xl font-bold">Real & Gritty</h3>
            </div>
          </div>
          <h4 className="font-ui font-bold text-foreground">Use Real Images For:</h4>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Authenticity, case studies, and proving durability. Treat images with high contrast, 
            desaturation, and selective green color grading.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-data bg-slate-100 px-2 py-1 rounded text-slate-600">
              HIGH CONTRAST
            </span>
            <span className="text-xs font-data bg-slate-100 px-2 py-1 rounded text-slate-600">
              DESATURATED
            </span>
            <span className="text-xs font-data bg-slate-100 px-2 py-1 rounded text-slate-600">
              GREEN ACCENT
            </span>
          </div>
        </div>

        {/* The Lab */}
        <div>
          <div className="mb-4 h-64 rounded-lg overflow-hidden relative bg-card border border-border flex items-center justify-center">
            <div className="absolute inset-0 bg-pattern-semicon opacity-50"></div>
            <div className="z-10 text-foreground text-center">
              <span className="label-tech border border-border px-2 py-1 mb-2 inline-block">
                THE LAB
              </span>
              <h3 className="font-ui text-2xl font-bold">Abstract & Precise</h3>
            </div>
          </div>
          <h4 className="font-ui font-bold text-foreground">Use Abstract/3D For:</h4>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Concepts, technology explainers, and "smart" features. Use clean lines, 
            perfect lighting, and geometric patterns.
          </p>

          {/* AI Prompt Box */}
          <div className="bg-slate-50 p-4 rounded border border-slate-200">
            <div className="label-tech text-muted-foreground mb-2">OFFICIAL AI PROMPT</div>
            <div className="font-data text-xs text-slate-600 leading-relaxed bg-card p-3 rounded border border-slate-100 select-all">
              3D abstract industrial technology, matte black obsidian geometric shapes, clean white ceramic 
              accents, glowing Rhosonics green (#33993c) light strips, studio lighting, soft shadows, 
              8k resolution, octane render, architectural precision, minimal background.
            </div>
          </div>
        </div>
      </div>

      {/* Photo Treatment Examples */}
      <h3 className="label-tech text-slate-500 mb-4">PHOTO TREATMENT EXAMPLES</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="aspect-square bg-slate-200 rounded-lg flex items-center justify-center">
          <span className="label-tech text-slate-400">ORIGINAL</span>
        </div>
        <div className="aspect-square bg-slate-400 rounded-lg flex items-center justify-center grayscale">
          <span className="label-tech text-slate-200">DESATURATED</span>
        </div>
        <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center">
          <span className="label-tech text-slate-400">HIGH CONTRAST</span>
        </div>
        <div className="aspect-square bg-rho-obsidian rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/20"></div>
          <span className="label-tech text-primary relative z-10">+ GREEN TINT</span>
        </div>
      </div>

      {/* Do's and Don'ts for Imagery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <li>• Low-resolution or pixelated imagery</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImageryGuidelines;
