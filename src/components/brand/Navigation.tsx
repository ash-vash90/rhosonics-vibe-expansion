import { useState } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { Menu, X, ArrowUpRight } from "lucide-react";

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
    <nav className="w-full lg:w-80 bg-rho-obsidian text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex-shrink-0 z-50 noise-overlay">
      {/* Accent line */}
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden lg:block" />
      
      {/* Header */}
      <div className="p-6 border-b border-slate-800/50 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => scrollToSection('intro')}>
          <div className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="font-logo text-xl tracking-tight pt-0.5">Rhosonics</span>
        </div>
        <button
          className="lg:hidden text-slate-400 border border-slate-700 rounded-lg p-2 hover:border-primary hover:text-primary transition-all duration-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`p-6 space-y-8 overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {navSections.map((section, sectionIdx) => (
          <div 
            key={section.id} 
            className="opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${sectionIdx * 100}ms`, animationFillMode: 'forwards' }}
          >
            <div className="label-tech mb-4 text-slate-600 flex items-center gap-2">
              <span className="text-primary">{section.id}</span>
              <span className="text-slate-700">//</span>
              <span>{section.label}</span>
            </div>
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link mb-3 text-left w-full flex items-center justify-between group ${
                  item.highlight ? 'text-rho-green-accent font-medium' : ''
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && (
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        ))}

        {/* Version Badge */}
        <div className="pt-6 border-t border-slate-800/50">
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/30 rounded-lg border border-slate-800">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-dot"></div>
            <div>
              <span className="label-tech text-slate-500 block">STATUS</span>
              <span className="text-sm text-slate-300">System V.Final</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
