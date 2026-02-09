import { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  /** Single source image - treatment will be applied in real-time */
  sourceImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  imageAlt?: string;
  className?: string;
  /** Saturation multiplier (0.85 = -15%, 1 = unchanged) */
  saturation?: number;
  /** Contrast boost (1 = normal, 1.2 = 20% increase) */
  contrast?: number;
  /** Brightness adjustment */
  brightness?: number;
}

const BeforeAfterSlider = ({
  sourceImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  imageAlt = "Image comparison",
  className = "",
  saturation = 0.88,
  contrast = 1.2,
  brightness = 0.94,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // CSS filter string for the "after" treatment
  const treatmentFilter = `saturate(${saturation}) contrast(${contrast}) brightness(${brightness})`;

  // Auto-hide hint after delay if no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  // Hide hint on first interaction
  useEffect(() => {
    if (hasInteracted) {
      setShowHint(false);
    }
  }, [hasInteracted]);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasInteracted(true);
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video rounded-lg overflow-hidden select-none cursor-ew-resize border border-border touch-manipulation ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="slider"
      aria-label="Before and after image comparison slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          setSliderPosition((prev) => Math.max(0, prev - 5));
          setHasInteracted(true);
        } else if (e.key === "ArrowRight") {
          setSliderPosition((prev) => Math.min(100, prev + 5));
          setHasInteracted(true);
        }
      }}
    >
      {/* AFTER: Treated Image (Full width, with CSS filters applied) */}
      <div className="absolute inset-0">
        <img
          src={sourceImage}
          alt={`${imageAlt} - with brand treatment`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: treatmentFilter }}
          draggable={false}
        />
        {/* Green accent overlay - brand color grade via soft light blending */}
        <div 
          className="absolute inset-0 mix-blend-soft-light pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse at 30% 60%, hsl(var(--primary) / 0.28) 0%, transparent 55%), radial-gradient(ellipse at 70% 40%, hsl(var(--primary) / 0.20) 0%, transparent 45%)"
          }}
        />
        {/* Cool tone overlay */}
        <div 
          className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-25"
          style={{ 
            background: "linear-gradient(180deg, hsl(210 30% 20% / 0.3) 0%, hsl(190 25% 15% / 0.2) 100%)"
          }}
        />
        {/* Cinematic vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            background: "radial-gradient(ellipse at center, transparent 50%, hsl(220 30% 8% / 0.35) 100%)"
          }}
        />
      </div>

      {/* BEFORE: Original Image (Clipped, no filters) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={sourceImage}
          alt={`${imageAlt} - original`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Slider Handle */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-10 md:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform ${
            isDragging ? "scale-110" : "hover:scale-105"
          } ${showHint && !hasInteracted ? "animate-pulse" : ""}`}
        >
          <div className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3 text-slate-700 -mr-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <svg
              className="w-3 h-3 text-slate-700 -ml-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div
        className="absolute top-3 left-3 px-3 py-1 bg-warning-surface border border-warning-border rounded text-xs font-data text-warning transition-opacity"
        style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
      >
        {beforeLabel}
      </div>
      <div
        className="absolute top-3 right-3 px-3 py-1 bg-success-surface border border-success-border rounded text-xs font-data text-success transition-opacity"
        style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
      >
        {afterLabel}
      </div>

      {/* Filter specs indicator */}
      <div 
        className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[10px] font-data text-white/80 transition-opacity"
        style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
      >
        SAT {saturation > 1 ? "+" : ""}{Math.round((saturation - 1) * 100)}% · CON +{Math.round((contrast - 1) * 100)}%
      </div>

      {/* Animated Touch Hint Overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500 ${
          showHint && !hasInteracted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Swipe animation indicator */}
        <div className="relative">
          {/* Animated hand/swipe icon */}
          <div className="flex flex-col items-center gap-3">
            {/* Swipe gesture animation */}
            <div className="relative w-24 h-8 flex items-center justify-center">
              {/* Left arrow trail */}
              <div className="absolute left-0 w-4 h-4 rounded-full bg-white/40 animate-[ping_2s_ease-in-out_infinite]" 
                style={{ animationDelay: "0.5s" }} 
              />
              
              {/* Animated finger/touch indicator */}
              <div 
                className="absolute w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center"
                style={{
                  animation: "swipeHint 2s ease-in-out infinite"
                }}
              >
                <svg 
                  className="w-4 h-4 text-slate-600" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <circle cx="12" cy="12" r="5" />
                </svg>
              </div>
              
              {/* Right arrow trail */}
              <div className="absolute right-0 w-4 h-4 rounded-full bg-white/40 animate-[ping_2s_ease-in-out_infinite]" 
                style={{ animationDelay: "1s" }} 
              />
            </div>
            
            {/* Text hint */}
            <div className="px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-ui flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span>Drag to compare</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for swipe animation */}
      <style>{`
        @keyframes swipeHint {
          0%, 100% {
            transform: translateX(-24px);
            opacity: 0.7;
          }
          50% {
            transform: translateX(24px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default BeforeAfterSlider;
