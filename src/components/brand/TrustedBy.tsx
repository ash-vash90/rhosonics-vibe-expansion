interface TrustedByProps {
  className?: string;
}

// Placeholder logos - in production these would be actual client/partner logos
const logos = [
  { name: "TechCorp Industries", initials: "TC" },
  { name: "Global Mining Co", initials: "GM" },
  { name: "AquaSystems", initials: "AS" },
  { name: "NordDredge", initials: "ND" },
  { name: "EcoProcess", initials: "EP" },
  { name: "FlowTech", initials: "FT" },
];

export const TrustedBy = ({ className = "" }: TrustedByProps) => {
  return (
    <section className={`py-12 ${className}`} aria-labelledby="trusted-by-heading">
      <div className="text-center mb-8">
        <p id="trusted-by-heading" className="font-data text-xs uppercase tracking-widest text-slate-400">
          Trusted by industry leaders worldwide
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Logo row */}
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="group flex items-center justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Placeholder logo block - grayscale by default, color on hover */}
              <div className="relative w-24 h-12 flex items-center justify-center transition-all duration-300 grayscale opacity-50 hover:grayscale-0 hover:opacity-100">
                <div className="absolute inset-0 border border-slate-200 rounded-md bg-slate-50/50 group-hover:border-primary/30 group-hover:bg-eco-surface transition-all" />
                <span className="relative font-ui font-bold text-xl text-slate-400 group-hover:text-primary transition-colors">
                  {logo.initials}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats below */}
      <div className="mt-10 flex items-center justify-center gap-8 md:gap-16">
        <div className="text-center">
          <div className="font-ui font-bold text-2xl text-foreground">40+</div>
          <div className="font-data text-xs uppercase tracking-wider text-slate-500">Countries</div>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="text-center">
          <div className="font-ui font-bold text-2xl text-foreground">500+</div>
          <div className="font-data text-xs uppercase tracking-wider text-slate-500">Installations</div>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div className="text-center">
          <div className="font-ui font-bold text-2xl text-foreground">35</div>
          <div className="font-data text-xs uppercase tracking-wider text-slate-500">Years</div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
