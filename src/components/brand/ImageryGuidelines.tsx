import { BrandCallout } from "./BrandCallout";

// Texture pattern definitions - all patterns tile seamlessly with refined, professional designs
const textures = [
  {
    name: "Cross Grid",
    description: "Primary brand pattern. Structured crosses evoke precision calibration points.",
    usage: "Hero backgrounds, section headers, marketing materials",
    pattern: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 0v6h2V0h-2zm0 26v6h2v-6h-2zM0 15v2h6v-2H0zm26 0v2h6v-2h-6z' fill='%2333993c' fill-opacity='.12'/%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
  },
  {
    name: "Ultrasonic Pulse",
    description: "Concentric rings representing SDM wave propagation. Our core technology signature.",
    usage: "Product pages, technology sections, SDM feature highlights",
    pattern: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c'%3E%3Ccircle cx='32' cy='32' r='8' stroke-opacity='.08' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='16' stroke-opacity='.1' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='24' stroke-opacity='.06' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='31' stroke-opacity='.04' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='2' fill='%2333993c' fill-opacity='.15' stroke='none'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
  },
  {
    name: "Engineering Grid",
    description: "Technical measurement grid with intersection markers. Precision and systematic order.",
    usage: "Data displays, specifications, interface backgrounds",
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath d='M0 0h40v40H0z' stroke='%2333993c' stroke-opacity='.05' stroke-width='.5'/%3E%3Cpath d='M20 0v40M0 20h40' stroke='%2333993c' stroke-opacity='.03' stroke-width='.5'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2333993c' fill-opacity='.1'/%3E%3Ccircle cx='0' cy='0' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='40' cy='0' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='0' cy='40' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='40' cy='40' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-slate-900",
    opacity: "opacity-100",
  },
  {
    name: "Topographic",
    description: "Flowing contour lines suggesting depth mapping and geological survey data.",
    usage: "Mining applications, depth measurement, geological contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2373B82E' stroke-width='.5' stroke-linecap='round'%3E%3Cpath d='M-10 30 Q10 25 30 30 Q50 35 70 30 Q90 25 110 30' stroke-opacity='.08'/%3E%3Cpath d='M-10 20 Q10 15 30 20 Q50 25 70 20 Q90 15 110 20' stroke-opacity='.12'/%3E%3Cpath d='M-10 10 Q10 5 30 10 Q50 15 70 10 Q90 5 110 10' stroke-opacity='.06'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-mineral-deep",
    opacity: "opacity-100",
  },
  {
    name: "Isometric",
    description: "Diamond mesh evoking 3D structural analysis and engineered frameworks.",
    usage: "Case studies, equipment diagrams, structural contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 0l14 14-14 14L0 14z' fill='none' stroke='%2333993c' stroke-opacity='.08' stroke-width='.5'/%3E%3Ccircle cx='14' cy='14' r='.75' fill='%2333993c' fill-opacity='.1'/%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
  },
  {
    name: "Flow Dynamics",
    description: "Parallel curves suggesting fluid movement and slurry flow measurement.",
    usage: "Wastewater applications, flow measurement, process contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='30' viewBox='0 0 60 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-width='.5' stroke-linecap='round'%3E%3Cpath d='M0 7.5 Q15 5 30 7.5 T60 7.5' stroke-opacity='.06'/%3E%3Cpath d='M0 15 Q15 12 30 15 T60 15' stroke-opacity='.1'/%3E%3Cpath d='M0 22.5 Q15 20 30 22.5 T60 22.5' stroke-opacity='.06'/%3E%3C/g%3E%3Ccircle cx='45' cy='15' r='1' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='15' cy='15' r='.75' fill='%2333993c' fill-opacity='.06'/%3E%3C/svg%3E")`,
    bgClass: "bg-slate-800",
    opacity: "opacity-100",
  },
];

export const ImageryGuidelines = () => {
  return (
    <section id="imagery" className="space-y-16">
      {/* Hero Statement */}
      <div>
        <p className="text-lg md:text-xl font-ui text-foreground leading-relaxed max-w-4xl">
          Imagery proves credibility, not decoration. 
          <span className="text-muted-foreground"> We show real environments where measurement happens, and clean abstractions where concepts need clarity.</span>
        </p>
      </div>

      {/* Full-width Context Specimens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Field Context */}
        <div className="bg-rho-obsidian relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-pattern-minerals grayscale"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          <div className="relative p-6 md:p-10 lg:p-16 flex flex-col justify-end min-h-[240px] md:min-h-[320px]">
            <span className="label-tech text-primary text-[10px] md:text-xs mb-2 md:mb-3 block">01 — FIELD CONTEXT</span>
            <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 md:mb-4">Real & Gritty</h3>
            <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-md">
              Authenticity, case studies, proving durability. High contrast, desaturated, selective green accent.
            </p>
          </div>
        </div>

        {/* Engineering Context */}
        <div className="bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-semicon opacity-50"></div>
          <div className="relative p-6 md:p-10 lg:p-16 flex flex-col justify-end min-h-[240px] md:min-h-[320px]">
            <span className="label-tech text-primary text-[10px] md:text-xs mb-2 md:mb-3 block">02 — ENGINEERING CONTEXT</span>
            <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">Abstract & Precise</h3>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-md">
              Concepts, technology explainers, "smart" features. Clean lines, perfect lighting, geometric patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Field Image Rule */}
      <BrandCallout variant="info" title="Field Image Rule">
        Field images must show evidence of use: wear, scale, context, or operation.
        Pristine environments without signs of real work reduce credibility.
      </BrandCallout>

      {/* ═══════════════════════════════════════════════════════════════
          TEXTURES SECTION
       ═══════════════════════════════════════════════════════════════ */}
      <div className="pt-8">
        <div className="flex items-baseline gap-4 md:gap-6 mb-6">
          <span className="font-data text-xs md:text-sm text-muted-foreground">TEXTURES</span>
          <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
        </div>
        <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-3">Background Textures</h3>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mb-10">
          Subtle patterns that reinforce our industrial and technical identity. Use sparingly at low opacity to add depth without competing with content.
        </p>

        {/* Texture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {textures.map((texture) => (
            <div key={texture.name} className="group border border-border rounded-lg overflow-hidden">
              {/* Texture Preview */}
              <div 
                className={`${texture.bgClass} relative h-40 md:h-48`}
              >
                <div 
                  className={`absolute inset-0 ${texture.opacity}`}
                  style={{ backgroundImage: texture.pattern }}
                />
                {/* Hover overlay with name */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <span className="font-ui font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                    {texture.name}
                  </span>
                </div>
              </div>
              
              {/* Texture Info */}
              <div className="p-4 bg-card">
                <h4 className="font-ui font-semibold text-foreground mb-1">{texture.name}</h4>
                <p className="text-muted-foreground text-sm mb-3">{texture.description}</p>
                <div className="flex items-start gap-2">
                  <span className="label-tech-sm text-primary shrink-0">USE FOR:</span>
                  <span className="text-xs text-muted-foreground">{texture.usage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Texture Usage Rules */}
        <div className="mt-10 p-6 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-ui font-bold text-foreground mb-4">Texture Usage Rules</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="label-tech-sm text-primary block mb-2">OPACITY</span>
              <p className="text-muted-foreground text-sm">
                Keep textures subtle. Use 4–20% opacity for backgrounds. Higher opacity (up to 40%) only for dramatic hero moments.
              </p>
            </div>
            <div>
              <span className="label-tech-sm text-primary block mb-2">LAYERING</span>
              <p className="text-muted-foreground text-sm">
                Never stack multiple textures. One pattern per surface maximum. Combine with solid color overlays for depth.
              </p>
            </div>
            <div>
              <span className="label-tech-sm text-primary block mb-2">CONTEXT MATCHING</span>
              <p className="text-muted-foreground text-sm">
                Match texture to content: Terrain patterns for mining, Flow patterns for wastewater, Precision grids for technical specs.
              </p>
            </div>
            <div>
              <span className="label-tech-sm text-primary block mb-2">ACCESSIBILITY</span>
              <p className="text-muted-foreground text-sm">
                Textures must never reduce text readability. Always test contrast ratios with patterns active.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Do's and Don'ts - Side by side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden">
        <div className="p-5 md:p-8 bg-eco-surface md:border-r border-b md:border-b-0 border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg">✓</span>
            <h4 className="font-ui font-bold text-xl text-foreground">Do Use</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Real industrial environments with visible wear",
              "Close-ups of measurement displays and data",
              "Workers in proper PPE interacting with equipment",
              "Clean studio shots for product photography",
              "Abstract 3D renders for technology concepts",
              "Subtle textures at low opacity for depth"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 md:p-8 bg-error-surface">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center text-lg">✕</span>
            <h4 className="font-ui font-bold text-xl text-foreground">Don't Use</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Generic stock photos of businesspeople",
              "Over-saturated 'tech' imagery with lens flares",
              "Cartoonish or overly simplified illustrations",
              "Images with visible competitor branding",
              "Floating holograms or sci-fi aesthetics",
              "Heavy textures that reduce readability"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImageryGuidelines;
