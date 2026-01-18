import sdmEcoOriginal from "@/assets/brand/sdm-eco-original.webp";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";

export const SDMEcoDevice = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative max-w-[500px] w-full">
        {/* Base device image */}
        <img 
          src={sdmEcoOriginal} 
          alt="SDM ECO measurement device"
          className="w-full h-auto drop-shadow-2xl"
        />
        
        {/* Brand overlay container - positioned over the device body */}
        <div className="absolute inset-0 pointer-events-none">
          
          {/* SDM ECO text overlay - positioned on the device face */}
          <div 
            className="absolute flex items-baseline gap-1"
            style={{
              top: '18%',
              left: '8%',
            }}
          >
            <span 
              className="font-logo font-semibold text-white tracking-wide"
              style={{ fontSize: 'clamp(1.25rem, 4vw, 1.75rem)' }}
            >
              SDM
            </span>
            <span 
              className="font-logo font-semibold tracking-wide"
              style={{ 
                fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
                color: 'hsl(var(--rhosonics-green))',
              }}
            >
              ECO
            </span>
          </div>
          
          {/* Rhosonics logo - positioned in top right of device face */}
          <div 
            className="absolute"
            style={{
              top: '15%',
              right: '8%',
              width: 'clamp(28px, 8vw, 44px)',
              height: 'clamp(28px, 8vw, 44px)',
            }}
          >
            <RhosonicsLogo variant="gradient" />
          </div>
          
          {/* Accent stripe - brand green diagonal */}
          <div 
            className="absolute overflow-hidden"
            style={{
              bottom: '12%',
              left: '5%',
              right: '5%',
              height: '8px',
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--rhosonics-green)) 0%, hsl(var(--eco-lime)) 100%)',
                clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
              }}
            />
          </div>
          
          {/* Secondary accent lines */}
          <div 
            className="absolute"
            style={{
              bottom: '9%',
              left: '5%',
              width: '30%',
              height: '2px',
              background: 'hsl(var(--rhosonics-green) / 0.6)',
            }}
          />
          <div 
            className="absolute"
            style={{
              bottom: '9%',
              right: '5%',
              width: '20%',
              height: '2px',
              background: 'hsl(var(--eco-lime) / 0.6)',
            }}
          />
        </div>
        
        {/* Subtle ambient glow */}
        <div 
          className="absolute -inset-8 pointer-events-none opacity-25 blur-3xl -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(var(--rhosonics-green) / 0.4) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default SDMEcoDevice;
