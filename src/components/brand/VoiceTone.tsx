import { CheckCircle2, XCircle, MessageSquare, FileText, Headphones, Megaphone } from "lucide-react";

export const VoiceTone = () => {
  const voiceExamples = [
    {
      context: "Product Description",
      dont: "Our amazing cutting-edge solution revolutionizes industry with game-changing innovation!",
      do: "The SDM-Eco provides ±0.1% density accuracy in slurries up to 70% solids concentration.",
    },
    {
      context: "Marketing Headline",
      dont: "Unleash the Power of Next-Gen Measurement Technology!",
      do: "Measure density. Reduce waste. Optimize yield.",
    },
    {
      context: "Support Response",
      dont: "We're super excited to help you troubleshoot this issue! 🎉",
      do: "Calibration error E-47 typically indicates probe fouling. Clean the sensor face and recalibrate.",
    },
  ];

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
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Tone by Context</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {toneContexts.map((item) => (
            <div key={item.context} className="group">
              <div className="flex items-center gap-3 mb-4">
                <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-ui font-semibold text-sm text-foreground">{item.context}</span>
              </div>
              <span className="font-data text-xs text-primary uppercase tracking-wider block mb-3">{item.tone}</span>
              <p className="text-sm text-muted-foreground italic border-l-2 border-border pl-3">"{item.example}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Examples - SIDE BY SIDE COMPARISON */}
      <div>
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Voice in Practice</h3>
          <div className="h-px flex-1 bg-border" />
        </div>
        
        <div className="space-y-0">
          {voiceExamples.map((example, i) => (
            <div 
              key={i} 
              className="grid md:grid-cols-2 gap-0 border-b border-border last:border-b-0"
            >
              {/* Don't side */}
              <div className="p-6 bg-error-surface border-l-4 border-error-border">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-error" />
                  <span className="font-data text-xs text-error uppercase tracking-wider">{example.context} — Don't</span>
                </div>
                <p className="text-muted-foreground italic">"{example.dont}"</p>
              </div>
              
              {/* Do side */}
              <div className="p-6 bg-eco-surface border-l-4 border-primary">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="font-data text-xs text-primary uppercase tracking-wider">{example.context} — Do</span>
                </div>
                <p className="text-foreground">"{example.do}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoiceTone;
