const Newsletter = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 font-ui">
      <div
        className="mx-auto bg-white shadow-elevated"
        style={{ maxWidth: 640 }}
      >
        {/* Header */}
        <div className="bg-rho-obsidian px-8 py-10 text-center">
          <h1 className="font-logo text-2xl tracking-tight text-white mb-1">
            R&D Newsletter
          </h1>
          <p className="font-data text-sm text-slate-400 tracking-widest uppercase">
            February 2026
          </p>
        </div>

        {/* Intro */}
        <div className="px-8 pt-8 pb-6">
          <p className="text-sm leading-relaxed text-foreground">
            This was a month of hard work, struggle, and breakthrough. The entire R&D team pushed the CCM-SMART to accuracy levels we've never reached before — because Samsung is about to decide which equipment they'll use to measure H₂O₂ across their semiconductor fabs. If we win this, it could mean hundreds of units and put Rhosonics on the map. Last week, after months of relentless effort, we got there!
          </p>
        </div>

        <Divider />

        {/* Samsung Accuracy Push */}
        <Section title="The Samsung Accuracy Push">
          <MetricRow
            items={[
              { value: "±0.4%", label: "Before" },
              { value: "→", label: "" },
              { value: "±0.04%", label: "After" },
              { value: "10×", label: "Improvement" },
            ]}
          />
          <p className="text-sm leading-relaxed text-foreground mt-4">
            Samsung is starting a major evaluation in March to select H₂O₂ measurement equipment for their semiconductor lines. Our older CCMs couldn't achieve the required accuracy. R&D had one job: push the CCM-SMART to its absolute limit.
          </p>
          <p className="text-sm leading-relaxed text-foreground mt-3">
            The challenge was temperature compensation. H₂O₂ is extremely sensitive to tiny temperature changes, and initial results weren't where they needed to be. The R&D team dove deep — juggling this alongside other demanding tasks such as service cases support. DS-Linetech ran parallel testing and shared results back, accelerating validation.
          </p>
          <Highlight>
            A successful test could lead to many sold CCMs and establish Rhosonics in the semiconductor industry.
          </Highlight>
        </Section>

        <Divider />

        {/* Reducing Production Risks */}
        <Section title="Reducing Production Risks">
          <MetricRow
            items={[
              { value: "40", label: "MUA3 boards tested" },
              { value: "80%", label: "Issue resolved" },
            ]}
          />
          <p className="text-sm leading-relaxed text-foreground mt-4">
            Giovanni delivered 40 new MUA3 boards. Because R&D discovered a connectivity issue in previous weeks, we decided to test every board before sending to Production. Same with all the SOMs from F&S. This wasn't scheduled — R&D chose to do this to respect the flow of Production and prevent problems reaching our colleagues.
          </p>
          <p className="text-sm leading-relaxed text-foreground mt-3">
            The remaining 20% is trickier because it is inconsistent across MUA3 boards and involves a few problematic ethernet chips. We are working closely with Giovanni.
          </p>
        </Section>

        <Divider />

        {/* Massflow */}
        <Section title="Massflow: You Can See It Working">
          <p className="text-sm leading-relaxed text-foreground">
            The hardware PLC integration is complete, including housing. The SDM-ECO now has the ability to:
          </p>
          <ul className="text-sm leading-relaxed text-foreground mt-2 ml-4 space-y-1 list-disc">
            <li>Get a 4–20mA input such as flow rate</li>
            <li>Calculate massflow using density and flow rate</li>
            <li>Display flow rate and massflow on screen</li>
            <li>Output through all communication ports</li>
          </ul>
          <p className="text-sm leading-relaxed text-foreground mt-3">
            Additionally, we developed a <strong>Cross Meter</strong> interface that will help operators in dredging and mining operate their process optimally.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <DeptNote dept="Service" note="Expect fewer calibration support calls. Customers can see and correct on their own." />
            <DeptNote dept="Sales" note="Visual calibration feedback is a strong differentiator." />
          </div>
        </Section>

        <Divider />

        {/* New Initiatives */}
        <Section title="New Initiatives">
          <div className="space-y-4">
            <Initiative
              name="Oyster Project"
              text="We won an MIT grant to research dead oyster detection using ultrasonic technology for Janssen. Frank has started research and testing. A sign our technology reaches far beyond traditional applications."
            />
            <Initiative
              name="Unified Sensor Design"
              text="We are investigating standardizing sensor architecture across SDM/CCM/CDM. Reduces manufacturing complexity and spare parts."
            />
            <Initiative
              name="New Conductivity Sensor"
              text="Moved into active development."
            />
          </div>
        </Section>

        <Divider />

        {/* Honest Challenges */}
        <Section title="The Honest Challenges">
          <div className="space-y-3">
            <ChallengeItem text="We need a test engineer with coding skills. Without this hire, we can't scale our testing capabilities. If you know candidates, send them our way." />
            <ChallengeItem text="Titration equipment and DS-Linetech testing cabinet must be installed in Q1. Delays directly delay CCM-SMART product launch." />
          </div>
        </Section>

        <Divider />

        {/* What's Coming in March */}
        <Section title="What's Coming in March">
          <div className="space-y-3">
            <ComingItem
              title="Samsung field testing begins"
              text="We've done everything we can — now we wait and support."
            />
            <ComingItem
              title="aMPC & Linear calibration field testing"
              text="Together with Yellow Solutions after all internal testing is completed."
            />
            <ComingItem
              title="Respect the Flow"
              text="Launching a formal handover process where R&D and Production work side by side on production candidates before they enter real production. Stronger collaboration, better products, less surprises."
            />
          </div>
        </Section>

        <Divider />

        {/* Closing */}
        <div className="px-8 py-8 text-center">
          <p className="text-sm leading-relaxed text-foreground">
            This newsletter is a story of the whole team. Every department plays a part in what comes next.
          </p>
          <p className="text-sm font-semibold text-foreground mt-4">
            Feel free to reach out to Stefan with questions or ideas.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-rho-obsidian px-8 py-6 text-center">
          <p className="font-logo text-xs tracking-wide text-slate-400">
            Rhosonics — Ultrasonic Measurement Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

/* ── Sub-components (co-located for simplicity) ── */

const Divider = () => (
  <div className="px-8">
    <hr className="border-t border-slate-200" />
  </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="px-8 py-6">
    <h2 className="font-ui font-bold text-base text-foreground border-l-4 border-rho-green pl-3 mb-4">
      {title}
    </h2>
    {children}
  </div>
);

const MetricRow = ({ items }: { items: { value: string; label: string }[] }) => (
  <div className="flex items-center justify-center gap-4 flex-wrap">
    {items.map((item, i) => (
      <div key={i} className="text-center px-3 py-2">
        <span className="font-data text-2xl font-bold text-rho-green block leading-none">
          {item.value}
        </span>
        {item.label && (
          <span className="font-data text-[10px] uppercase tracking-wider text-muted-foreground mt-1 block">
            {item.label}
          </span>
        )}
      </div>
    ))}
  </div>
);

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 bg-success-surface border-l-4 border-rho-green px-4 py-3 rounded-r">
    <p className="text-sm font-semibold text-foreground">{children}</p>
  </div>
);

const DeptNote = ({ dept, note }: { dept: string; note: string }) => (
  <div className="bg-slate-50 rounded p-3">
    <span className="font-data text-[10px] uppercase tracking-wider text-rho-green font-bold block mb-1">
      For {dept}
    </span>
    <p className="text-xs leading-relaxed text-muted-foreground">{note}</p>
  </div>
);

const Initiative = ({ name, text }: { name: string; text: string }) => (
  <div>
    <h3 className="font-ui font-semibold text-sm text-foreground">{name}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground mt-1">{text}</p>
  </div>
);

const ChallengeItem = ({ text }: { text: string }) => (
  <div className="bg-warning-surface border-l-4 border-warning px-4 py-3 rounded-r">
    <p className="text-sm leading-relaxed text-foreground">{text}</p>
  </div>
);

const ComingItem = ({ title, text }: { title: string; text: string }) => (
  <div>
    <h3 className="font-ui font-semibold text-sm text-foreground">{title}</h3>
    <p className="text-sm leading-relaxed text-muted-foreground mt-1">{text}</p>
  </div>
);
