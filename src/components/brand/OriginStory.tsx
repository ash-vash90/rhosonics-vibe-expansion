import { Wrench, Beaker, Globe } from "lucide-react";

export const OriginStory = () => {
  return (
    <section id="origin" className="mb-16">
      {/* Two-column: Story + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Story - 3 columns */}
        <div className="lg:col-span-3 relative overflow-hidden rounded-lg border border-border/50 bg-card">
          <div className="absolute inset-0 bg-workshop-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-earth-ochre/5 via-transparent to-primary/5" />
          
          <div className="relative p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-earth-ochre/60 flex items-center justify-center">
                <span className="font-data text-lg text-earth-ochre font-bold">84</span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-earth-ochre/40 to-transparent" />
              <span className="font-data text-sm text-earth-ochre/80 uppercase tracking-wider">The Netherlands</span>
            </div>

            <p className="text-xl md:text-2xl font-ui leading-relaxed mb-6">
              <span className="text-slate-400">It started with a question:</span>
              <span className="text-earth-ochre font-semibold"> how do you measure beer density?</span>
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              The local brewer needed to know. Our founder had a workbench. 
              What began as a single measurement device became an entirely new approach to industrial process control.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              Four decades later, that same curiosity drives every sensor we build.
            </p>
          </div>
        </div>

        {/* Timeline - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {[
            { year: "1984", title: "The Garage", desc: "First prototype built on a workbench.", icon: Wrench, color: "earth-ochre" },
            { year: "FIRST", title: "Brewing Precision", desc: "Measuring beer density for a local brewery.", icon: Beaker, color: "earth-amber" },
            { year: "TODAY", title: "Worldwide Impact", desc: "Mining to semiconductors, six continents.", icon: Globe, color: "eco-forest" },
          ].map((milestone, idx) => (
            <div key={idx} className="flex items-start gap-4 group">
              <div className={`w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-slate-500`}>
                <milestone.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-data text-xs text-earth-ochre">{milestone.year}</span>
                <h3 className="font-ui font-semibold text-foreground">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
