import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Loader2, Printer, AlertTriangle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudyDocument } from "@/components/case-studies/CaseStudyDocument";
import { VisualCaseStudy } from "@/types/visualCaseStudy";

type PrintStatus = "preparing" | "ready" | "printing" | "done" | "error";

const CaseStudyBuilderPrint = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<PrintStatus>("preparing");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  
  const hasAutoPrintedRef = useRef<boolean>(false);
  const hasPreparedRef = useRef<boolean>(false);
  
  // Load case study from sessionStorage
  const [caseStudy, setCaseStudy] = useState<VisualCaseStudy | null>(null);
  
  useEffect(() => {
    const KEY = "visual-case-study-print";
    const savedFromSession = sessionStorage.getItem(KEY);
    const savedFromLocal = savedFromSession ? null : localStorage.getItem(KEY);
    const saved = savedFromSession ?? savedFromLocal;

    if (saved) {
      try {
        setCaseStudy(JSON.parse(saved));
        // If we used localStorage as a fallback, clean it up so it doesn't linger.
        if (savedFromLocal) localStorage.removeItem(KEY);
      } catch {
        setStatus("error");
        setErrorMessage("Failed to load case study data");
      }
    } else {
      setStatus("error");
      setErrorMessage("No case study data found");
    }
  }, []);
  
  // Convert to document format
  const documentStudy = caseStudy ? {
    id: caseStudy.id,
    company: caseStudy.company || "Company",
    location: caseStudy.location || "Location",
    industry: caseStudy.industry || "Industry",
    product: caseStudy.product || "Product",
    heroImage: caseStudy.heroImage || "",
    chartImage: caseStudy.chartImage || undefined,
    tagline: caseStudy.tagline || "Tagline",
    challenge: caseStudy.challenge || "Challenge description",
    solution: caseStudy.solution || "Solution description",
    results: caseStudy.results.filter(r => r.trim()).length > 0 
      ? caseStudy.results.filter(r => r.trim()) 
      : ["Key result"],
    quote: caseStudy.quote?.text ? caseStudy.quote : undefined,
    specs: caseStudy.specs.filter(s => s.label.trim() || s.value.trim()),
    primaryStat: {
      value: caseStudy.primaryStat.value || "—",
      label: caseStudy.primaryStat.label || "Metric",
    },
  } : null;

  async function waitForReadiness(): Promise<void> {
    try {
      // Wait for fonts
      await Promise.race([
        document.fonts.ready,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Font timeout")), 5000))
      ]);
      
      // Wait for all images
      const images = Array.from(document.querySelectorAll("img"));
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
      document.body.offsetHeight;
      
      // Double rAF for paint flush
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });
      
      // Check for overflow
      const pages = document.querySelectorAll(".print-page");
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
  
  // Run readiness check when case study loads
  useEffect(() => {
    if (!caseStudy) return;
    if (hasPreparedRef.current) return;
    hasPreparedRef.current = true;
    void waitForReadiness();
  }, [caseStudy]);
  
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
  
  if (!caseStudy && status !== "error") {
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
          <Link to="/case-studies/builder">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Builder
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="print-mode bg-slate-200 min-h-screen">
      {/* Print toolbar - hidden when printing */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <Link to="/case-studies/builder">
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
            Best results: Chrome or Edge
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
      
      {/* Document - with top padding for toolbar */}
      <div className="pt-16 print:pt-0">
        {documentStudy && (
          <CaseStudyDocument 
            study={documentStudy} 
            printMode
            chartData={caseStudy?.chartData}
          />
        )}
      </div>
    </div>
  );
};

export default CaseStudyBuilderPrint;
