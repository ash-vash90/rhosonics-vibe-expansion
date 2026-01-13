import { Target, Eye, Zap } from "lucide-react";

export const MissionVision = () => {
  return (
    <section id="mission" className="mb-16">
      {/* Three-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mission */}
        <div className="card-eco p-6 bg-pattern-topo">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-card border border-eco-border flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <span className="label-tech text-primary">MISSION</span>
            </div>
            <h3 className="font-ui font-bold text-xl text-foreground mb-2">Measure What Matters</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We build ultrasonic measurement systems. Industries use them to optimize processes and reduce waste.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="card-obsidian p-6 bg-pattern-topo-dark">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <span className="label-tech text-primary">VISION</span>
            </div>
            <h3 className="font-ui font-bold text-xl text-slate-100 mb-2">Every Process Optimized</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Precision measurement as the foundation of sustainability. From mining to semiconductors.
            </p>
          </div>
        </div>

        {/* Value Stats */}
        <div className="card-base p-6 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <span className="label-tech text-foreground">VALUE</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-ui font-bold text-primary">40+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-ui font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-ui font-bold text-primary">-35%</div>
              <div className="text-sm text-muted-foreground">Average Waste Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
