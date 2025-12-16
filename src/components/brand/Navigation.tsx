import { useState } from "react";
import { Link } from "react-router-dom";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { Menu, X, Zap, ChevronRight, Sparkles } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
  items: { id: string; label: string; highlight?: boolean }[];
}

const navSections: NavSection[] = [
  {
    id: "01",
    label: "FOUNDATION",
    items: [
      { id: "intro", label: "Brand Ethos" },
      { id: "origin", label: "Our Story", highlight: true },
      { id: "lockup", label: "Master Lockup" },
      { id: "mission", label: "Mission & Vision" },
    ],
  },
  {
    id: "02",
    label: "SYSTEM",
    items: [
      { id: "colors", label: "Color Matrix" },
      { id: "typography", label: "Typography Scale" },
      { id: "spacing", label: "Spacing System" },
    ],
  },
  {
    id: "03",
    label: "ASSETS",
    items: [
      { id: "assets", label: "Logo System" },
      { id: "icons", label: "Icon Guidelines" },
      { id: "components", label: "Interface Kit" },
    ],
  },
  {
    id: "04",
    label: "SUSTAINABILITY",
    items: [
      { id: "eco", label: "Eco Components", highlight: true },
      { id: "industries", label: "Industry Apps" },
      { id: "imagery", label: "Imagery Guide" },
    ],
  },
  {
    id: "05",
    label: "PRINCIPLES",
    items: [
      { id: "voice", label: "Voice & Tone" },
      { id: "motion", label: "Motion Design" },
      { id: "dos-donts", label: "Do's & Don'ts" },
    ],
  },
  {
    id: "06",
    label: "ANALYSIS",
    items: [
      { id: "comparison", label: "Tech Comparison" },
      { id: "cases", label: "Case Studies", highlight: true },
    ],
  },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="w-full lg:w-72 bg-rho-obsidian text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex-shrink-0 z-50">
      {/* Green accent bar */}
      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary hidden lg:block" />
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800/80 flex justify-between items-center">
        <button 
          onClick={() => scrollToSection('intro')}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-7 h-7">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="font-logo text-lg tracking-tight">Rhosonics</span>
        </button>
        <button
          className="lg:hidden text-slate-400 border border-slate-700 p-2 rounded-md hover:border-primary hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`p-6 space-y-6 overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {navSections.map((section) => (
          <div key={section.id}>
            <div className="label-tech mb-3 text-slate-400">
              <span className="text-primary">{section.id}</span>
              <span className="mx-2 text-slate-600">/</span>
              {section.label}
            </div>
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link mb-2 text-left w-full flex items-center justify-between group ${
                  item.highlight ? 'text-primary font-medium' : ''
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        ))}

        {/* AI Tools Link */}
        <div className="pt-6 border-t border-slate-800">
          <Link
            to="/tools"
            className="flex items-center gap-3 px-3 py-3 bg-primary/10 border border-primary/30 rounded-md hover:bg-primary/20 transition-colors group"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <div>
              <span className="label-tech-sm text-primary/70 block">AI TOOLS</span>
              <span className="text-sm text-slate-200 font-medium group-hover:text-primary transition-colors">Generate Assets</span>
            </div>
          </Link>
        </div>

        {/* Version Badge */}
        <div className="pt-4">
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/50 rounded-md">
            <Zap className="w-4 h-4 text-primary" />
            <div>
              <span className="label-tech-sm text-slate-500 block">STATUS</span>
              <span className="text-sm text-slate-300 font-medium">System Active</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
