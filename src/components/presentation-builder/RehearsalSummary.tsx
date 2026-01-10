import { Presentation, SlideTimingData } from "@/types/presentation";
import { cn } from "@/lib/utils";
import { 
  Clock, 
  RotateCcw, 
  X,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RehearsalSummaryProps {
  presentation: Presentation;
  totalDuration: number;
  slideTimings: SlideTimingData[];
  onClose: () => void;
  onPracticeAgain: () => void;
}

export function RehearsalSummary({
  presentation,
  totalDuration,
  slideTimings,
  onClose,
  onPracticeAgain,
}: RehearsalSummaryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };


  // Calculate statistics
  const avgTimePerSlide = slideTimings.length > 0
    ? Math.round(slideTimings.reduce((acc, t) => acc + t.duration, 0) / slideTimings.length)
    : 0;

  const maxTime = Math.max(...slideTimings.map((t) => t.duration));
  const minTime = Math.min(...slideTimings.filter((t) => t.duration > 0).map((t) => t.duration));

  // Find slides over/under target
  const slidesOverTarget = slideTimings.filter((t) => {
    const slide = presentation.slides.find((s) => s.id === t.slideId);
    return slide?.targetDuration && t.duration > slide.targetDuration;
  });

  const slidesUnderTarget = slideTimings.filter((t) => {
    const slide = presentation.slides.find((s) => s.id === t.slideId);
    return slide?.targetDuration && t.duration < slide.targetDuration * 0.5;
  });

  // Find the slowest and fastest slides
  const slowestSlideIndex = slideTimings.findIndex((t) => t.duration === maxTime);
  const fastestSlideIndex = slideTimings.findIndex((t) => t.duration === minTime);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 text-white overflow-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-logo text-3xl font-bold mb-2">Rehearsal Complete</h1>
            <p className="text-white/60 font-ui">{presentation.name}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Main stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="font-data text-4xl font-bold text-primary mb-1">
              {formatTime(totalDuration)}
            </div>
            <div className="text-sm text-white/60 font-ui">Total Duration</div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 text-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
              <span className="font-data text-lg text-primary">{slideTimings.length}</span>
            </div>
            <div className="font-data text-4xl font-bold mb-1">
              {formatTime(avgTimePerSlide)}
            </div>
            <div className="text-sm text-white/60 font-ui">Avg. per Slide</div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 text-center">
            {slidesOverTarget.length > 0 ? (
              <>
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <div className="font-data text-4xl font-bold text-amber-400 mb-1">
                  {slidesOverTarget.length}
                </div>
                <div className="text-sm text-white/60 font-ui">Slides Over Target</div>
              </>
            ) : (
              <>
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <div className="font-data text-4xl font-bold text-green-400 mb-1">
                  ✓
                </div>
                <div className="text-sm text-white/60 font-ui">On Track</div>
              </>
            )}
          </div>
        </div>

        {/* Timing breakdown */}
        <div className="mb-12">
          <h2 className="font-ui font-semibold text-lg mb-4">Slide Timing Breakdown</h2>
          <div className="space-y-3">
            {slideTimings.map((timing, index) => {
              const slide = presentation.slides.find((s) => s.id === timing.slideId);
              const target = slide?.targetDuration;
              const isOver = target && timing.duration > target;
              const isUnder = target && timing.duration < target * 0.5;
              const percentOfMax = maxTime > 0 ? (timing.duration / maxTime) * 100 : 0;
              
              // Get slide title
              const titleBlock = slide?.blocks.find((b) => b.type === "heading" || b.type === "subheading");
              const slideTitle = titleBlock?.content.text || `Slide ${index + 1}`;

              return (
                <div
                  key={timing.slideId}
                  className={cn(
                    "relative bg-white/5 rounded-lg p-4 overflow-hidden",
                    isOver && "ring-1 ring-amber-400/50",
                    index === slowestSlideIndex && "ring-1 ring-red-400/50"
                  )}
                >
                  {/* Progress bar background */}
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 opacity-20",
                      isOver ? "bg-amber-500" : "bg-primary"
                    )}
                    style={{ width: `${percentOfMax}%` }}
                  />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-data text-sm text-white/50 w-8">
                        #{index + 1}
                      </span>
                      <span className="font-ui text-sm truncate max-w-xs">
                        {slideTitle}
                      </span>
                      {index === slowestSlideIndex && timing.duration > 0 && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded text-xs font-ui">
                          Slowest
                        </span>
                      )}
                      {index === fastestSlideIndex && timing.duration > 0 && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-ui">
                          Fastest
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {target && (
                        <div className="flex items-center gap-2 text-sm">
                          {isOver ? (
                            <TrendingUp className="w-4 h-4 text-amber-400" />
                          ) : isUnder ? (
                            <TrendingDown className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Minus className="w-4 h-4 text-green-400" />
                          )}
                          <span className="text-white/50">
                            target: {formatTime(target)}
                          </span>
                        </div>
                      )}
                      <span className={cn(
                        "font-data text-lg tabular-nums",
                        isOver ? "text-amber-400" : "text-white"
                      )}>
                        {formatTime(timing.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        {(slidesOverTarget.length > 0 || slidesUnderTarget.length > 0) && (
          <div className="mb-12">
            <h2 className="font-ui font-semibold text-lg mb-4">Insights</h2>
            <div className="space-y-3">
              {slidesOverTarget.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-ui text-sm text-amber-200">
                      <strong>{slidesOverTarget.length} slide{slidesOverTarget.length !== 1 ? "s" : ""}</strong> exceeded the target duration. 
                      Consider condensing content or practicing these sections more.
                    </p>
                  </div>
                </div>
              )}
              {slidesUnderTarget.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-ui text-sm text-blue-200">
                      <strong>{slidesUnderTarget.length} slide{slidesUnderTarget.length !== 1 ? "s" : ""}</strong> were much shorter than expected. 
                      You might want to add more detail or slow down.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onPracticeAgain}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice Again
          </Button>
          <Button
            size="lg"
            onClick={onClose}
            className="bg-primary hover:bg-primary/90"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}