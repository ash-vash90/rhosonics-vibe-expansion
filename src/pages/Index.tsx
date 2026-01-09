import { Suspense, lazy, useEffect, useRef } from "react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { LazySection } from "@/components/LazySection";
import { ArrowDown, Zap } from "lucide-react";
import { QuickNav } from "@/components/brand/QuickNav";
import { ChapterProgress } from "@/components/brand/ChapterProgress";
import { SectionBridge } from "@/components/brand/SectionBridge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lazy load heavier components for better initial load performance
const BrandEthos = lazy(() => import("@/components/brand/BrandEthos"));
const MasterLockup = lazy(() => import("@/components/brand/MasterLockup"));
const OriginStory = lazy(() => import("@/components/brand/OriginStory"));
const MissionVision = lazy(() => import("@/components/brand/MissionVision"));
const ColorMatrix = lazy(() => import("@/components/brand/ColorMatrix"));
const TypographyScale = lazy(() => import("@/components/brand/TypographyScale"));
const SpacingSystem = lazy(() => import("@/components/brand/SpacingSystem"));
const LogoAssets = lazy(() => import("@/components/brand/LogoAssets"));
const IconGuidelines = lazy(() => import("@/components/brand/IconGuidelines"));
const InterfaceKit = lazy(() => import("@/components/brand/InterfaceKit"));
const DownloadableAssets = lazy(() => import("@/components/brand/DownloadableAssets"));
const EcoComponents = lazy(() => import("@/components/brand/EcoComponents"));
const IndustryApplications = lazy(() => import("@/components/brand/IndustryApplications"));
const ImageryGuidelines = lazy(() => import("@/components/brand/ImageryGuidelines"));
const VoiceTone = lazy(() => import("@/components/brand/VoiceTone"));
const MotionDesign = lazy(() => import("@/components/brand/MotionDesign"));
const DosAndDonts = lazy(() => import("@/components/brand/DosAndDonts"));
const TechComparison = lazy(() => import("@/components/brand/TechComparison"));
const CaseStudies = lazy(() => import("@/components/brand/CaseStudies"));
const ExportSection = lazy(() => import("@/components/brand/ExportSection"));

const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

interface ChapterHeaderProps {
  number: string;
  title: string;
  subtitle: string;
  id?: string;
}

const ChapterHeader = ({ number, title, subtitle, id }: ChapterHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    
    const numEl = header.querySelector('.chapter-num');
    const titleEl = header.querySelector('.chapter-title');
    const subtitleEl = header.querySelector('.chapter-subtitle');
    
    if (!numEl || !titleEl || !subtitleEl) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(numEl, 
        { opacity: 0, x: -30, filter: 'blur(10px)' },
        { 
          opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6,
          scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
      
      gsap.fromTo(titleEl,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.6, delay: 0.15,
          scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
      
      gsap.fromTo(subtitleEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.3,
          scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    }, header);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={headerRef} id={id} className="mb-12 scroll-mt-20">
      <div className="max-w-4xl">
        <span className="chapter-num font-data text-sm text-slate-400 tracking-widest">{number}</span>
        <h2 className="chapter-title font-ui text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">{title}</h2>
        <p className="chapter-subtitle text-xl md:text-2xl text-slate-600 leading-relaxed">{subtitle}</p>
      </div>
    </div>
  );
};

const Index = () => {
  const waveRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  // Animate ultrasonic wave arcs
  useEffect(() => {
    const svg = waveRef.current;
    const glow = glowRef.current;
    if (!svg) return;
    
    const primaryArcs = svg.querySelectorAll('.wave-arc');
    const secondaryArcs = svg.querySelectorAll('.wave-arc-secondary');
    
    // Subtle pulsing animation on primary arcs - staggered
    const tl = gsap.timeline({ repeat: -1 });
    
    primaryArcs.forEach((arc, i) => {
      const baseOpacity = parseFloat(arc.getAttribute('opacity') || '0.1');
      tl.to(arc, {
        opacity: baseOpacity * 1.6,
        strokeWidth: '+=0.5',
        duration: 1.5,
        ease: 'sine.inOut',
      }, i * 0.15)
      .to(arc, {
        opacity: baseOpacity,
        strokeWidth: '-=0.5',
        duration: 1.5,
        ease: 'sine.inOut',
      }, i * 0.15 + 1.5);
    });
    
    // Secondary arcs pulse with offset
    gsap.to(secondaryArcs, {
      opacity: (_i, el) => parseFloat(el.getAttribute('opacity') || '0.05') * 1.8,
      duration: 2,
      ease: 'sine.inOut',
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
    });
    
    // Glow pulse
    if (glow) {
      gsap.to(glow, {
        opacity: 0.25,
        scale: 1.05,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: 'center center',
      });
    }
    
    return () => {
      tl.kill();
      gsap.killTweensOf(secondaryArcs);
      gsap.killTweensOf(glow);
    };
  }, []);
  
  const scrollToContent = () => {
    document.getElementById('the-problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation overlays */}
      <QuickNav />
      <ChapterProgress />
      
      {/* ═══════════════════════════════════════════════════════════════
          HERO — BOLD STATEMENT
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center relative bg-slate-950 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Ultrasonic wave arcs emanating from bottom-right */}
        <div className="absolute inset-0 overflow-hidden">
          <svg 
            ref={waveRef}
            className="absolute -bottom-[30%] -right-[20%] w-[140%] h-[140%]" 
            viewBox="0 0 1000 1000" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric arcs from origin point */}
            <circle className="wave-arc" cx="1000" cy="1000" r="200" stroke="hsl(125 50% 40%)" strokeWidth="1.5" opacity="0.25" />
            <circle className="wave-arc" cx="1000" cy="1000" r="350" stroke="hsl(125 50% 40%)" strokeWidth="1.5" opacity="0.2" />
            <circle className="wave-arc" cx="1000" cy="1000" r="500" stroke="hsl(125 50% 40%)" strokeWidth="1.5" opacity="0.15" />
            <circle className="wave-arc" cx="1000" cy="1000" r="650" stroke="hsl(125 50% 40%)" strokeWidth="1" opacity="0.12" />
            <circle className="wave-arc" cx="1000" cy="1000" r="800" stroke="hsl(125 50% 40%)" strokeWidth="1" opacity="0.08" />
            <circle className="wave-arc" cx="1000" cy="1000" r="950" stroke="hsl(125 50% 40%)" strokeWidth="0.5" opacity="0.05" />
            
            {/* Secondary wave set with offset */}
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="275" stroke="hsl(90 60% 45%)" strokeWidth="0.5" opacity="0.1" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="425" stroke="hsl(90 60% 45%)" strokeWidth="0.5" opacity="0.08" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="575" stroke="hsl(90 60% 45%)" strokeWidth="0.5" opacity="0.06" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="725" stroke="hsl(90 60% 45%)" strokeWidth="0.5" opacity="0.04" />
          </svg>
        </div>
        
        {/* Radial glow from wave origin */}
        <div ref={glowRef} className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[200px]" />
        
        {/* Secondary subtle glow top-left */}
        <div className="absolute -top-1/4 -left-1/4 w-[400px] h-[400px] bg-earth-ochre/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-20">
          <div className="max-w-6xl mx-auto">
            {/* Design system badge */}
            <div className="inline-flex items-center gap-3 mb-12 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-data text-xs uppercase tracking-wider text-slate-400">BRAND GUIDELINES</span>
            </div>
            
            {/* Bold statement */}
            <h1 className="font-ui text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-8">
              We measure<br />
              <span className="text-primary">what others can't.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-16 leading-relaxed">
              Ultrasonic precision for industries where measurement isn't optional—it's operational.
            </p>
            
            {/* Meta info */}
            <div className="flex flex-wrap gap-8 md:gap-16 text-sm">
              <div>
                <span className="font-data text-slate-500 tracking-widest text-xs">ESTABLISHED</span>
                <p className="text-white font-ui text-2xl mt-1">1984</p>
              </div>
              <div>
                <span className="font-data text-slate-500 tracking-widest text-xs">HEADQUARTERS</span>
                <p className="text-white font-ui text-2xl mt-1">Netherlands</p>
              </div>
              <div>
                <span className="font-data text-slate-500 tracking-widest text-xs">SPECIALIZATION</span>
                <p className="text-white font-ui text-2xl mt-1">Ultrasonic Density</p>
              </div>
            </div>
            
            {/* Origin nod */}
            <div className="mt-12 flex items-center gap-4 text-sm text-slate-500">
              <div className="w-8 h-px bg-gradient-to-r from-earth-ochre to-transparent" />
              <span className="font-data tracking-wide">FROM GARAGE TO GLOBAL</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-data text-xs tracking-widest">SCROLL</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </button>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════ */}
      <main className="px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        
        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 01: THE PROBLEM
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-terrain-strata opacity-30 pointer-events-none" />
          <div className="relative">
            <ChapterHeader 
              id="the-problem"
              number="01" 
              title="The Problem" 
              subtitle="Industries run on measurement. But traditional methods fail when conditions get real."
            />
            
            <div className="grid md:grid-cols-3 gap-6 relative">
              <div className="card-earth p-8">
                <span className="font-data text-4xl text-earth-ochre/50">01</span>
                <h3 className="font-ui text-xl font-semibold text-foreground mt-4 mb-3">Invasive sensors fail</h3>
                <p className="text-slate-600">Contact-based measurement degrades in corrosive, abrasive, or high-temperature slurries. Downtime follows.</p>
              </div>
              <div className="card-earth p-8">
                <span className="font-data text-4xl text-earth-ochre/50">02</span>
                <h3 className="font-ui text-xl font-semibold text-foreground mt-4 mb-3">Lab sampling lags</h3>
                <p className="text-slate-600">Grab samples can't capture real-time process dynamics. By the time results arrive, the process has moved on.</p>
              </div>
              <div className="card-earth p-8">
                <span className="font-data text-4xl text-earth-ochre/50">03</span>
                <h3 className="font-ui text-xl font-semibold text-foreground mt-4 mb-3">Nuclear is complex</h3>
                <p className="text-slate-600">Radioactive density gauges require licensing, safety protocols, and specialized handling. Overkill for most applications.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            TRANSITION — DARK OBSIDIAN FULL-BLEED
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative -mx-6 md:-mx-12 lg:-mx-20 py-32 md:py-40 bg-slate-900 overflow-hidden">
          {/* Layered backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
          <div className="absolute inset-0 bg-wave-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
          
          {/* Accent glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-data text-xs uppercase tracking-widest text-primary">The Shift</span>
            </div>
            
            <h2 className="font-ui text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              What if measurement<br />
              <span className="text-primary">never touched the process?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              No probes to corrode. No sensors to clog. No radiation to license. 
              Just sound waves and forty years of engineering.
            </p>
          </div>
        </section>

        <SectionBridge number="02" label="THE SOLUTION" bridge="From problem to possibility." />

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 02: THE SOLUTION
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-wave-subtle opacity-20 pointer-events-none" />
          <div className="relative">
            <ChapterHeader 
              id="the-solution"
              number="02" 
              title="The Solution" 
              subtitle="Non-invasive ultrasonic measurement. No contact. No radiation. No compromise."
            />
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center shadow-glow-sm">
                    <RhosonicsLogo variant="gradient" className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-ui text-2xl font-bold text-foreground">SDM ECO Technology</h3>
                    <span className="font-data text-sm text-slate-500">ULTRASONIC DENSITY MEASUREMENT</span>
                  </div>
                </div>
                
                <div className="space-y-6 text-lg text-slate-600">
                  <p>Sound waves travel through the pipe wall, measuring slurry density from the outside. The sensor never touches the process fluid.</p>
                  <p>No process penetration means no wear, no clogging, no contamination risk. The measurement keeps running while competitors' sensors get replaced.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 chamfer-sm shadow-glow-sm">
                  <span className="font-data text-3xl text-primary font-bold">±0.5%</span>
                  <p className="text-sm text-slate-600 mt-2">Measurement precision across full density range</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 chamfer-sm shadow-glow-sm">
                  <span className="font-data text-3xl text-primary font-bold">99.8%</span>
                  <p className="text-sm text-slate-600 mt-2">Uptime—no process interruption required</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 chamfer-sm shadow-glow-sm">
                  <span className="font-data text-3xl text-primary font-bold">40+</span>
                  <p className="text-sm text-slate-600 mt-2">Years of field-proven technology</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 chamfer-sm shadow-glow-sm">
                  <span className="font-data text-3xl text-primary font-bold">0</span>
                  <p className="text-sm text-slate-600 mt-2">Radiation licensing requirements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionBridge number="03" label="THE HERITAGE" bridge="From a Dutch garage to global operations." />

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 03: THE HERITAGE
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <ChapterHeader 
            id="the-heritage"
            number="03" 
            title="The Heritage" 
            subtitle="It started with a question in a Dutch garage: what if you could measure without touching?"
          />

          <div className="mt-10">
            <Suspense fallback={<SectionLoader />}>
              <OriginStory />
              <MissionVision />
            </Suspense>
          </div>
        </section>

        <SectionBridge number="04" label="THE VISUAL IDENTITY" bridge="The visual toolkit." />

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 04: THE VISUAL IDENTITY
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <ChapterHeader 
            id="the-identity"
            number="04" 
            title="The Visual Identity" 
            subtitle="Every element reflects precision. Colors from the field. Typography for clarity. No decoration without purpose."
          />
          
          <Suspense fallback={<SectionLoader />}>
            <BrandEthos />
            <MasterLockup />
            <ColorMatrix />
            <TypographyScale />
            <SpacingSystem />
            <LogoAssets />
            <IconGuidelines />
          </Suspense>
        </section>

        <SectionBridge number="05" label="THE VOICE" bridge="How we speak." />

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 05: THE VOICE
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <ChapterHeader 
            id="the-voice"
            number="05" 
            title="The Voice" 
            subtitle="Direct. Technical. Confident. We speak like the engineers we serve—no fluff, no hedging."
          />
          
          <Suspense fallback={<SectionLoader />}>
            <VoiceTone />
            <MotionDesign />
            <DosAndDonts />
          </Suspense>
        </section>

        <SectionBridge number="06" label="THE APPLICATION" bridge="Where the brand meets reality." />

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 06: THE APPLICATION
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <ChapterHeader 
            id="the-application"
            number="06" 
            title="The Application" 
            subtitle="Mining. Dredging. Water treatment. The harshest environments demand the clearest expression."
          />
          
          <Suspense fallback={<SectionLoader />}>
            <IndustryApplications />
            <EcoComponents />
            <ImageryGuidelines />
            <InterfaceKit />
          </Suspense>
        </section>

        <SectionBridge number="07" label="THE PROOF" bridge="Results from the field." />

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 07: THE PROOF
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 relative">
          <div className="absolute inset-0 bg-grid-data opacity-20 pointer-events-none" />
          <div className="relative">
            <ChapterHeader 
              id="the-proof"
              number="07" 
              title="The Proof" 
              subtitle="Measurement comparisons. Real installations. Real data."
            />
            
            <LazySection fallback={<SectionLoader />} rootMargin="400px">
              <Suspense fallback={<SectionLoader />}>
                <TechComparison />
              </Suspense>
            </LazySection>
            <Suspense fallback={<SectionLoader />}>
              <CaseStudies />
            </Suspense>
          </div>
        </section>

        <SectionBridge number="08" label="THE RESOURCES" bridge="Everything you need." />

        {/* ─────────────────────────────────────────────────────────────
            CHAPTER 08: THE RESOURCES
        ───────────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24">
          <ChapterHeader 
            id="the-resources"
            number="08" 
            title="The Resources" 
            subtitle="Download assets. Export guidelines. Deploy the brand."
          />
          
          <Suspense fallback={<SectionLoader />}>
            <DownloadableAssets />
            <ExportSection />
          </Suspense>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════════════════ */}
        <footer className="mt-20 py-12 border-t-2 border-slate-200" role="contentinfo">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10" aria-hidden="true">
                <RhosonicsLogo variant="gradient" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-ui font-semibold text-foreground">Rhosonics</p>
                <span className="font-data text-xs text-slate-500 tracking-widest">BRAND GUIDELINES</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>© {new Date().getFullYear()} Rhosonics. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
