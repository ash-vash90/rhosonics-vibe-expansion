import { useState, useCallback } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { RotateCcw, Scan, Layers } from "lucide-react";

export const MasterLockup = () => {
  const [key, setKey] = useState(0);

  const replayAnimation = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return (
    <section id="lockup" className="mb-24">
      <div className="border-t-2 border-slate-200 pt-16 mb-8" />
      <div className="flex items-center gap-3 mb-2">
        <Scan className="w-5 h-5 text-primary" />
        <span className="label-tech text-primary">02 / IDENTITY</span>
      </div>
      <h2 className="section-header">Master Lockup</h2>

      {/* Main lockup display - gradient card for impact */}
      <div className="card-gradient flex flex-col items-center justify-center py-24 md:py-32 relative overflow-hidden">
        {/* Scan lines texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--slate-100)) 2px, hsl(var(--slate-100)) 4px)'
        }} />
        
        {/* Main Lockup */}
        <div key={key} className="flex items-center gap-4 relative z-10">
          <div 
            className="flex-shrink-0" 
            style={{ width: 'clamp(3rem, 8vw, 5rem)', height: 'clamp(3rem, 8vw, 5rem)' }}
          >
            <RhosonicsLogo variant="gradient" animated />
          </div>
          <h1 
            className="font-logo text-slate-100 tracking-tight leading-none opacity-0 animate-text-reveal"
            style={{ 
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              animationDelay: '0.4s',
              animationFillMode: 'forwards'
            }}
          >
            Rhosonics
          </h1>
        </div>

        {/* Replay Button */}
        <button 
          onClick={replayAnimation}
          className="absolute bottom-6 right-6 flex items-center gap-2 label-tech text-slate-500 hover:text-primary transition-colors px-4 py-2 bg-slate-800/50 chamfer-sm"
        >
          <RotateCcw className="w-4 h-4" />
          REPLAY
        </button>

        {/* Spec label */}
        <div className="absolute top-6 left-6 label-tech-sm text-slate-500">
          LOCKUP.HORIZONTAL.V1
        </div>
      </div>

      {/* Lockup Variations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="card-metal p-8 flex flex-col items-center justify-center bracket-frame group">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-xl text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-slate-400 group-hover:text-primary transition-colors">HORIZONTAL</span>
        </div>

        <div className="card-metal p-8 flex flex-col items-center justify-center bracket-frame group">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="w-12 h-12">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-lg text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-slate-400 group-hover:text-primary transition-colors">STACKED</span>
        </div>

        <div className="card-metal p-8 flex flex-col items-center justify-center bracket-frame group">
          <div className="w-10 h-10 mb-4">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="label-tech text-slate-400 group-hover:text-primary transition-colors">ICON ONLY</span>
        </div>
      </div>

      {/* Clear Space Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="card-slate p-6 flex gap-4">
          <div className="w-12 h-12 bg-slate-500/50 flex items-center justify-center flex-shrink-0 chamfer-sm">
            <Scan className="w-6 h-6 text-slate-100" />
          </div>
          <div>
            <div className="label-tech text-slate-300 mb-1">CLEAR SPACE</div>
            <p className="text-slate-400">
              Maintain clear space equal to the height of the smallest arc around all sides.
            </p>
          </div>
        </div>
        <div className="card-slate p-6 flex gap-4">
          <div className="w-12 h-12 bg-slate-500/50 flex items-center justify-center flex-shrink-0 chamfer-sm">
            <Layers className="w-6 h-6 text-slate-100" />
          </div>
          <div>
            <div className="label-tech text-slate-300 mb-1">MINIMUM SIZE</div>
            <p className="text-slate-400">
              Digital: 24px min. Print: 10mm min. Below this, use icon-only mark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterLockup;
