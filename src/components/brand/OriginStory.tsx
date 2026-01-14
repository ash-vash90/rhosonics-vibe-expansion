import { Wrench, Beaker, Globe } from "lucide-react";

export const OriginStory = () => {
  return (
    <section id="origin" className="mb-32">
      {/* Hero Story Block */}
      <div className="relative overflow-hidden rounded-lg border border-border/50 bg-card mb-16">
        <div className="absolute inset-0 bg-workshop-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-earth-ochre/5 via-transparent to-primary/5" />
        
        <div className="relative p-10 md:p-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-earth-ochre/60 flex items-center justify-center">
              <span className="font-data text-xl text-earth-ochre font-bold">84</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-earth-ochre/40 to-transparent" />
            <span className="font-data text-sm text-earth-ochre/80 uppercase tracking-wider">The Netherlands</span>
          </div>

          <p className="text-2xl md:text-4xl font-ui leading-relaxed mb-8 max-w-4xl">
            <span className="text-slate-400">It started with a question:</span>
            <span className="text-earth-ochre font-semibold"> how do you measure beer density?</span>
          </p>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-3xl">
            The local brewer needed to know. Our founder had a workbench. 
            What began as a single measurement device became an entirely new approach to industrial process control.
            Four decades later, that same curiosity drives every sensor we build.
          </p>
        </div>
      </div>

      {/* Timeline - Horizontal strip */}
      <h3 className="label-tech text-muted-foreground mb-6">MILESTONES</h3>
      <div className="flex items-stretch border-t border-b border-border">
        {[
          { year: "1984", title: "The Garage", desc: "First prototype built on a workbench.", icon: Wrench },
          { year: "FIRST", title: "Brewing Precision", desc: "Measuring beer density for a local brewery.", icon: Beaker },
          { year: "TODAY", title: "Worldwide Impact", desc: "Mining to semiconductors, six continents.", icon: Globe },
        ].map((milestone, idx) => (
          <div 
            key={idx} 
            className="flex-1 py-8 px-6 border-r border-border last:border-r-0 group hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all flex-shrink-0">
                <milestone.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-data text-xs text-earth-ochre block mb-1">{milestone.year}</span>
                <h4 className="font-ui font-semibold text-foreground mb-1">{milestone.title}</h4>
                <p className="text-sm text-muted-foreground">{milestone.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OriginStory;