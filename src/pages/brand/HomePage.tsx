import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@/lib/icons";

interface Section {
  id: string;
  label: string;
  route: string;
  desc: string;
}

interface SectionGroup {
  code: string;
  title: string;
  sections: Section[];
}

const sectionGroups: SectionGroup[] = [
  {
    code: "GRP_01",
    title: "Story",
    sections: [
      { id: "00", label: "About", route: "/about", desc: "What this system is, who it's for" },
      { id: "01", label: "Positioning & Voice", route: "/positioning", desc: "Where the brand sits and how it speaks" },
      { id: "02", label: "Principles", route: "/principles", desc: "The rules that govern every decision" },
    ],
  },
  {
    code: "GRP_02",
    title: "Visual System",
    sections: [
      { id: "03", label: "Visual System", route: "/visual-system", desc: "Layers, elevation, and structure" },
      { id: "04", label: "Color", route: "/color", desc: "Palette, usage, and accessibility" },
      { id: "05", label: "Typography", route: "/typography", desc: "Type scale, roles, and constraints" },
      { id: "06", label: "Logo & Assets", route: "/logo-assets", desc: "Logo system, icons, and downloads" },
    ],
  },
  {
    code: "GRP_03",
    title: "Content",
    sections: [
      { id: "08", label: "Imagery & Motion", route: "/imagery", desc: "Photography, textures, animation" },
    ],
  },
  {
    code: "GRP_04",
    title: "Practice",
    sections: [
      { id: "09", label: "Applications", route: "/applications", desc: "Industry use and interface kit" },
      { id: "10", label: "Proof & Examples", route: "/proof", desc: "Evidence, data, and case studies" },
    ],
  },
  {
    code: "GRP_05",
    title: "Tools",
    sections: [
      { id: "12", label: "Tools", route: "/tools", desc: "Photo treatment, exports, icon picker" },
    ],
  },
];

const totalSections = sectionGroups.reduce((n, g) => n + g.sections.length, 0);

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative py-16 md:py-20 lg:py-24" id="about">
      {/* Oversized background data mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-4 right-0 font-data font-black uppercase leading-none text-foreground/[0.025] text-[120px] md:text-[180px] lg:text-[220px]"
      >
        Index
      </div>

      {/* Section header — telemetry strip */}
      <div className="relative mb-12 md:mb-16">
        <div className="flex items-center gap-3 font-data text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span>Directory</span>
          <span className="text-border">·</span>
          <span>{String(totalSections).padStart(2, "0")} Sections</span>
          <span className="text-border">·</span>
          <span>v2025</span>
        </div>

        <h2 className="font-ui text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-[1.05] mb-4 max-w-3xl">
          System Contents
        </h2>
        <p className="text-muted-foreground text-base lg:text-lg max-w-xl leading-relaxed">
          Everything you need to represent Rhosonics consistently — from strategy to execution.
        </p>
      </div>

      {/* Group blocks */}
      <div className="space-y-12 md:space-y-16">
        {sectionGroups.map((group) => (
          <section key={group.title} className="relative">
            {/* Group header — bracket-coded telemetry row */}
            <header className="flex items-baseline gap-4 mb-5">
              <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary">
                {group.code}
              </span>
              <h3 className="font-ui text-base md:text-lg font-semibold text-foreground tracking-tight">
                {group.title}
              </h3>
              <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/60">
                {String(group.sections.length).padStart(2, "0")} entries
              </span>
              <div className="flex-1 h-px bg-border self-center" />
            </header>

            {/* Chamfered container holding the directory rows */}
            <div className="relative bg-card clip-chamfer-md p-3 md:p-4">
              {/* Subtle bracket corners on the large container */}
              <div aria-hidden="true" className="absolute -top-px left-3 w-3 h-3 border-t border-l border-primary/40" />
              <div aria-hidden="true" className="absolute -top-px right-3 w-3 h-3 border-t border-r border-primary/40" />
              <div aria-hidden="true" className="absolute -bottom-px left-3 w-3 h-3 border-b border-l border-primary/40" />
              <div aria-hidden="true" className="absolute -bottom-px right-3 w-3 h-3 border-b border-r border-primary/40" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                {group.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => navigate(section.route)}
                    className="group text-left p-4 lg:p-5 rounded-md bg-background hover:bg-primary/5 transition-colors duration-200 relative"
                    aria-label={`${section.label} — ${section.desc}`}
                  >
                    {/* Top meta row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-data text-[10px] uppercase tracking-widest text-muted-foreground/70">
                        <span className="text-primary">{section.id}</span>
                        <span className="text-border">·</span>
                        <span className="opacity-70">{section.route}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>

                    {/* Title */}
                    <h4 className="font-ui font-semibold text-foreground text-sm lg:text-base mb-1 group-hover:text-primary transition-colors">
                      {section.label}
                    </h4>
                    <p className="text-xs lg:text-[13px] text-muted-foreground leading-relaxed">
                      {section.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Footer telemetry strip */}
      <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-6">
        {[
          ["Standard", "Brand OS"],
          ["Build", "Stable · 2025"],
          ["Origin", "Delft, NL"],
          ["Status", "Active"],
        ].map(([k, v], i) => (
          <div key={k} className="flex flex-col gap-1">
            <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/70">{k}</span>
            <span className={`font-data text-xs uppercase tracking-wider ${i === 3 ? "text-primary" : "text-foreground"}`}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
