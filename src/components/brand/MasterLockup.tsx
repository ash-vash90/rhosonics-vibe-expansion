import { useState, useCallback } from "react";
import { RhosonicsLogo } from "../RhosonicsLogo";

export const MasterLockup = () => {
  const [key, setKey] = useState(0);

  const replayAnimation = useCallback(() => {
    setKey(prev => prev + 1);
  }, []);

  return (
    <section id="lockup" className="mb-32">
      <h2 className="section-header">Master Lockup</h2>
      <p className="font-ui text-muted-foreground mb-8">
        Logo 1em. Text 80% height of logo. Horizontally centered with 0.5rem gap.
      </p>

      <div className="card-base flex flex-col items-center justify-center py-24 relative overflow-hidden">
        {/* Main Lockup */}
        <div key={key} className="flex items-center gap-2 relative z-10">
          <div className="flex-shrink-0" style={{ width: 'clamp(2.5rem, 7vw, 5rem)', height: 'clamp(2.5rem, 7vw, 5rem)' }}>
            <RhosonicsLogo variant="gradient" animated />
          </div>
          <h1 
            className="font-logo text-foreground tracking-tight leading-none animate-text-reveal opacity-0"
            style={{ 
              fontSize: 'clamp(2rem, 5.6vw, 4rem)',
              animationDelay: '0.4s',
              transform: 'translateY(4px)'
            }}
          >
            Rhosonics
          </h1>
        </div>

        {/* Replay Button */}
        <button 
          onClick={replayAnimation}
          className="absolute bottom-4 right-4 label-tech bg-transparent border-none cursor-pointer hover:opacity-70 text-muted-foreground transition-opacity"
        >
          [REPLAY]
        </button>
      </div>

      {/* Lockup Variations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card-base p-8 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-xl text-foreground">Rhosonics</span>
          </div>
          <span className="label-tech text-muted-foreground">HORIZONTAL</span>
        </div>

        <div className="card-base p-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3 mb-4">
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
      <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="font-ui font-bold text-lg mb-4">Clear Space Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="label-tech text-slate-500 mb-2">MINIMUM CLEAR SPACE</div>
            <p className="text-sm text-muted-foreground">
              Maintain clear space equal to the height of the smallest arc around all sides of the logo. 
              This ensures visual breathing room and brand integrity.
            </p>
          </div>
          <div>
            <div className="label-tech text-slate-500 mb-2">MINIMUM SIZE</div>
            <p className="text-sm text-muted-foreground">
              Digital: 24px height minimum. Print: 10mm height minimum. 
              Below these sizes, use the icon-only mark for clarity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MasterLockup;
