import { Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy, useRef, useEffect } from "react";
import { Navigation } from "./Navigation";
import { FontSelector } from "./FontSelector";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { AnimatedLogo, AnimatedLogoRef } from "../AnimatedLogo";
import { ErrorBoundary } from "../ErrorBoundary";
import { useFontMode } from "@/hooks/useFontMode";
import { cleanupAllGsap } from "@/hooks/useGsapCleanup";
import { loadGsap } from "./SectionUtils";
import { CursorFollower } from "./CursorFollower";

const HeroParticles = lazy(() => import("@/components/brand/HeroParticles"));

const BrandLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroLogoRef = useRef<AnimatedLogoRef>(null);
  const { logoFont } = useFontMode();
  const isPrimetime = logoFont === "primetime";

  // Hero entrance animations (only on home)
  useEffect(() => {
    if (!isHome) return;
    const hero = heroContentRef.current;
    if (!hero) return;

    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    const setupAnimations = async () => {
      const gsap = await loadGsap();
      if (cancelled) return;

      ctx = gsap.context(() => {
        gsap.set(".hero-logo", { autoAlpha: 0 });
        gsap.set(".wordmark-char", { opacity: 0, x: -20, filter: "blur(8px)" });
        gsap.set(".hero-version", { opacity: 0, y: -10 });
        gsap.set(".hero-title", { opacity: 0, y: 40, filter: "blur(8px)" });
        gsap.set(".hero-subtitle", { opacity: 0, y: 30 });
        gsap.set(".hero-scroll", { opacity: 0 });

        const textTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        textTl
          .to(".wordmark-char", { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.3, stagger: 0.03, ease: "power2.out" })
          .to(".hero-version", { opacity: 1, y: 0, duration: 0.35 }, "-=0.15")
          .to(".hero-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45 }, "-=0.2")
          .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.35 }, "-=0.25")
          .to(".hero-scroll", { opacity: 1, duration: 0.4 }, "-=0.15");

        const startText = () => textTl.play(0);

        gsap.to(".hero-logo", {
          autoAlpha: 1, duration: 0.12, delay: 0.1,
          onStart: () => {
            const logo = heroLogoRef.current;
            if (!logo) { gsap.delayedCall(1, startText); return; }
            logo.play({ onComplete: startText });
          },
        });
      }, hero);
    };

    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setupAnimations(), { timeout: 150 });
      return () => { cancelled = true; cancelIdleCallback(id); ctx?.revert(); };
    } else {
      const tid = setTimeout(() => setupAnimations(), 50);
      return () => { cancelled = true; clearTimeout(tid); ctx?.revert(); };
    }
  }, [isHome]);

  useEffect(() => () => { cleanupAllGsap(); }, []);



  return (
    <div className="min-h-screen bg-background">
      <CursorFollower />
      <FontSelector />

      {/* Hero */}
      {isHome && (
        <section className="relative bg-rho-obsidian text-slate-100 overflow-hidden min-h-screen flex items-center justify-center">
          {/* Gaussian blur orb */}
          <div className="hero-blur-orb -top-40 -right-40 lg:right-10 lg:top-20" />
          <div className="hero-blur-orb bottom-0 -left-60 lg:left-20 lg:bottom-10 opacity-50" style={{ width: 400, height: 400 }} />
          <Suspense fallback={null}><HeroParticles /></Suspense>
          <div ref={heroContentRef} className="hero-content relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
            {/* Oversized background data mark */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute -top-4 -left-2 lg:-top-6 lg:-left-4 font-data font-black uppercase leading-none text-white/[0.025] text-[120px] md:text-[180px] lg:text-[240px]">
              Ref_00
            </div>

            <div className="relative grid grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
              {/* LEFT — editorial headline + CTAs + stats */}
              <div className="col-span-12 lg:col-span-7 flex flex-col gap-8 lg:gap-10">
                {/* Eyebrow */}
                <div className="hero-logo flex items-center gap-3 font-data text-[11px] uppercase tracking-[0.3em] text-slate-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span>Brand System</span>
                  <span className="text-slate-700">·</span>
                  <span>Version 2025</span>
                </div>

                {/* Headline with green emphasis */}
                <h1 className="hero-title font-ui font-bold text-white leading-[0.95] tracking-tight text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  A system of decisions for what your <span className="text-primary">brand</span> is really doing.
                </h1>

                {/* Subtitle */}
                <p className="hero-subtitle max-w-xl text-slate-400 text-base lg:text-lg leading-relaxed">
                  The operational visual language behind every Rhosonics surface — from instrument HMIs and datasheets to pitch decks and field reports. Built for clarity, calibrated for credibility.
                </p>

                {/* CTA row */}
                <div className="hero-version flex flex-wrap items-center gap-3">
                  <a href="#about" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-ui font-medium text-sm rounded-md hover:bg-primary/90 transition-colors">
                    Explore the system
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="/review" className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-700 text-slate-200 font-ui font-medium text-sm rounded-md hover:border-slate-500 transition-colors">
                    Download assets
                  </a>
                </div>

                {/* Stat strip */}
                <div className="hero-scroll mt-2 grid grid-cols-3 gap-6 lg:gap-8 border-t border-slate-800 pt-6">
                  {[
                    ["10,000+", "Installations\nworldwide"],
                    ["±0.1%", "Density accuracy,\ndrift-free"],
                    ["34 yrs", "Ultrasonic R&D\nDelft, NL"],
                  ].map(([num, label]) => (
                    <div key={num} className="flex flex-col gap-1">
                      <span className="font-data font-medium text-white text-2xl lg:text-3xl tracking-tight leading-none">{num}</span>
                      <span className="font-data text-[10px] uppercase tracking-widest text-slate-500 leading-snug whitespace-pre-line">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — telemetry HMI mock */}
              <div className="hero-version col-span-12 lg:col-span-5 lg:pt-2">
                <div className="relative bg-rho-obsidian-light border border-slate-800 rounded-md p-5 lg:p-6">
                  {/* Bracket corners */}
                  <div aria-hidden="true" className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-primary/60" />
                  <div aria-hidden="true" className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-primary/60" />
                  <div aria-hidden="true" className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-primary/60" />
                  <div aria-hidden="true" className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-primary/60" />

                  {/* Header bar */}
                  <div className="flex items-center justify-between font-data text-[10px] uppercase tracking-widest text-slate-500 mb-5">
                    <span>SDM ECO · BRAND.RHOSONICS · GUIDELINES</span>
                    <span className="flex items-center gap-1.5 text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> LIVE
                    </span>
                  </div>

                  {/* Two metric tiles */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-rho-obsidian rounded-md p-3">
                      <div className="font-data text-[10px] uppercase tracking-widest text-slate-500 mb-2">Density</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-data font-medium text-white text-3xl tracking-tight">1.483</span>
                        <span className="font-data text-[10px] uppercase text-slate-500 tracking-widest">SG</span>
                      </div>
                      <div className="font-data text-[10px] text-primary mt-1">▲ +0.012 vs target</div>
                    </div>
                    <div className="bg-rho-obsidian rounded-md p-3">
                      <div className="font-data text-[10px] uppercase tracking-widest text-slate-500 mb-2">Solids</div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-data font-medium text-white text-3xl tracking-tight">38.4</span>
                        <span className="font-data text-[10px] uppercase text-slate-500 tracking-widest">%w/w</span>
                      </div>
                      <div className="font-data text-[10px] text-slate-400 mt-1">Within spec</div>
                    </div>
                  </div>

                  {/* Waveform */}
                  <div className="bg-rho-obsidian rounded-md p-3 mb-3">
                    <div className="flex items-center justify-between font-data text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                      <span>Signal Waveform</span>
                      <span>2.0 MHz · 48 kS/s</span>
                    </div>
                    <svg viewBox="0 0 300 60" className="w-full h-14" aria-hidden="true">
                      <defs>
                        <linearGradient id="wfFade" x1="0" x2="1">
                          <stop offset="0" stopColor="hsl(125 50% 40%)" stopOpacity="0.1" />
                          <stop offset="0.5" stopColor="hsl(125 50% 40%)" stopOpacity="1" />
                          <stop offset="1" stopColor="hsl(125 50% 40%)" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 30 Q 15 30 20 30 T 40 30 Q 55 5 60 30 Q 65 55 70 30 Q 75 10 80 30 Q 85 50 90 30 T 110 30 Q 130 30 140 30 Q 155 12 160 30 Q 165 48 170 30 Q 175 18 180 30 T 200 30 Q 220 30 230 30 Q 245 22 250 30 Q 255 38 260 30 T 300 30"
                        stroke="url(#wfFade)" strokeWidth="1.5" fill="none"
                      />
                      {[...Array(20)].map((_, i) => (
                        <line key={i} x1={i * 15} y1="0" x2={i * 15} y2="60" stroke="hsl(0 0% 100% / 0.04)" strokeWidth="0.5" />
                      ))}
                    </svg>
                  </div>

                  {/* Footer telemetry row */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      ["Temp", "25.73 °C"],
                      ["Sonic vel.", "1512 m/s"],
                      ["Uptime", "423 d"],
                      ["Status", "NOMINAL"],
                    ].map(([k, v], i) => (
                      <div key={k} className="bg-rho-obsidian rounded-md p-2.5">
                        <div className="font-data text-[9px] uppercase tracking-widest text-slate-500 mb-1">{k}</div>
                        <div className={`font-data text-xs ${i === 3 ? "text-primary" : "text-white"}`}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Logo + origin marker beneath HMI */}
                <div className="hero-logo flex items-center gap-3 mt-5 font-data text-[10px] uppercase tracking-widest text-slate-500">
                  <div className="w-5 h-5"><AnimatedLogo ref={heroLogoRef} variant="gradient" startHidden /></div>
                  <span className={`font-logo text-slate-300 text-xs ${isPrimetime ? "tracking-normal" : "tracking-wide"}`}>RHOSONICS</span>
                  <span className="text-slate-700">·</span>
                  <span>Origin · 52.2343° N / 5.1764° E</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content with sidebar */}
      <div className="flex min-h-screen items-start">
        <Navigation />
        <main className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 xl:px-20 max-w-[1400px] mx-auto overflow-x-hidden">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>

          {/* Footer */}
          <footer className="mt-12 py-10 border-t border-border" role="contentinfo">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-[22px] h-[22px]"><RhosonicsLogo variant="dark" /></div>
                <div>
                  <span className={`font-logo ${isPrimetime ? 'tracking-normal' : 'tracking-wide'} text-foreground text-base`}>RHOSONICS</span>
                  <span className="font-data text-xs text-muted-foreground ml-2">BRAND SYSTEM</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-data text-xs">© {new Date().getFullYear()} RHOSONICS B.V.</span>
                <span className="mx-2 text-border">|</span>
                <span className="font-data text-xs">VERSION 2025</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BrandLayout;
