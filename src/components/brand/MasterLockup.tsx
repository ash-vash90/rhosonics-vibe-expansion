import { useState, useCallback } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";
import { RotateCcw, Maximize2, Grid3X3 } from "lucide-react";

export const MasterLockup = () => {
  const [key, setKey] = useState(0);

  const replayAnimation = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return (
    <section id="lockup" className="mb-24">
      <div className="border-t border-border pt-16 mb-8" />
      <h2 className="section-header">Master Lockup</h2>
      <p className="font-ui text-muted-foreground mb-8 max-w-lg">
        Logo 1em. Text 80% height of logo. Horizontally centered with 0.5rem gap.
      </p>

      {/* Main lockup display - gradient card for impact */}
      <div className="card-gradient flex flex-col items-center justify-center py-24 md:py-32 relative overflow-hidden">
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
          className="absolute bottom-4 right-4 flex items-center gap-2 label-tech text-slate-500 hover:text-slate-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          REPLAY
        </button>
      </div>

      {/* Lockup Variations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="card-base p-8 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-xl text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-muted-foreground">HORIZONTAL</span>
        </div>

        <div className="card-base p-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="w-12 h-12">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-lg text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-muted-foreground">STACKED</span>
        </div>

        <div className="card-base p-8 flex flex-col items-center justify-center">
          <div className="w-10 h-10 mb-4">
            <RhosonicsLogo variant="gradient" />
          </div>
          <span className="label-tech text-muted-foreground">ICON ONLY</span>
        </div>
      </div>

      {/* Clear Space Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="card-base p-6 flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Maximize2 className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <div className="label-tech text-muted-foreground mb-1">CLEAR SPACE</div>
            <p className="text-sm text-muted-foreground">
              Maintain clear space equal to the height of the smallest arc around all sides.
            </p>
          </div>
        </div>
        <div className="card-base p-6 flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
            <Grid3X3 className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <div className="label-tech text-muted-foreground mb-1">MINIMUM SIZE</div>
            <p className="text-sm text-muted-foreground">
              Digital: 24px min. Print: 10mm min. Below this, use icon-only mark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterLockup;
