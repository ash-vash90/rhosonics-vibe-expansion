import { Target, Eye, Zap } from "lucide-react";

export const MissionVision = () => {
  return (
    <section id="mission" className="mb-32">
      <h2 className="section-header">Mission & Vision</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mission */}
        <div className="card-eco p-8 bg-pattern-topo">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-card border border-eco-border flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div className="label-tech text-primary">OUR MISSION</div>
            </div>
            <h3 className="font-ui font-bold text-2xl text-foreground mb-4">
              Measure What Matters
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We build ultrasonic measurement systems. Industries use them to optimize processes, 
              reduce waste, and operate sustainably. The sensors do the measuring. 
              The data does the rest.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="card-obsidian p-8 bg-pattern-topo-dark">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div className="label-tech text-primary">OUR VISION</div>
            </div>
            <h3 className="font-ui font-bold text-2xl text-slate-100 mb-4">
              Every Process Optimized
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Industrial processes that waste nothing. Precision measurement as the foundation 
              of sustainability. From mining to semiconductors—measurement infrastructure 
              for what comes next.
            </p>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="mt-8 p-8 card-base">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-primary" />
          <div className="label-tech text-foreground">VALUE PROPOSITION</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-ui font-bold text-primary mb-2">40+</div>
            <div className="font-ui font-medium text-foreground mb-1">Years Experience</div>
            <p className="text-sm text-muted-foreground">
              Four decades of innovation in ultrasonic measurement technology.
            </p>
          </div>
          <div>
            <div className="text-4xl font-ui font-bold text-primary mb-2">98%</div>
            <div className="font-ui font-medium text-foreground mb-1">Uptime Guarantee</div>
            <p className="text-sm text-muted-foreground">
              Industrial-grade reliability in the harshest environments.
            </p>
          </div>
          <div>
            <div className="text-4xl font-ui font-bold text-primary mb-2">-35%</div>
            <div className="font-ui font-medium text-foreground mb-1">Average Waste Reduction</div>
            <p className="text-sm text-muted-foreground">
              Our customers achieve significant resource optimization.
            </p>
          </div>
        </div>
      </div>

      {/* Legacy Statement */}
      <div className="mt-12 border-l-2 border-mineral-neutral pl-6 py-4">
        <blockquote className="text-lg text-slate-600 italic leading-relaxed mb-3">
          "From a single measurement in a Dutch brewery to optimizing processes worldwide—the curiosity that started it all still drives us forward."
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-mineral-neutral/50" />
          <span className="font-data text-xs uppercase tracking-wider text-mineral-neutral">
            Continuing the vision since 1984
          </span>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
