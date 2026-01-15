import { BrandCallout } from "./BrandCallout";

// Texture pattern definitions
const textures = [
  {
    name: "Cross Grid",
    description: "Primary brand pattern. Use for hero sections, headers, and high-impact areas.",
    usage: "Hero backgrounds, section headers, marketing materials",
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2333993c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-20",
  },
  {
    name: "Ultrasonic Waves",
    description: "Represents our core technology. Concentric arcs emanating from a source point.",
    usage: "Product pages, technology sections, SDM feature highlights",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-opacity='0.3'%3E%3Ccircle cx='0' cy='50' r='15' stroke-width='1'/%3E%3Ccircle cx='0' cy='50' r='30' stroke-width='1'/%3E%3Ccircle cx='0' cy='50' r='45' stroke-width='1'/%3E%3Ccircle cx='0' cy='50' r='60' stroke-width='1'/%3E%3Ccircle cx='0' cy='50' r='75' stroke-width='1'/%3E%3Ccircle cx='0' cy='50' r='90' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-30",
  },
  {
    name: "Precision Grid",
    description: "Engineering precision and systematic thinking. Clean, technical aesthetic.",
    usage: "Data displays, specifications, interface backgrounds",
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-opacity='0.15'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3Crect x='19' y='19' width='2' height='2' fill='%2333993c' fill-opacity='0.2'/%3E%3C/svg%3E")`,
    bgClass: "bg-slate-900",
    opacity: "opacity-100",
  },
  {
    name: "Contour Lines",
    description: "Topographic mapping aesthetic. Conveys depth, analysis, and precision measurement.",
    usage: "Mining applications, terrain analysis, depth measurement contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-opacity='0.25' stroke-width='1'%3E%3Cellipse cx='60' cy='60' rx='55' ry='25'/%3E%3Cellipse cx='60' cy='60' rx='45' ry='20'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='15'/%3E%3Cellipse cx='60' cy='60' rx='25' ry='10'/%3E%3Cellipse cx='60' cy='60' rx='15' ry='5'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-mineral-deep",
    opacity: "opacity-100",
  },
  {
    name: "Terrain Mesh",
    description: "3D terrain wireframe. Industrial, geological, represents field conditions.",
    usage: "Mining case studies, dredging applications, environmental contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23857a5b' stroke-opacity='0.3' stroke-width='1'%3E%3Cpath d='M0 40 L20 35 L40 42 L60 38 L80 40'/%3E%3Cpath d='M0 50 L20 48 L40 55 L60 50 L80 52'/%3E%3Cpath d='M0 60 L20 62 L40 58 L60 65 L80 60'/%3E%3Cpath d='M0 70 L20 72 L40 68 L60 73 L80 70'/%3E%3Cpath d='M20 35 L20 72'/%3E%3Cpath d='M40 42 L40 68'/%3E%3Cpath d='M60 38 L60 73'/%3E%3C/g%3E%3C/svg%3E")`,
    bgClass: "bg-mineral-deep",
    opacity: "opacity-100",
  },
  {
    name: "Flow Lines",
    description: "Fluid dynamics visualization. Represents slurry flow, pipe movement, liquid measurement.",
    usage: "Wastewater applications, flow measurement, process diagrams",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='60' viewBox='0 0 100 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-opacity='0.2' stroke-width='1'%3E%3Cpath d='M0 30 Q25 20 50 30 T100 30'/%3E%3Cpath d='M0 40 Q25 30 50 40 T100 40'/%3E%3Cpath d='M0 50 Q25 40 50 50 T100 50'/%3E%3Cpath d='M0 20 Q25 10 50 20 T100 20'/%3E%3C/g%3E%3C/svg%3E")`,
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
