export const BrandEthos = () => {
  return (
    <section id="intro" className="mb-32 animate-fade-in-up">
      <div className="label-tech text-primary mb-4">SYSTEM V.FINAL</div>
      <h1 className="font-ui font-bold text-5xl md:text-7xl lg:text-[5rem] text-foreground leading-[1.1] tracking-tight mb-8">
        Precision.
        <br />
        <span className="text-primary">Resilience.</span>
        <br />
        Intelligence.
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {/* The Persona */}
        <div className="card-obsidian p-8">
          <h3 className="label-tech mb-2 text-slate-400">THE PERSONA</h3>
          <p className="text-slate-300 leading-relaxed">
            "Senior Engineer." Direct, knowledgeable, data-driven. We avoid marketing fluff 
            in favor of technical specifications and proven ROI. Every claim is backed by 
            measurement. Every solution is validated in the field.
          </p>
        </div>

        {/* The Aesthetic */}
        <div className="card-base p-8">
          <h3 className="label-tech mb-2 text-primary">THE AESTHETIC</h3>
          <p className="text-muted-foreground leading-relaxed">
            "Lab in the Field." Clean white space (Lab) meets heavy industrial textures (Field). 
            High contrast data displays. Precision typography paired with rugged materials. 
            Sustainability integrated, never superficial.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 border-l-2 border-primary">
          <div className="label-tech text-slate-500 mb-2">01</div>
          <h4 className="font-ui font-bold text-lg mb-2">Measure Everything</h4>
          <p className="text-sm text-muted-foreground">
            If you can't measure it, you can't improve it. Every decision backed by data.
          </p>
        </div>
        <div className="p-6 border-l-2 border-slate-200">
          <div className="label-tech text-slate-500 mb-2">02</div>
          <h4 className="font-ui font-bold text-lg mb-2">Built to Last</h4>
          <p className="text-sm text-muted-foreground">
            Industrial-grade engineering. Our equipment outlasts the harshest environments.
          </p>
        </div>
        <div className="p-6 border-l-2 border-slate-200">
          <div className="label-tech text-slate-500 mb-2">03</div>
          <h4 className="font-ui font-bold text-lg mb-2">Sustainable Impact</h4>
          <p className="text-sm text-muted-foreground">
            Every measurement optimizes resource usage. Precision enables sustainability.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandEthos;
