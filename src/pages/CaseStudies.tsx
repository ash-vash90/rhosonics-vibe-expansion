import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, FileText, Download, Eye, Plus, LogIn, LogOut } from "lucide-react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { CaseStudyDocument } from "@/components/case-studies/CaseStudyDocument";
import { CaseStudySelector } from "@/components/case-studies/CaseStudySelector";
import { CaseStudyPDFPreview } from "@/components/case-studies/CaseStudyPDFPreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
// Import images
import rioTintoInstallation from "@/assets/case-studies/rio-tinto-installation.jpg";
import rioTintoChart from "@/assets/case-studies/rio-tinto-chart.jpg";
import flottwegFlush from "@/assets/case-studies/flottweg-flush-system.png";
import flottwegInstallation from "@/assets/case-studies/flottweg-installation.jpg";
import weirMineralsHmi from "@/assets/case-studies/weir-minerals-hmi.jpg";
import weirMineralsChart from "@/assets/case-studies/weir-minerals-chart.jpg";

interface CaseStudy {
  id: string;
  company: string;
  location: string;
  industry: string;
  product: string;
  heroImage: string;
  chartImage?: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  specs: {
    label: string;
    value: string;
  }[];
  primaryStat: {
    value: string;
    label: string;
  };
}

const caseStudies: CaseStudy[] = [
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

const CaseStudies = () => {
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const selectedStudy = selectedStudyId 
    ? caseStudies.find(s => s.id === selectedStudyId) 
    : null;

  const handleBack = () => {
    setSelectedStudyId(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out" });
  };

  // Prefetch print route chunk on hover/focus
  const handlePrefetchPrint = () => {
    import("@/pages/CaseStudyPrint");
  };

  // Popup-blocker safe download handler
  const handleDownloadPDF = () => {
    if (!selectedStudy) return;

    // Synchronous open to avoid popup blockers
    // Note: Don't pass window features string - just target name
    const w = window.open("", "_blank");

    if (!w) {
      toast({
        title: "Popup Blocked",
        description: "Please allow popups to download the PDF.",
        variant: "destructive",
      });
      return;
    }

    // Immediately set location (no async before this)
    w.location.href = `/case-studies/${selectedStudy.id}/print?autoprint=1`;
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-rho-obsidian border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {selectedStudy ? (
              <button 
                onClick={handleBack}
                className="flex items-center gap-3 group"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="text-slate-300 group-hover:text-white transition-colors">
                  Back to all case studies
                </span>
              </button>
            ) : (
              <Link to="/" className="flex items-center gap-3 group">
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                <div className="w-7 h-7">
                  <RhosonicsLogo variant="gradient" />
                </div>
                <span className="font-logo text-lg text-slate-100 tracking-tight hidden sm:inline">
                  Rhosonics
                </span>
              </Link>
            )}
            
            <nav className="flex items-center gap-4">
              {selectedStudy && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Preview</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                    onClick={handleDownloadPDF}
                    onMouseEnter={handlePrefetchPrint}
                    onFocus={handlePrefetchPrint}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </Button>
                </div>
              )}
              <Link 
                to="/tools" 
                className="text-sm text-slate-400 hover:text-primary transition-colors"
              >
                AI Tools
              </Link>
              <a 
                href="https://rhosonics.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
              >
                <span className="hidden sm:inline">Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-slate-400 hover:text-white gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      {selectedStudy ? (
        /* Document View */
        <div className="bg-slate-200 min-h-[calc(100vh-4rem)]">
          {/* Document Title Bar */}
          <div className="bg-white border-b border-slate-200 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-ui font-bold text-xl text-foreground">
                      {selectedStudy.company} Case Study
                    </h1>
                    <p className="text-sm text-slate-500">
                      {selectedStudy.industry} • {selectedStudy.product}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="label-tech-sm text-slate-400">A4 FORMAT</span>
                  <span className="label-tech-sm text-slate-400">•</span>
                  <span className="label-tech-sm text-slate-400">2 PAGES</span>
                </div>
              </div>
            </div>
          </div>

          {/* A4 Document */}
          <CaseStudyDocument study={selectedStudy} />

          {/* PDF Preview Dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>PDF Preview — {selectedStudy.company}</DialogTitle>
                <DialogDescription>
                  Sample page layout for the exported document
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <CaseStudyPDFPreview study={selectedStudy} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDownloadPDF} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        /* Selector View */
        <>
          {/* Hero Section */}
          <section className="relative bg-rho-obsidian text-slate-100 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2333993c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
            
            {/* Gradient orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="max-w-3xl">
                <div className="label-tech text-primary mb-4">
                  <span className="text-slate-400">06</span>
                  <span className="mx-2">/</span>
                  ANALYSIS
                </div>
                
                <h1 className="font-ui font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
                  Case Studies
                </h1>
                
                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                  Real-world applications proving the SDM advantage. Select a case study below to view the full A4-formatted document.
                </p>
                
                {/* Stats row */}
                <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-slate-700/50">
                  <div>
                    <div className="font-data text-3xl text-primary">40+</div>
                    <div className="label-tech-sm text-slate-400 mt-1">Years Experience</div>
                  </div>
                  <div>
                    <div className="font-data text-3xl text-primary">6</div>
                    <div className="label-tech-sm text-slate-400 mt-1">Continents</div>
                  </div>
                  <div>
                    <div className="font-data text-3xl text-primary">1000+</div>
                    <div className="label-tech-sm text-slate-400 mt-1">Installations</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Case Study Selector */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="label-tech text-slate-500 mb-2">SELECT A CASE STUDY</h2>
                <p className="text-slate-600">
                  Click on any case study to view the full document in A4 format
                </p>
              </div>
              <Link to="/case-studies/builder">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create New
                </Button>
              </Link>
            </div>
            
            <CaseStudySelector 
              caseStudies={caseStudies} 
              onSelect={setSelectedStudyId} 
            />
          </section>
          
          {/* CTA Section */}
          <section className="bg-gradient-to-br from-primary to-rho-lime text-rho-obsidian">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="font-ui font-bold text-2xl md:text-3xl mb-2">
                    Ready to optimize your process?
                  </h2>
                  <p className="text-rho-obsidian/80 text-lg">
                    Contact our team to discuss your measurement challenges.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="mailto:info@rhosonics.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-rho-obsidian text-slate-100 font-semibold rounded-lg hover:bg-rho-obsidian/90 transition-colors"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://rhosonics.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-rho-obsidian font-semibold rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Learn More
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="bg-rho-obsidian text-slate-400 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6">
                    <RhosonicsLogo variant="gradient" />
                  </div>
                  <span className="font-logo text-slate-100 tracking-wide uppercase">RHOSONICS</span>
                  <span className="text-sm">Proven Process Insights</span>
                </div>
                <div className="text-sm">
                  © {new Date().getFullYear()} Rhosonics. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default CaseStudies;
