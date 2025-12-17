interface MarqueeTickerProps {
  className?: string;
}

const tickerItems = [
  "PRECISION MEASUREMENT",
  "INDUSTRIAL GRADE", 
  "ULTRASONIC TECHNOLOGY",
  "BUILT TO LAST",
  "GARAGE TO GLOBAL",
  "SDM ECO",
  "EST. 1984",
  "SUSTAINABLE SOLUTIONS",
];

export const MarqueeTicker = ({ className = "" }: MarqueeTickerProps) => {
  // Duplicate items for seamless loop
  const items = [...tickerItems, ...tickerItems];
  
  return (
    <div 
      className={`relative overflow-hidden bg-rho-obsidian py-4 ${className}`}
      aria-hidden="true"
    >
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-rho-obsidian to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-rho-obsidian to-transparent z-10" />
      
      {/* Scrolling content */}
      <div className="animate-marquee whitespace-nowrap flex">
        {items.map((item, index) => (
          <span 
            key={index}
            className="font-data text-sm md:text-base uppercase tracking-wider text-slate-500 mx-8 inline-flex items-center gap-4"
          >
            {item}
            <span className="w-2 h-2 bg-primary rounded-full opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
