import { CheckCircle2, XCircle } from "lucide-react";

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
    {
      context: "Feature Announcement",
      dont: "We're thrilled to announce our incredible new feature that everyone will love!",
      do: "New: Real-time API integration enables direct data export to your SCADA system.",
    },
  ];

  return (
    <section id="voice" className="mb-32">
      <h2 className="section-header">Voice & Tone</h2>
      <p className="text-muted-foreground mb-8">
        Our reader skips to the specification table. We put it first.
      </p>

      {/* Voice Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="card-base p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="font-logo text-xl text-primary">01</span>
          </div>
          <h3 className="font-ui font-bold text-lg mb-2">Direct</h3>
          <p className="text-sm text-muted-foreground">
            Lead with the point. Skip qualifiers and get-to-know-you copy. Respect the reader's time.
          </p>
        </div>

        <div className="card-base p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="font-logo text-xl text-primary">02</span>
          </div>
          <h3 className="font-ui font-bold text-lg mb-2">Technical</h3>
          <p className="text-sm text-muted-foreground">
            Use precise terminology. Our audience are engineers and operators who appreciate specificity.
          </p>
        </div>

        <div className="card-base p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="font-logo text-xl text-primary">03</span>
          </div>
          <h3 className="font-ui font-bold text-lg mb-2">Confident</h3>
          <p className="text-sm text-muted-foreground">
            40+ years of expertise. We don't "try" or "hope"—we measure, we know, we deliver.
          </p>
        </div>

        <div className="card-base p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="font-logo text-xl text-primary">04</span>
          </div>
          <h3 className="font-ui font-bold text-lg mb-2">Practical</h3>
          <p className="text-sm text-muted-foreground">
            Focus on ROI and operational benefits. Abstract innovation claims are meaningless without context.
          </p>
        </div>
      </div>

      {/* Voice Examples */}
      <h3 className="label-tech text-slate-500 mb-4">VOICE IN PRACTICE</h3>
      <div className="space-y-6 mb-12">
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
      <div className="card-base p-0 overflow-hidden">
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
              ["Solution", "System / Equipment / Sensor"],
              ["Leverage", "Use / Apply"],
              ["Utilize", "Use"],
              ["Synergy", "[Describe the actual benefit]"],
              ["Best-in-class", "[Cite specific performance metric]"],
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
