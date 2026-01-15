import { Zap, MapPin, Layers } from "lucide-react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VisualSystemOverview = () => {
  const layersRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const enablesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate layers
      if (layersRef.current) {
        const layers = layersRef.current.children;
        gsap.fromTo(layers,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: layersRef.current, start: "top 80%" }
          }
        );
      }

      // Animate comparison
      if (comparisonRef.current) {
        gsap.fromTo(comparisonRef.current,
          { opacity: 0, scale: 0.98 },
          {
            opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: comparisonRef.current, start: "top 85%" }
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
            scrollTrigger: { trigger: enablesRef.current, start: "top 85%" }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

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
      title: "Contextual",
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
    </section>
  );
};

export default VisualSystemOverview;
