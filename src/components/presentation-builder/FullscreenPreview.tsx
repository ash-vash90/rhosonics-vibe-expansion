import { useState, useEffect, useCallback } from "react";
import { Presentation, Slide, Block, SlideTransition } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface FullscreenPreviewProps {
  presentation: Presentation;
  startSlideIndex?: number;
  onClose: () => void;
}

// Get transition style based on type and state
const getTransitionStyle = (
  transition: SlideTransition,
  isExiting: boolean,
  direction: "next" | "prev"
): React.CSSProperties => {
  const baseTransition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
  
  if (transition === "none") {
    return { transition: "none" };
  }

  if (transition === "fade") {
    return {
      transition: baseTransition,
      opacity: isExiting ? 0 : 1,
    };
  }

  if (transition === "slide") {
    return {
      transition: baseTransition,
      opacity: isExiting ? 0 : 1,
      transform: isExiting 
        ? `translateX(${direction === "next" ? "-100%" : "100%"})` 
        : "translateX(0)",
    };
  }

  if (transition === "zoom") {
    return {
      transition: baseTransition,
      opacity: isExiting ? 0 : 1,
      transform: isExiting ? "scale(0.8)" : "scale(1)",
    };
  }

  if (transition === "flip") {
    return {
      transition: baseTransition,
      opacity: isExiting ? 0 : 1,
      transform: isExiting 
        ? `perspective(1000px) rotateY(${direction === "next" ? "-90deg" : "90deg"})` 
        : "perspective(1000px) rotateY(0)",
    };
  }

  return { transition: baseTransition, opacity: isExiting ? 0 : 1 };
};

export function FullscreenPreview({
  presentation,
  startSlideIndex = 0,
  onClose,
}: FullscreenPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(startSlideIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev">("next");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const currentSlide = presentation.slides[currentIndex];
  const totalSlides = presentation.slides.length;
  const currentTransition = currentSlide?.transition || "fade";

  // Hide controls after inactivity
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1 && !isTransitioning) {
      setTransitionDirection("next");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 500);
    } else if (currentIndex === totalSlides - 1) {
      setIsAutoPlaying(false);
    }
  }, [currentIndex, totalSlides, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setTransitionDirection("prev");
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentIndex, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          e.preventDefault();
          goToNext();
          break;
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "Escape":
          onClose();
          break;
        case "Home":
          setCurrentIndex(0);
          break;
        case "End":
          setCurrentIndex(totalSlides - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, onClose, totalSlides]);

  const getBackgroundStyle = (slide: Slide): React.CSSProperties => {
    if (slide.background.type === "solid") {
      return { backgroundColor: slide.background.value };
    }
    if (slide.background.type === "gradient") {
      return { background: slide.background.value };
    }
    if (slide.background.type === "image") {
      return {
        backgroundImage: `url(${slide.background.value})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {};
  };

  const isDark = currentSlide?.background.type === "solid"
    ? currentSlide.background.value.includes("10%") || currentSlide.background.value.includes("20%") || currentSlide.background.value.includes("225")
    : currentSlide?.background.type === "gradient" && currentSlide.background.value.includes("225");

  const renderBlockContent = (block: Block) => {
    const textColor = isDark ? "text-white" : "text-slate-900";
    const mutedColor = isDark ? "text-white/70" : "text-slate-600";

    switch (block.type) {
      case "heading":
        return (
          <h1 className={cn(
            "font-logo font-bold leading-tight",
            block.content.level === 1 ? "text-5xl" : block.content.level === 2 ? "text-3xl" : "text-2xl",
            textColor,
            block.style?.alignment === "center" && "text-center",
            block.style?.alignment === "right" && "text-right"
          )}>
            {block.content.text}
          </h1>
        );
      case "subheading":
        return (
          <h2 className={cn(
            "font-ui text-2xl",
            mutedColor,
            block.style?.alignment === "center" && "text-center",
            block.style?.alignment === "right" && "text-right"
          )}>
            {block.content.text}
          </h2>
        );
      case "paragraph":
        return (
          <p className={cn("font-ui text-lg leading-relaxed", mutedColor)}>
            {block.content.text}
          </p>
        );
      case "bullet-list":
        return (
          <ul className="space-y-3">
            {block.content.items?.map((item, i) => (
              <li key={i} className={cn("font-ui text-lg flex items-start gap-3", textColor)}>
                <span className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        );
      case "stat-card":
        return (
          <div className={cn("text-center py-8", textColor)}>
            <div className="font-data text-7xl font-bold text-primary mb-2">
              {block.content.stat?.value}
            </div>
            <div className={cn("font-ui text-xl", mutedColor)}>
              {block.content.stat?.label}
            </div>
          </div>
        );
      case "stat-grid":
        return (
          <div className="grid grid-cols-3 gap-8">
            {block.content.stats?.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-data text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className={cn("font-ui text-lg", mutedColor)}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        );
      case "image":
        return block.content.imageUrl ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={block.content.imageUrl}
              alt={block.content.imageAlt || ""}
              className="max-h-[60vh] object-contain rounded-lg"
            />
            {block.content.caption && (
              <p className={cn("font-ui text-sm", mutedColor)}>{block.content.caption}</p>
            )}
          </div>
        ) : null;
      case "quote":
        return (
          <blockquote className="border-l-4 border-primary pl-6 py-4">
            <p className={cn("font-ui text-2xl italic mb-4", textColor)}>
              "{block.content.quote?.text}"
            </p>
            <footer className={cn("font-ui", mutedColor)}>
              <span className="font-semibold">{block.content.quote?.author}</span>
              {block.content.quote?.role && (
                <span className="text-sm"> — {block.content.quote.role}</span>
              )}
            </footer>
          </blockquote>
        );
      case "callout":
        const calloutColors = {
          info: "bg-blue-500/10 border-blue-500",
          warning: "bg-amber-500/10 border-amber-500",
          success: "bg-green-500/10 border-green-500",
          error: "bg-red-500/10 border-red-500",
        };
        return (
          <div className={cn(
            "p-6 rounded-lg border-l-4",
            calloutColors[block.content.callout?.type || "info"]
          )}>
            {block.content.callout?.title && (
              <h4 className={cn("font-ui font-semibold text-lg mb-2", textColor)}>
                {block.content.callout.title}
              </h4>
            )}
            <p className={cn("font-ui", mutedColor)}>{block.content.callout?.text}</p>
          </div>
        );
      case "spec-table":
        return (
          <div className="w-full max-w-2xl mx-auto">
            <table className="w-full">
              <tbody>
                {block.content.specs?.map((spec, i) => (
                  <tr key={i} className={cn(
                    "border-b",
                    isDark ? "border-white/10" : "border-slate-200"
                  )}>
                    <td className={cn("py-3 pr-8 font-ui font-medium", mutedColor)}>
                      {spec.label}
                    </td>
                    <td className={cn("py-3 font-data text-right", textColor)}>
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "divider":
        return (
          <div className="py-4">
            <div className={cn(
              "h-px w-full",
              isDark ? "bg-white/20" : "bg-slate-200"
            )} />
          </div>
        );
      case "cta":
        return (
          <div className="text-center py-8">
            <p className={cn("font-ui text-xl mb-6", textColor)}>
              {block.content.cta?.text}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-8 py-3 bg-primary text-white font-ui font-medium rounded-lg">
                {block.content.cta?.buttonLabel}
              </button>
              {block.content.cta?.secondaryButtonLabel && (
                <button className={cn(
                  "px-8 py-3 font-ui font-medium rounded-lg border",
                  isDark ? "border-white/20 text-white" : "border-slate-300 text-slate-700"
                )}>
                  {block.content.cta.secondaryButtonLabel}
                </button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!currentSlide) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      {/* Slide */}
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          ...getBackgroundStyle(currentSlide),
          ...getTransitionStyle(currentTransition, isTransitioning, transitionDirection),
        }}
      >
        {/* Overlay */}
        {currentSlide.background.overlay && currentSlide.background.overlay !== "none" && (
          <div className={cn(
            "absolute inset-0",
            currentSlide.background.overlay === "dark" && "bg-black/50",
            currentSlide.background.overlay === "light" && "bg-white/30"
          )} />
        )}

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl px-16 py-12">
          <div className="flex flex-col gap-8">
            {currentSlide.blocks.map((block) => (
              <div key={block.id}>{renderBlockContent(block)}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls - fade in/out */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="pointer-events-auto absolute top-6 right-6 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="pointer-events-auto absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
        )}
        {currentIndex < totalSlides - 1 && (
          <button
            onClick={goToNext}
            className="pointer-events-auto absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        )}

        {/* Bottom bar */}
        <div className="pointer-events-auto absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            {/* Progress */}
            <div className="flex items-center gap-4">
              <span className="font-data text-white text-lg">
                {currentIndex + 1} / {totalSlides}
              </span>
              <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
                />
              </div>
            </div>

            {/* Auto-play toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="font-ui text-sm">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="font-ui text-sm">Auto-play</span>
                </>
              )}
            </button>

            {/* Keyboard hints */}
            <div className="flex items-center gap-4 text-white/50 text-sm font-ui">
              <span>← → Navigate</span>
              <span>Space: Next</span>
              <span>Esc: Exit</span>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="pointer-events-auto absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {presentation.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}