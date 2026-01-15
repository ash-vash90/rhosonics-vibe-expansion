import { BrandCallout } from "./BrandCallout";

// Texture pattern definitions - all patterns tile seamlessly
const textures = [
  {
    name: "Cross Grid",
    description: "Primary brand pattern. Structured, technical, represents precision measurement.",
    usage: "Hero backgrounds, section headers, marketing materials",
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2333993c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-20",
  },
  {
    name: "Ultrasonic Pulse",
    description: "Represents our core SDM technology. Radiating waves showing signal propagation.",
    usage: "Product pages, technology sections, SDM feature highlights",
    pattern: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-width='1'%3E%3Cpath stroke-opacity='.15' d='M40 10 v60 M10 40 h60'/%3E%3Ccircle stroke-opacity='.08' cx='40' cy='40' r='10'/%3E%3Ccircle stroke-opacity='.12' cx='40' cy='40' r='20'/%3E%3Ccircle stroke-opacity='.08' cx='40' cy='40' r='30'/%3E%3Ccircle stroke-opacity='.05' cx='40' cy='40' r='38'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
  },
  {
    name: "Engineering Grid",
    description: "Precision and systematic thinking. Clean technical measurement aesthetic.",
    usage: "Data displays, specifications, interface backgrounds",
    pattern: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Crect stroke='%2333993c' stroke-opacity='.1' x='0' y='0' width='48' height='48'/%3E%3Crect stroke='%2333993c' stroke-opacity='.06' x='12' y='12' width='24' height='24'/%3E%3Ccircle fill='%2333993c' fill-opacity='.15' cx='24' cy='24' r='1.5'/%3E%3Ccircle fill='%2333993c' fill-opacity='.08' cx='0' cy='0' r='1'/%3E%3Ccircle fill='%2333993c' fill-opacity='.08' cx='48' cy='0' r='1'/%3E%3Ccircle fill='%2333993c' fill-opacity='.08' cx='0' cy='48' r='1'/%3E%3Ccircle fill='%2333993c' fill-opacity='.08' cx='48' cy='48' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-slate-900",
    opacity: "opacity-100",
  },
  {
    name: "Topographic",
    description: "Contour mapping aesthetic. Conveys depth analysis and terrain measurement.",
    usage: "Mining applications, depth measurement, geological contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2373B82E' stroke-width='.75'%3E%3Cpath stroke-opacity='.12' d='M0 50 Q25 40, 50 50 T100 50'/%3E%3Cpath stroke-opacity='.08' d='M0 35 Q25 25, 50 35 T100 35'/%3E%3Cpath stroke-opacity='.15' d='M0 65 Q25 55, 50 65 T100 65'/%3E%3Cpath stroke-opacity='.06' d='M0 20 Q25 12, 50 20 T100 20'/%3E%3Cpath stroke-opacity='.1' d='M0 80 Q25 72, 50 80 T100 80'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-mineral-deep",
    opacity: "opacity-100",
  },
  {
    name: "Isometric Mesh",
    description: "3D structural grid. Industrial, technical, represents engineered systems.",
    usage: "Case studies, equipment diagrams, structural contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='56' height='28' viewBox='0 0 56 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c'%3E%3Cpath stroke-opacity='.12' d='M0 14 L14 0 L28 14 L14 28 Z M28 14 L42 0 L56 14 L42 28 Z'/%3E%3Cpath stroke-opacity='.06' d='M14 0 L14 28 M42 0 L42 28'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
  },
  {
    name: "Flow Dynamics",
    description: "Horizontal flow visualization. Represents slurry movement and liquid measurement.",
    usage: "Wastewater applications, flow measurement, process contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='120' height='40' viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-width='1' stroke-linecap='round'%3E%3Cpath stroke-opacity='.1' d='M0 10 Q30 5, 60 10 T120 10'/%3E%3Cpath stroke-opacity='.15' d='M0 20 Q30 15, 60 20 T120 20'/%3E%3Cpath stroke-opacity='.1' d='M0 30 Q30 25, 60 30 T120 30'/%3E%3C/g%3E%3Crect fill='%2333993c' fill-opacity='.06' x='0' y='18' width='4' height='4' rx='2'/%3E%3Crect fill='%2333993c' fill-opacity='.04' x='55' y='8' width='3' height='3' rx='1.5'/%3E%3Crect fill='%2333993c' fill-opacity='.05' x='95' y='28' width='3' height='3' rx='1.5'/%3E%3C/svg%3E")`,
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
