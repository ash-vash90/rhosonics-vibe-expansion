import { Printer, FileText, CheckCircle } from "lucide-react";
import { RhosonicsLogo } from "../RhosonicsLogo";

const PrintedMaterials = () => {
  return (
    <div className="mt-16 md:mt-24">
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="font-data text-xs text-muted-foreground tracking-wider">09.3</span>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent max-w-16" />
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Printer className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground">Printed Materials</h3>
        </div>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Physical brand touchpoints for trade shows, events, and corporate communications. 
          Each piece reinforces Rhosonics' precision engineering identity.
        </p>
      </div>

      {/* Mockups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        
        {/* Roll-Up Banner */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-data text-xs text-foreground font-medium tracking-wider">ROLL-UP BANNER</span>
              <span className="font-data text-[10px] text-muted-foreground">85 × 200 cm</span>
            </div>
          </div>
          <div className="flex justify-center p-10 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-border/50 shadow-sm">
            {/* Banner Assembly */}
            <div className="relative">
              {/* Stand base - refined metallic look */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-3 bg-gradient-to-b from-slate-400 to-slate-500 rounded-full shadow-lg" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-gradient-to-b from-slate-400 to-slate-600 rounded-sm" />
              
              {/* Banner */}
              <div 
                className="w-36 h-[360px] rounded-t-sm relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(180deg, hsl(210 15% 10%) 0%, hsl(210 20% 8%) 100%)',
                  boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset' 
                }}
              >
                {/* Subtle noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")' }} />
                
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/15 to-transparent" />
                
                {/* Wave pattern - brand signature */}
                <div className="absolute top-1/3 -left-4 -right-4">
                  <svg viewBox="0 0 150 50" className="w-[120%] h-20 text-primary" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                        <stop offset="30%" stopColor="currentColor" stopOpacity="0.4" />
                        <stop offset="70%" stopColor="currentColor" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 25 Q 18.75 10, 37.5 25 T 75 25 T 112.5 25 T 150 25" 
                      fill="none" 
                      stroke="url(#waveGradient1)" 
                      strokeWidth="1.5"
                    />
                    <path 
                      d="M0 30 Q 18.75 15, 37.5 30 T 75 30 T 112.5 30 T 150 30" 
                      fill="none" 
                      stroke="url(#waveGradient1)" 
                      strokeWidth="0.8"
                      opacity="0.5"
                    />
                    <path 
                      d="M0 35 Q 18.75 20, 37.5 35 T 75 35 T 112.5 35 T 150 35" 
                      fill="none" 
                      stroke="url(#waveGradient1)" 
                      strokeWidth="0.4"
                      opacity="0.25"
                    />
                  </svg>
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-between py-10 px-5">
                  {/* Logo lockup - 140% ratio: 10px text → 14px icon */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-4 h-4">
                      <RhosonicsLogo variant="gradient" />
                    </div>
                    <span className="font-logo tracking-[0.15em] text-white text-[10px]">RHOSONICS</span>
                  </div>
                  
                  {/* Central message */}
                  <div className="text-center space-y-3">
                    <p className="font-ui text-xs text-white/90 font-medium tracking-wide leading-relaxed">
                      PRECISION<br />MEASUREMENT<br />TECHNOLOGY
                    </p>
                    <div className="w-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                  </div>
                  
                  {/* Tagline */}
                  <p className="font-data text-[6px] text-white/40 tracking-widest">
                    INDUSTRIAL SOLUTIONS
                  </p>
                </div>
                
                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary to-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Business Cards */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-data text-xs text-foreground font-medium tracking-wider">BUSINESS CARDS</span>
              <span className="font-data text-[10px] text-muted-foreground">90 × 55 mm</span>
            </div>
          </div>
          <div className="flex justify-center items-center p-10 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-border/50 shadow-sm min-h-[420px]">
            <div className="relative perspective-1000">
              {/* Back card (offset) - shows reverse side */}
              <div 
                className="absolute top-6 left-6 w-64 h-36 rounded-lg overflow-hidden"
                style={{ 
                  transform: 'rotate(-8deg)',
                  background: 'linear-gradient(135deg, hsl(88 60% 45%) 0%, hsl(125 50% 40%) 100%)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' 
                }}
              >
                {/* Wave pattern on back */}
                <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full text-white opacity-10">
                  <path d="M0 50 Q 25 30, 50 50 T 100 50 T 150 50 T 200 50" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M0 60 Q 25 40, 50 60 T 100 60 T 150 60 T 200 60" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              
              {/* Front card */}
              <div 
                className="relative w-64 h-36 rounded-lg overflow-hidden"
                style={{ 
                  transform: 'rotate(4deg)',
                  background: 'linear-gradient(180deg, hsl(210 15% 12%) 0%, hsl(210 20% 8%) 100%)',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset' 
                }}
              >
                {/* Green left edge accent */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-primary to-emerald-600" />
                
                {/* Subtle corner accent */}
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-5 pl-6">
                  {/* Logo lockup - 140% ratio: 11px text → 15.4px icon (w-4) */}
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4">
                      <RhosonicsLogo variant="gradient" />
                    </div>
                    <span className="font-logo tracking-[0.12em] text-white text-[11px]">RHOSONICS</span>
                  </div>
                  
                  {/* Contact details */}
                  <div className="space-y-1.5">
                    <div>
                      <p className="font-ui text-sm text-white font-semibold">Jan van der Berg</p>
                      <p className="font-data text-[9px] text-primary tracking-wider">SENIOR ENGINEER</p>
                    </div>
                    <div className="pt-1.5 space-y-0.5 border-t border-white/10">
                      <p className="font-data text-[8px] text-white/60">j.vanderberg@rhosonics.com</p>
                      <p className="font-data text-[8px] text-white/60">+31 (0)55 123 4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Show Backdrop */}
        <div className="space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-data text-xs text-foreground font-medium tracking-wider">TRADE SHOW BACKDROP</span>
              <span className="font-data text-[10px] text-muted-foreground">3 × 2.4 m</span>
            </div>
          </div>
          <div className="flex justify-center p-8 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-border/50 shadow-sm">
            <div 
              className="w-full max-w-2xl aspect-[5/3] rounded-sm relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, hsl(210 15% 10%) 0%, hsl(210 20% 6%) 100%)',
                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset' 
              }}
            >
              {/* Noise texture */}
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")' }} />
              
              {/* Radial gradient glow */}
              <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" style={{ background: 'radial-gradient(ellipse at center, hsl(88 60% 45% / 0.08) 0%, transparent 60%)' }} />
              
              {/* Wave pattern - signature element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 600 150" className="w-[90%] h-32 text-primary" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                      <stop offset="20%" stopColor="currentColor" stopOpacity="0.25" />
                      <stop offset="50%" stopColor="currentColor" stopOpacity="0.35" />
                      <stop offset="80%" stopColor="currentColor" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0 75 Q 37.5 40, 75 75 T 150 75 T 225 75 T 300 75 T 375 75 T 450 75 T 525 75 T 600 75" 
                    fill="none" 
                    stroke="url(#waveGradient2)" 
                    strokeWidth="3"
                  />
                  <path 
                    d="M0 85 Q 37.5 50, 75 85 T 150 85 T 225 85 T 300 85 T 375 85 T 450 85 T 525 85 T 600 85" 
                    fill="none" 
                    stroke="url(#waveGradient2)" 
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                  <path 
                    d="M0 95 Q 37.5 60, 75 95 T 150 95 T 225 95 T 300 95 T 375 95 T 450 95 T 525 95 T 600 95" 
                    fill="none" 
                    stroke="url(#waveGradient2)" 
                    strokeWidth="0.8"
                    opacity="0.3"
                  />
                </svg>
              </div>
              
              {/* Central lockup - 140% ratio: 28px text → 39.2px icon (w-10) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10">
                    <RhosonicsLogo variant="gradient" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-logo tracking-[0.15em] text-white text-2xl md:text-3xl">RHOSONICS</span>
                    <p className="font-data text-[10px] text-white/40 tracking-[0.3em]">PRECISION MEASUREMENT TECHNOLOGY</p>
                  </div>
                </div>
              </div>
              
              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary to-emerald-600" />
              
              {/* Corner accent marks */}
              <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-white/10" />
              <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-white/10" />
              <div className="absolute bottom-8 left-6 w-8 h-8 border-l-2 border-b-2 border-white/10" />
              <div className="absolute bottom-8 right-6 w-8 h-8 border-r-2 border-b-2 border-white/10" />
            </div>
          </div>
        </div>

        {/* Brochure Cover */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-data text-xs text-foreground font-medium tracking-wider">BROCHURE COVER</span>
              <span className="font-data text-[10px] text-muted-foreground">A4 Portrait</span>
            </div>
          </div>
          <div className="flex justify-center p-8 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-border/50 shadow-sm">
            <div 
              className="w-44 aspect-[210/297] rounded-sm relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(180deg, hsl(210 15% 11%) 0%, hsl(210 20% 7%) 100%)',
                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset' 
              }}
            >
              {/* Diagonal geometric accent */}
              <div 
                className="absolute -bottom-32 -right-32 w-64 h-64 opacity-30"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(88 60% 45%) 0%, hsl(125 50% 40%) 100%)',
                  transform: 'rotate(45deg)' 
                }}
              />
              
              {/* Wave accent */}
              <svg viewBox="0 0 100 200" className="absolute right-0 top-1/4 h-40 w-24 text-primary opacity-20">
                <path d="M50 0 Q 80 25, 50 50 T 50 100 T 50 150 T 50 200" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M60 0 Q 90 25, 60 50 T 60 100 T 60 150 T 60 200" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </svg>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 z-10">
                {/* Logo - 140% ratio: 10px text → 14px icon (w-3.5) */}
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5">
                    <RhosonicsLogo variant="gradient" />
                  </div>
                  <span className="font-logo tracking-[0.12em] text-white text-[10px]">RHOSONICS</span>
                </div>
                
                {/* Product title */}
                <div className="space-y-2">
                  <p className="font-ui text-lg text-white font-bold leading-tight">
                    SDM ECO
                  </p>
                  <p className="font-ui text-xs text-white/70">
                    Slurry Density Meter
                  </p>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full" />
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between">
                  <p className="font-data text-[7px] text-white/30 tracking-widest">
                    TECHNICAL SPECIFICATIONS
                  </p>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Letterhead */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-data text-xs text-foreground font-medium tracking-wider">LETTERHEAD</span>
              <span className="font-data text-[10px] text-muted-foreground">A4 Portrait</span>
            </div>
          </div>
          <div className="flex justify-center p-8 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-border/50 shadow-sm">
            <div 
              className="w-44 aspect-[210/297] bg-white rounded-sm relative overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)' }}
            >
              {/* Green top accent bar with gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-emerald-500" />
              
              {/* Subtle watermark */}
              <div className="absolute top-1/3 right-0 w-32 h-32 opacity-[0.03]">
                <RhosonicsLogo variant="dark" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col p-5 pt-6">
                {/* Header - 140% ratio: 8px text → 11.2px icon (w-3) */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3">
                      <RhosonicsLogo variant="dark" />
                    </div>
                    <span className="font-logo tracking-[0.1em] text-slate-800 text-[8px]">RHOSONICS</span>
                  </div>
                  <div className="text-right">
                    <p className="font-data text-[5px] text-slate-400 tracking-wider">PUTTEN, NETHERLANDS</p>
                  </div>
                </div>
                
                {/* Date placeholder */}
                <div className="w-16 h-1 bg-slate-200 rounded-full mb-4" />
                
                {/* Body text placeholder */}
                <div className="flex-1 space-y-2">
                  <div className="w-1/3 h-1 bg-slate-300 rounded-full" />
                  <div className="h-4" />
                  <div className="space-y-1.5">
                    <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                    <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                    <div className="w-4/5 h-0.5 bg-slate-100 rounded-full" />
                    <div className="h-2" />
                    <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                    <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                    <div className="w-3/5 h-0.5 bg-slate-100 rounded-full" />
                  </div>
                </div>
                
                {/* Footer */}
                <div className="border-t border-slate-100 pt-3 flex justify-between items-end">
                  <div className="space-y-0.5">
                    <p className="font-data text-[5px] text-slate-500 font-medium">Rhosonics B.V.</p>
                    <p className="font-data text-[4px] text-slate-400">Putten, Netherlands</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="font-data text-[4px] text-primary">info@rhosonics.com</p>
                    <p className="font-data text-[4px] text-slate-400">rhosonics.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Envelope */}
        <div className="space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-data text-xs text-foreground font-medium tracking-wider">ENVELOPE</span>
              <span className="font-data text-[10px] text-muted-foreground">DL (220 × 110 mm)</span>
            </div>
          </div>
          <div className="flex justify-center p-8 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-border/50 shadow-sm">
            <div 
              className="w-full max-w-md aspect-[220/110] bg-white rounded-sm relative overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)' }}
            >
              {/* Green left edge accent */}
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-primary to-emerald-500" />
              
              {/* Envelope flap shadow hint */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-50 to-transparent" />
              
              {/* Diagonal flap line */}
              <svg viewBox="0 0 400 50" className="absolute top-0 left-0 right-0 w-full h-12 text-slate-100">
                <path d="M0 0 L200 40 L400 0" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 pl-8 z-10">
                {/* Logo - 140% ratio: 9px text → 12.6px icon (w-3.5) */}
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5">
                    <RhosonicsLogo variant="dark" />
                  </div>
                  <div>
                    <span className="font-logo tracking-[0.12em] text-slate-800 text-[9px]">RHOSONICS</span>
                    <p className="font-data text-[5px] text-slate-400 tracking-wider">PRECISION MEASUREMENT TECHNOLOGY</p>
                  </div>
                </div>
                
                {/* Address block placeholder */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/4 space-y-1">
                  <div className="w-24 h-1 bg-slate-200 rounded-full" />
                  <div className="w-28 h-1 bg-slate-200 rounded-full" />
                  <div className="w-20 h-1 bg-slate-200 rounded-full" />
                </div>
                
                {/* Stamp placeholder */}
                <div className="absolute top-6 right-6 w-10 h-12 border-2 border-dashed border-slate-200 rounded-sm flex items-center justify-center">
                  <span className="font-data text-[6px] text-slate-300">STAMP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Production Guidelines */}
      <div className="p-8 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-ui text-lg font-semibold text-foreground">Print Production Guidelines</h4>
            <p className="text-sm text-muted-foreground">Technical specifications for professional printing</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { text: "Use CMYK color profiles for all print production", detail: "sRGB → CMYK conversion required" },
            { text: "Maintain 300 DPI minimum resolution for photography", detail: "Vector assets preferred" },
            { text: "Include 3mm bleed on all edges", detail: "Plus 5mm safe zone" },
            { text: "Convert fonts to outlines before final submission", detail: "All brand fonts included" },
          ].map((guideline, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm text-foreground font-medium">{guideline.text}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{guideline.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Reference Note */}
      <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="w-4 h-4 rounded bg-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">CMYK Reference</p>
            <p className="text-sm text-muted-foreground">
              Brand Green (Rho Green) converts to approximately <span className="font-data text-foreground">C35 M0 Y100 K0</span>. 
              Always request a color proof before full production runs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintedMaterials;
