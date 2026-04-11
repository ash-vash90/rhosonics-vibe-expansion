import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@/lib/icons";

const sections = [
  { id: "00", label: "About", route: "/about", desc: "What this system is, who it's for" },
  { id: "01", label: "Positioning", route: "/positioning", desc: "Where the brand sits in the market" },
  { id: "02", label: "Principles", route: "/principles", desc: "The rules that govern every decision" },
  { id: "03", label: "Visual System", route: "/visual-system", desc: "Layers, elevation, and structure" },
  { id: "04", label: "Color", route: "/color", desc: "Palette, usage, and accessibility" },
  { id: "05", label: "Typography", route: "/typography", desc: "Type scale, roles, and constraints" },
  { id: "06", label: "Logo & Assets", route: "/logo-assets", desc: "Logo system, icons, and downloads" },
  { id: "07", label: "Voice & Tone", route: "/voice", desc: "How the brand speaks and writes" },
  { id: "08", label: "Imagery & Motion", route: "/imagery", desc: "Photography, textures, animation" },
  { id: "09", label: "Applications", route: "/applications", desc: "Industry use and interface kit" },
  { id: "10", label: "Proof & Examples", route: "/proof", desc: "Evidence, data, and case studies" },
  { id: "11", label: "Social Media", route: "/social-media", desc: "LinkedIn assets and templates" },
  { id: "12", label: "Tools", route: "/tools", desc: "Photo treatment, exports, icon picker" },
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => navigate(section.route)}
            className="group text-left p-5 rounded-lg border border-border hover:border-primary/40 bg-card hover:bg-primary/5 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-data text-xs text-primary">{section.id}</span>
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
  );
};

export default HomePage;
