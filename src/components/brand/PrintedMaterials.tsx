import { Printer, FileText, CheckCircle } from "lucide-react";
import { RhosonicsLogo } from "../RhosonicsLogo";

const PrintedMaterials = () => {
  return (
    <div className="mt-16 md:mt-24">
      {/* Section Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="font-data text-xs text-muted-foreground">09.3</span>
          <div className="h-px flex-1 bg-border max-w-12" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <Printer className="w-6 h-6 text-primary" />
          <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground">Printed Materials</h3>
        </div>
        <p className="text-base text-muted-foreground max-w-2xl">
          Physical brand touchpoints for trade shows, events, and corporate communications.
        </p>
      </div>

      {/* Mockups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        
        {/* Roll-Up Banner */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-xs text-muted-foreground">ROLL-UP BANNER</span>
            <span className="font-data text-[10px] text-muted-foreground/60">85 × 200 cm</span>
          </div>
          <div className="flex justify-center p-8 bg-muted/30 rounded-lg border border-border">
            {/* Banner Stand */}
            <div className="relative">
              {/* Stand base */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-2 bg-slate-400 rounded-sm" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-slate-500" />
              
              {/* Banner */}
              <div 
                className="w-32 h-80 bg-rho-obsidian rounded-t-sm shadow-2xl flex flex-col items-center justify-between py-8 px-4 relative overflow-hidden"
                style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
              >
                {/* Wave pattern accent */}
                <div className="absolute top-1/3 left-0 right-0">
                  <svg viewBox="0 0 100 20" className="w-full h-8 text-primary opacity-40">
                    <path 
                      d="M0 10 Q 12.5 0, 25 10 T 50 10 T 75 10 T 100 10" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.5"
                    />
                    <path 
                      d="M0 12 Q 12.5 2, 25 12 T 50 12 T 75 12 T 100 12" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.3"
                      opacity="0.6"
                    />
                  </svg>
                </div>
                
                {/* Logo at top - 140% ratio: 8px text → 11.2px icon (using 12px/w-3) */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-3 h-3">
                    <RhosonicsLogo variant="gradient" />
                  </div>
                  <span className="font-logo tracking-wide text-white text-[8px]">RHOSONICS</span>
                </div>
                
                {/* Tagline */}
                <div className="text-center">
                  <p className="font-ui text-[6px] text-white/80 leading-relaxed">
                    PRECISION<br />MEASUREMENT<br />TECHNOLOGY
                  </p>
                </div>
                
                {/* Green accent bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Business Cards */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-xs text-muted-foreground">BUSINESS CARDS</span>
            <span className="font-data text-[10px] text-muted-foreground/60">90 × 55 mm</span>
          </div>
          <div className="flex justify-center items-center p-8 bg-muted/30 rounded-lg border border-border min-h-[384px]">
            <div className="relative">
              {/* Back card (offset) */}
              <div 
                className="absolute top-4 left-4 w-56 h-32 bg-rho-obsidian rounded-lg shadow-xl"
                style={{ transform: 'rotate(-6deg)' }}
              />
              
              {/* Front card */}
              <div 
                className="relative w-56 h-32 bg-rho-obsidian rounded-lg shadow-2xl flex flex-col justify-between p-4 overflow-hidden"
                style={{ transform: 'rotate(3deg)' }}
              >
                {/* Green edge accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                
                {/* Logo and name - 140% ratio: text-[10px] → 14px icon (w-3.5) */}
                <div className="flex items-start gap-1.5 pl-2">
                  <div className="w-3.5 h-3.5 mt-0.5">
                    <RhosonicsLogo variant="gradient" />
                  </div>
                  <div>
                    <span className="font-logo tracking-wide text-white text-[10px]">RHOSONICS</span>
                  </div>
                </div>
                
                {/* Contact info */}
                <div className="pl-2 space-y-0.5">
                  <p className="font-ui text-[8px] text-white font-medium">Jan van der Berg</p>
                  <p className="font-data text-[6px] text-white/60">SENIOR ENGINEER</p>
                  <div className="pt-1 space-y-0.5">
                    <p className="font-data text-[6px] text-white/50">j.vanderberg@rhosonics.com</p>
                    <p className="font-data text-[6px] text-white/50">+31 (0)55 123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Show Backdrop */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-xs text-muted-foreground">TRADE SHOW BACKDROP</span>
            <span className="font-data text-[10px] text-muted-foreground/60">3 × 2.4 m</span>
          </div>
          <div className="flex justify-center p-6 bg-muted/30 rounded-lg border border-border">
            <div 
              className="w-full max-w-md aspect-[4/3] bg-rho-obsidian rounded-sm shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}
            >
              {/* Wave pattern */}
              <div className="absolute inset-0 flex items-center">
                <svg viewBox="0 0 400 100" className="w-full h-24 text-primary opacity-30">
                  <path 
                    d="M0 50 Q 25 20, 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1"
                  />
                  <path 
                    d="M0 55 Q 25 25, 50 55 T 100 55 T 150 55 T 200 55 T 250 55 T 300 55 T 350 55 T 400 55" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="0.5"
                    opacity="0.6"
                  />
                  <path 
                    d="M0 60 Q 25 30, 50 60 T 100 60 T 150 60 T 200 60 T 250 60 T 300 60 T 350 60 T 400 60" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="0.3"
                    opacity="0.3"
                  />
                </svg>
              </div>
              
              {/* Logo lockup - 140% ratio: text-lg (18px) → 25.2px icon (using 28px/w-7) */}
              <div className="relative z-10 flex items-center gap-2">
                <div className="w-7 h-7">
                  <RhosonicsLogo variant="gradient" />
                </div>
                <div>
                  <span className="font-logo tracking-wide text-white text-lg">RHOSONICS</span>
                  <p className="font-data text-[8px] text-white/50 tracking-widest">PRECISION MEASUREMENT TECHNOLOGY</p>
                </div>
              </div>
              
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            </div>
          </div>
        </div>

        {/* Brochure Cover */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-xs text-muted-foreground">BROCHURE COVER</span>
            <span className="font-data text-[10px] text-muted-foreground/60">A4 Portrait</span>
          </div>
          <div className="flex justify-center p-6 bg-muted/30 rounded-lg border border-border">
            <div 
              className="w-40 aspect-[210/297] bg-rho-obsidian rounded-sm shadow-2xl flex flex-col justify-between p-5 relative overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)' }}
            >
              {/* Diagonal accent */}
              <div 
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10"
                style={{ transform: 'rotate(45deg)' }}
              />
              
              {/* Logo - 140% ratio: text-[9px] → 12.6px icon (w-3) */}
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3">
                  <RhosonicsLogo variant="gradient" />
                </div>
                <span className="font-logo tracking-wide text-white text-[9px]">RHOSONICS</span>
              </div>
              
              {/* Title */}
              <div className="relative z-10">
                <p className="font-ui text-[10px] text-white font-semibold leading-tight">
                  SDM ECO
                </p>
                <p className="font-ui text-[7px] text-white/70 mt-1">
                  Slurry Density Meter
                </p>
                <div className="w-8 h-0.5 bg-primary mt-2" />
              </div>
              
              {/* Footer */}
              <p className="font-data text-[5px] text-white/40">
                TECHNICAL SPECIFICATIONS
              </p>
            </div>
          </div>
        </div>

        {/* Letterhead */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-xs text-muted-foreground">LETTERHEAD</span>
            <span className="font-data text-[10px] text-muted-foreground/60">A4 Portrait</span>
          </div>
          <div className="flex justify-center p-6 bg-muted/30 rounded-lg border border-border">
            <div 
              className="w-40 aspect-[210/297] bg-white rounded-sm shadow-2xl flex flex-col justify-between p-4 relative overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)' }}
            >
              {/* Green top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
              
              {/* Header with logo - 140% ratio: text-[7px] → 9.8px icon (w-2.5) */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5">
                    <RhosonicsLogo variant="dark" />
                  </div>
                  <span className="font-logo tracking-wide text-slate-800 text-[7px]">RHOSONICS</span>
                </div>
              </div>
              
              {/* Body text placeholder lines */}
              <div className="flex-1 py-6 space-y-2">
                <div className="w-1/3 h-1 bg-slate-200 rounded-full" />
                <div className="h-3" />
                <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                <div className="w-4/5 h-0.5 bg-slate-100 rounded-full" />
                <div className="h-2" />
                <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                <div className="w-full h-0.5 bg-slate-100 rounded-full" />
                <div className="w-3/5 h-0.5 bg-slate-100 rounded-full" />
              </div>
              
              {/* Footer */}
              <div className="border-t border-slate-100 pt-2 flex justify-between items-end">
                <div className="space-y-0.5">
                  <p className="font-data text-[4px] text-slate-400">Rhosonics B.V.</p>
                  <p className="font-data text-[4px] text-slate-400">Putten, Netherlands</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="font-data text-[4px] text-slate-400">info@rhosonics.com</p>
                  <p className="font-data text-[4px] text-slate-400">rhosonics.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Envelope */}
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="font-data text-xs text-muted-foreground">ENVELOPE</span>
            <span className="font-data text-[10px] text-muted-foreground/60">DL (220 × 110 mm)</span>
          </div>
          <div className="flex justify-center p-6 bg-muted/30 rounded-lg border border-border">
            <div 
              className="w-64 aspect-[220/110] bg-white rounded-sm shadow-2xl flex flex-col justify-between p-4 relative overflow-hidden"
              style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.2)' }}
            >
              {/* Green left edge accent */}
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary" />
              
              {/* Envelope flap texture hint */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-50 to-transparent" />
              
              {/* Logo top left - 140% ratio: text-[7px] → 9.8px icon (w-2.5) */}
              <div className="flex items-center gap-1 pl-2 relative z-10">
                <div className="w-2.5 h-2.5">
                  <RhosonicsLogo variant="dark" />
                </div>
                <span className="font-logo tracking-wide text-slate-800 text-[7px]">RHOSONICS</span>
              </div>
              
              {/* Address placeholder */}
              <div className="pl-2 space-y-1 mt-auto">
                <div className="w-20 h-0.5 bg-slate-200 rounded-full" />
                <div className="w-24 h-0.5 bg-slate-200 rounded-full" />
                <div className="w-16 h-0.5 bg-slate-200 rounded-full" />
              </div>
              
              {/* Stamp placeholder */}
              <div className="absolute top-4 right-4 w-6 h-7 border border-dashed border-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Print Production Guidelines */}
      <div className="p-6 rounded-lg border border-border bg-muted/30">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h4 className="font-ui text-lg font-semibold text-foreground">Print Production Guidelines</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Use CMYK color profiles for all print production",
            "Maintain 300 DPI minimum resolution for photography",
            "Include 3mm bleed on all edges",
            "Convert fonts to outlines before final submission",
          ].map((guideline, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{guideline}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color Reference Note */}
      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-sm text-foreground">
          <strong className="font-semibold">CMYK Reference:</strong>{" "}
          <span className="text-muted-foreground">
            Brand Green converts to approximately C35 M0 Y100 K0. Always request a proof before full production runs.
          </span>
        </p>
      </div>
    </div>
  );
};

export default PrintedMaterials;
