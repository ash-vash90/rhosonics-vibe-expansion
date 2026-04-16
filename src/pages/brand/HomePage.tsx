import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@/lib/icons";

interface Section {
  id: string;
  label: string;
  route: string;
  desc: string;
  accent: string;
}

interface SectionGroup {
  title: string;
  sections: Section[];
}

const sectionGroups: SectionGroup[] = [
  {
    title: "Story",
    sections: [
      { id: "00", label: "About", route: "/about", desc: "What this system is, who it's for", accent: "hsl(var(--primary))" },
      { id: "01", label: "Positioning & Voice", route: "/positioning", desc: "Where the brand sits and how it speaks", accent: "hsl(var(--primary))" },
      { id: "02", label: "Principles", route: "/principles", desc: "The rules that govern every decision", accent: "hsl(var(--primary))" },
    ],
  },
  {
    title: "Visual System",
    sections: [
      { id: "03", label: "Visual System", route: "/visual-system", desc: "Layers, elevation, and structure", accent: "hsl(210 60% 50%)" },
      { id: "04", label: "Color", route: "/color", desc: "Palette, usage, and accessibility", accent: "hsl(210 60% 50%)" },
      { id: "05", label: "Typography", route: "/typography", desc: "Type scale, roles, and constraints", accent: "hsl(210 60% 50%)" },
      { id: "06", label: "Logo & Assets", route: "/logo-assets", desc: "Logo system, icons, and downloads", accent: "hsl(210 60% 50%)" },
    ],
  },
  {
    title: "Content",
    sections: [
      { id: "08", label: "Imagery & Motion", route: "/imagery", desc: "Photography, textures, animation", accent: "hsl(280 45% 55%)" },
    ],
  },
  {
    title: "Practice",
    sections: [
      { id: "09", label: "Applications", route: "/applications", desc: "Industry use and interface kit", accent: "hsl(38 92% 50%)" },
      { id: "10", label: "Proof & Examples", route: "/proof", desc: "Evidence, data, and case studies", accent: "hsl(38 92% 50%)" },
      // { id: "11", label: "Social Media", route: "/social-media", desc: "LinkedIn assets and templates", accent: "hsl(38 92% 50%)" },
    ],
  },
  {
    title: "Tools",
    sections: [
      { id: "12", label: "Tools", route: "/tools", desc: "Photo treatment, exports, icon picker", accent: "hsl(var(--primary))" },
    ],
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 md:py-16 lg:py-20">
      <div className="mb-10 md:mb-14">
        <span className="font-data text-xs text-primary tracking-widest uppercase mb-3 block">DIRECTORY</span>
        <h2 className="font-ui text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          System Contents
        </h2>
        <p className="text-muted-foreground text-base max-w-xl">
          Everything you need to represent Rhosonics consistently — from strategy to execution.
        </p>
      </div>

      <div className="space-y-10">
        {sectionGroups.map((group) => (
          <div key={group.title}>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="w-1.5 h-5 rounded-sm"
                style={{ backgroundColor: group.sections[0].accent }}
              />
              <h3 className="font-data text-[11px] tracking-widest uppercase text-muted-foreground">
                {group.title}
              </h3>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {group.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => navigate(section.route)}
                  className="group text-left p-5 rounded-[4px] border border-border hover:border-primary/40 bg-card hover:bg-primary/5 transition-all duration-200 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ backgroundColor: section.accent }}
                  />
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-data text-xs" style={{ color: section.accent }}>
                      {section.id}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-ui font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                    {section.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{section.desc}</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
