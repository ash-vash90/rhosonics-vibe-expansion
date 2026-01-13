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
    {
      context: "Technical Documentation",
      icon: FileText,
      tone: "Precise & Instructive",
      example: "Connect the 4-20mA output to terminals 3 and 4.",
    },
    {
      context: "Sales & Marketing",
      icon: Megaphone,
      tone: "Confident & Benefit-Focused",
      example: "Reduce reagent consumption by 15-25% through real-time density monitoring.",
    },
    {
      context: "Customer Support",
      icon: Headphones,
      tone: "Helpful & Direct",
      example: "This error occurs when flow rate drops below 0.5 m/s.",
    },
    {
      context: "Social Media",
      icon: MessageSquare,
      tone: "Factual & Engaging",
      example: "40 years of density measurement. 10,000+ installations. One obsession: accuracy.",
    },
  ];

  return (
    <section id="voice" className="mb-32">
      <h2 className="section-header">Voice & Tone</h2>
      <p className="text-muted-foreground mb-12">
        Our reader skips to the specification table. We put it first.
      </p>

      {/* Voice Pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { num: "01", title: "Direct", desc: "Lead with the point. Respect the reader's time." },
          { num: "02", title: "Technical", desc: "Precise terminology. Our audience appreciates specificity." },
          { num: "03", title: "Confident", desc: "40+ years of expertise. We measure, we know, we deliver." },
          { num: "04", title: "Practical", desc: "Focus on ROI. Abstract claims are meaningless without context." },
        ].map((pillar) => (
          <div key={pillar.num} className="card-base p-5">
            <span className="font-logo text-lg text-primary">{pillar.num}</span>
            <h3 className="font-ui font-bold text-lg mt-2 mb-1">{pillar.title}</h3>
            <p className="text-sm text-muted-foreground">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* Tone by Context */}
      <h3 className="label-tech text-slate-500 mb-4">TONE BY CONTEXT</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {toneContexts.map((item, i) => (
          <div key={i} className="card-base p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-ui font-semibold text-sm">{item.context}</h4>
                <span className="text-xs text-primary">{item.tone}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">"{item.example}"</p>
          </div>
        ))}
      </div>

      {/* Voice Examples */}
      <h3 className="label-tech text-slate-500 mb-4">VOICE IN PRACTICE</h3>
      <div className="space-y-6 mb-16">
        {voiceExamples.map((example, i) => (
          <div key={i} className="card-base p-6">
            <div className="label-tech text-muted-foreground mb-4">{example.context}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  <span className="font-ui font-medium text-destructive">Don't</span>
                </div>
                <p className="text-sm text-muted-foreground italic">"{example.dont}"</p>
              </div>
              <div className="p-4 bg-eco-surface rounded-lg border border-eco-border">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="font-ui font-medium text-primary">Do</span>
                </div>
                <p className="text-sm text-muted-foreground">"{example.do}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Terminology */}
      <h3 className="label-tech text-slate-500 mb-4">PREFERRED TERMINOLOGY</h3>
      <div className="card-base p-0 overflow-hidden max-w-2xl">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left label-tech text-slate-500">Instead of...</th>
              <th className="px-6 py-4 text-left label-tech text-slate-500">Say...</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cutting-edge technology", "Ultrasonic measurement technology"],
              ["Revolutionary", "Proven / Industry-standard"],
              ["Solution", "System / Sensor"],
              ["Best-in-class", "[Cite specific metric]"],
              ["Game-changing", "Reduces [X] by [Y]%"],
            ].map(([avoid, prefer], i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="px-6 py-3 text-muted-foreground line-through">{avoid}</td>
                <td className="px-6 py-3 text-foreground font-medium">{prefer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VoiceTone;
