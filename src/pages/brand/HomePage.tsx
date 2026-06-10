import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@/lib/icons";
import { ScrollSection } from "@/components/brand/ScrollSection";
import { TelemetryEyebrow, CornerBrackets, TelemetryFooter, DataWatermark } from "@/components/brand/telemetry";

interface Chapter {
  id: string;
  label: string;
  route: string;
  desc: string;
}

interface ChapterGroup {
  code: string;
  title: string;
  chapters: Chapter[];
}

// The definitive 10-chapter Information Architecture, approved 2026-06-10.
// Synthesised from Bang & Olufsen, IBM, Herman Miller, Klarna.
const chapterGroups: ChapterGroup[] = [
  {
    code: "GRP_01",
    title: "Foundation",
    chapters: [
      { id: "01", label: "Brand Position", route: "/position", desc: "Purpose, principles, audience, and what we refuse to be." },
      { id: "02", label: "Voice & Tone", route: "/voice", desc: "Lexicon, rewrites, and the funnel rule." },
    ],
  },
  {
    code: "GRP_02",
    title: "Visual System",
    chapters: [
      { id: "03", label: "Logo", route: "/logo", desc: "Construction, clearspace, misuse, downloads." },
      { id: "04", label: "Color", route: "/color", desc: "Palette, families, pairings, accessibility." },
      { id: "05", label: "Typography", route: "/typography", desc: "Roles, scale, micro-specs, misuse." },
      { id: "06", label: "Iconography", route: "/iconography", desc: "UI icons and pictograms, shared DNA." },
      { id: "07", label: "Imagery", route: "/imagery", desc: "Photo categories with proportion ratios." },
      { id: "08", label: "Data Visualization", route: "/data-viz", desc: "Honesty rules, billboard.js, no embellishment." },
    ],
  },
  {
    code: "GRP_03",
    title: "Practice",
    chapters: [
      { id: "09.A", label: "Applications", route: "/applications", desc: "Industries, interface kit, components." },
      { id: "09.B", label: "Proof", route: "/proof", desc: "Field results, comparisons, references." },
      { id: "10", label: "Resources", route: "/resources", desc: "Downloads, owners, changelog." },
    ],
  },
  {
    code: "APP",
    title: "Appendix",
    chapters: [
      { id: "T", label: "Tools", route: "/tools", desc: "Icon picker, photo treatment, token exports." },
    ],
  },
];

const totalChapters = chapterGroups.reduce((n, g) => n + g.chapters.length, 0);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-16 md:py-20 lg:py-24" id="about">
      <DataWatermark text="Index" />

      <div className="relative mb-12 md:mb-16">
        <TelemetryEyebrow
          className="mb-4"
          pulse
          label="Directory"
          meta={[`${String(totalChapters).padStart(2, "0")} Chapters`, "v2026.06"]}
        />

        <h2 className="font-ui text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.0] mb-6 max-w-4xl">
          Advanced measurement for more efficient, automated, and sustainable operations.
        </h2>
        <p className="text-muted-foreground text-base lg:text-lg max-w-2xl leading-relaxed">
          Our mission, stated plainly. Everything in this brand system — every word, every visual,
          every rule — exists to deliver it. Ten chapters and one Tools appendix. Used by our team,
          our partners, and anyone who wants to know how we think.
        </p>
      </div>

      <div className="space-y-12 md:space-y-16">
        {chapterGroups.map((group) => (
          <ScrollSection key={group.title} className="py-0 relative">
            <header className="flex items-baseline gap-4 mb-5">
              <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">
                {group.code}
              </span>
              <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">
                {group.title}
              </h3>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/60">
                {String(group.chapters.length).padStart(2, "0")} entries
              </span>
              <div className="flex-1 h-px bg-border self-center" />
            </header>

            <div className="relative bg-card p-3 md:p-4 rounded">
              <CornerBrackets />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                {group.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => navigate(chapter.route)}
                    className="group text-left p-4 lg:p-5 rounded-md bg-background hover:bg-primary/5 transition-colors duration-200 relative"
                    aria-label={`${chapter.label} — ${chapter.desc}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-data text-[10px] uppercase tracking-widest text-muted-foreground/70">
                        <span className="text-primary">{chapter.id}</span>
                        <span className="text-border">·</span>
                        <span className="opacity-70">{chapter.route}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>

                    <h4 className="font-ui font-semibold text-foreground text-sm lg:text-base mb-1 group-hover:text-primary transition-colors">
                      {chapter.label}
                    </h4>
                    <p className="text-xs lg:text-[13px] text-muted-foreground leading-relaxed">
                      {chapter.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </ScrollSection>
        ))}
      </div>

      <TelemetryFooter
        className="mt-16 md:mt-20"
        items={[
          { label: "Standard", value: "Brand OS" },
          { label: "Revision", value: "2026.06" },
          { label: "Origin", value: "Delft, NL" },
          { label: "Status", value: "Active", emphasis: true },
        ]}
      />
    </div>
  );
};

export default HomePage;
