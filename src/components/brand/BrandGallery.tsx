import { Monitor, FileText, Image, Presentation, Package, Users } from "lucide-react";

export const BrandGallery = () => {
  const galleryItems = [
    {
      category: "Digital Interfaces",
      icon: Monitor,
      items: [
        {
          title: "SDM-Eco Dashboard",
          description: "Real-time density monitoring interface with live data visualization",
          type: "UI Design",
          tags: ["HMI", "Data Viz", "Dark Mode"],
          mockup: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
          content: (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="font-data text-xs text-slate-400">LIVE</span>
                </div>
                <span className="font-data text-xs text-primary">SDM-Eco #2024-0892</span>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-center">
                  <span className="font-data text-4xl text-primary">1.847</span>
                  <span className="font-data text-lg text-slate-500 ml-1">g/cm³</span>
                </div>
                <div className="text-center mt-1">
                  <span className="font-data text-xs text-slate-500">DENSITY</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/30 rounded p-2 text-center">
                  <span className="font-data text-sm text-slate-300">67.4%</span>
                  <div className="font-data text-xs text-slate-500">SOLIDS</div>
                </div>
                <div className="bg-slate-800/30 rounded p-2 text-center">
                  <span className="font-data text-sm text-slate-300">2.1 m/s</span>
                  <div className="font-data text-xs text-slate-500">FLOW</div>
                </div>
              </div>
            </div>
          ),
        },
        {
          title: "Configuration Portal",
          description: "Web-based sensor configuration and calibration interface",
          type: "Web Application",
          tags: ["Settings", "Calibration", "Light Mode"],
          mockup: "bg-gradient-to-br from-slate-50 via-white to-slate-100",
          content: (
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <span className="font-data text-xs text-white">R</span>
                </div>
                <span className="font-ui text-sm font-medium text-slate-800">Sensor Config</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Output Range</span>
                  <span className="font-data text-xs text-slate-800">4-20 mA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Damping</span>
                  <span className="font-data text-xs text-slate-800">2.5 s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Low Alarm</span>
                  <span className="font-data text-xs text-primary">1.200 g/cm³</span>
                </div>
              </div>
              <button className="w-full py-2 bg-primary text-white text-xs font-medium rounded">
                Apply Settings
              </button>
            </div>
          ),
        },
      ],
    },
    {
      category: "Print Collateral",
      icon: FileText,
      items: [
        {
          title: "Technical Datasheet",
          description: "SDM-Eco product specifications with performance charts",
          type: "PDF Document",
          tags: ["A4", "Technical", "Print-ready"],
          mockup: "bg-white",
          content: (
            <div className="p-4 space-y-3 text-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shrink-0">
                  <span className="font-data text-xs text-white">R</span>
                </div>
                <div>
                  <h4 className="font-ui text-sm font-bold">SDM-Eco</h4>
                  <p className="font-data text-xs text-slate-500">Ultrasonic Density Meter</p>
                </div>
              </div>
              <div className="border-t border-b border-slate-200 py-2">
                <table className="w-full text-xs">
                  <tbody>
                    <tr>
                      <td className="py-1 text-slate-500">Accuracy</td>
                      <td className="py-1 font-data text-right">±0.1%</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-slate-500">Range</td>
                      <td className="py-1 font-data text-right">0-70% solids</td>
                    </tr>
                    <tr>
                      <td className="py-1 text-slate-500">Pressure</td>
                      <td className="py-1 font-data text-right">25 bar max</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="h-12 bg-slate-100 rounded flex items-center justify-center">
                <span className="text-xs text-slate-400">[Performance Chart]</span>
              </div>
            </div>
          ),
        },
        {
          title: "Case Study Layout",
          description: "Customer success story with before/after metrics",
          type: "Marketing Document",
          tags: ["A4", "Customer Story", "Metrics"],
          mockup: "bg-white",
          content: (
            <div className="p-4 space-y-3">
              <div className="bg-mineral-surface rounded p-3">
                <span className="font-data text-xs text-mineral-deep">CASE STUDY</span>
                <h4 className="font-ui text-sm font-bold text-slate-800 mt-1">Rio Tinto</h4>
                <p className="text-xs text-slate-500">Iron Ore Processing</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 bg-red-50 rounded">
                  <span className="font-data text-lg text-red-600">18%</span>
                  <div className="text-xs text-slate-500">Before</div>
                </div>
                <div className="text-center p-2 bg-eco-surface rounded">
                  <span className="font-data text-lg text-primary">3%</span>
                  <div className="text-xs text-slate-500">After</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reagent waste reduction through real-time density monitoring...
              </p>
            </div>
          ),
        },
      ],
    },
    {
      category: "Presentations",
      icon: Presentation,
      items: [
        {
          title: "Sales Deck Cover",
          description: "High-impact opening slide with brand elements",
          type: "PowerPoint",
          tags: ["16:9", "Dark Theme", "Hero"],
          mockup: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
          content: (
            <div className="p-4 flex flex-col justify-between h-full min-h-[120px]">
              <div className="flex justify-between items-start">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <span className="font-data text-xs text-white">R</span>
                </div>
                <span className="font-data text-xs text-slate-500">Q1 2025</span>
              </div>
              <div>
                <h4 className="font-ui text-base font-bold text-white">Precision Density</h4>
                <h4 className="font-ui text-base font-bold text-primary">Measurement</h4>
                <p className="font-data text-xs text-slate-400 mt-2">
                  Mining • Dredging • Water Treatment
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "Data Slide",
          description: "Technical comparison with brand-styled charts",
          type: "PowerPoint",
          tags: ["16:9", "Charts", "Data"],
          mockup: "bg-white",
          content: (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-ui text-sm font-bold text-slate-800">Accuracy Comparison</h4>
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                  <span className="font-data text-xs text-white">R</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-16">Nuclear</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div className="w-3/4 bg-slate-400 rounded-full h-2" />
                  </div>
                  <span className="font-data text-xs text-slate-500">±2%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 w-16">Coriolis</span>
                  <div className="flex-1 bg-slate-200 rounded-full h-2">
                    <div className="w-1/2 bg-slate-400 rounded-full h-2" />
                  </div>
                  <span className="font-data text-xs text-slate-500">±0.5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary w-16 font-medium">Ultrasonic</span>
                  <div className="flex-1 bg-primary/20 rounded-full h-2">
                    <div className="w-1/4 bg-primary rounded-full h-2" />
                  </div>
                  <span className="font-data text-xs text-primary font-medium">±0.1%</span>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      category: "Trade Show & Physical",
      icon: Users,
      items: [
        {
          title: "Exhibition Banner",
          description: "Roll-up banner for trade show presence",
          type: "Large Format",
          tags: ["850×2000mm", "Print", "Vertical"],
          mockup: "bg-gradient-to-b from-slate-950 via-slate-900 to-primary/20",
          content: (
            <div className="p-4 flex flex-col items-center justify-between h-full min-h-[140px] text-center">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="font-data text-sm text-white">R</span>
              </div>
              <div>
                <h4 className="font-ui text-base font-bold text-white">Measure What</h4>
                <h4 className="font-ui text-base font-bold text-primary">Matters</h4>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-4 text-slate-400">
                  <span className="font-data text-xs">±0.1%</span>
                  <span className="text-slate-600">|</span>
                  <span className="font-data text-xs">40+ YEARS</span>
                </div>
                <p className="font-data text-xs text-slate-500">rhosonics.com</p>
              </div>
            </div>
          ),
        },
        {
          title: "Product Label",
          description: "Equipment identification label for installed sensors",
          type: "Industrial Label",
          tags: ["Durable", "QR Code", "IP67"],
          mockup: "bg-slate-100",
          content: (
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                  <span className="font-data text-xs text-white">R</span>
                </div>
                <span className="font-logo text-xs text-slate-800 tracking-wide">RHOSONICS</span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <div className="text-xs">
                    <span className="text-slate-500">Model:</span>
                    <span className="font-data text-slate-800 ml-1">SDM-Eco</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500">S/N:</span>
                    <span className="font-data text-slate-800 ml-1">2024-0892</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-500">Cal:</span>
                    <span className="font-data text-slate-800 ml-1">2025-03</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-white rounded border border-slate-300 flex items-center justify-center">
                  <span className="text-xs text-slate-400">QR</span>
                </div>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      category: "Digital Assets",
      icon: Image,
      items: [
        {
          title: "Social Media Card",
          description: "LinkedIn/Twitter post template with data highlight",
          type: "Social Media",
          tags: ["1200×628", "OG Image", "Shareable"],
          mockup: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
          content: (
            <div className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <span className="font-data text-xs text-primary">CASE STUDY</span>
                <h4 className="font-ui text-sm font-bold text-white mt-1">15% Reagent Reduction</h4>
                <p className="text-xs text-slate-400 mt-1">Real-time density monitoring at scale</p>
              </div>
              <div className="text-center">
                <span className="font-data text-2xl text-primary">15%</span>
                <div className="font-data text-xs text-slate-500">SAVED</div>
              </div>
            </div>
          ),
        },
        {
          title: "Email Header",
          description: "Newsletter and transactional email header",
          type: "Email",
          tags: ["600px wide", "Responsive", "Light"],
          mockup: "bg-white",
          content: (
            <div className="p-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                    <span className="font-data text-xs text-white">R</span>
                  </div>
                  <span className="font-logo text-sm text-slate-800 tracking-wide">RHOSONICS</span>
                </div>
                <span className="font-data text-xs text-slate-400">NEWSLETTER</span>
              </div>
              <div className="mt-3">
                <h4 className="font-ui text-sm font-bold text-slate-800">SDM-Eco Firmware Update</h4>
                <p className="text-xs text-slate-500 mt-1">Enhanced accuracy mode now available</p>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      category: "Packaging",
      icon: Package,
      items: [
        {
          title: "Shipping Box",
          description: "Product packaging with handling instructions",
          type: "Packaging",
          tags: ["Corrugated", "Sustainable", "Branded"],
          mockup: "bg-gradient-to-br from-mineral-surface to-slate-200",
          content: (
            <div className="p-4 flex flex-col justify-between h-full min-h-[120px]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                  <span className="font-data text-xs text-white">R</span>
                </div>
                <span className="font-logo text-xs text-slate-700 tracking-wide">RHOSONICS</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 border border-slate-400 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-500">↑</span>
                  </div>
                  <div className="w-6 h-6 border border-slate-400 rounded flex items-center justify-center">
                    <span className="text-xs text-slate-500">❄</span>
                  </div>
                </div>
                <p className="font-data text-xs text-slate-500">SDM-Eco | S/N: 2024-0892</p>
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <section id="gallery" className="mb-32">
      <h2 className="section-header">Brand Gallery</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Real examples of the Rhosonics brand applied across digital interfaces, print materials, 
        trade show presence, and product packaging. Each execution follows the guidelines documented above.
      </p>

      <div className="space-y-16">
        {galleryItems.map((category, catIndex) => (
          <div key={catIndex}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <category.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-ui font-bold text-lg">{category.category}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="card-base overflow-hidden group">
                  {/* Mockup Preview */}
                  <div className={`${item.mockup} aspect-[4/3] overflow-hidden`}>
                    <div className="h-full flex items-center justify-center p-2">
                      <div className="w-full max-w-[280px] rounded-lg shadow-lg overflow-hidden bg-inherit">
                        {item.content}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="font-ui font-semibold">{item.title}</h4>
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 text-xs font-data bg-slate-100 text-slate-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Usage Constraints */}
      <div className="mt-12 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-ui font-bold mb-3">Usage Constraints</h4>
        <p className="text-sm text-muted-foreground mb-4">
          These examples demonstrate system-level thinking, not templates to copy. Context determines application — layouts, typography, and spacing must be evaluated against specific use cases.
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            All mockups use approved brand colors, typography (Instrument Sans, JetBrains Mono), and the Rhosonics logo.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Dark themes use Obsidian (#111522) as the primary background—never pure black.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Data displays consistently use JetBrains Mono for numerical values and units.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            Print materials include CMYK color specifications and minimum logo sizes from the Downloads section.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 mt-0.5">⚠</span>
            <span className="text-amber-800">Do not replicate layouts without understanding the underlying brand rules. When in doubt, refer to the Visual System chapters rather than copying gallery examples.</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default BrandGallery;
