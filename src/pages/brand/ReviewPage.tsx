import { ScrollSection } from "@/components/brand/ScrollSection";

const sections = [
  {
    num: "01",
    title: "Mission & Vision",
    status: "Needs sign-off",
    summary: 'Proposal — Mission: "Measure What Matters" — Vision: "Progress That Matters".',
    decisions: [
      "Confirm or revise the mission statement",
      "Confirm or revise the vision statement",
      "Align on how these appear in external communications",
    ],
  },
  {
    num: "02",
    title: "Four Core Values",
    status: "Needs sign-off",
    summary:
      "Proposal — Built on Partnership, Engineered for Challenge, Expertise in Practice, Progress That Matters.",
    decisions: [
      "Approve the four proposed values",
      "Decide if any values should be reworded or replaced",
      "Confirm hierarchy / priority order",
    ],
  },
  {
    num: "03",
    title: "Two Proposed ICPs",
    status: "Working direction",
    summary:
      "Senior Process Engineer (primary), Operations Manager (secondary) — verticals: Mining, Semicon, Dredging; roles: Engineer, Plant Manager, Procurement.",
    decisions: [
      "Validate primary vs secondary persona priority",
      "Confirm or adjust target verticals",
      "Add or remove specific job titles",
    ],
  },
  {
    num: "04",
    title: "Brand Personality",
    status: "Working direction",
    summary:
      'Authoritative, Collaborative, Problem-Solving, Warm — "experienced social engineer" meets "Senior Engineer, skeptical of marketing".',
    decisions: [
      "Agree on the personality traits",
      "Decide if tone leans more technical or approachable",
      "Validate the archetype framing",
    ],
  },
  {
    num: "05",
    title: "Voice Pillars",
    status: "Defined",
    summary: "Direct, Educational, Evidence-Based, Partnership-First.",
    decisions: [
      "Approve the four voice pillars",
      "Review preferred terminology list (avoid → prefer)",
      "Confirm tone-by-context guidelines",
    ],
  },
  {
    num: "06",
    title: 'Visual Identity & "Lab in the Field"',
    status: "Working direction",
    summary:
      "Colour, typography, photo grade specification, four-step colour treatment.",
    decisions: [
      "Approve primary colour palette (Obsidian, Slate, Green)",
      "Confirm typography choices (Instrument Sans, JetBrains Mono)",
      "Validate photo treatment grades",
    ],
  },
  {
    num: "07",
    title: "Imagery Direction",
    status: "In progress",
    summary:
      "Photo treatment spec, AI-generated examples (need real photography replacement).",
    decisions: [
      "Review current AI placeholder imagery",
      "Plan real photography shoot timeline",
      "Approve photo treatment and overlay rules",
    ],
  },
];

const ReviewPage = () => (
  <>
    {/* Header */}
    <ScrollSection className="pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="max-w-3xl">
        <span className="font-data text-[10px] uppercase tracking-widest text-primary block mb-4">
          Internal Review
        </span>
        <h1 className="font-ui text-3xl md:text-4xl font-bold text-foreground mb-4">
          Brand Strategy — Decision Points
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl">
          High-level summary of the seven key touchpoints that need alignment
          and sign-off. Scroll through each section to review and discuss.
        </p>
      </div>
    </ScrollSection>

    {/* Sections */}
    {sections.map((s, i) => (
      <ScrollSection key={s.num} className="py-12 md:py-16">
        <div className="max-w-3xl">
          {/* Divider */}
          {i > 0 && <div className="h-px bg-border mb-12" />}

          <div className="flex items-start gap-4 md:gap-6">
            <span className="font-data text-2xl md:text-3xl text-primary/40 leading-none pt-1">
              {s.num}
            </span>
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="font-ui text-xl md:text-2xl font-bold text-foreground">
                  {s.title}
                </h2>
                <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">
                  {s.status}
                </span>
              </div>

              <p className="text-sm md:text-base text-muted-foreground">
                {s.summary}
              </p>

              <div>
                <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                  Decisions needed
                </span>
                <ul className="space-y-1.5">
                  {s.decisions.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mt-1.5 flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ScrollSection>
    ))}
  </>
);

export default ReviewPage;
