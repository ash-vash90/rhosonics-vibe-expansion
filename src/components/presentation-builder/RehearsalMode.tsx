import { useState, useEffect, useCallback, useRef } from "react";
import { Presentation, Slide, SlideTimingData } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  RotateCcw,
  Clock,
  AlertCircle,
  CheckCircle,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RehearsalSummary } from "./RehearsalSummary";

interface RehearsalModeProps {
  presentation: Presentation;
  startSlideIndex?: number;
  onClose: () => void;
}

export function RehearsalMode({
  presentation,
  startSlideIndex = 0,
  onClose,
}: RehearsalModeProps) {
  const [currentIndex, setCurrentIndex] = useState(startSlideIndex);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [currentSlideTime, setCurrentSlideTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [timings, setTimings] = useState<Map<string, number>>(new Map());
  const [showSummary, setShowSummary] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const slideStartRef = useRef<number>(Date.now());

  const currentSlide = presentation.slides[currentIndex];
  const totalSlides = presentation.slides.length;

  // Timer tick
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      const now = Date.now();
      setTotalElapsed(Math.floor((now - startTimeRef.current) / 1000));
      setCurrentSlideTime(Math.floor((now - slideStartRef.current) / 1000));
    }, 100);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Pause/resume handling
  useEffect(() => {
    if (isTimerRunning) {
      // Adjust start times when resuming
      startTimeRef.current = Date.now() - totalElapsed * 1000;
      slideStartRef.current = Date.now() - currentSlideTime * 1000;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const recordSlideTime = useCallback(() => {
    const slideId = currentSlide?.id;
    if (!slideId) return;

    setTimings((prev) => {
      const newTimings = new Map(prev);
      const existingTime = newTimings.get(slideId) || 0;
      newTimings.set(slideId, existingTime + currentSlideTime);
      return newTimings;
    });
  }, [currentSlide?.id, currentSlideTime]);

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      recordSlideTime();
      setCurrentIndex((prev) => prev + 1);
      setCurrentSlideTime(0);
      slideStartRef.current = Date.now();
    } else {
      // End of presentation - show summary
      recordSlideTime();
      setIsTimerRunning(false);
      setShowSummary(true);
    }
  }, [currentIndex, totalSlides, recordSlideTime]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      recordSlideTime();
      setCurrentIndex((prev) => prev - 1);
      setCurrentSlideTime(0);
      slideStartRef.current = Date.now();
    }
  }, [currentIndex, recordSlideTime]);

  const handleReset = () => {
    setTotalElapsed(0);
    setCurrentSlideTime(0);
    setCurrentIndex(0);
    setTimings(new Map());
    startTimeRef.current = Date.now();
    slideStartRef.current = Date.now();
    setIsTimerRunning(true);
  };

  const handleEndRehearsal = () => {
    recordSlideTime();
    setIsTimerRunning(false);
    setShowSummary(true);
  };

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
          handleEndRehearsal();
          break;
        case "p":
        case "P":
          setIsTimerRunning((prev) => !prev);
          break;
        case "r":
        case "R":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleReset();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

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

  const textColor = isDark ? "text-white" : "text-slate-900";
  const mutedColor = isDark ? "text-white/70" : "text-slate-600";

  // Calculate timing status
  const targetDuration = currentSlide?.targetDuration;
  const isOverTime = targetDuration && currentSlideTime > targetDuration;
  const isNearTarget = targetDuration && currentSlideTime > targetDuration * 0.8 && !isOverTime;

  // Calculate averages
  const completedSlides = Array.from(timings.entries());
  const avgTime = completedSlides.length > 0
    ? Math.round(completedSlides.reduce((acc, [, time]) => acc + time, 0) / completedSlides.length)
    : 0;

  // Prepare summary data
  const slideTimingsData: SlideTimingData[] = presentation.slides.map((slide) => ({
    slideId: slide.id,
    duration: timings.get(slide.id) || 0,
  }));

  if (showSummary) {
    return (
      <RehearsalSummary
        presentation={presentation}
        totalDuration={totalElapsed}
        slideTimings={slideTimingsData}
        onClose={onClose}
        onPracticeAgain={handleReset}
      />
    );
  }

  if (!currentSlide) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-ui uppercase tracking-wider">
            Rehearsal Mode
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Total timer */}
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-data text-4xl font-bold tabular-nums">
              {formatTime(totalElapsed)}
            </span>
          </div>

          {/* Timer controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-white hover:bg-white/10"
            >
              {isTimerRunning ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isTimerRunning ? "Pause" : "Resume"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEndRehearsal}
            className="border-white/20 text-white hover:bg-white/10"
          >
            End Rehearsal
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEndRehearsal}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl"
          style={getBackgroundStyle(currentSlide)}
        >
          {currentSlide.background.overlay && currentSlide.background.overlay !== "none" && (
            <div className={cn(
              "absolute inset-0",
              currentSlide.background.overlay === "dark" && "bg-black/50",
              currentSlide.background.overlay === "light" && "bg-white/30"
            )} />
          )}
          
          <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-12">
            {currentSlide.blocks.map((block) => (
              <div key={block.id} className="w-full max-w-3xl mb-4">
                {block.type === "heading" && (
                  <h1 className={cn(
                    "font-logo font-bold text-4xl text-center",
                    textColor,
                    block.style?.alignment === "left" && "text-left",
                    block.style?.alignment === "right" && "text-right"
                  )}>
                    {block.content.text}
                  </h1>
                )}
                {block.type === "subheading" && (
                  <h2 className={cn("font-ui text-xl text-center", mutedColor)}>
                    {block.content.text}
                  </h2>
                )}
                {block.type === "paragraph" && (
                  <p className={cn("font-ui text-lg text-center leading-relaxed", mutedColor)}>
                    {block.content.text}
                  </p>
                )}
                {block.type === "bullet-list" && (
                  <ul className="space-y-2">
                    {block.content.items?.map((item, i) => (
                      <li key={i} className={cn("font-ui text-lg flex items-start gap-3", textColor)}>
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {block.type === "stat-card" && (
                  <div className={cn("text-center py-4", textColor)}>
                    <div className="font-data text-6xl font-bold text-primary">
                      {block.content.stat?.value}
                    </div>
                    <div className={cn("font-ui text-lg", mutedColor)}>
                      {block.content.stat?.label}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <footer className="border-t border-white/10 bg-slate-800/50">
        {/* Timing bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Current slide time */}
            <div className={cn(
              "flex items-center gap-2",
              isOverTime && "text-red-400",
              isNearTarget && !isOverTime && "text-amber-400"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-data text-xl tabular-nums">{formatTime(currentSlideTime)}</span>
              <span className="text-sm text-white/50">this slide</span>
            </div>

            {/* Target time */}
            {targetDuration && (
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-white/50" />
                <span className="font-data text-lg text-white/50">{formatTime(targetDuration)}</span>
                <span className="text-sm text-white/50">target</span>
                {isOverTime && <AlertCircle className="w-4 h-4 text-red-400" />}
                {!isOverTime && currentSlideTime > 0 && <CheckCircle className="w-4 h-4 text-green-400" />}
              </div>
            )}

            {/* Average */}
            {avgTime > 0 && (
              <div className="flex items-center gap-2 text-white/50">
                <span className="text-sm">Avg:</span>
                <span className="font-data">{formatTime(avgTime)}</span>
                <span className="text-sm">/slide</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-data text-lg">
              Slide {currentIndex + 1} of {totalSlides}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-6 py-3 flex items-center gap-1">
          {presentation.slides.map((slide, index) => {
            const time = timings.get(slide.id) || (index === currentIndex ? currentSlideTime : 0);
            const target = slide.targetDuration || 60;
            const widthPercent = Math.min((time / target) * 100, 150);
            const isOver = time > target;
            const isCurrent = index === currentIndex;

            return (
              <button
                key={slide.id}
                onClick={() => {
                  recordSlideTime();
                  setCurrentIndex(index);
                  setCurrentSlideTime(0);
                  slideStartRef.current = Date.now();
                }}
                className={cn(
                  "flex-1 h-8 rounded relative overflow-hidden transition-all",
                  isCurrent ? "bg-primary/30 ring-2 ring-primary" : "bg-white/10 hover:bg-white/20"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 transition-all",
                    isOver ? "bg-red-500/50" : "bg-primary/50"
                  )}
                  style={{ width: `${Math.min(widthPercent, 100)}%` }}
                />
                <span className="relative z-10 text-xs font-data text-white/70">
                  {index + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="px-6 py-3 flex items-center justify-between">
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
          </div>

          <div className="flex items-center gap-3 text-xs text-white/40 font-ui">
            <span>← → Navigate</span>
            <span>P: Pause/Resume</span>
            <span>Ctrl+R: Reset</span>
            <span>Esc: End</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={goToNext}
              className="bg-primary hover:bg-primary/90"
            >
              {currentIndex === totalSlides - 1 ? "Finish" : "Next"}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}