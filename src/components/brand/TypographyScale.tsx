import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TypographyScale = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const typeScaleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate table rows with typing effect simulation
      const tableRows = tableRef.current?.querySelectorAll('tbody tr');
      if (tableRows) {
        gsap.set(tableRows, { opacity: 0, x: -30 });
        
        ScrollTrigger.create({
          trigger: tableRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.to(tableRows, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
            });
          }
        });
      }

      // Animate type scale items - larger sizes first (elastic slide)
      const scaleItems = typeScaleRef.current?.querySelectorAll('.type-scale-item');
      if (scaleItems) {
        gsap.set(scaleItems, { opacity: 0, x: 60 });
        
        ScrollTrigger.create({
          trigger: typeScaleRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(scaleItems, {
              opacity: 1,
              x: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: "back.out(1.2)",
            });
          }
        });
      }

      // Animate spec cards with 3D tilt
      const specCards = cardsRef.current?.querySelectorAll('.spec-card');
      if (specCards) {
        gsap.set(specCards, { 
          opacity: 0, 
          rotateX: 15,
          y: 40,
          transformPerspective: 1000 
        });
        
        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(specCards, {
              opacity: 1,
              rotateX: 0,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="typography" className="mb-32" ref={sectionRef}>
      <h2 className="section-header">Typography Scale</h2>

      {/* Font Families Table */}
      <div ref={tableRef} className="card-base p-0 overflow-hidden mb-12">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 label-tech text-slate-500">ROLE</th>
              <th className="px-6 py-4 label-tech text-slate-500">EXAMPLE</th>
              <th className="px-6 py-4 label-tech text-slate-500 text-right hidden md:table-cell">SPECIFICATION</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">Logo</td>
              <td className="px-6 py-5">
                <span className="font-logo text-2xl text-foreground">Rhosonics</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                Unbounded 500
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">Display</td>
              <td className="px-6 py-5">
                <span className="font-ui font-bold text-4xl text-foreground">Precision</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                Instrument Sans 700
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">Heading</td>
              <td className="px-6 py-5">
                <span className="font-ui font-bold text-2xl text-foreground">Slurry Density</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                Instrument Sans 700
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">Body</td>
              <td className="px-6 py-5">
                <span className="font-ui text-base text-foreground">
                  Optimized density measurement reduced fresh water intake.
                </span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                Instrument Sans 400
              </td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-6 py-5 label-tech text-slate-500">Data</td>
              <td className="px-6 py-5">
                <span className="font-data text-sm bg-slate-100 px-2 py-1 rounded text-foreground">
                  1.4502 g/L
                </span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                JetBrains Mono 500
              </td>
            </tr>
            <tr>
              <td className="px-6 py-5 label-tech text-slate-500">Label</td>
              <td className="px-6 py-5">
                <span className="label-tech text-primary">PRIMARY MEASUREMENT</span>
              </td>
              <td className="px-6 py-5 text-right label-tech text-slate-500 hidden md:table-cell">
                JetBrains Mono 500 / UPPERCASE
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Type Scale */}
      <h3 className="label-tech text-slate-500 mb-4">TYPE SCALE</h3>
      <div ref={typeScaleRef} className="space-y-6">
        {[
          { size: "5xl", px: "48px", example: "Display Hero" },
          { size: "4xl", px: "36px", example: "Section Title" },
          { size: "3xl", px: "30px", example: "Page Heading" },
          { size: "2xl", px: "24px", example: "Card Title" },
          { size: "xl", px: "20px", example: "Subheading" },
          { size: "lg", px: "18px", example: "Large Body" },
          { size: "base", px: "16px", example: "Body Copy" },
          { size: "sm", px: "14px", example: "Caption" },
          { size: "xs", px: "12px", example: "Labels" },
        ].map((item) => (
          <div key={item.size} className="type-scale-item flex items-baseline gap-6 pb-4 border-b border-slate-100">
            <div className="w-16 label-tech text-slate-400">{item.px}</div>
            <div className={`font-ui font-medium text-${item.size} text-foreground flex-1`}>
              {item.example}
            </div>
            <div className="label-tech text-slate-400 hidden sm:block">{item.size}</div>
          </div>
        ))}
      </div>

      {/* Line Height & Letter Spacing */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="spec-card p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="label-tech text-slate-500 mb-4">LINE HEIGHT</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Headings</span>
              <span className="font-data text-sm text-muted-foreground">1.1 - 1.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Body</span>
              <span className="font-data text-sm text-muted-foreground">1.5 - 1.6</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Data</span>
              <span className="font-data text-sm text-muted-foreground">1.2</span>
            </div>
          </div>
        </div>
        <div className="spec-card p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="label-tech text-slate-500 mb-4">LETTER SPACING</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Logo</span>
              <span className="font-data text-sm text-muted-foreground">-0.02em</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Headings</span>
              <span className="font-data text-sm text-muted-foreground">-0.01em</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-ui text-foreground">Labels</span>
              <span className="font-data text-sm text-muted-foreground">0.05em</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographyScale;
