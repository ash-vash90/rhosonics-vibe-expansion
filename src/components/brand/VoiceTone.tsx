import { MessageSquare, FileText, Headphones, Megaphone } from "lucide-react";

export const VoiceTone = () => {

  const toneContexts = [
    { context: "Technical Documentation", icon: FileText, tone: "Precise & Instructive", example: "Connect the 4-20mA output to terminals 3 and 4." },
    { context: "Sales & Marketing", icon: Megaphone, tone: "Confident & Benefit-Focused", example: "Reduce reagent consumption by 15-25% through real-time density monitoring." },
    { context: "Customer Support", icon: Headphones, tone: "Helpful & Direct", example: "This error occurs when flow rate drops below 0.5 m/s." },
    { context: "Social Media", icon: MessageSquare, tone: "Factual & Engaging", example: "40 years of density measurement. 10,000+ installations. One obsession: accuracy." },
  ];

  return (
    <section id="voice" className="space-y-20">
      {/* Hero statement */}
      <p className="text-lg md:text-xl text-foreground max-w-2xl">
        Our reader skips to the specification table. We put it first.
      </p>

      {/* Voice Pillars - numbered list, no cards */}
      <div>
        <div className="flex items-center gap-4 mb-10">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Voice Pillars</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {[
            { num: "01", title: "Direct", desc: "Lead with the point. Respect the reader's time." },
            { num: "02", title: "Educational", desc: "Explain how and why, not just what. Knowledge builds trust." },
            { num: "03", title: "Evidence-Based", desc: "Measurable impact over abstract claims. Show the data." },
            { num: "04", title: "Partnership-First", desc: "The reader's success is our success. Write for long-term relationships." },
          ].map((pillar, i) => (
            <div 
              key={pillar.num} 
              className={`p-6 ${i > 0 ? 'border-l border-border' : ''} hover:bg-muted/30 transition-colors`}
            >
              <span className="font-data text-2xl text-primary/40">{pillar.num}</span>
              <h3 className="font-ui font-bold text-xl mt-3 mb-2 text-foreground">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Terminology - clean table */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Preferred Terminology</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["Cutting-edge", "Ultrasonic measurement"],
            ["Revolutionary", "Proven"],
            ["Solution", "System / Sensor"],
            ["Best-in-class", "[Cite specific metric]"],
            ["Relationship", "Partnership"],
            ["Results", "Measurable impact"],
            ["Premium", "Long-term performance"],
            ["World-class", "40+ years experience"],
          ].map(([avoid, prefer]) => (
            <div key={avoid} className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground line-through flex-1">{avoid}</span>
              <span className="text-foreground">→</span>
              <span className="text-sm text-foreground font-medium flex-1">{prefer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tone by Context - horizontal timeline */}
      <div>
        <div className="flex items-center gap-4 mb-10">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Tone by Context</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {toneContexts.map((item) => (
            <div key={item.context} className="group p-6 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-ui font-semibold text-sm text-foreground">{item.context}</span>
              </div>
              <span className="font-data text-xs text-primary uppercase tracking-wider block mb-4">{item.tone}</span>
              <p className="text-sm text-muted-foreground italic border-l-2 border-border pl-4 py-2">"{item.example}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceTone;
