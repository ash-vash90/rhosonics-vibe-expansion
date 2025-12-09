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

      {/* Main lockup display - hero gradient card with chamfer */}
      <div className="card-gradient chamfer-lg flex flex-col items-center justify-center py-16 sm:py-24 md:py-32 relative overflow-hidden">
        {/* Wave pattern background */}
        <div className="absolute inset-0 bg-wave-subtle opacity-40 pointer-events-none" aria-hidden="true" />
        
        {/* Main Lockup */}
        <div key={key} className="flex items-center gap-4 relative z-10 px-4">
          <div 
            className="flex-shrink-0" 
            style={{ width: 'clamp(3.5rem, 10vw, 6rem)', height: 'clamp(3.5rem, 10vw, 6rem)' }}
            aria-hidden="true"
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
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 label-ui text-slate-400 hover:text-primary transition-colors px-3 py-2 bg-slate-800/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900"
          aria-label="Replay logo animation"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">REPLAY</span>
        </button>

        {/* Spec label */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 label-tech text-slate-500" aria-hidden="true">
          LOCKUP.HORIZONTAL.V1
        </div>
      </div>

      {/* Lockup Variations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="card-base p-8 flex flex-col items-center justify-center group border-2 border-slate-200">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-xl text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-slate-400 group-hover:text-primary transition-colors">HORIZONTAL</span>
        </div>

        <div className="card-base p-8 flex flex-col items-center justify-center group border-2 border-slate-200">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="w-12 h-12">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-lg text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-slate-400 group-hover:text-primary transition-colors">STACKED</span>
        </div>

        <div className="card-base p-8 flex flex-col items-center justify-center group border-2 border-slate-200">
          <div className="w-10 h-10 mb-4">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="label-tech text-slate-400 group-hover:text-primary transition-colors">ICON ONLY</span>
        </div>
      </div>

      {/* Clear Space Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="card-slate p-6 flex gap-4">
          <div className="w-12 h-12 bg-slate-500/50 flex items-center justify-center flex-shrink-0 rounded-lg">
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
          <div className="w-12 h-12 bg-slate-500/50 flex items-center justify-center flex-shrink-0 rounded-lg">
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
