import { Wrench, Beaker, Globe, Sparkles } from "lucide-react";

export const OriginStory = () => {
  return (
    <section id="origin" className="mb-32">
      {/* Section Header */}
      <div className="mb-12">
        <div className="label-tech text-earth-ochre mb-4">HERITAGE</div>
        <h2 className="section-header-bold max-w-3xl">
          Born in a Garage.<br />
          <span className="text-earth-ochre">Built for the World.</span>
        </h2>
      </div>

      {/* Main Story Block - Workshop aesthetic */}
      <div className="relative overflow-hidden rounded-lg border-2 border-earth-ochre/30 bg-workshop-grid">
        {/* Workshop grid background */}
        <div className="absolute inset-0 bg-gradient-to-br from-earth-sand/80 via-transparent to-earth-ochre/10" />
        
        {/* Content */}
        <div className="relative p-8 md:p-12">
          {/* Timeline marker */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-earth-amber/20 border-2 border-earth-amber flex items-center justify-center">
              <span className="font-data text-lg text-earth-ochre-dark font-bold">84</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-earth-amber/50 to-transparent" />
            <span className="font-data text-sm text-earth-ochre uppercase tracking-wider">The Netherlands</span>
          </div>

          {/* Story narrative */}
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl font-ui text-foreground leading-relaxed mb-6">
              It started with a simple question in a Dutch garage: 
              <span className="text-earth-ochre font-semibold"> how do you measure the density of beer?</span>
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              A local brewer needed precision. Our founder had curiosity and a workbench. 
              What began as a single ultrasonic measurement device became the foundation 
              for an entirely new approach to industrial process control.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Four decades later, that same garage spirit—the belief that better measurement 
              leads to a better world—drives every sensor we build.
            </p>
          </div>

          {/* Rivet accents */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-earth-clay/40 border border-earth-clay/60" />
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-earth-clay/40 border border-earth-clay/60" />
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-earth-clay/40 border border-earth-clay/60" />
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-earth-clay/40 border border-earth-clay/60" />
        </div>
      </div>

      {/* Journey milestones */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Milestone 1 - Garage */}
        <div className="group relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-earth-sand border border-earth-ochre/30 flex items-center justify-center group-hover:border-earth-ochre transition-colors">
              <Wrench className="w-5 h-5 text-earth-ochre" />
            </div>
            <div>
              <div className="font-data text-xs text-earth-ochre mb-1">1984</div>
              <h3 className="font-ui font-semibold text-foreground mb-2">The Garage</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                First prototype built on a workbench. One engineer, one problem, endless curiosity.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 2 - First Brew */}
        <div className="group relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-earth-sand border border-earth-ochre/30 flex items-center justify-center group-hover:border-earth-amber transition-colors">
              <Beaker className="w-5 h-5 text-earth-amber" />
            </div>
            <div>
              <div className="font-data text-xs text-earth-ochre mb-1">FIRST APPLICATION</div>
              <h3 className="font-ui font-semibold text-foreground mb-2">Brewing Precision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Measuring beer density for a local brewery proved the technology worked in the real world.
              </p>
            </div>
          </div>
        </div>

        {/* Milestone 3 - Global */}
        <div className="group relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-earth-sand border border-earth-ochre/30 flex items-center justify-center group-hover:border-primary transition-colors">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-data text-xs text-earth-ochre mb-1">TODAY</div>
              <h3 className="font-ui font-semibold text-foreground mb-2">Worldwide Impact</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                From mining to semiconductors, our sensors optimize processes across six continents.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder tribute - subtle */}
      <div className="mt-16 flex items-center gap-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-earth-ochre/30 to-transparent" />
        <div className="flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-earth-ochre/60" />
          <span className="font-data text-xs uppercase tracking-widest text-earth-ochre/70">
            Continuing the founder's vision
          </span>
          <Sparkles className="w-4 h-4 text-earth-ochre/60" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-earth-ochre/30 to-transparent" />
      </div>
    </section>
  );
};

export default OriginStory;