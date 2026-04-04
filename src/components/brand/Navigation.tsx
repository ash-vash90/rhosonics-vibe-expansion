import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Zap, ChevronRight, ChevronDown } from "@/lib/icons";
import { useFontMode } from "@/hooks/useFontMode";
import { RhosonicsLogo } from "../RhosonicsLogo";

interface NavItem {
  id: string;
  label: string;
  highlight?: boolean;
}

interface NavSection {
  id: string;
  label: string;
  route: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    id: "00", label: "ABOUT", route: "/about",
    items: [
      { id: "about", label: "About This System" },
      { id: "design-process", label: "Design Process" },
    ],
  },
  {
    id: "01", label: "POSITIONING", route: "/positioning",
    items: [{ id: "positioning", label: "Brand Positioning" }],
  },
  {
    id: "02", label: "PRINCIPLES", route: "/principles",
    items: [{ id: "principles", label: "Brand Principles" }],
  },
  {
    id: "03", label: "VISUAL SYSTEM", route: "/visual-system",
    items: [
      { id: "visual-system", label: "System Structure" },
      { id: "elevation", label: "Elevation & Depth" },
    ],
  },
  {
    id: "04", label: "COLOR", route: "/color",
    items: [{ id: "colors", label: "Color System" }],
  },
  {
    id: "05", label: "TYPOGRAPHY", route: "/typography",
    items: [
      { id: "typography", label: "Type Scale & Roles" },
      { id: "typography-constraints", label: "Constraints" },
      { id: "spacing", label: "Spacing System" },
    ],
  },
  {
    id: "06", label: "LOGO & ASSETS", route: "/logo-assets",
    items: [
      { id: "logo-assets", label: "Logo System" },
      { id: "icon-guidelines", label: "Icon Guidelines" },
    ],
  },
  {
    id: "07", label: "VOICE & TONE", route: "/voice",
    items: [{ id: "voice", label: "Voice & Tone" }],
  },
  {
    id: "08", label: "IMAGERY & MOTION", route: "/imagery",
    items: [
      { id: "imagery", label: "Imagery Guidelines" },
      { id: "motion-design", label: "Motion Design" },
    ],
  },
  {
    id: "09", label: "APPLICATIONS", route: "/applications",
    items: [
      { id: "applications", label: "Industry Applications" },
      { id: "sdm-interface", label: "SDM Eco Interface" },
      { id: "components", label: "Interface Kit" },
      { id: "empty-states", label: "Empty States" },
    ],
  },
  {
    id: "10", label: "PROOF & EXAMPLES", route: "/proof",
    items: [{ id: "proof", label: "Evidence & Data" }],
  },
];

// Map item IDs to their section's route
const itemRouteMap = new Map<string, string>();
navSections.forEach(s => s.items.forEach(item => itemRouteMap.set(item.id, s.route)));

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logoFont, bodyFont, setLogoFont, setBodyFont } = useFontMode();

  const mobileMenuRef = useRef<HTMLElement | null>(null);

  // Determine active section from current route
  const activeRoute = location.pathname === "/" ? "/about" : location.pathname;
  const activeSection = navSections.find(s => s.route === activeRoute);
  const expandedSectionIds = activeSection ? [activeSection.id] : [];

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
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

  const navigateTo = useCallback((route: string, anchor?: string) => {
    setIsOpen(false);
    if (location.pathname === route || (location.pathname === "/" && route === "/about")) {
      // Same page — just scroll
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(route);
      // After navigation, scroll to anchor if specified
      if (anchor) {
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        window.scrollTo({ top: 0 });
      }
    }
  }, [location.pathname, navigate]);

  const handleItemClick = useCallback((item: NavItem) => {
    const route = itemRouteMap.get(item.id) || "/about";
    navigateTo(route, item.id);
  }, [navigateTo]);

  const renderNavContent = (isMobile: boolean) => (
    <>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-800/80 flex justify-between items-center">
        <button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-4 h-4"><RhosonicsLogo variant="gradient" /></div>
          <span className="font-data text-xs text-slate-500 tracking-widest">BRAND SYSTEM</span>
        </button>
        {isMobile && (
          <button
            className="text-slate-400 border border-slate-700 p-2 rounded-md hover:border-primary hover:text-primary transition-colors touch-manipulation"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="p-4 sm:p-6 space-y-2 overflow-y-auto">
        {navSections.map((section) => {
          const isActiveSection = section.route === activeRoute;
          const isExpanded = expandedSectionIds.includes(section.id);

          return (
            <div key={section.id} className="border-b border-slate-800/50 last:border-b-0">
              <button
                onClick={() => navigateTo(section.route)}
                className={`w-full flex items-center justify-between py-2.5 text-left hover:text-primary transition-colors group ${
                  isActiveSection ? 'text-primary' : ''
                }`}
              >
                <div className={`label-tech transition-colors ${
                  isActiveSection ? 'text-primary' : 'text-slate-400 group-hover:text-primary'
                }`}>
                  <span className="text-primary">{section.id}</span>
                  <span className="mx-2 text-slate-600">/</span>
                  {section.label}
                </div>
                {section.items.length > 1 && (
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
              {section.items.length > 1 && (
                <div className={`overflow-hidden transition-all duration-200 ${
                  isExpanded ? "max-h-96 pb-2" : "max-h-0"
                }`}>
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`nav-link mb-1 text-left w-full flex items-center justify-between group min-h-[40px] pl-4 touch-manipulation transition-colors ${
                        isActiveSection
                          ? 'text-primary/80 hover:text-primary'
                          : 'hover:text-primary'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Font Selectors */}
        <div className="pt-3 space-y-3 border-t border-slate-800/50">
          <div className="flex items-center gap-2">
            <span className="font-data text-[10px] uppercase tracking-wider text-slate-500 w-10">Logo</span>
            <select
              value={logoFont}
              onChange={(e) => setLogoFont(e.target.value as "unbounded" | "primetime")}
              className="flex-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-data uppercase tracking-wider rounded-md px-2 py-1.5 cursor-pointer hover:border-slate-500 transition-colors focus:outline-none focus:border-primary"
            >
              <option value="unbounded">Unbounded</option>
              <option value="primetime">Primetime</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-data text-[10px] uppercase tracking-wider text-slate-500 w-10">Body</span>
            <select
              value={bodyFont}
              onChange={(e) => setBodyFont(e.target.value as "instrument" | "worksans")}
              className="flex-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-data uppercase tracking-wider rounded-md px-2 py-1.5 cursor-pointer hover:border-slate-500 transition-colors focus:outline-none focus:border-primary"
            >
              <option value="instrument">Instrument Sans</option>
              <option value="worksans">Work Sans</option>
            </select>
          </div>
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
    </>
  );

  return (
    <>
      {/* Mobile/Tablet Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer */}
      <nav
        ref={mobileMenuRef}
        className={`
          fixed xl:hidden top-0 left-0 h-screen w-72 bg-rho-obsidian text-slate-100 
          z-50 flex-shrink-0 overflow-y-auto
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {renderNavContent(true)}
      </nav>

      {/* Desktop sidebar */}
      <div className="hidden xl:block sticky top-0 h-screen w-72 z-20 flex-shrink-0">
        <nav className="h-full w-full bg-rho-obsidian text-slate-100 overflow-y-auto">
          {renderNavContent(false)}
        </nav>
      </div>

      {/* Top Header Bar - Mobile & Tablet */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-rho-obsidian/95 backdrop-blur-sm border-b border-slate-800/80 flex items-center justify-between px-4 z-30 xl:hidden">
        <button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 touch-manipulation"
        >
          <div className="w-4 h-4"><RhosonicsLogo variant="gradient" /></div>
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
