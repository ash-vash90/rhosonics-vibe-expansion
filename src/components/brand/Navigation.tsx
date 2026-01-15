import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, ChevronRight, ChevronDown } from "@/lib/icons";

interface NavSection {
  id: string;
  label: string;
  items: { id: string; label: string; highlight?: boolean }[];
}

const navSections: NavSection[] = [
  {
    id: "00",
    label: "ABOUT",
    items: [
      { id: "about", label: "About This System" },
    ],
  },
  {
    id: "01",
    label: "POSITIONING",
    items: [
      { id: "positioning", label: "Brand Positioning" },
    ],
  },
  {
    id: "02",
    label: "PRINCIPLES",
    items: [
      { id: "principles", label: "Brand Principles" },
    ],
  },
  {
    id: "03",
    label: "VISUAL SYSTEM",
    items: [
      { id: "visual-system", label: "System Structure" },
    ],
  },
  {
    id: "04",
    label: "COLOR",
    items: [
      { id: "colors", label: "Color System" },
    ],
  },
  {
    id: "05",
    label: "TYPOGRAPHY",
    items: [
      { id: "typography", label: "Typography" },
    ],
  },
  {
    id: "06",
    label: "LOGO & ASSETS",
    items: [
      { id: "logo-assets", label: "Logo System" },
      { id: "icon-guidelines", label: "Icon Guidelines" },
    ],
  },
  {
    id: "07",
    label: "VOICE & TONE",
    items: [
      { id: "voice", label: "Voice & Tone" },
    ],
  },
  {
    id: "08",
    label: "IMAGERY & MOTION",
    items: [
      { id: "imagery", label: "Imagery Guidelines" },
      { id: "motion-design", label: "Motion Design" },
    ],
  },
  {
    id: "09",
    label: "APPLICATIONS",
    items: [
      { id: "applications", label: "Industry Applications" },
    ],
  },
  {
    id: "10",
    label: "PROOF & EXAMPLES",
    items: [
      { id: "proof", label: "Evidence & Data" },
      { id: "case-studies-page", label: "Full Case Studies →", highlight: true },
    ],
  },
];

// Get all item IDs for scroll spy
const allItemIds = navSections.flatMap(section => section.items.map(item => item.id));

// Find which section contains a given item ID
const getSectionForItem = (itemId: string): string | null => {
  const section = navSections.find(s => s.items.some(item => item.id === itemId));
  return section?.id || null;
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["00"]);
  const [activeSection, setActiveSection] = useState<string | null>("about");
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll spy effect
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          
          const sectionId = getSectionForItem(id);
          if (sectionId && !expandedSections.includes(sectionId)) {
            setExpandedSections(prev => [...prev, sectionId]);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    allItemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [expandedSections]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsOpen(false);
    }
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <>
      {/* Mobile/Tablet Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Navigation Sidebar - Desktop only */}
      <nav 
        ref={menuRef}
        className={`
          fixed xl:sticky top-0 left-0 h-screen w-72 bg-rho-obsidian text-slate-100 
          z-50 flex-shrink-0 overflow-y-auto
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
        `}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('about')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="font-data text-xs text-slate-500 tracking-widest">BRAND SYSTEM</span>
          </button>
          <button
            className="xl:hidden text-slate-400 border border-slate-700 p-2 rounded-md hover:border-primary hover:text-primary transition-colors touch-manipulation"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links - Collapsible sections */}
        <div className="p-4 sm:p-6 space-y-2 overflow-y-auto">
          {navSections.map((section) => {
            const sectionHasActive = section.items.some(item => item.id === activeSection);
            return (
            <div key={section.id} className="border-b border-slate-800/50 last:border-b-0">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between py-2.5 text-left hover:text-primary transition-colors group ${
                  sectionHasActive ? 'text-primary' : ''
                }`}
              >
                <div className={`label-tech transition-colors ${
                  sectionHasActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
                }`}>
                  <span className="text-primary">{section.id}</span>
                  <span className="mx-2 text-slate-600">/</span>
                  {section.label}
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                    expandedSections.includes(section.id) ? "rotate-180" : ""
                  }`} 
                />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${
                expandedSections.includes(section.id) ? "max-h-96 pb-2" : "max-h-0"
              }`}>
                {section.items.map((item) => {
                  const isActive = activeSection === item.id;
                  
                  // Special handling for page links
                  if (item.id === 'case-studies-page') {
                    return (
                      <Link
                        key={item.id}
                        to="/case-studies"
                        className="nav-link mb-1 text-left w-full flex items-center justify-between group min-h-[40px] pl-4 touch-manipulation transition-colors text-primary/70 font-medium hover:text-primary hover:bg-primary/10"
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="w-3 h-3 opacity-100" />
                      </Link>
                    );
                  }
                  
                  return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link mb-1 text-left w-full flex items-center justify-between group min-h-[40px] pl-4 touch-manipulation transition-colors ${
                      isActive 
                        ? 'text-primary bg-primary/10 border-l-2 border-primary' 
                        : item.highlight 
                          ? 'text-primary/70 font-medium hover:text-primary' 
                          : 'hover:text-primary'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-3 h-3 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`} />
                  </button>
                  );
                })}
              </div>
            </div>
            );
          })}

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

      {/* Top Header Bar - Mobile & Tablet */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-rho-obsidian/95 backdrop-blur-sm border-b border-slate-800/80 flex items-center justify-between px-4 z-30 xl:hidden">
        <button 
          onClick={() => scrollToSection('about')}
          className="flex items-center gap-2 touch-manipulation"
        >
          <span className="font-data text-xs text-slate-400 tracking-widest">BRAND SYSTEM</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-slate-400 hover:text-primary transition-colors touch-manipulation"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>


      {/* Spacer for mobile/tablet header */}
      <div className="h-14 xl:hidden" />
    </>
  );
};

export default Navigation;
