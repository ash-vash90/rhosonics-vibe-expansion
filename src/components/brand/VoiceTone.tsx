import { CheckCircle2, XCircle, MessageSquare, FileText, Headphones, Mail, Megaphone, BookOpen } from "lucide-react";

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
    {
      context: "Email Subject Line",
      dont: "🚀 You Won't Believe What's Coming Next!!!",
      do: "SDM-Eco firmware update: Enhanced accuracy mode now available",
    },
    {
      context: "Error Message",
      dont: "Oops! Something went wrong. Please try again later.",
      do: "Connection timeout (30s). Verify network settings or contact support: error code NET-408.",
    },
  ];

  const toneContexts = [
    {
      context: "Technical Documentation",
      icon: FileText,
      tone: "Precise & Instructive",
      description: "Matter-of-fact language. Step-by-step clarity. No ambiguity.",
      example: "Connect the 4-20mA output to terminals 3 and 4. Ensure polarity matches diagram 2.1.",
      color: "primary",
    },
    {
      context: "Sales & Marketing",
      icon: Megaphone,
      tone: "Confident & Benefit-Focused",
      description: "Lead with measurable outcomes. State facts, not hype.",
      example: "Reduce reagent consumption by 15-25% through real-time density monitoring.",
      color: "primary",
    },
    {
      context: "Customer Support",
      icon: Headphones,
      tone: "Helpful & Direct",
      description: "Acknowledge the issue. Provide the solution. No filler.",
      example: "This error occurs when flow rate drops below 0.5 m/s. Increase pump speed or check for blockage.",
      color: "primary",
    },
    {
      context: "Email Communication",
      icon: Mail,
      tone: "Professional & Concise",
      description: "Get to the point in the first sentence. Respect their inbox.",
      example: "Attached: calibration certificate for your SDM-Eco (S/N: 2024-0892). Valid until 2025-03-15.",
      color: "primary",
    },
    {
      context: "Training Materials",
      icon: BookOpen,
      tone: "Clear & Educational",
      description: "Build understanding progressively. Use examples from real installations.",
      example: "Ultrasonic waves travel slower through denser slurries. The sensor measures this delay to calculate concentration.",
      color: "primary",
    },
    {
      context: "Social Media",
      icon: MessageSquare,
      tone: "Factual & Engaging",
      description: "Still technical, but approachable. Data is the hook.",
      example: "40 years of density measurement. 10,000+ installations. One obsession: accuracy.",
      color: "primary",
    },
  ];

  const messagingRules = [
    {
      category: "Headlines & Titles",
      dos: [
        "Lead with the outcome or key metric",
        "Use active voice and strong verbs",
        "Keep under 10 words when possible",
        "Make it scannable for busy engineers",
      ],
      donts: [
        "Start with 'Introducing' or 'Announcing'",
        "Use questions as headlines",
        "Include multiple exclamation marks",
        "Bury the benefit in qualifiers",
      ],
    },
    {
      category: "Body Copy",
      dos: [
        "Put the specification table early—our readers skip to it",
        "Use bullet points for features and specs",
        "Include real numbers: percentages, ranges, tolerances",
        "Reference actual installations and industries",
      ],
      donts: [
        "Open with company history or 'about us' content",
        "Use passive voice when active works",
        "Pad with adjectives (innovative, cutting-edge, revolutionary)",
        "Leave claims unquantified",
      ],
    },
    {
      category: "Calls to Action",
      dos: [
        "Be specific: 'Download datasheet' not 'Learn more'",
        "Match the CTA to the content stage",
        "Use action verbs: Request, Calculate, Configure",
        "Reduce friction—say what happens next",
      ],
      donts: [
        "Use generic CTAs like 'Click here'",
        "Make promises the click can't deliver",
        "Add unnecessary urgency ('Act now!')",
        "Hide the CTA in a paragraph",
      ],
    },
  ];

  return (
    <section id="voice" className="mb-32">
      <h2 className="section-header">Voice & Tone</h2>
      <p className="text-muted-foreground mb-8">
        Our reader skips to the specification table. We put it first.
      </p>

      {/* Voice Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
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

      {/* Context-Specific Tone */}
      <h3 className="label-tech text-slate-500 mb-4">TONE BY CONTEXT</h3>
      <p className="text-muted-foreground mb-6 max-w-2xl">
        While our voice stays consistent, tone shifts to match the medium and audience expectation.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {toneContexts.map((item, i) => (
          <div key={i} className="card-base p-5 group hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-ui font-semibold text-sm">{item.context}</h4>
                <span className="text-xs text-primary font-medium">{item.tone}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
            <div className="p-3 bg-slate-50 rounded border border-slate-100">
              <p className="text-xs text-slate-600 italic">"{item.example}"</p>
            </div>
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

      {/* Messaging Guidelines */}
      <h3 className="label-tech text-slate-500 mb-4">MESSAGING GUIDELINES</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {messagingRules.map((rule, i) => (
          <div key={i} className="card-base p-6">
            <h4 className="font-ui font-bold text-lg mb-4 pb-3 border-b border-border">{rule.category}</h4>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Do</span>
              </div>
              <ul className="space-y-2">
                {rule.dos.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">Don't</span>
              </div>
              <ul className="space-y-2">
                {rule.donts.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Claims Policy */}
      <h3 className="label-tech text-slate-500 mb-4">CLAIMS POLICY</h3>
      <div className="card-base p-6 mb-8">
        <p className="text-sm text-muted-foreground mb-4">
          Performance claims require precision. Match language to data certainty.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-eco-surface rounded-lg border border-eco-border">
            <div className="label-tech text-primary mb-2">UNIVERSAL CLAIM</div>
            <p className="font-ui font-medium text-foreground mb-1">"Reduces X by Y%"</p>
            <p className="text-xs text-muted-foreground">
              Only when true across all installations and conditions.
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="label-tech text-amber-700 mb-2">CONDITIONAL CLAIM</div>
            <p className="font-ui font-medium text-foreground mb-1">"Can reduce X by Y%"</p>
            <p className="text-xs text-muted-foreground">
              When dependent on application, installation, or operating conditions.
            </p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="label-tech text-slate-600 mb-2">BEST-CASE CLAIM</div>
            <p className="font-ui font-medium text-foreground mb-1">"Up to Y% reduction"</p>
            <p className="text-xs text-muted-foreground">
              For citing maximum results. Must include qualifying conditions.
            </p>
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <div className="label-tech text-slate-600 mb-2">COMPARATIVE CLAIMS MUST INCLUDE:</div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Date range of measurement period</li>
            <li>• Number of installations sampled (n=X)</li>
            <li>• Operating conditions (e.g., "in slurries at 20-40% solids concentration")</li>
            <li>• Source citation or internal reference number</li>
          </ul>
        </div>
      </div>

      {/* Forbidden Words */}
      <h3 className="label-tech text-slate-500 mb-4">FORBIDDEN WORDS</h3>
      <div className="card-base p-6 mb-8">
        <p className="text-sm text-muted-foreground mb-4">
          These terms signal marketing over substance. Our audience notices.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Cutting-edge", "Revolutionary", "Game-changing", "Synergy", 
            "Leverage", "Utilize", "Best-in-class", "World-leading",
            "Next-gen", "Disruptive", "Paradigm shift", "Holistic",
            "Scalable" , "Turnkey", "Seamless", "Robust"
          ].map((word, i) => (
            <span key={i} className="px-3 py-1.5 bg-red-50 text-destructive font-data text-xs rounded border border-red-200 line-through">
              {word}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">
          Exception: "Innovative" may be used only when describing a specific, documented technical feature.
        </p>
      </div>

      {/* Terminology */}
      <h3 className="label-tech text-slate-500 mb-4">PREFERRED TERMINOLOGY</h3>
      <div className="card-base p-0 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left label-tech text-slate-500">Instead of...</th>
              <th className="px-6 py-4 text-left label-tech text-slate-500">Say...</th>
              <th className="px-6 py-4 text-left label-tech text-slate-500 hidden md:table-cell">Why</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Cutting-edge technology", "Ultrasonic measurement technology", "Specific > vague"],
              ["Revolutionary", "Proven / Industry-standard", "Engineers distrust hype"],
              ["Solution", "System / Equipment / Sensor", "Concrete nouns are clearer"],
              ["Leverage", "Use / Apply", "Simpler is better"],
              ["Utilize", "Use", "Same meaning, fewer syllables"],
              ["Synergy", "[Describe the actual benefit]", "Show, don't tell"],
              ["Best-in-class", "[Cite specific performance metric]", "Data beats adjectives"],
              ["Game-changing", "Reduces [X] by [Y]%", "Quantify the change"],
              ["Innovative", "Non-contact / In-line / Real-time", "Feature, not marketing"],
              ["World-leading", "40+ years, 10,000+ installations", "Track record > claims"],
            ].map(([avoid, prefer, why], i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="px-6 py-3 text-muted-foreground line-through">{avoid}</td>
                <td className="px-6 py-3 text-foreground font-medium">{prefer}</td>
                <td className="px-6 py-3 text-xs text-slate-500 hidden md:table-cell">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default VoiceTone;
