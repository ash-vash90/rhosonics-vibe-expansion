import { Suspense, lazy, useEffect, useRef } from "react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { LazySection } from "@/components/LazySection";
import { Zap } from "lucide-react";
import { QuickNav } from "@/components/brand/QuickNav";
import { ChapterProgress } from "@/components/brand/ChapterProgress";
import { Navigation } from "@/components/brand/Navigation";

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
const BrandGallery = lazy(() => import("@/components/brand/BrandGallery"));
const ExportSection = lazy(() => import("@/components/brand/ExportSection"));

const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const ChapterDivider = () => (
  <div className="py-12 md:py-16">
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="w-1.5 h-1.5 bg-primary/30 rounded-full" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
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
    <div ref={headerRef} id={id} className="mb-12 md:mb-16 scroll-mt-24">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="chapter-num font-data text-sm text-primary font-medium">{number}</span>
          </div>
          <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-primary/30 to-transparent" />
        </div>
        <h2 className="chapter-title font-ui text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{title}</h2>
        <p className="chapter-subtitle text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">{subtitle}</p>
      </div>
    </div>
  );
};

const Index = () => {
  const waveRef = useRef<SVGSVGElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  
  // Animate ultrasonic wave arcs - smooth ripple effect
  useEffect(() => {
    const svg = waveRef.current;
    if (!svg) return;
    
    const primaryArcs = svg.querySelectorAll('.wave-arc');
    const secondaryArcs = svg.querySelectorAll('.wave-arc-secondary');
    
    // Smooth wave ripple - all arcs pulse together with slight delay
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'power1.inOut' } });
    
    // Create a smooth outward ripple effect
    tl.to(primaryArcs, {
      opacity: (_i, el) => parseFloat(el.getAttribute('opacity') || '0.1') * 1.5,
      duration: 3,
      stagger: 0.05,
    })
    .to(primaryArcs, {
      opacity: (_i, el) => parseFloat(el.getAttribute('data-base-opacity') || el.getAttribute('opacity') || '0.1'),
      duration: 3,
      stagger: 0.05,
    }, 1.5);
    
    // Store base opacities
    primaryArcs.forEach(arc => {
      arc.setAttribute('data-base-opacity', arc.getAttribute('opacity') || '0.1');
    });
    secondaryArcs.forEach(arc => {
      arc.setAttribute('data-base-opacity', arc.getAttribute('opacity') || '0.05');
    });
    
    // Secondary arcs with offset timing
    gsap.to(secondaryArcs, {
      opacity: (_i, el) => parseFloat(el.getAttribute('opacity') || '0.05') * 1.6,
      duration: 4,
      ease: 'power1.inOut',
      stagger: 0.08,
      repeat: -1,
      yoyo: true,
    });
    
    return () => {
      tl.kill();
      gsap.killTweensOf(secondaryArcs);
    };
  }, []);
  
  // Particle effect for slurry/density visualization
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }
    
    const particles: Particle[] = [];
    const particleCount = 60;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.05,
        color: Math.random() > 0.7 ? 'hsl(125, 50%, 40%)' : 'hsl(210, 20%, 50%)',
      });
    }
    
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(')', ` / ${particle.opacity})`).replace('hsl', 'hsla');
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Hero entrance animations
  useEffect(() => {
    const hero = heroContentRef.current;
    if (!hero) return;
    
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.hero-logo', { opacity: 0, scale: 0.8, filter: 'blur(10px)' });
      gsap.set('.hero-badge', { opacity: 0, x: 20 });
      gsap.set('.hero-line-1', { opacity: 0, y: 60, filter: 'blur(8px)' });
      gsap.set('.hero-line-2', { opacity: 0, y: 60, filter: 'blur(8px)' });
      gsap.set('.hero-line-3', { opacity: 0, y: 60, filter: 'blur(8px)' });
      gsap.set('.hero-tagline', { opacity: 0, y: 30 });
      gsap.set('.hero-stats', { opacity: 0, x: 40 });
      gsap.set('.hero-bottom', { opacity: 0, y: 20 });
      gsap.set('.hero-scroll', { opacity: 0 });
      
      // Create timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.to('.hero-logo', { 
        opacity: 1, scale: 1, filter: 'blur(0px)', 
        duration: 0.8 
      })
      .to('.hero-badge', { 
        opacity: 1, x: 0, 
        duration: 0.6 
      }, '-=0.4')
      .to('.hero-line-1', { 
        opacity: 1, y: 0, filter: 'blur(0px)', 
        duration: 0.8 
      }, '-=0.3')
      .to('.hero-line-2', { 
        opacity: 1, y: 0, filter: 'blur(0px)', 
        duration: 0.8 
      }, '-=0.5')
      .to('.hero-line-3', { 
        opacity: 1, y: 0, filter: 'blur(0px)', 
        duration: 0.8 
      }, '-=0.5')
      .to('.hero-tagline', { 
        opacity: 1, y: 0, 
        duration: 0.6 
      }, '-=0.4')
      .to('.hero-stats', { 
        opacity: 1, x: 0, 
        duration: 0.8,
        stagger: 0.1 
      }, '-=0.5')
      .to('.hero-bottom', { 
        opacity: 1, y: 0, 
        duration: 0.6 
      }, '-=0.4')
      .to('.hero-scroll', { 
        opacity: 1, 
        duration: 0.8 
      }, '-=0.2');
    }, hero);
    
    return () => ctx.revert();
  }, []);
  
  const scrollToContent = () => {
    document.getElementById('the-problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Navigation Sidebar */}
      <Navigation />
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {/* Navigation overlays */}
        <QuickNav />
        <ChapterProgress />
      
      {/* ═══════════════════════════════════════════════════════════════
          HERO — BOLD STATEMENT
      ═══════════════════════════════════════════════════════════════ */}
      <section className="min-h-screen flex flex-col justify-center relative bg-slate-950 overflow-hidden">
        {/* Layered backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,hsl(125_50%_40%/0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,hsl(90_60%_45%/0.06),transparent)]" />
        
        {/* Particle canvas for slurry/density visualization */}
        <canvas 
          ref={particlesRef} 
          className="absolute inset-0 pointer-events-none" 
          style={{ opacity: 0.5 }}
        />
        
        {/* Grid overlay for industrial feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(hsl(125 50% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(125 50% 40%) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Ultrasonic wave arcs - starting from bottom-right corner */}
        <div className="absolute inset-0 overflow-hidden">
          <svg 
            ref={waveRef}
            className="absolute bottom-0 right-0 w-[120vw] h-[120vh] md:w-[100vw] md:h-[100vh]" 
            viewBox="0 0 1000 1000" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'translate(20%, 20%)' }}
          >
            {/* Dense concentric arcs - strong start, fading out */}
            <circle className="wave-arc" cx="1000" cy="1000" r="30" stroke="hsl(125 50% 45%)" strokeWidth="2.5" opacity="0.7" />
            <circle className="wave-arc" cx="1000" cy="1000" r="55" stroke="hsl(125 50% 45%)" strokeWidth="2.2" opacity="0.6" />
            <circle className="wave-arc" cx="1000" cy="1000" r="80" stroke="hsl(125 50% 44%)" strokeWidth="2" opacity="0.55" />
            <circle className="wave-arc" cx="1000" cy="1000" r="105" stroke="hsl(125 50% 43%)" strokeWidth="1.8" opacity="0.5" />
            <circle className="wave-arc" cx="1000" cy="1000" r="130" stroke="hsl(125 50% 42%)" strokeWidth="1.6" opacity="0.45" />
            <circle className="wave-arc" cx="1000" cy="1000" r="155" stroke="hsl(125 50% 41%)" strokeWidth="1.5" opacity="0.4" />
            <circle className="wave-arc" cx="1000" cy="1000" r="180" stroke="hsl(125 50% 40%)" strokeWidth="1.4" opacity="0.35" />
            <circle className="wave-arc" cx="1000" cy="1000" r="205" stroke="hsl(125 50% 40%)" strokeWidth="1.3" opacity="0.3" />
            <circle className="wave-arc" cx="1000" cy="1000" r="230" stroke="hsl(125 50% 40%)" strokeWidth="1.2" opacity="0.25" />
            <circle className="wave-arc" cx="1000" cy="1000" r="255" stroke="hsl(125 50% 40%)" strokeWidth="1.1" opacity="0.2" />
            <circle className="wave-arc" cx="1000" cy="1000" r="280" stroke="hsl(125 50% 40%)" strokeWidth="1" opacity="0.17" />
            <circle className="wave-arc" cx="1000" cy="1000" r="305" stroke="hsl(125 50% 40%)" strokeWidth="0.9" opacity="0.14" />
            <circle className="wave-arc" cx="1000" cy="1000" r="330" stroke="hsl(125 50% 40%)" strokeWidth="0.8" opacity="0.12" />
            <circle className="wave-arc" cx="1000" cy="1000" r="355" stroke="hsl(125 50% 40%)" strokeWidth="0.7" opacity="0.1" />
            <circle className="wave-arc" cx="1000" cy="1000" r="380" stroke="hsl(125 50% 40%)" strokeWidth="0.65" opacity="0.08" />
            <circle className="wave-arc" cx="1000" cy="1000" r="405" stroke="hsl(125 50% 40%)" strokeWidth="0.6" opacity="0.07" />
            <circle className="wave-arc" cx="1000" cy="1000" r="430" stroke="hsl(125 50% 40%)" strokeWidth="0.55" opacity="0.06" />
            <circle className="wave-arc" cx="1000" cy="1000" r="455" stroke="hsl(125 50% 40%)" strokeWidth="0.5" opacity="0.05" />
            <circle className="wave-arc" cx="1000" cy="1000" r="480" stroke="hsl(125 50% 40%)" strokeWidth="0.45" opacity="0.04" />
            <circle className="wave-arc" cx="1000" cy="1000" r="505" stroke="hsl(125 50% 40%)" strokeWidth="0.4" opacity="0.035" />
            
            {/* Secondary wave set interlaced - lime accent */}
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="42" stroke="hsl(90 60% 50%)" strokeWidth="1.2" opacity="0.4" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="92" stroke="hsl(90 60% 48%)" strokeWidth="1.1" opacity="0.32" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="142" stroke="hsl(90 60% 46%)" strokeWidth="1" opacity="0.25" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="192" stroke="hsl(90 60% 45%)" strokeWidth="0.9" opacity="0.2" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="242" stroke="hsl(90 60% 45%)" strokeWidth="0.8" opacity="0.15" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="292" stroke="hsl(90 60% 45%)" strokeWidth="0.7" opacity="0.12" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="342" stroke="hsl(90 60% 45%)" strokeWidth="0.6" opacity="0.08" />
            <circle className="wave-arc-secondary" cx="1000" cy="1000" r="392" stroke="hsl(90 60% 45%)" strokeWidth="0.5" opacity="0.06" />
          </svg>
        </div>
        
        {/* Floating accent shapes */}
        <div className="absolute top-1/4 left-[10%] w-32 h-32 border border-primary/20 rounded-full blur-[1px] opacity-40" />
        <div className="absolute bottom-1/3 left-[15%] w-2 h-2 bg-primary rounded-full opacity-60" />
        <div className="absolute top-1/3 right-[25%] w-1.5 h-1.5 bg-rho-green-accent rounded-full opacity-50" />
        
        {/* Content */}
        <div ref={heroContentRef} className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Top bar with document type */}
            <div className="flex items-center justify-end mb-16 md:mb-24">
              <div className="hero-badge hidden sm:flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="font-data text-xs text-slate-400 tracking-widest">BRAND GUIDELINES V.2025</span>
              </div>
            </div>
            
            {/* Main headline - dramatic sizing */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <div className="lg:col-span-8">
                <h1 className="font-ui text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight">
                  <span className="hero-line-1 block">We measure</span>
                  <span className="hero-line-2 relative inline-block">
                    <span className="bg-gradient-to-r from-rho-green-accent via-primary to-rho-green bg-clip-text text-transparent">
                      what others
                    </span>
                  </span>
                  <br />
                  <span className="hero-line-3 bg-gradient-to-r from-primary to-rho-green-accent bg-clip-text text-transparent inline-block">
                    can't.
                  </span>
                </h1>
                
                <p className="hero-tagline text-lg md:text-xl text-slate-400 max-w-xl mt-8 leading-relaxed">
                  Ultrasonic precision for industries where measurement isn't optional—it's operational.
                </p>
              </div>
              
              {/* Right side stats */}
              <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-slate-800 lg:pl-8">
                <div className="hero-stats group">
                  <span className="font-data text-[10px] text-slate-500 tracking-widest block mb-1">ESTABLISHED</span>
                  <p className="text-white font-ui text-4xl md:text-5xl font-light">1984</p>
                </div>
                <div className="hero-stats group">
                  <span className="font-data text-[10px] text-slate-500 tracking-widest block mb-1">HEADQUARTERS</span>
                  <p className="text-white font-ui text-2xl md:text-3xl font-light">Netherlands</p>
                </div>
                <div className="hero-stats group">
                  <span className="font-data text-[10px] text-slate-500 tracking-widest block mb-1">SPECIALIZATION</span>
                  <p className="text-white font-ui text-xl md:text-2xl font-light">Ultrasonic Density</p>
                </div>
              </div>
            </div>
            
            {/* Bottom bar */}
            <div className="hero-bottom mt-16 md:mt-24 flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-slate-800/50">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="w-12 h-px bg-gradient-to-r from-earth-ochre to-transparent" />
                <span className="font-data tracking-wide text-xs">FROM GARAGE TO GLOBAL</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 text-slate-500">
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  <span className="font-data text-[10px] tracking-wider">40+ YEARS</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-500">
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  <span className="font-data text-[10px] tracking-wider">NON-INVASIVE</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-500">
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                  <span className="font-data text-[10px] tracking-wider">ZERO RADIATION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToContent}
          className="hero-scroll absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-primary transition-colors cursor-pointer group"
          aria-label="Scroll to content"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-data text-[10px] tracking-widest opacity-60">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
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
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 md:p-10 bg-card border border-border rounded-xl group hover:border-slate-300 transition-colors">
                <span className="font-data text-4xl text-slate-300 font-light">01</span>
                <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mt-4 mb-4">Invasive sensors fail</h3>
                <p className="text-slate-600 leading-relaxed">Contact-based measurement degrades in corrosive, abrasive, or high-temperature slurries. Downtime follows.</p>
              </div>
              <div className="p-8 md:p-10 bg-card border border-border rounded-xl group hover:border-slate-300 transition-colors">
                <span className="font-data text-4xl text-slate-300 font-light">02</span>
                <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mt-4 mb-4">Lab sampling lags</h3>
                <p className="text-slate-600 leading-relaxed">Grab samples can't capture real-time process dynamics. By the time results arrive, the process has moved on.</p>
              </div>
              <div className="p-8 md:p-10 bg-card border border-border rounded-xl group hover:border-slate-300 transition-colors">
                <span className="font-data text-4xl text-slate-300 font-light">03</span>
                <h3 className="font-ui text-xl md:text-2xl font-semibold text-foreground mt-4 mb-4">Nuclear is complex</h3>
                <p className="text-slate-600 leading-relaxed">Radioactive density gauges require licensing, safety protocols, and specialized handling. Overkill for most applications.</p>
              </div>
            </div>
          </div>
        </section>

        <ChapterDivider />

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
            
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left content */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center shadow-glow-sm">
                    <RhosonicsLogo variant="gradient" className="w-12 h-12" />
                  </div>
                  <div>
                    <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground">SDM ECO</h3>
                    <span className="font-data text-xs text-slate-500 tracking-wider">ULTRASONIC DENSITY MEASUREMENT</span>
                  </div>
                </div>
                
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>Sound waves travel through the pipe wall, measuring slurry density from the outside. The sensor never touches the process fluid.</p>
                  <p>No process penetration means no wear, no clogging, no contamination risk. The measurement keeps running while competitors' sensors get replaced.</p>
                </div>
              </div>
                
              {/* Right stats grid */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 via-primary/8 to-primary/5 border border-primary/20 rounded-2xl shadow-glow-sm group hover:border-primary/40 transition-colors">
                    <span className="font-data text-4xl md:text-5xl text-primary font-bold block mb-3">±0.5%</span>
                    <p className="text-sm md:text-base text-slate-600">Measurement precision across full density range</p>
                  </div>
                  <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 via-primary/8 to-primary/5 border border-primary/20 rounded-2xl shadow-glow-sm group hover:border-primary/40 transition-colors">
                    <span className="font-data text-4xl md:text-5xl text-primary font-bold block mb-3">99.8%</span>
                    <p className="text-sm md:text-base text-slate-600">Uptime—no process interruption required</p>
                  </div>
                  <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 via-primary/8 to-primary/5 border border-primary/20 rounded-2xl shadow-glow-sm group hover:border-primary/40 transition-colors">
                    <span className="font-data text-4xl md:text-5xl text-primary font-bold block mb-3">40+</span>
                    <p className="text-sm md:text-base text-slate-600">Years of field-proven technology</p>
                  </div>
                  <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 via-primary/8 to-primary/5 border border-primary/20 rounded-2xl shadow-glow-sm group hover:border-primary/40 transition-colors">
                    <span className="font-data text-4xl md:text-5xl text-primary font-bold block mb-3">0</span>
                    <p className="text-sm md:text-base text-slate-600">Radiation licensing requirements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ChapterDivider />

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

          <div className="mt-8">
            <Suspense fallback={<SectionLoader />}>
              <OriginStory />
              <MissionVision />
            </Suspense>
          </div>
        </section>

        <ChapterDivider />

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

        <ChapterDivider />

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

        <ChapterDivider />

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

        <ChapterDivider />

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
            <Suspense fallback={<SectionLoader />}>
              <BrandGallery />
            </Suspense>
          </div>
        </section>

        <ChapterDivider />

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
                <p className="font-logo font-semibold text-foreground tracking-wide uppercase">RHOSONICS</p>
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
    </div>
  );
};

export default Index;
