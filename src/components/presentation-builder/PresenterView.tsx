import { useState, useEffect, useCallback } from "react";
import { Presentation, Slide } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  RotateCcw,
  Clock,
  FileText,
  EyeOff,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PresenterViewProps {
  presentation: Presentation;
  startSlideIndex?: number;
  onClose: () => void;
  onSlideChange?: (index: number) => void;
  isInWindow?: boolean;
}

export function PresenterView({
  presentation,
  startSlideIndex = 0,
  onClose,
  onSlideChange,
  isInWindow = false,
}: PresenterViewProps) {
  const [currentIndex, setCurrentIndex] = useState(startSlideIndex);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showNotes, setShowNotes] = useState(true);

  const currentSlide = presentation.slides[currentIndex];
  const nextSlide = presentation.slides[currentIndex + 1];
  const totalSlides = presentation.slides.length;

  // Timer
  useEffect(() => {
    if (!isTimerRunning) return;
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
    }
  }, [currentIndex, totalSlides, onSlideChange]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onSlideChange?.(newIndex);
    }
  }, [currentIndex, onSlideChange]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    onSlideChange?.(index);
  }, [onSlideChange]);

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
        case "t":
        case "T":
          setIsTimerRunning((prev) => !prev);
          break;
        case "r":
        case "R":
          setElapsedTime(0);
          break;
        case "n":
        case "N":
          setShowNotes((prev) => !prev);
          break;
        case "Home":
          goToSlide(0);
          break;
        case "End":
          goToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, goToSlide, onClose, totalSlides]);

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

  const isDark = (slide: Slide) => {
    return slide.background.type === "solid"
      ? slide.background.value.includes("10%") || slide.background.value.includes("20%") || slide.background.value.includes("225")
      : slide.background.type === "gradient" && slide.background.value.includes("225");
  };

  const renderSlidePreview = (slide: Slide, size: "large" | "small") => {
    const dark = isDark(slide);
    const textColor = dark ? "text-white" : "text-slate-900";
    const mutedColor = dark ? "text-white/70" : "text-slate-600";
    const scale = size === "large" ? "scale-[0.5]" : "scale-[0.35]";

    return (
      <div
        className={cn(
          "relative rounded-lg overflow-hidden border border-white/10",
          size === "large" ? "aspect-video" : "aspect-video"
        )}
        style={getBackgroundStyle(slide)}
      >
        {slide.background.overlay && slide.background.overlay !== "none" && (
          <div className={cn(
            "absolute inset-0",
            slide.background.overlay === "dark" && "bg-black/50",
            slide.background.overlay === "light" && "bg-white/30"
          )} />
        )}
        <div className={cn("absolute inset-0 flex flex-col justify-center items-center p-4 origin-center", scale)}>
          {slide.blocks.slice(0, 3).map((block) => (
            <div key={block.id} className="w-full max-w-2xl mb-2">
              {block.type === "heading" && (
                <h1 className={cn("font-logo font-bold text-2xl text-center truncate", textColor)}>
                  {block.content.text}
                </h1>
              )}
              {block.type === "subheading" && (
                <h2 className={cn("font-ui text-lg text-center truncate", mutedColor)}>
                  {block.content.text}
                </h2>
              )}
              {block.type === "paragraph" && (
                <p className={cn("font-ui text-sm text-center line-clamp-2", mutedColor)}>
                  {block.content.text}
                </p>
              )}
              {block.type === "stat-card" && (
                <div className={cn("text-center", textColor)}>
                  <div className="font-data text-4xl font-bold text-primary">
                    {block.content.stat?.value}
                  </div>
                  <div className={cn("font-ui text-sm", mutedColor)}>
                    {block.content.stat?.label}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const wordCount = currentSlide?.notes?.split(/\s+/).filter(Boolean).length || 0;
  const readingTime = Math.ceil(wordCount / 150); // ~150 words per minute for speaking

  if (!currentSlide) return null;

  return (
    <div className={cn(
      "bg-slate-900 text-white overflow-hidden flex flex-col",
      isInWindow ? "min-h-screen" : "fixed inset-0 z-[100]"
    )}>
      {/* Header */}
      <header className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-slate-800/50 flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-data text-3xl font-bold tabular-nums">
              {formatTime(elapsedTime)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-white hover:bg-white/10"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setElapsedTime(0)}
              className="text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-ui text-sm text-white/60">
            {presentation.name}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className="text-white hover:bg-white/10"
          >
            {showNotes ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            Notes
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Current slide */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="text-xs text-white/50 font-ui mb-2 uppercase tracking-wider">
            Current Slide
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              {renderSlidePreview(currentSlide, "large")}
            </div>
          </div>
        </div>

        {/* Right: Next slide + Notes */}
        <div className={cn(
          "w-96 border-l border-white/10 flex flex-col bg-slate-800/30",
          !showNotes && "w-80"
        )}>
          {/* Next slide preview */}
          <div className="p-4 border-b border-white/10">
            <div className="text-xs text-white/50 font-ui mb-2 uppercase tracking-wider">
              Next Slide
            </div>
            {nextSlide ? (
              <button 
                onClick={goToNext}
                className="w-full hover:ring-2 ring-primary rounded-lg transition-all"
              >
                {renderSlidePreview(nextSlide, "small")}
              </button>
            ) : (
              <div className="aspect-video rounded-lg bg-slate-700/50 flex items-center justify-center">
                <span className="font-ui text-sm text-white/40">End of presentation</span>
              </div>
            )}
          </div>

          {/* Speaker notes */}
          {showNotes && (
            <div className="flex-1 p-4 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs text-white/50 font-ui uppercase tracking-wider">
                  <FileText className="w-3 h-3" />
                  Speaker Notes
                </div>
                {wordCount > 0 && (
                  <span className="text-xs text-white/40 font-ui">
                    {wordCount} words · ~{readingTime} min
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-y-auto">
                {currentSlide.notes ? (
                  <p className="font-ui text-lg leading-relaxed text-white/90 whitespace-pre-wrap">
                    {currentSlide.notes}
                  </p>
                ) : (
                  <p className="font-ui text-sm text-white/30 italic">
                    No speaker notes for this slide
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer navigation */}
      <footer className="h-16 border-t border-white/10 flex items-center justify-between px-6 bg-slate-800/50 flex-shrink-0">
        {/* Slide counter */}
        <div className="flex items-center gap-4">
          <span className="font-data text-lg">
            {currentIndex + 1} / {totalSlides}
          </span>
          <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <Button
            size="sm"
            onClick={goToNext}
            disabled={currentIndex === totalSlides - 1}
            className="bg-primary hover:bg-primary/90"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Keyboard hints */}
        <div className="flex items-center gap-3 text-xs text-white/40 font-ui">
          <span>← → Navigate</span>
          <span>T: Timer</span>
          <span>R: Reset</span>
          <span>N: Notes</span>
          <span>Esc: Exit</span>
        </div>
      </footer>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {presentation.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all",
              index === currentIndex
                ? "w-6 bg-primary"
                : "bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}