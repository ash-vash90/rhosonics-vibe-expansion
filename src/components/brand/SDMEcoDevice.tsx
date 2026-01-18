import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Check, Menu, Activity } from "lucide-react";

export const SDMEcoDevice = () => {
  return (
    <div className="flex items-center justify-center py-8">
      {/* Device Container with mounting brackets */}
      <div className="relative">
        {/* Mounting Brackets */}
        <div className="absolute -top-5 left-[18%] w-5 h-9 rounded-t-full shadow-lg"
          style={{ background: 'linear-gradient(135deg, hsl(90 60% 50%) 0%, hsl(125 50% 40%) 100%)' }}
        />
        <div className="absolute -top-5 right-[18%] w-5 h-9 rounded-t-full shadow-lg"
          style={{ background: 'linear-gradient(135deg, hsl(90 60% 50%) 0%, hsl(125 50% 40%) 100%)' }}
        />
        
        {/* Main Device Body - Hexagonal Shape */}
        <div 
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #1a1f2e 0%, #111522 50%, #0d1018 100%)',
            clipPath: 'polygon(0% 10%, 10% 0%, 90% 0%, 100% 10%, 100% 68%, 82% 100%, 18% 100%, 0% 68%)',
            width: '360px',
            minHeight: '400px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {/* Green Stripe Accents - Diagonal bands */}
          <div className="absolute top-0 right-0 w-28 h-48 overflow-hidden">
            <div 
              className="absolute"
              style={{
                width: '180px',
                height: '22px',
                background: 'linear-gradient(135deg, hsl(90 60% 50%) 0%, hsl(125 50% 40%) 100%)',
                transform: 'rotate(60deg)',
                transformOrigin: 'top right',
                top: '15px',
                right: '-25px',
                boxShadow: '0 2px 8px rgba(115, 184, 46, 0.3)',
              }}
            />
            <div 
              className="absolute"
              style={{
                width: '160px',
                height: '18px',
                background: 'linear-gradient(135deg, hsl(90 60% 50%) 0%, hsl(125 50% 40%) 100%)',
                transform: 'rotate(60deg)',
                transformOrigin: 'top right',
                top: '52px',
                right: '-25px',
                boxShadow: '0 2px 8px rgba(115, 184, 46, 0.3)',
              }}
            />
            <div 
              className="absolute"
              style={{
                width: '140px',
                height: '16px',
                background: 'linear-gradient(135deg, hsl(90 60% 50%) 0%, hsl(125 50% 40%) 100%)',
                transform: 'rotate(60deg)',
                transformOrigin: 'top right',
                top: '85px',
                right: '-25px',
                boxShadow: '0 2px 8px rgba(115, 184, 46, 0.3)',
              }}
            />
          </div>

          {/* SDM ECO Label */}
          <div className="absolute top-10 left-7 z-10">
            <div className="font-logo text-xl tracking-wide leading-tight">
              <div className="text-slate-100">SDM</div>
              <div style={{ color: 'hsl(90 60% 50%)' }}>ECO</div>
            </div>
          </div>

          {/* Main Display Screen */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 ml-6 w-[185px]">
            <div className="rounded-lg overflow-hidden border border-slate-500/50 shadow-xl"
              style={{ background: 'linear-gradient(180deg, #2a3441 0%, #1e2530 100%)' }}
            >
              {/* Status Bar */}
              <div 
                className="px-3 py-1.5 flex justify-between items-center"
                style={{ background: 'linear-gradient(90deg, hsl(90 60% 45%) 0%, hsl(125 50% 40%) 100%)' }}
              >
                <span className="font-data text-[9px] text-white/90">18/01/2026</span>
                <span className="font-data text-[9px] text-white/90">14:23</span>
                <button className="bg-white/20 text-white text-[8px] font-data px-1.5 py-0.5 rounded flex items-center gap-0.5 hover:bg-white/30 transition-colors border border-white/30">
                  <span>MENU</span>
                  <Menu className="w-2 h-2" />
                </button>
              </div>
              
              {/* Display Content */}
              <div className="p-3 text-center" style={{ background: 'linear-gradient(180deg, #3a4555 0%, #252d3a 100%)' }}>
                {/* Primary Reading */}
                <div className="mb-3">
                  <div className="font-data text-[9px] text-slate-400 mb-0.5">SG×1000</div>
                  <div className="font-ui font-light text-3xl text-slate-100 tracking-wide">1000.00</div>
                </div>
                
                {/* Secondary Reading */}
                <div className="mb-2">
                  <div className="font-data text-[9px] text-slate-400 mb-0.5">Temperature °C</div>
                  <div className="font-ui font-light text-2xl text-slate-200 tracking-wide">25.00</div>
                </div>

                {/* Mini Graph */}
                <div className="flex items-end justify-center gap-0.5 h-3 mt-2 opacity-80">
                  <Activity className="w-2.5 h-2.5 text-primary mr-0.5" />
                  {[2, 4, 3, 5, 4, 6, 5, 7, 6, 5, 7, 6, 8, 7].map((h, i) => (
                    <div 
                      key={i}
                      className="w-0.5 rounded-t"
                      style={{ height: `${h}px`, background: 'hsl(90 60% 50%)' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status LED */}
          <div className="absolute left-6 top-[52%] w-3 h-3 rounded-full bg-slate-800 border border-slate-600 shadow-inner flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'hsl(90 60% 50%)', boxShadow: '0 0 6px hsl(90 60% 50%)' }} />
          </div>

          {/* Control Buttons - Exact D-Pad Layout matching reference */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[180px]">
            {/* Row 1: Back, Up, Confirm */}
            <div className="flex justify-center items-center gap-3 mb-2">
              <DeviceButton icon={<ChevronLeft className="w-4 h-4" />} />
              <DeviceButton icon={<ChevronUp className="w-4 h-4" />} />
              <DeviceButton icon={<Check className="w-4 h-4" />} variant="confirm" />
            </div>
            
            {/* Row 2: Left, Right */}
            <div className="flex justify-center items-center gap-3 mb-2">
              <DeviceButton icon={<ChevronLeft className="w-3.5 h-3.5" />} size="sm" />
              <div className="w-12" /> {/* Spacer */}
              <DeviceButton icon={<ChevronRight className="w-3.5 h-3.5" />} size="sm" />
            </div>
            
            {/* Row 3: Down (centered) */}
            <div className="flex justify-center items-center">
              <DeviceButton icon={<ChevronDown className="w-4 h-4" />} />
            </div>
          </div>

          {/* Connector Port Indicators - Right side */}
          <div className="absolute bottom-16 right-5 flex flex-col gap-1.5">
            <div className="w-2 h-1 bg-slate-600 rounded-full" />
            <div className="w-2 h-1 bg-slate-600 rounded-full" />
            <div className="w-2 h-1 bg-slate-600 rounded-full" />
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-[18%] right-[18%] h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(90 60% 50% / 0.5), transparent)' }}
          />

          {/* Subtle Surface Texture */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />
        </div>

        {/* Ambient Glow Effect */}
        <div 
          className="absolute -inset-4 pointer-events-none opacity-30 blur-xl"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(90 60% 50% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

interface DeviceButtonProps {
  icon: React.ReactNode;
  variant?: 'default' | 'confirm';
  size?: 'default' | 'sm';
}

const DeviceButton = ({ icon, variant = 'default', size = 'default' }: DeviceButtonProps) => {
  const sizeClasses = size === 'sm' ? 'w-10 h-10' : 'w-11 h-11';
  const innerSize = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8';
  
  return (
    <button 
      className={`
        ${sizeClasses} rounded-full flex items-center justify-center
        transition-all duration-150 active:scale-95
        ${variant === 'confirm' 
          ? 'bg-gradient-to-b from-slate-400 to-slate-500 border-2 shadow-lg' 
          : 'bg-gradient-to-b from-slate-400 to-slate-500 border-2 border-slate-300 shadow-lg'
        }
      `}
      style={{
        borderColor: variant === 'confirm' ? 'hsl(90 60% 45%)' : undefined,
        boxShadow: variant === 'confirm' 
          ? 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 12px rgba(115, 184, 46, 0.25)' 
          : 'inset 0 2px 4px rgba(0,0,0,0.2)',
      }}
    >
      <div 
        className={`${innerSize} rounded-full flex items-center justify-center bg-gradient-to-b from-slate-500 to-slate-600 border border-slate-400`}
        style={{ color: variant === 'confirm' ? 'hsl(90 60% 50%)' : '#e2e8f0' }}
      >
        {icon}
      </div>
    </button>
  );
};

export default SDMEcoDevice;
