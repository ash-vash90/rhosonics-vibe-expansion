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
          <div ref={heroContentRef} className="hero-content relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            {/* Oversized background data mark */}
            <div aria-hidden="true" className="pointer-events-none select-none absolute -top-8 -left-2 lg:-top-12 lg:-left-4 font-data font-black uppercase leading-none text-white/[0.03] text-[120px] md:text-[180px] lg:text-[240px]">
              Ref_00
            </div>

            <div className="relative grid grid-cols-12 gap-y-12 items-end">
              {/* Left: logo + technical markers */}
              <div className="hero-logo col-span-12 lg:col-span-5 flex flex-col gap-6 lg:gap-8 text-left">
                <div className="flex items-start gap-5 lg:gap-6">
                  <div className="w-[64px] h-[64px] lg:w-[88px] lg:h-[88px] shrink-0">
                    <AnimatedLogo ref={heroLogoRef} variant="gradient" startHidden withGlow />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="font-data text-[10px] uppercase tracking-[0.3em] text-primary mb-1">Origin Node</span>
                    <span className={`font-logo text-white text-base md:text-lg lg:text-xl ${isPrimetime ? "tracking-normal" : "tracking-wide"} uppercase mb-2`}>
                      {isPrimetime ? (
                        <span className="wordmark-char inline-block">RHOSONICS</span>
                      ) : (
                        "RHOSONICS".split("").map((char, i) => (
                          <span key={i} className="wordmark-char inline-block">{char}</span>
                        ))
                      )}
                    </span>
                    <span className="font-data text-[11px] text-slate-500 uppercase tracking-widest">52.2343° N / 5.1764° E</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-slate-700 to-transparent" />

                <p className="hero-subtitle max-w-md text-slate-400 text-base lg:text-lg leading-relaxed">
                  The foundational logic and aesthetic framework for the global <span className="text-white">Rhosonics</span> identity. Engineered for clarity in industrial sensing environments.
                </p>
              </div>

              {/* Right: headline */}
              <div className="col-span-12 lg:col-span-7 flex flex-col items-start lg:items-end text-left lg:text-right">
                <h1 className="hero-title font-ui font-black text-white leading-[0.85] tracking-tighter uppercase text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                  Brand<br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px hsl(0 0% 100% / 0.3)" }}>Guidelines</span>
                </h1>

                <div className="hero-version mt-8 lg:mt-12 flex gap-3">
                  <div className="px-3 py-1 bg-slate-900/80 border border-slate-800 font-data text-[10px] text-slate-400 tracking-widest uppercase rounded-md">Version 2025</div>
                  <div className="px-3 py-1 bg-primary/10 border border-primary/20 font-data text-[10px] text-primary tracking-widest uppercase rounded-md">Stable Build</div>
                </div>
              </div>

              {/* Telemetry footer */}
              <div className="hero-scroll col-span-12 mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 border-t border-slate-800 pt-6 lg:pt-8">
                {[
                  ["Visual System", "Precision Metrics"],
                  ["Core Font", "Instrument Sans"],
                  ["Color Palette", "Obsidian & Green"],
                  ["Layout Grid", "Asymmetric 12-Col"],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <span className="font-data text-[10px] text-slate-600 uppercase tracking-tight">{k}</span>
                    <span className="text-sm text-slate-300 font-medium">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corner accents */}
            <div aria-hidden="true" className="absolute -top-2 -left-2 w-3 h-3 border-t border-l border-slate-700" />
            <div aria-hidden="true" className="absolute -top-2 -right-2 w-3 h-3 border-t border-r border-slate-700" />
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
