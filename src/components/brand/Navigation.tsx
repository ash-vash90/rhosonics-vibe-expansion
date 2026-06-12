import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Zap, ChevronRight, ChevronDown } from "@/lib/icons";

import { RhosonicsLogo } from "../RhosonicsLogo";

interface NavItem {
  id: string;
  label: string;
}

interface NavSection {
  id: string;
  label: string;
  route: string;
  items: NavItem[];
}

/**
 * Canonical 10-chapter IA + Tools appendix.
 * Old routes redirect (see App.tsx); navigation only surfaces the new ones.
 */
const navSections: NavSection[] = [
  {
    id: "00", label: "INTRODUCTION", route: "/",
    items: [
      { id: "directory", label: "System Directory" },
      { id: "governance", label: "Governance & Owner" },
    ],
  },
  {
    id: "01", label: "BRAND POSITION", route: "/position",
    items: [
      { id: "positioning", label: "Position & Purpose" },
      { id: "principles", label: "Brand Principles" },
      { id: "mission", label: "Mission & Vision" },
      { id: "origin", label: "Origin" },
    ],
  },
  {
    id: "02", label: "VOICE & TONE", route: "/voice",
    items: [
      { id: "voice-principles", label: "Voice Principles" },
      { id: "lexicon", label: "Lexicon · Use / Avoid" },
      { id: "rewrites", label: "Before / After Rewrites" },
      { id: "funnel-rule", label: "Funnel Rule" },
    ],
  },
  {
    id: "03", label: "LOGO", route: "/logo",
    items: [
      { id: "logo-system", label: "Logo System" },
      { id: "downloads", label: "Logo Downloads" },
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
    id: "06", label: "ICONOGRAPHY", route: "/iconography",
    items: [
      { id: "ui-icons", label: "UI Icons" },
      { id: "pictograms", label: "Pictograms" },
    ],
  },
  {
    id: "07", label: "IMAGERY", route: "/imagery",
    items: [
      { id: "imagery", label: "Photography" },
      { id: "motion-design", label: "Motion" },
    ],
  },
  {
    id: "08", label: "DATA VISUALIZATION", route: "/data-viz",
    items: [
      { id: "principles", label: "Principles" },
      { id: "honesty", label: "Honesty Rules" },
    ],
  },
  {
    id: "09", label: "APPLICATIONS & PROOF", route: "/applications",
    items: [
      { id: "applications", label: "Industries" },
      { id: "sdm-interface", label: "SDM Eco Interface" },
      { id: "components", label: "Interface Kit" },
      { id: "proof", label: "Proof & Case Studies" },
    ],
  },
  {
    id: "10", label: "RESOURCES", route: "/resources",
    items: [
      { id: "downloads", label: "Downloads" },
      { id: "contacts", label: "Contacts" },
      { id: "changelog", label: "Changelog" },
    ],
  },
  {
    id: "AP", label: "TOOLS", route: "/tools",
    items: [
      { id: "photo-treatment", label: "Photo Treatment" },
      { id: "icon-picker", label: "Icon Library" },
      { id: "exports", label: "Design Tokens" },
      { id: "downloads", label: "Asset Downloads" },
    ],
  },
];

// Special-case: section 09's "Proof" item jumps to /proof, not /applications#proof
const PROOF_ITEM_ID = "proof";

// Map item IDs to their section's route
const itemRouteMap = new Map<string, string>();
navSections.forEach(s => s.items.forEach(item => itemRouteMap.set(item.id, s.route)));

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const mobileMenuRef = useRef<HTMLElement | null>(null);

  // Determine active section from current route
  const activeRoute = location.pathname;
  const activeSection = navSections.find(s =>
    s.route === activeRoute ||
    (s.id === "09" && activeRoute === "/proof"),
  );
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
    if (location.pathname === route) {
      if (anchor) {
        const el = document.getElementById(anchor);
        if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(route);
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

  const handleItemClick = useCallback((item: NavItem, sectionRoute: string) => {
    // Proof item in section 09 is its own page
    if (item.id === PROOF_ITEM_ID && sectionRoute === "/applications") {
      navigateTo("/proof");
      return;
    }
    navigateTo(sectionRoute, item.id);
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
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="p-4 sm:p-6 space-y-2 overflow-y-auto">
        {navSections.map((section) => {
          const isActiveSection = section.route === activeRoute ||
            (section.id === "09" && activeRoute === "/proof");
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
                      key={`${section.id}-${item.id}`}
                      onClick={() => handleItemClick(item, section.route)}
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

        {/* Version Badge */}
        <div className="pt-4">
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/50 rounded-md">
            <Zap className="w-4 h-4 text-primary" />
            <div>
              <span className="label-tech-sm text-slate-500 block">STATUS</span>
              <span className="text-sm text-slate-300 font-medium">System Active · ⌘K</span>
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
        className={`fixed inset-0 bg-rho-obsidian/60 z-40 xl:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile drawer */}
      <nav
        ref={mobileMenuRef}
        className={`
          fixed xl:hidden top-0 left-0 h-screen w-72 bg-rho-obsidian text-slate-100
          z-50 flex-shrink-0 overflow-y-auto nav-scroll
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {renderNavContent(true)}
      </nav>

      {/* Desktop sidebar */}
      <div className="hidden xl:block sticky top-0 h-screen w-72 z-20 flex-shrink-0">
        <nav className="h-full w-full bg-rho-obsidian text-slate-100 overflow-y-auto nav-scroll">
          {renderNavContent(false)}
        </nav>
      </div>

      {/* Top Header Bar - Mobile & Tablet */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-rho-obsidian border-b border-slate-800/80 flex items-center justify-between px-4 z-30 xl:hidden">
        <button
          onClick={() => navigateTo("/")}
          className="flex items-center gap-2 touch-manipulation"
        >
          <div className="w-4 h-4"><RhosonicsLogo variant="gradient" /></div>
          <span className="font-data text-xs text-slate-400 tracking-widest">BRAND SYSTEM</span>
        </button>
        <button
          className="p-2 text-slate-400 hover:text-primary transition-colors touch-manipulation"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Spacer for mobile/tablet header */}
      <div className="h-14 xl:hidden" />
    </>
  );
};

export default Navigation;
