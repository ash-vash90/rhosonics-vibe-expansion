import { useState, useCallback } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { RotateCcw } from "lucide-react";

export const MasterLockup = () => {
  const [key, setKey] = useState(0);

  const replayAnimation = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return (
    <section id="lockup" className="mb-32">
      <div className="section-divider" />
      <h2 className="section-header">Master Lockup</h2>
      <p className="font-ui text-muted-foreground mb-8 text-lg max-w-2xl">
        Logo 1em. Text 80% height of logo. Horizontally centered with 0.5rem gap.
      </p>

      <div className="card-obsidian flex flex-col items-center justify-center py-32 relative overflow-hidden noise-overlay">
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" 
             style={{ background: 'radial-gradient(circle at 50% 50%, hsl(var(--rho-green) / 0.15), transparent 60%)' }} />
        
        {/* Main Lockup */}
        <div key={key} className="flex items-center gap-4 relative z-10">
          <div className="flex-shrink-0 animate-float" style={{ width: 'clamp(3rem, 8vw, 6rem)', height: 'clamp(3rem, 8vw, 6rem)' }}>
            <RhosonicsLogo variant="gradient" animated />
          </div>
          <h1 
            className="font-logo text-slate-100 tracking-tight leading-none opacity-0 animate-text-reveal"
            style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              animationDelay: '0.5s',
              animationFillMode: 'forwards'
            }}
          >
            Rhosonics
          </h1>
        </div>

        {/* Replay Button */}
        <button 
          onClick={replayAnimation}
          className="absolute bottom-6 right-6 flex items-center gap-2 label-tech bg-slate-800/50 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg cursor-pointer text-slate-400 hover:text-slate-100 transition-all duration-200"
        >
          <RotateCcw className="w-3 h-3" />
          REPLAY
        </button>
      </div>

      {/* Lockup Variations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card-base p-8 flex flex-col items-center justify-center group">
          <div className="flex items-center gap-3 mb-4 transition-transform duration-300 group-hover:scale-105">
            <div className="w-10 h-10">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-2xl text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-muted-foreground">HORIZONTAL</span>
        </div>

        <div className="card-base p-8 flex flex-col items-center justify-center group">
          <div className="flex flex-col items-center gap-3 mb-4 transition-transform duration-300 group-hover:scale-105">
            <div className="w-14 h-14">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-xl text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-muted-foreground">STACKED</span>
        </div>

        <div className="card-base p-8 flex flex-col items-center justify-center group">
          <div className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:animate-glow-pulse">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="label-tech text-muted-foreground">ICON ONLY</span>
        </div>
      </div>

      {/* Clear Space Rules */}
      <div className="mt-12 p-8 bg-slate-50/50 rounded-xl border border-border bg-grid">
        <h3 className="font-logo font-bold text-xl mb-6">Clear Space Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-1 bg-primary rounded-full flex-shrink-0" />
            <div>
              <div className="label-tech text-slate-500 mb-2">MINIMUM CLEAR SPACE</div>
              <p className="text-muted-foreground leading-relaxed">
                Maintain clear space equal to the height of the smallest arc around all sides of the logo. 
                This ensures visual breathing room and brand integrity.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1 bg-slate-300 rounded-full flex-shrink-0" />
            <div>
              <div className="label-tech text-slate-500 mb-2">MINIMUM SIZE</div>
              <p className="text-muted-foreground leading-relaxed">
                Digital: 24px height minimum. Print: 10mm height minimum. 
                Below these sizes, use the icon-only mark for clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterLockup;
