import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Loader2, Printer, AlertTriangle, ArrowLeft, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseStudyDocument } from "@/components/case-studies/CaseStudyDocument";

// Import images
import rioTintoInstallation from "@/assets/case-studies/rio-tinto-installation.jpg";
import rioTintoChart from "@/assets/case-studies/rio-tinto-chart.jpg";
import flottwegFlush from "@/assets/case-studies/flottweg-flush-system.png";
import flottwegInstallation from "@/assets/case-studies/flottweg-installation.jpg";
import weirMineralsHmi from "@/assets/case-studies/weir-minerals-hmi.jpg";
import weirMineralsChart from "@/assets/case-studies/weir-minerals-chart.jpg";

// Case study data (shared with CaseStudies.tsx)
const caseStudies = [
  {
    id: "rio-tinto",
    company: "Rio Tinto",
    location: "Gove, Australia",
    industry: "Alumina Extraction",
    product: "SDM Slurry Density Meter",
    heroImage: rioTintoInstallation,
    chartImage: rioTintoChart,
    tagline: "Replacing nuclear density meters with ultrasonic precision",
    challenge: "Rio Tinto Gove faced significant challenges with traditional radioactive density measurement methods. Safety hazards and operational limitations prompted the search for alternative solutions that could provide precise density measurements without compromising employee safety or process reliability.",
    solution: "The Rhosonics SDM was installed to measure mud density in the alumina extraction process, replacing traditional nuclear density meters. Real-time interpretation of trended data replaced labor-intensive sampling processes.",
    results: [
      "Better correlation with laboratory samples than nuclear meters",
      "Eliminated radioactive safety hazards",
      "Real-time data replaced manual sampling",
      "Improved process control and efficiency",
      "Reduced operational downtime"
    ],
    quote: {
      text: "The Rhosonics SDM matched better with the reference of laboratory samples compared to the nuclear density meter.",
      author: "Process Engineer",
      role: "Rio Tinto Gove"
    },
    specs: [
      { label: "Application", value: "Mud Extraction" },
      { label: "Comparison", value: "Nuclear vs SDM" },
      { label: "Test Duration", value: "7 Days" },
      { label: "Validation", value: "Lab Samples" }
    ],
    primaryStat: {
      value: "0%",
      label: "Radiation Risk"
    }
  },
  {
    id: "flottweg",
    company: "Flottweg",
    location: "Austria & Germany",
    industry: "Separation Technology",
    product: "SDM-4 with Flush System",
    heroImage: flottwegInstallation,
    chartImage: flottwegFlush,
    tagline: "Innovative flush system for challenging scaling conditions",
    challenge: "Flottweg faced challenges measuring density of a water/solids slurry due to scaling on the SDM-4 sensor. The buildup caused inaccurate readings as the sensor measured the scaling layer rather than the actual slurry medium.",
    solution: "Rhosonics R&D developed an innovative flush system integrated into the spool piece. This allows daily cleaning without removing the sensor. A Pt100 temperature sensor was also added to compensate for temperature fluctuations.",
    results: [
      "Density measurements stable within ±0.01 S.G. of manual readings",
      "Daily cleaning without sensor removal",
      "Temperature compensation for 15°C-26°C range",
      "System deployed across Austria and Germany",
      "Ongoing reliability in harsh conditions"
    ],
    quote: {
      text: "The flush spool in our last project is doing well. It is much better for the sensor with flushing, the data are more stable.",
      author: "Christine Bauer-Salomon",
      role: "Flottweg"
    },
    specs: [
      { label: "Pipe Diameter", value: "3 inch" },
      { label: "Pipe Material", value: "HDPE" },
      { label: "Density Range", value: "1080-1100 g/l" },
      { label: "Temperature", value: "15°C - 26°C" }
    ],
    primaryStat: {
      value: "±0.01",
      label: "S.G. Accuracy"
    }
  },
  {
    id: "weir-minerals",
    company: "Weir Minerals",
    location: "Finland & Australia",
    industry: "Rare Earth Elements",
    product: "SDM ECO",
    heroImage: weirMineralsHmi,
    chartImage: weirMineralsChart,
    tagline: "Triple technology comparison for critical REE mining",
    challenge: "Weir Minerals was tasked with conducting pipe loop test work for the Sokli project in Finland, establishing a regional European source of Rare Earth Elements crucial for wind turbine production. They needed to validate density measurement methods across three competing technologies.",
    solution: "Rhosonics was invited to test the SDM ECO sensor in the test loop alongside a Coriolis meter and nuclear density gauge. The non-nuclear SDM ECO was installed with a spool piece in a 3-6 inch pipe to handle high-density slurries up to 1900 g/l.",
    results: [
      "SDM ECO matched laboratory samples alongside Coriolis",
      "Outperformed nuclear density gauge accuracy",
      "Successfully handled 45-60 wt% solids",
      "Selected for Phase 2 testing in Melbourne, Australia",
      "Validated for high-density REE slurry applications"
    ],
    specs: [
      { label: "Pipe Diameter", value: "DN80-DN150" },
      { label: "Solids Content", value: "45-60 wt%" },
      { label: "Density Range", value: "1450-1900 g/l" },
      { label: "Temperature", value: "22°C - 26°C" }
    ],
    primaryStat: {
      value: "3",
      label: "Technologies Compared"
    }
  }
];

type PrintStatus = "preparing" | "ready" | "printing" | "done" | "error";

const CaseStudyPrint = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  
  // Fix #1: Properly typed state
  const [status, setStatus] = useState<PrintStatus>("preparing");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  
  // Fix #2: Run-once guards for strict mode
  const hasAutoPrintedRef = useRef<boolean>(false);
  const hasPreparedRef = useRef<boolean>(false);
  
  const study = caseStudies.find(s => s.id === id);
  
  // Browser detection for hint
  const isChromium = typeof navigator !== "undefined" &&
    /Chrome|Chromium|Edge/.test(navigator.userAgent) &&
    !/OPR/.test(navigator.userAgent);

  // Body class management
  useEffect(() => {
    document.body.classList.add("print-mode");
    return () => document.body.classList.remove("print-mode");
  }, []);

  // Fix #2: Print event listeners with matchMedia fallback
  useEffect(() => {
    const handleBeforePrint = () => setStatus("printing");
    const handleAfterPrint = () => setStatus("done");

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    // Fallback for browsers where afterprint is unreliable
    const mql = window.matchMedia?.("print");
    const mqlListener = (e: MediaQueryListEvent) => {
      if (e.matches) setStatus("printing");
      else setStatus("done");
    };
    mql?.addEventListener?.("change", mqlListener);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
      mql?.removeEventListener?.("change", mqlListener);
    };
  }, []);

  // Fix #1: Correctly typed readiness barrier
  async function waitForReadiness(): Promise<void> {
    try {
      // Prepare readiness checks
      const fontsReadyPromise = document.fonts?.ready 
        ? Promise.race([
            document.fonts.ready,
            new Promise<void>((r) => setTimeout(r, 5000))
          ])
        : Promise.resolve();

      const images = Array.from(document.images);
      const imagesReadyPromise = Promise.race([
        Promise.all(
          images.map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise<void>((r) => {
                  img.addEventListener("load", () => r(), { once: true });
                  img.addEventListener("error", () => r(), { once: true });
                })
          )
        ),
        new Promise<void>((r) => setTimeout(r, 10000))
      ]);

      // Wait for fonts and images in parallel
      await Promise.all([fontsReadyPromise, imagesReadyPromise]);

      // 3. Decode images where supported
      for (const img of images) {
        if (img.decode) await img.decode().catch(() => {});
      }

      // 4. Force reflow
      void document.body.offsetHeight;

      // 5. Wait 2x rAF + microtask
      await new Promise<void>((r) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setTimeout(r, 0))
        )
      );

      setStatus("ready");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Preparation failed");
      setStatus("error");
    }
  }

  // Readiness barrier with strict mode guard
  useEffect(() => {
    if (!study) return;
    if (hasPreparedRef.current) return;
    hasPreparedRef.current = true;
    void waitForReadiness();
  }, [study]);

  // Fix #2: Auto-print with run-once guard
  useEffect(() => {
    if (status !== "ready") return;
    if (searchParams.get("autoprint") !== "1") return;
    if (hasAutoPrintedRef.current) return;

    hasAutoPrintedRef.current = true;
    setTimeout(() => window.print(), 100);
  }, [status, searchParams]);

  // Fix #5: Overflow detection shown in toolbar
  useEffect(() => {
    if (status !== "ready") return;

    const pages = document.querySelectorAll("article.print-page");
    let overflow = false;
    for (const p of Array.from(pages)) {
      if (p.scrollHeight > p.clientHeight + 1) {
        console.warn("Print page overflow detected:", p);
        overflow = true;
      }
    }
    setHasOverflow(overflow);
  }, [status]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Case Study Not Found</h1>
          <Link to="/case-studies" className="text-primary hover:underline">
            Return to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Print Toolbar - hidden in print via CSS */}
      <div className="print-toolbar fixed top-0 left-0 right-0 z-50 bg-rho-obsidian border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/case-studies" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-white font-ui font-semibold">{study.company} Case Study</h1>
            <p className="text-xs text-slate-400">Print / Save as PDF</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status indicator */}
          {status === "preparing" && (
            <span className="flex items-center gap-2 text-amber-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Preparing document...
            </span>
          )}
          {status === "ready" && (
            <span className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Ready to print
            </span>
          )}
          {status === "printing" && (
            <span className="flex items-center gap-2 text-blue-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Printing...
            </span>
          )}
          {/* Fix #3: Neutral "done" messaging */}
          {status === "done" && (
            <span className="flex items-center gap-2 text-slate-300 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              Print dialog closed
            </span>
          )}
          {status === "error" && (
            <span className="flex items-center gap-2 text-red-400 text-sm">
              <X className="w-4 h-4" />
              {errorMessage || "Error"}
            </span>
          )}

          {/* Overflow warning (Fix #5) */}
          {hasOverflow && (
            <span className="flex items-center gap-2 text-red-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              Content may be clipped
            </span>
          )}

          {/* Browser hint */}
          {!isChromium && (
            <span className="flex items-center gap-2 text-amber-400 text-sm">
              <AlertTriangle className="w-4 h-4" />
              Best results in Chrome/Edge
            </span>
          )}

          {/* Print button */}
          <Button
            onClick={handlePrint}
            disabled={status === "preparing"}
            className="gap-2"
            size="sm"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Spacer for fixed toolbar */}
      <div className="h-14 print:hidden" />

      {/* Tip banner */}
      <div className="print-tip-banner bg-amber-50 border-b border-amber-200 px-6 py-2 text-sm text-amber-800">
        <strong>Tip:</strong> In the print dialog, enable "Background graphics" for best results.
        {status === "done" && (
          <span className="ml-4 text-slate-600">You can close this tab.</span>
        )}
      </div>

      {/* The document */}
      <CaseStudyDocument study={study} printMode={true} />
    </>
  );
};

export default CaseStudyPrint;
