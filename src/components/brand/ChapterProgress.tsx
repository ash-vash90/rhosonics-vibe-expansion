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

export const ChapterProgress = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = chapters.findIndex((c) => c.id === entry.target.id);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    chapters.forEach((chapter) => {
      const el = document.getElementById(chapter.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
      role="navigation"
      aria-label="Chapter progress"
    >
      <div className="absolute right-[5px] top-2 bottom-2 w-px bg-slate-300" />
      
      {chapters.map((chapter, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;
        const isHovered = hoveredIndex === index;
        
        return (
          <button
            key={chapter.id}
            onClick={() => scrollToChapter(chapter.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex items-center gap-3 group"
            aria-label={`Go to ${chapter.label}`}
            aria-current={isActive ? "step" : undefined}
          >
            <span
              className={`font-ui text-sm whitespace-nowrap transition-all duration-200 ${
                isHovered || isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              } ${isActive ? "text-primary font-medium" : "text-slate-500"}`}
            >
              {chapter.label}
            </span>
            
            <span
              className={`relative z-10 rounded-full transition-all duration-200 ${
                isActive
                  ? "w-3 h-3 bg-primary shadow-glow-sm"
                  : isPast
                  ? "w-2.5 h-2.5 bg-primary/50"
                  : "w-2 h-2 bg-slate-300 group-hover:bg-slate-400"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ChapterProgress;