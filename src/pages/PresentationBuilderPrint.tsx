import React, { useEffect, useState, useRef } from "react";
import { Presentation, Slide, Block } from "@/types/presentation";
import { cn } from "@/lib/utils";

export default function PresentationBuilderPrint() {
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasAutoPrinted = useRef(false);

  useEffect(() => {
    // Try sessionStorage first, then localStorage
    let data = sessionStorage.getItem("presentation-print-data");
    if (!data) {
      data = localStorage.getItem("presentation-builder-draft");
    }

    if (data) {
      try {
        const parsed = JSON.parse(data);
        setPresentation(parsed);
      } catch (e) {
        setError("Failed to parse presentation data");
      }
    } else {
      setError("No presentation data found");
    }
  }, []);

  useEffect(() => {
    if (presentation && !hasAutoPrinted.current) {
      hasAutoPrinted.current = true;

      // Wait for render, then print
      const timer = setTimeout(() => {
        window.print();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [presentation]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-800 mb-2">Error</h1>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getSlideBackgroundStyle = (slide: Slide): React.CSSProperties => {
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
    return { backgroundColor: "white" };
  };

  const renderBlock = (block: Block, isDark: boolean) => {
    const textColor = isDark ? "text-white" : "text-slate-800";
    const mutedColor = isDark ? "text-white/70" : "text-slate-600";

    switch (block.type) {
      case "heading":
        return (
          <h1 className={cn("font-logo text-4xl font-bold", textColor)}>
            {block.content.text}
          </h1>
        );
      case "subheading":
        return (
          <h2 className={cn("font-logo text-2xl font-semibold", textColor)}>
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
          <ul className={cn("space-y-2", mutedColor)}>
            {block.content.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 font-ui text-lg">
                <span className="w-2 h-2 rounded-full bg-rho-green mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        );
      case "stat-card":
        return (
          <div className="inline-flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10">
            <span className="font-data text-4xl font-bold text-rho-green">
              {block.content.stat?.value}
            </span>
            <span className={cn("font-ui text-sm uppercase tracking-wider mt-2", mutedColor)}>
              {block.content.stat?.label}
            </span>
          </div>
        );
      case "stat-grid":
        return (
          <div className="grid grid-cols-3 gap-4">
            {block.content.stats?.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10">
                <span className="font-data text-2xl font-bold text-rho-green">{stat.value}</span>
                <span className={cn("font-ui text-xs uppercase tracking-wider mt-1", mutedColor)}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        );
      case "image":
        return block.content.imageUrl ? (
          <img
            src={block.content.imageUrl}
            alt={block.content.imageAlt || ""}
            className="max-w-full h-auto rounded-xl"
          />
        ) : null;
      case "quote":
        return (
          <div className="pl-6 border-l-4 border-rho-green">
            <p className={cn("font-logo text-xl italic mb-3", textColor)}>
              "{block.content.quote?.text}"
            </p>
            <p className={mutedColor}>
              — {block.content.quote?.author}
              {block.content.quote?.role && `, ${block.content.quote.role}`}
            </p>
          </div>
        );
      case "divider":
        return <hr className={isDark ? "border-white/20" : "border-slate-200"} />;
      case "cta":
        return (
          <div className="text-center py-8">
            <p className={cn("font-logo text-2xl font-semibold mb-4", textColor)}>
              {block.content.cta?.text}
            </p>
            <span className="inline-block px-8 py-3 bg-rho-green text-white font-ui font-medium rounded-lg">
              {block.content.cta?.buttonLabel}
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @page {
          size: landscape;
          margin: 0;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          .slide-page {
            page-break-after: always;
            page-break-inside: avoid;
          }
          .slide-page:last-child {
            page-break-after: auto;
          }
        }
      `}</style>

      <div className="print-container">
        {presentation.slides.map((slide, slideIndex) => {
          const isDark = slide.background.value?.includes("225") || 
                        slide.background.value?.includes("10%") ||
                        slide.background.type === "image";

          return (
            <div
              key={slide.id}
              className="slide-page w-screen h-screen relative"
              style={getSlideBackgroundStyle(slide)}
            >
              {/* Overlay for images */}
              {slide.background.overlay && slide.background.overlay !== "none" && (
                <div className={cn(
                  "absolute inset-0",
                  slide.background.overlay === "dark" && "bg-black/50",
                  slide.background.overlay === "light" && "bg-white/30"
                )} />
              )}

              {/* Content */}
              <div className="relative z-10 h-full p-16 flex flex-col gap-8">
                {slide.blocks.map((block) => (
                  <div key={block.id}>
                    {renderBlock(block, isDark)}
                  </div>
                ))}
              </div>

              {/* Slide number */}
              <div className={cn(
                "absolute bottom-4 right-6 font-data text-sm",
                isDark ? "text-white/40" : "text-slate-400"
              )}>
                {slideIndex + 1} / {presentation.slides.length}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
