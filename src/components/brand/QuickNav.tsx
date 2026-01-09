import { useState, useEffect } from "react";

const chapters = [
  { id: "the-problem", num: "01", label: "Problem" },
  { id: "the-solution", num: "02", label: "Solution" },
  { id: "the-heritage", num: "03", label: "Heritage" },
  { id: "the-identity", num: "04", label: "Identity" },
  { id: "the-voice", num: "05", label: "Voice" },
  { id: "the-application", num: "06", label: "Application" },
  { id: "the-proof", num: "07", label: "Proof" },
  { id: "the-resources", num: "08", label: "Resources" },
];

export const QuickNav = () => {
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeChapter, setActiveChapter] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Only show after scrolling past hero
      if (currentScrollY < heroHeight) {
        setVisible(false);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Show on scroll up, hide on scroll down
      if (currentScrollY < lastScrollY - 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 10) {
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Track active chapter
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    chapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY]);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      aria-label="Quick navigation"
    >
      <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 md:gap-2 py-3 overflow-x-auto scrollbar-hide">
            {chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-all ${
                  activeChapter === chapter.id
                    ? "bg-primary text-white"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                }`}
              >
                <span className="font-data text-xs">{chapter.num}</span>
                <span className="font-ui hidden sm:inline">{chapter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default QuickNav;
