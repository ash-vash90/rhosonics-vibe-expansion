import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, Printer, AlertTriangle, ArrowLeft, CheckCircle2, Quote, Phone, Mail, Globe, MapPin, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentBase, Page, Block } from "@/types/document";
import { cn } from "@/lib/utils";
import { BrandChart } from "@/components/tools/BrandChart";
import { AnimatedLogo } from "@/components/AnimatedLogo";

type PrintStatus = "preparing" | "ready" | "printing" | "done" | "error";

const STORAGE_KEY = "case-study-builder-draft";

// Block types that should go in specific columns
const LEFT_COLUMN_BLOCKS = ["challenge-solution"];
const RIGHT_COLUMN_BLOCKS = ["stat-card", "spec-table"];
const FULL_WIDTH_BLOCKS = ["hero-image", "identity-card", "results-grid", "quote", "cta", "chart", "image"];

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

  // Get company name and identity info from document
  const getCompanyName = (): string => {
    if (!document) return "";
    for (const page of document.pages) {
      for (const block of page.blocks) {
        if (block.type === "identity-card" && block.content.identity?.company) {
          return block.content.identity.company;
        }
        if (block.type === "hero-image" && block.content.heroImage?.title) {
          return block.content.heroImage.title;
        }
      }
    }
    return "";
  };

  // Render individual block for print (static, no editing)
  const renderBlock = (block: Block) => {
    switch (block.type) {
      case "heading":
      case "subheading":
        return (
          <h1 className={cn(
            block.type === "heading" ? "font-logo text-3xl font-bold" : "font-logo text-xl font-semibold",
            "text-slate-800"
          )}>
            {block.content.text || "Heading"}
          </h1>
        );
        
      case "paragraph":
        return (
          <p className="font-ui text-base leading-relaxed whitespace-pre-wrap text-slate-600">
            {block.content.text || "Paragraph text"}
          </p>
        );
        
      case "bullet-list":
        return (
          <ul className="space-y-1 text-slate-600">
            {(block.content.items || []).filter(Boolean).map((item, i) => (
              <li key={i} className="flex items-start gap-2 font-ui text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rho-green mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        );
        
      case "hero-image":
        return (
          <div className="relative w-full">
            {block.content.heroImage?.imageUrl ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img
                  src={block.content.heroImage.imageUrl}
                  alt={block.content.heroImage?.title || "Hero"}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                <span className="text-slate-400 font-ui text-sm">Hero Image</span>
              </div>
            )}
            {/* Company name and location below image */}
            <div className="mt-4">
              <h2 className="font-logo text-2xl font-bold text-slate-900">
                {block.content.heroImage?.title || "Company Name"}
              </h2>
              {block.content.heroImage?.subtitle && (
                <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="font-ui text-sm">{block.content.heroImage.subtitle}</span>
                </div>
              )}
            </div>
          </div>
        );

      case "identity-card":
        return (
          <div className="grid grid-cols-4 gap-4 py-3 border-y border-slate-200">
            <div>
              <span className="font-data text-[10px] uppercase tracking-wider text-slate-400">Company</span>
              <p className="font-ui text-sm font-medium text-slate-800">{block.content.identity?.company || "—"}</p>
            </div>
            <div>
              <span className="font-data text-[10px] uppercase tracking-wider text-slate-400">Location</span>
              <p className="font-ui text-sm font-medium text-slate-800">{block.content.identity?.location || "—"}</p>
            </div>
            <div>
              <span className="font-data text-[10px] uppercase tracking-wider text-slate-400">Industry</span>
              <p className="font-ui text-sm font-medium text-slate-800">{block.content.identity?.industry || "—"}</p>
            </div>
            <div>
              <span className="font-data text-[10px] uppercase tracking-wider text-slate-400">Product</span>
              <p className="font-ui text-sm font-medium text-slate-800">{block.content.identity?.product || "—"}</p>
            </div>
          </div>
        );

      case "stat-card":
        return (
          <div className="flex flex-col items-center justify-center p-6 rounded-lg bg-rho-green/10 border border-rho-green/20">
            <span className="font-data text-4xl font-bold text-rho-green">
              {block.content.stat?.value || "—"}
            </span>
            <span className="font-data text-xs uppercase tracking-wider mt-2 text-slate-600 text-center">
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
                <span className="font-ui text-xs uppercase tracking-wider mt-1 text-slate-600">
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
              <p className="mt-2 text-sm text-center text-slate-600">
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
          <div className="rounded-lg border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b border-slate-200">
              <Settings2 className="w-4 h-4 text-slate-500" />
              <span className="font-data text-xs uppercase tracking-wider text-slate-600">
                Specifications
              </span>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {(block.content.specs || []).map((spec, i) => (
                  <tr key={i} className={cn(
                    i % 2 === 0 ? "bg-white" : "bg-slate-50"
                  )}>
                    <td className="py-2 px-4 font-ui text-slate-600">
                      {spec.label}
                    </td>
                    <td className="py-2 px-4 font-data text-slate-800 text-right">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      case "quote":
        const initials = block.content.quote?.author
          ? block.content.quote.author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
          : "??";
        return (
          <div className="p-6 rounded-lg bg-rho-green/5 border border-rho-green/10">
            <Quote className="w-8 h-8 text-rho-green/40 mb-3" />
            <p className="font-logo text-lg italic text-slate-700 leading-relaxed mb-4">
              "{block.content.quote?.text || "Quote text"}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rho-green/20 flex items-center justify-center">
                <span className="font-logo text-sm font-bold text-rho-green">{initials}</span>
              </div>
              <div>
                <p className="font-ui text-sm font-medium text-slate-800">
                  {block.content.quote?.author || "Author"}
                </p>
                {block.content.quote?.role && (
                  <p className="font-ui text-xs text-slate-500">{block.content.quote.role}</p>
                )}
              </div>
            </div>
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
        return <hr className="my-4 border-slate-200" />;
        
      case "cta":
        return (
          <div className="grid grid-cols-2 gap-8 py-6 border-t border-slate-200">
            <div>
              <h3 className="font-logo text-xl font-bold text-slate-900 mb-2">
                {block.content.cta?.text || "Ready to optimize your process?"}
              </h3>
              <p className="font-ui text-sm text-slate-600">
                Contact our team to discuss how Rhosonics can help improve your operations.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rho-green/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-rho-green" />
                </div>
                <span className="font-ui text-sm text-slate-700">+31 (0)78 684 6466</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rho-green/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-rho-green" />
                </div>
                <span className="font-ui text-sm text-slate-700">info@rhosonics.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rho-green/10 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-rho-green" />
                </div>
                <span className="font-ui text-sm text-slate-700">www.rhosonics.com</span>
              </div>
            </div>
          </div>
        );

      case "challenge-solution":
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-data text-xs uppercase tracking-wider text-slate-500 mb-2">
                The Challenge
              </h3>
              <p className="font-ui text-sm leading-relaxed text-slate-700">
                {block.content.challengeSolution?.challenge || "Challenge description"}
              </p>
            </div>
            <div>
              <h3 className="font-data text-xs uppercase tracking-wider text-rho-green mb-2">
                Our Solution
              </h3>
              <p className="font-ui text-sm leading-relaxed text-slate-700">
                {block.content.challengeSolution?.solution || "Solution description"}
              </p>
            </div>
          </div>
        );
        
      case "results-grid":
        const results = block.content.resultsGrid?.results || [];
        const midpoint = Math.ceil(results.length / 2);
        const leftResults = results.slice(0, midpoint);
        const rightResults = results.slice(midpoint);
        
        return (
          <div className="space-y-4">
            <h3 className="font-data text-xs uppercase tracking-wider text-slate-500">
              Key Results
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                {leftResults.filter(Boolean).map((result, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rho-green flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="font-ui text-sm text-slate-700 leading-relaxed">{result}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {rightResults.filter(Boolean).map((result, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rho-green flex items-center justify-center text-white text-xs font-bold">
                      {midpoint + i + 1}
                    </span>
                    <span className="font-ui text-sm text-slate-700 leading-relaxed">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="p-4 border rounded-lg border-slate-200 text-slate-500">
            {block.type} block
          </div>
        );
    }
  };

  // Render page with branded layout
  const renderPage = (page: Page, pageIndex: number, totalPages: number) => {
    const companyName = getCompanyName();
    const headerTitle = pageIndex === 0 
      ? "CASE STUDY" 
      : companyName 
        ? `${companyName.toUpperCase()} — RESULTS` 
        : "CASE STUDY";

    // Separate blocks into layout groups
    const fullWidthBlocks: Block[] = [];
    const leftColumnBlocks: Block[] = [];
    const rightColumnBlocks: Block[] = [];

    page.blocks.forEach((block) => {
      if (FULL_WIDTH_BLOCKS.includes(block.type)) {
        fullWidthBlocks.push(block);
      } else if (LEFT_COLUMN_BLOCKS.includes(block.type)) {
        leftColumnBlocks.push(block);
      } else if (RIGHT_COLUMN_BLOCKS.includes(block.type)) {
        rightColumnBlocks.push(block);
      } else {
        // Default to full width for unknown block types
        fullWidthBlocks.push(block);
      }
    });

    const hasTwoColumnContent = leftColumnBlocks.length > 0 || rightColumnBlocks.length > 0;

    // Determine which full-width blocks go before/after two-column section
    const heroBlocks = fullWidthBlocks.filter(b => b.type === "hero-image" || b.type === "identity-card");
    const afterBlocks = fullWidthBlocks.filter(b => b.type !== "hero-image" && b.type !== "identity-card");

    return (
      <div
        key={page.id}
        className="print-page relative bg-white flex flex-col"
        style={{
          width: "210mm",
          height: "297mm",
          minWidth: "210mm",
          maxWidth: "210mm",
          minHeight: "297mm",
          maxHeight: "297mm",
          overflow: "hidden",
          pageBreakAfter: pageIndex < totalPages - 1 ? "always" : "auto",
          pageBreakInside: "avoid",
        }}
      >
        {/* Header Bar */}
        <header 
          className="flex-shrink-0 flex items-center justify-between px-6 py-3"
          style={{ backgroundColor: "hsl(225 40% 12%)" }}
        >
          {/* Logo lockup: 24/18px (Small UI, nav) */}
          <div className="flex items-center gap-2">
            <div style={{ width: 24, height: 24 }}>
              <AnimatedLogo variant="white" />
            </div>
            <span className="font-logo font-semibold text-white tracking-wide" style={{ fontSize: 18 }}>
              RHOSONICS
            </span>
          </div>
          <span className="font-data text-xs text-white/60 tracking-wider uppercase">
            {headerTitle}
          </span>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden px-8 py-6">
          <div className="h-full flex flex-col gap-4">
            {/* Hero / Identity blocks (full width, top) */}
            {heroBlocks.map((block) => (
              <div key={block.id}>
                {renderBlock(block)}
              </div>
            ))}

            {/* Two-column section if applicable */}
            {hasTwoColumnContent && (
              <div className="grid grid-cols-2 gap-6 flex-1">
                <div className="space-y-4">
                  {leftColumnBlocks.map((block) => (
                    <div key={block.id}>
                      {renderBlock(block)}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {rightColumnBlocks.map((block) => (
                    <div key={block.id}>
                      {renderBlock(block)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Remaining full-width blocks (results, quote, cta, etc.) */}
            {afterBlocks.map((block) => (
              <div key={block.id}>
                {renderBlock(block)}
              </div>
            ))}
          </div>
        </main>

        {/* Footer Bar */}
        <footer className="flex-shrink-0 flex items-center justify-between px-6 py-2 bg-white border-t border-slate-200">
          <div className="flex items-center gap-4">
            <span className="font-ui text-xs text-slate-500">
              rhosonics.com
            </span>
            <span className="text-slate-300">|</span>
            <span className="font-ui text-xs text-slate-500">
              Headquarters: The Netherlands
            </span>
          </div>
          <span className="font-data text-xs text-slate-400">
            {pageIndex + 1} / {totalPages}
          </span>
        </footer>
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
