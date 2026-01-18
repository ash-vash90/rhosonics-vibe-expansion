import sdmEcoBranded from "@/assets/brand/sdm-eco-branded.png";

export const SDMEcoDevice = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="relative">
        <img 
          src={sdmEcoBranded} 
          alt="SDM ECO branded measurement device"
          className="w-full max-w-[400px] h-auto drop-shadow-2xl"
        />
        {/* Subtle ambient glow */}
        <div 
          className="absolute -inset-8 pointer-events-none opacity-20 blur-2xl -z-10"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(90 60% 50% / 0.3) 0%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default SDMEcoDevice;
