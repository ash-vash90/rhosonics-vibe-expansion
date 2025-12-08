import { useState } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { Menu, X, Zap } from "lucide-react";

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
    <nav className="w-full lg:w-72 bg-rho-obsidian text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex-shrink-0 z-50 border-r border-slate-800">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
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
          className="lg:hidden text-slate-400 border border-slate-700 rounded p-2 hover:border-slate-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`p-6 space-y-6 overflow-y-auto ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {navSections.map((section) => (
          <div key={section.id}>
            <div className="label-tech mb-3 text-slate-600">
              <span className="text-primary">{section.id}</span>
              <span className="mx-1.5 text-slate-700">/</span>
              {section.label}
            </div>
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link mb-2 text-left w-full ${
                  item.highlight ? 'text-primary font-medium' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}

        {/* Version Badge */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2.5 text-slate-500">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="label-tech">SYSTEM ACTIVE</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
