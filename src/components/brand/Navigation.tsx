import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { Menu, X, Zap, ChevronRight, Sun, Moon, Monitor } from "lucide-react";

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
  {
    id: "06",
    label: "ANALYSIS",
    items: [
      { id: "comparison", label: "Tech Comparison" },
      { id: "cases", label: "Case Studies", highlight: true },
      { id: "downloads", label: "Brand Assets" },
    ],
  },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-1 p-1 bg-slate-800/50 rounded-md">
        <div className="w-8 h-8" />
        <div className="w-8 h-8" />
        <div className="w-8 h-8" />
      </div>
    );
  }

  const themes = [
    { value: "light", icon: Sun, label: "Light mode" },
    { value: "dark", icon: Moon, label: "Dark mode" },
    { value: "system", icon: Monitor, label: "System preference" },
  ];

  return (
    <div className="flex gap-1 p-1 bg-slate-800/50 rounded-md" role="radiogroup" aria-label="Theme selection">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-2 rounded transition-all ${
            theme === value
              ? "bg-primary text-primary-foreground"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
          }`}
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    // Observe all section elements
    navSections.forEach((section) => {
      section.items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(id);
    }
  };

  return (
    <nav
      className="w-full lg:w-72 bg-rho-obsidian text-slate-100 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto flex-shrink-0 z-50"
      aria-label="Main navigation"
    >
      {/* Green accent bar */}
      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary hidden lg:block" aria-hidden="true" />

      {/* Header */}
      <div className="p-6 border-b border-slate-800/80 flex justify-between items-center">
        <button
          onClick={() => scrollToSection("intro")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          aria-label="Go to Brand Ethos section"
        >
          <div className="w-7 h-7">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="font-logo text-lg tracking-tight">Rhosonics</span>
        </button>
        <button
          className="lg:hidden text-slate-400 border border-slate-700 p-2 rounded-md hover:border-primary hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="nav-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        id="nav-menu"
        className={`p-6 space-y-6 overflow-y-auto ${isOpen ? "block" : "hidden lg:block"}`}
      >
        {navSections.map((section) => (
          <div key={section.id}>
            <div className="label-tech mb-3 text-slate-500">
              <span className="text-primary">{section.id}</span>
              <span className="mx-2 text-slate-700">/</span>
              {section.label}
            </div>
            {section.items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link mb-2 text-left w-full flex items-center justify-between group ${
                    item.highlight ? "text-primary font-medium" : ""
                  } ${isActive ? "nav-link-active" : ""}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`w-3 h-3 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        ))}

        {/* Theme Toggle */}
        <div className="pt-6 border-t border-slate-800">
          <span className="label-tech-sm text-slate-500 block mb-3">APPEARANCE</span>
          <ThemeToggle />
        </div>

        {/* Version Badge */}
        <div className="pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/50 rounded-md">
            <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
            <div>
              <span className="label-tech-sm text-slate-500 block">VERSION</span>
              <span className="text-sm text-slate-300 font-medium">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
