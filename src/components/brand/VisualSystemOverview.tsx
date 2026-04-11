import { Zap, MapPin, Layers } from "lucide-react";
import { useRef } from "react";
import { useGsapContext } from "@/hooks/useGsapCleanup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VisualSystemOverview = () => {
  const layersRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const enablesRef = useRef<HTMLDivElement>(null);

  // Use the cleanup-safe GSAP context hook
  useGsapContext<HTMLElement>(() => {
    // Animate layers
    if (layersRef.current) {
      const layers = layersRef.current.children;
      gsap.fromTo(layers,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: layersRef.current, start: "top 80%", once: true }
        }
      );
    }

    // Animate comparison
    if (comparisonRef.current) {
      gsap.fromTo(comparisonRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: comparisonRef.current, start: "top 85%", once: true }
        }
      );
    }

    // Animate enables
    if (enablesRef.current) {
      const items = enablesRef.current.querySelectorAll('.enable-item');
      gsap.fromTo(items,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: enablesRef.current, start: "top 85%", once: true }
        }
      );
    }
  }, [layersRef, comparisonRef, enablesRef]);

  const layers = [
    {
      id: "foundations",
      icon: Layers,
      title: "Foundations",
      tag: "CONSTANT",
      desc: "The constant base of the brand:",
      items: ["Primary neutrals", "Core typography", "Spacing", "Layout rules"],
      bgClass: "bg-slate-900 text-white",
      tagClass: "bg-white/20",
      itemClass: "bg-white/10 text-white/80",
    },
    {
      id: "signals",
      icon: Zap,
      title: "Signals",
      tag: "INTENTIONAL",
      desc: "Communicates action, state, or emphasis:",
      items: ["Action colors", "Status indicators", "Interactive highlights"],
      bgClass: "bg-primary text-white",
      tagClass: "bg-white/20",
      itemClass: "bg-white/20 text-white",
    },
    {
      id: "contextual",
      icon: MapPin,
      title: "Context",
      tag: "SITUATIONAL",
      desc: "Provides situational relevance:",
      items: ["Field neutrals", "Eco indicators", "Textures"],
      bgClass: "bg-mineral-surface border-y border-r border-mineral-neutral/30",
      tagClass: "bg-mineral-neutral text-white",
      itemClass: "bg-white/80 text-mineral-deep",
      titleClass: "text-mineral-deep",
      descClass: "text-mineral-deep/70",
      iconClass: "text-mineral-deep/60",
    },
  ];

  return (
    <section className="space-y-16">
      {/* Intro */}
      <p className="text-lg text-muted-foreground max-w-2xl">
        The visual system is built from clearly defined layers, each with a specific role.
        Not every element carries the same weight or authority.
      </p>

      {/* Three layers - distinct visual treatment per layer */}
      <div ref={layersRef} className="grid md:grid-cols-3 gap-0 rounded-lg overflow-hidden border border-border">
        {layers.map((layer) => (
          <div key={layer.id} className={`p-8 ${layer.bgClass}`}>
            <layer.icon className={`w-8 h-8 mb-6 ${layer.iconClass || 'text-white/60'}`} />
            <div className="flex items-center gap-3 mb-4">
              <h4 className={`font-ui text-xl font-bold ${layer.titleClass || ''}`}>{layer.title}</h4>
              <span className={`font-data text-[10px] px-2 py-0.5 ${layer.tagClass}`}>{layer.tag}</span>
            </div>
            <p className={`mb-6 ${layer.descClass || 'text-white/70'}`}>{layer.desc}</p>
            <div className="flex flex-wrap gap-2">
              {layer.items.map(tag => (
                <span key={tag} className={`px-2 py-1 text-xs ${layer.itemClass}`}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Slate vs Mineral - side by side comparison */}
      <div ref={comparisonRef} className="grid lg:grid-cols-2 gap-0 border border-border overflow-hidden rounded-lg">
        <div className="p-8 bg-slate-100">
          <h4 className="font-ui font-semibold text-foreground mb-3">Slate = Software</h4>
          <p className="text-muted-foreground mb-4">
            UI structure, text, forms, navigation, data containers.
          </p>
          <p className="text-sm text-muted-foreground">Cool, blue-biased, chromatically neutral.</p>
        </div>
        <div className="p-8 bg-mineral-surface border-l border-mineral-neutral/30">
          <h4 className="font-ui font-semibold text-mineral-deep mb-3">Mineral = Environment</h4>
          <p className="text-mineral-deep/80 mb-4">
            Field modules, industry panels, outdoor contexts.
          </p>
          <p className="text-sm text-mineral-deep/60">Warm-neutral, olive, stone-like tones.</p>
        </div>
      </div>

      {/* What this enables - inline bullets */}
      <div>
        <h3 className="font-ui text-lg font-semibold text-foreground mb-6">What this enables</h3>
        <div ref={enablesRef} className="grid sm:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Remains expressive", desc: "without becoming inconsistent" },
            { num: "02", title: "Supports multiple environments", desc: "without visual drift" },
            { num: "03", title: "Makes design decisions", desc: "repeatable and explainable" },
          ].map(item => (
            <div key={item.num} className="enable-item flex items-start gap-4">
              <span className="font-data text-sm text-primary">{item.num}</span>
              <div>
                <p className="text-foreground font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approved Layout Patterns */}
      <div className="border-t border-border pt-12">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Approved Layout Patterns</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bento Grid */}
          <div className="space-y-4">
            <h4 className="font-ui font-semibold text-foreground">Bento Grid</h4>
            <p className="text-sm text-muted-foreground">
              Modular card layouts where items span different column/row counts. 
              Ideal for dashboards, feature showcases, and metric overviews.
            </p>
            {/* Visual example */}
            <div className="grid grid-cols-4 gap-2 p-4 bg-muted/30 rounded-lg border border-border">
              <div className="col-span-2 row-span-2 bg-primary/15 rounded border border-primary/20 p-3 flex items-end">
                <span className="font-data text-[10px] text-primary uppercase">HERO METRIC</span>
              </div>
              <div className="col-span-1 bg-muted/60 rounded border border-border p-2">
                <div className="w-full h-1 bg-primary/30 rounded mt-auto" />
              </div>
              <div className="col-span-1 bg-muted/60 rounded border border-border p-2">
                <div className="w-full h-1 bg-primary/30 rounded mt-auto" />
              </div>
              <div className="col-span-2 bg-muted/60 rounded border border-border p-2">
                <div className="w-3/4 h-1 bg-border rounded" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Use <code className="font-data text-[11px] bg-muted px-1 py-0.5 rounded">grid-cols-*</code> with 
              varied <code className="font-data text-[11px] bg-muted px-1 py-0.5 rounded">col-span-*</code> and <code className="font-data text-[11px] bg-muted px-1 py-0.5 rounded">row-span-*</code> values.
            </p>
          </div>

          {/* Standard Grid */}
          <div className="space-y-4">
            <h4 className="font-ui font-semibold text-foreground">Uniform Grid</h4>
            <p className="text-sm text-muted-foreground">
              Equal-width columns for homogeneous content. Use when items share the same structure 
              and no single item should dominate.
            </p>
            <div className="grid grid-cols-3 gap-2 p-4 bg-muted/30 rounded-lg border border-border">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted/60 rounded border border-border p-3">
                  <div className="w-full h-1 bg-border rounded mb-2" />
                  <div className="w-2/3 h-1 bg-border/60 rounded" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Default for lists, card grids, and repeating content blocks.
            </p>
          </div>
        </div>
      </div>

      {/* Gradient & Shape Language */}
      <div className="border-t border-border pt-12">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Gradient &amp; Shape Language</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Approved: Soft gradients */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h4 className="font-ui font-semibold text-foreground">Approved: Linear Gradients</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Subtle directional gradients that reinforce depth or surface hierarchy. 
              Keep transitions smooth and use brand-approved color stops.
            </p>
            <div className="flex gap-3">
              <div className="flex-1 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10" />
              <div className="flex-1 h-16 rounded-lg bg-gradient-to-b from-background to-muted/50 border border-border" />
              <div className="flex-1 h-16 rounded-lg" style={{ background: 'linear-gradient(135deg, hsl(125 50% 40%) 0%, hsl(90 60% 45%) 100%)' }} />
            </div>
          </div>

          {/* Forbidden: Organic blobs */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <h4 className="font-ui font-semibold text-foreground">Forbidden: Organic Blob Shapes</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Amorphous, rounded, or "liquid" shapes conflict with the <em>"Engineered, not styled"</em> principle. 
              All decorative shapes must be geometric — angular, rectilinear, or derived from the grid.
            </p>
            <div className="flex gap-3 items-center">
              <div className="flex-1 h-16 rounded-lg bg-muted/30 border border-border flex items-center justify-center">
                <span className="font-data text-[10px] text-destructive uppercase">NO BLOBS</span>
              </div>
              <div className="flex-1 h-16 bg-muted/30 border border-border flex items-center justify-center" style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 15% 100%)' }}>
                <span className="font-data text-[10px] text-primary uppercase">GEOMETRIC OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Mode as First-Class */}
      <div className="border-t border-border pt-12">
        <div className="flex items-center gap-4 mb-8">
          <h3 className="font-data text-xs text-muted-foreground uppercase tracking-wider">Dark Mode — First-Class Requirement</h3>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-muted-foreground mb-4">
              Dark mode is not a bolt-on afterthought — it's a <strong className="text-foreground">first-class design requirement</strong>. 
              All components must maintain clear hierarchy, readable text, and proper contrast in both light and dark modes.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Use <code className="font-data text-[11px] bg-muted px-1 py-0.5 rounded">prefers-color-scheme</code> as the system default</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Allow manual override via theme toggle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Reduce accent saturation 10–20% on dark surfaces</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Test grayscale hierarchy in <em>both</em> modes</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            {/* Light/dark side-by-side mini specimens */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-4 bg-background border border-border rounded-lg">
                <span className="font-data text-[10px] text-muted-foreground uppercase block mb-2">LIGHT</span>
                <div className="font-data text-2xl text-foreground">1.452</div>
                <div className="text-xs text-muted-foreground">g/mL density</div>
              </div>
              <div className="p-4 bg-rho-obsidian rounded-lg">
                <span className="font-data text-[10px] text-white/50 uppercase block mb-2">DARK</span>
                <div className="font-data text-2xl text-white">1.452</div>
                <div className="text-xs text-white/60">g/mL density</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Hierarchy (size, weight, opacity) must survive the mode switch. 
              If it breaks in dark mode, the light mode was relying on color — fix the structure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualSystemOverview;
