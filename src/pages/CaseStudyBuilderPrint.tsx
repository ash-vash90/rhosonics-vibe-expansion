import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, Printer, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentBase, Page, Block } from "@/types/document";
import { cn } from "@/lib/utils";
import { BrandChart } from "@/components/tools/BrandChart";

type PrintStatus = "preparing" | "ready" | "printing" | "done" | "error";

const STORAGE_KEY = "case-study-builder-draft";

const CaseStudyBuilderPrint = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<PrintStatus>("preparing");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  
  const hasAutoPrintedRef = useRef<boolean>(false);
  const hasPreparedRef = useRef<boolean>(false);
  
  const [document, setDocument] = useState<DocumentBase | null>(null);
  
  useEffect(() => {
    // Try sessionStorage first (set by print flow), then localStorage (draft)
    const savedFromSession = sessionStorage.getItem("case-study-print-data");
    const savedFromLocal = savedFromSession ? null : localStorage.getItem(STORAGE_KEY);
    const saved = savedFromSession ?? savedFromLocal;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDocument(parsed);
        // Clean up sessionStorage if used
        if (savedFromSession) sessionStorage.removeItem("case-study-print-data");
      } catch {
        setStatus("error");
        setErrorMessage("Failed to load case study data");
      }
    } else {
      setStatus("error");
      setErrorMessage("No case study data found");
    }
  }, []);

  async function waitForReadiness(): Promise<void> {
    try {
      // Wait for fonts
      await Promise.race([
        window.document.fonts.ready,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Font timeout")), 5000))
      ]);
      
      // Wait for all images
      const images = Array.from(window.document.querySelectorAll("img"));
      await Promise.all(
        images.map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.onerror = () => resolve();
                setTimeout(resolve, 10000);
              })
        )
      );
      
      // Force layout reflow
      window.document.body.offsetHeight;
      
      // Double rAF for paint flush
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });
      
      // Additional delay for chart rendering
      await new Promise<void>((resolve) => setTimeout(resolve, 500));
      
      // Check for overflow
      const pages = window.document.querySelectorAll(".print-page");
      pages.forEach((page) => {
        const el = page as HTMLElement;
        if (el.scrollHeight > el.offsetHeight + 10) {
          setHasOverflow(true);
        }
      });
      
      setStatus("ready");
    } catch (e) {
      console.error("Readiness error:", e);
      setStatus("ready");
    }
  }
  
  // Run readiness check when document loads
  useEffect(() => {
    if (!document) return;
    if (hasPreparedRef.current) return;
    hasPreparedRef.current = true;
    void waitForReadiness();
  }, [document]);
  
  // Auto-print on ready
  useEffect(() => {
    if (status !== "ready") return;
    if (hasAutoPrintedRef.current) return;
    
    const shouldAutoPrint = searchParams.get("autoprint") === "1";
    if (!shouldAutoPrint) return;
    
    hasAutoPrintedRef.current = true;
    
    const handleBeforePrint = () => setStatus("printing");
    const handleAfterPrint = () => setStatus("done");
    
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    
    const timer = setTimeout(() => {
      window.print();
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [status, searchParams]);

  // Render individual block for print (static, no editing)
  const renderBlock = (block: Block, isDark: boolean) => {
    const textColor = isDark ? "text-white" : "text-slate-800";
    const mutedColor = isDark ? "text-white/70" : "text-slate-600";

    switch (block.type) {
      case "heading":
      case "subheading":
        return (
          <h1 className={cn(
            block.type === "heading" ? "font-logo text-3xl font-bold" : "font-logo text-xl font-semibold",
            textColor
          )}>
            {block.content.text || "Heading"}
          </h1>
        );
        
      case "paragraph":
        return (
          <p className={cn("font-ui text-base leading-relaxed whitespace-pre-wrap", mutedColor)}>
            {block.content.text || "Paragraph text"}
          </p>
        );
        
      case "bullet-list":
        return (
          <ul className={cn("space-y-1", mutedColor)}>
            {(block.content.items || []).filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-2 font-ui text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rho-green mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        );
        
      case "stat-card":
        return (
          <div className="inline-flex flex-col items-center p-4 rounded-lg bg-rho-green/10 border border-rho-green/20">
            <span className="font-data text-3xl font-bold text-rho-green">
              {block.content.stat?.value || "—"}
            </span>
            <span className={cn("font-ui text-xs uppercase tracking-wider mt-1", mutedColor)}>
              {block.content.stat?.label || "Metric"}
            </span>
          </div>
        );
        
      case "stat-grid":
        return (
          <div className="grid grid-cols-3 gap-3">
            {(block.content.stats || []).map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-3 rounded-lg bg-rho-green/10 border border-rho-green/20">
                <span className="font-data text-xl font-bold text-rho-green">{stat.value}</span>
                <span className={cn("font-ui text-xs uppercase tracking-wider mt-1", mutedColor)}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        );
        
      case "image":
        return block.content.imageUrl ? (
          <div className="w-full">
            <img
              src={block.content.imageUrl}
              alt={block.content.imageAlt || ""}
              className="max-w-full h-auto rounded-lg"
            />
            {block.content.caption && (
              <p className={cn("mt-2 text-sm text-center", mutedColor)}>
                {block.content.caption}
              </p>
            )}
          </div>
        ) : null;
        
      case "chart":
        if (!block.content.chart) return null;
        const chart = block.content.chart;
        const chartBg = chart.background || "dark";
        const chartTypeMap: Record<string, string> = {
          "bar": "bar",
          "line": "line",
          "area": "area",
          "grouped-bar": "grouped-bar",
          "pie": "pie",
          "donut": "pie",
          "gauge": "pie",
          "timeseries": "line",
          "timeseries-comparison": "line",
        };
        return (
          <div className={cn(
            "rounded-lg p-4",
            chartBg === "dark" ? "bg-slate-900" : "bg-white border border-slate-200"
          )}>
            {chart.title && (
              <h3 className={cn(
                "font-logo text-lg font-semibold mb-4",
                chartBg === "dark" ? "text-white" : "text-slate-800"
              )}>
                {chart.title}
              </h3>
            )}
            <div className="h-48">
              <BrandChart
                chartType={chartTypeMap[chart.type] || "bar"}
                data={chart.data.map((d) => ({
                  name: d.label || d.timestamp || "",
                  value: d.value,
                  value2: d.value2,
                  value3: d.value3,
                }))}
                colors={{
                  primary: chart.colors?.primary || "#4ade80",
                  secondary: chart.colors?.secondary || "#60a5fa",
                  tertiary: chart.colors?.tertiary || "#f97316",
                }}
                xAxisLabel={chart.xAxisLabel}
                yAxisLabel={chart.yAxisLabel}
                isLightBg={chartBg === "light"}
                height={192}
              />
            </div>
          </div>
        );
        
      case "spec-table":
        return (
          <table className="w-full text-sm">
            <tbody>
              {(block.content.specs || []).map((spec, i) => (
                <tr key={i} className={cn(
                  "border-b",
                  isDark ? "border-white/10" : "border-slate-200"
                )}>
                  <td className={cn("py-2 pr-4 font-ui font-medium", textColor)}>
                    {spec.label}
                  </td>
                  <td className={cn("py-2 font-data", mutedColor)}>
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
        
      case "quote":
        return (
          <div className="pl-4 border-l-4 border-rho-green">
            <p className={cn("font-logo text-lg italic mb-2", textColor)}>
              "{block.content.quote?.text || "Quote text"}"
            </p>
            <p className={mutedColor}>
              — {block.content.quote?.author || "Author"}
              {block.content.quote?.role && `, ${block.content.quote.role}`}
            </p>
          </div>
        );
        
      case "callout":
        return (
          <div className={cn(
            "p-4 rounded-lg border-l-4",
            block.content.callout?.type === "info" && "bg-blue-50 border-blue-500",
            block.content.callout?.type === "warning" && "bg-amber-50 border-amber-500",
            block.content.callout?.type === "success" && "bg-green-50 border-green-500",
            block.content.callout?.type === "error" && "bg-red-50 border-red-500"
          )}>
            {block.content.callout?.title && (
              <h4 className="font-ui font-semibold text-slate-800 mb-1">
                {block.content.callout.title}
              </h4>
            )}
            <p className="font-ui text-sm text-slate-700">
              {block.content.callout?.text || "Callout text"}
            </p>
          </div>
        );
        
      case "divider":
        return (
          <hr className={cn(
            "my-4",
            isDark ? "border-white/20" : "border-slate-200"
          )} />
        );
        
      case "cta":
        return (
          <div className="text-center py-6">
            <p className={cn("font-logo text-xl font-semibold mb-4", textColor)}>
              {block.content.cta?.text || "Ready to get started?"}
            </p>
            <span className="inline-block px-6 py-2 bg-rho-green text-white font-ui font-medium rounded-lg">
              {block.content.cta?.buttonLabel || "Contact Us"}
            </span>
          </div>
        );

      // Case study specific blocks
      case "identity-card":
        return (
          <div className={cn(
            "grid grid-cols-2 gap-4 p-4 rounded-lg",
            isDark ? "bg-white/5" : "bg-slate-50"
          )}>
            <div>
              <span className={cn("font-ui text-xs uppercase tracking-wider", mutedColor)}>Company</span>
              <p className={cn("font-logo font-semibold", textColor)}>{block.content.identity?.company || "—"}</p>
            </div>
            <div>
              <span className={cn("font-ui text-xs uppercase tracking-wider", mutedColor)}>Location</span>
              <p className={cn("font-logo font-semibold", textColor)}>{block.content.identity?.location || "—"}</p>
            </div>
            <div>
              <span className={cn("font-ui text-xs uppercase tracking-wider", mutedColor)}>Industry</span>
              <p className={cn("font-logo font-semibold", textColor)}>{block.content.identity?.industry || "—"}</p>
            </div>
            <div>
              <span className={cn("font-ui text-xs uppercase tracking-wider", mutedColor)}>Product</span>
              <p className={cn("font-logo font-semibold", textColor)}>{block.content.identity?.product || "—"}</p>
            </div>
          </div>
        );
        
      case "challenge-solution":
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className={cn("p-4 rounded-lg", isDark ? "bg-red-500/10" : "bg-red-50")}>
              <h3 className={cn("font-logo text-lg font-semibold mb-2", isDark ? "text-red-300" : "text-red-700")}>
                The Challenge
              </h3>
              <p className={cn("font-ui text-sm leading-relaxed", isDark ? "text-red-200" : "text-red-600")}>
                {block.content.challengeSolution?.challenge || "Challenge description"}
              </p>
            </div>
            <div className={cn("p-4 rounded-lg", isDark ? "bg-green-500/10" : "bg-green-50")}>
              <h3 className={cn("font-logo text-lg font-semibold mb-2", isDark ? "text-green-300" : "text-green-700")}>
                The Solution
              </h3>
              <p className={cn("font-ui text-sm leading-relaxed", isDark ? "text-green-200" : "text-green-600")}>
                {block.content.challengeSolution?.solution || "Solution description"}
              </p>
            </div>
          </div>
        );
        
      case "results-grid":
        return (
          <div className="space-y-2">
            {(block.content.resultsGrid?.results || []).filter(Boolean).map((result, i) => (
              <div key={i} className={cn(
                "flex items-center gap-3 p-3 rounded-lg",
                isDark ? "bg-white/5" : "bg-slate-50"
              )}>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rho-green flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </span>
                <span className={cn("font-ui text-sm", textColor)}>{result}</span>
              </div>
            ))}
          </div>
        );
        
      default:
        return (
          <div className={cn(
            "p-4 border rounded-lg",
            isDark ? "border-white/20 text-white/60" : "border-slate-200 text-slate-500"
          )}>
            {block.type} block
          </div>
        );
    }
  };

  // Render a page
  const renderPage = (page: Page, pageIndex: number, totalPages: number) => {
    const isDark = page.background?.type === "solid" 
      ? page.background.value.includes("10%") || page.background.value.includes("20%") || page.background.value.includes("225")
      : page.background?.type === "gradient" && page.background.value.includes("225");

    const getBackgroundStyle = (): React.CSSProperties => {
      if (!page.background) return { backgroundColor: "white" };
      
      if (page.background.type === "solid") {
        return { backgroundColor: page.background.value };
      }
      if (page.background.type === "gradient") {
        return { background: page.background.value };
      }
      if (page.background.type === "image") {
        return { 
          backgroundImage: `url(${page.background.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      }
      return { backgroundColor: "white" };
    };

    return (
      <div
        key={page.id}
        className="print-page relative bg-white"
        style={{
          width: "210mm",
          height: "297mm",
          pageBreakAfter: pageIndex < totalPages - 1 ? "always" : "auto",
          pageBreakInside: "avoid",
          ...getBackgroundStyle(),
        }}
      >
        {/* Overlay for images */}
        {page.background?.overlay && page.background.overlay !== "none" && (
          <div className={cn(
            "absolute inset-0",
            page.background.overlay === "dark" && "bg-black/50",
            page.background.overlay === "light" && "bg-white/30"
          )} />
        )}

        {/* Content */}
        <div className="relative z-10 h-full p-12 flex flex-col gap-4 overflow-hidden">
          {page.blocks.map((block) => (
            <div key={block.id}>
              {renderBlock(block, isDark)}
            </div>
          ))}
        </div>

        {/* Page number */}
        <div className={cn(
          "absolute bottom-4 right-6 font-data text-xs",
          isDark ? "text-white/40" : "text-slate-400"
        )}>
          {pageIndex + 1} / {totalPages}
        </div>

        {/* Rhosonics branding */}
        <div className="absolute bottom-4 left-6">
          <div className={cn(
            "flex items-center gap-2 font-logo text-xs",
            isDark ? "text-white/40" : "text-slate-400"
          )}>
            <span className="font-semibold">Rhosonics</span>
            <span>•</span>
            <span>Analytical B.V.</span>
          </div>
        </div>
      </div>
    );
  };
  
  if (!document && status !== "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">Error</h1>
          <p className="text-muted-foreground mb-4">{errorMessage}</p>
          <Link to="/library">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print-specific styles */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-page {
            page-break-after: always;
            page-break-inside: avoid;
          }
          .print-page:last-child {
            page-break-after: auto;
          }
          .print-toolbar {
            display: none !important;
          }
          .print-container {
            padding: 0 !important;
            background: white !important;
          }
        }
      `}</style>

      <div className="print-mode bg-slate-200 min-h-screen">
        {/* Print toolbar - hidden when printing */}
        <div className="print-toolbar fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/library">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              {status === "preparing" && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Preparing document...</span>
                </>
              )}
              {status === "ready" && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary">Ready to print</span>
                </>
              )}
              {status === "printing" && (
                <>
                  <Printer className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm text-primary">Printing...</span>
                </>
              )}
              {status === "done" && (
                <span className="text-sm text-muted-foreground">Print dialog closed. You can close this tab.</span>
              )}
            </div>
            {hasOverflow && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Content may be clipped</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              {document?.pages.length || 0} page{(document?.pages.length || 0) !== 1 ? "s" : ""} • Best results: Chrome or Edge
            </span>
            <Button 
              size="sm" 
              onClick={() => window.print()}
              disabled={status === "preparing"}
              className="gap-2"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </Button>
          </div>
        </div>
        
        {/* Document pages - with top padding for toolbar */}
        <div className="print-container pt-16 flex flex-col items-center gap-8 pb-8">
          {document?.pages.map((page, index) => 
            renderPage(page, index, document.pages.length)
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudyBuilderPrint;
