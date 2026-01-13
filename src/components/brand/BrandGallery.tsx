import { Monitor, FileText, Presentation, Package } from "lucide-react";

const galleryItems = [
  {
    category: "Digital Interfaces",
    icon: Monitor,
    items: [
      {
        title: "SDM-Eco Dashboard",
        type: "HMI • Dark Mode",
        mockup: "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        content: (
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-data text-[10px] text-slate-400">LIVE</span>
              </div>
              <span className="font-data text-[10px] text-primary">SDM-Eco</span>
            </div>
            <div className="bg-slate-800/50 rounded p-3 border border-slate-700 text-center">
              <span className="font-data text-2xl text-primary">1.847</span>
              <span className="font-data text-sm text-slate-500 ml-1">g/cm³</span>
            </div>
          </div>
        ),
      },
      {
        title: "Configuration Portal",
        type: "Web App • Light Mode",
        mockup: "bg-gradient-to-br from-slate-50 via-white to-slate-100",
        content: (
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                <span className="font-data text-[10px] text-white">R</span>
              </div>
              <span className="font-ui text-xs font-medium text-slate-800">Sensor Config</span>
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between"><span className="text-slate-500">Output</span><span className="font-data text-slate-800">4-20 mA</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Damping</span><span className="font-data text-slate-800">2.5 s</span></div>
            </div>
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
        type: "A4 • Print-ready",
        mockup: "bg-white",
        content: (
          <div className="p-3 space-y-2 text-slate-800">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shrink-0">
                <span className="font-data text-[10px] text-white">R</span>
              </div>
              <div>
                <h4 className="font-ui text-xs font-bold">SDM-Eco</h4>
                <p className="font-data text-[9px] text-slate-500">Ultrasonic Density Meter</p>
              </div>
            </div>
            <table className="w-full text-[9px]">
              <tbody>
                <tr><td className="py-0.5 text-slate-500">Accuracy</td><td className="py-0.5 font-data text-right">±0.1%</td></tr>
                <tr><td className="py-0.5 text-slate-500">Range</td><td className="py-0.5 font-data text-right">0-70%</td></tr>
              </tbody>
            </table>
          </div>
        ),
      },
      {
        title: "Case Study Layout",
        type: "A4 • Customer Story",
        mockup: "bg-white",
        content: (
          <div className="p-3 space-y-2">
            <div className="bg-mineral-surface rounded p-2">
              <span className="font-data text-[9px] text-mineral-deep">CASE STUDY</span>
              <h4 className="font-ui text-xs font-bold text-slate-800">Rio Tinto</h4>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center p-1 bg-red-50 rounded">
                <span className="font-data text-sm text-red-600">18%</span>
                <div className="text-[8px] text-slate-500">Before</div>
              </div>
              <div className="text-center p-1 bg-eco-surface rounded">
                <span className="font-data text-sm text-primary">3%</span>
                <div className="text-[8px] text-slate-500">After</div>
              </div>
            </div>
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
        type: "16:9 • Dark Theme",
        mockup: "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
        content: (
          <div className="p-3 flex flex-col justify-between h-full min-h-[80px]">
            <div className="flex justify-between items-start">
              <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                <span className="font-data text-[9px] text-white">R</span>
              </div>
              <span className="font-data text-[9px] text-slate-500">Q1 2025</span>
            </div>
            <div>
              <h4 className="font-ui text-sm font-bold text-white">Precision Density</h4>
              <h4 className="font-ui text-sm font-bold text-primary">Measurement</h4>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    category: "Physical",
    icon: Package,
    items: [
      {
        title: "Exhibition Banner",
        type: "850×2000mm",
        mockup: "bg-gradient-to-b from-slate-950 via-slate-900 to-primary/20",
        content: (
          <div className="p-3 flex flex-col items-center justify-between h-full min-h-[100px] text-center">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="font-data text-xs text-white">R</span>
            </div>
            <div>
              <h4 className="font-ui text-sm font-bold text-white">Measure What</h4>
              <h4 className="font-ui text-sm font-bold text-primary">Matters</h4>
            </div>
            <span className="font-data text-[9px] text-slate-500">rhosonics.com</span>
          </div>
        ),
      },
    ],
  },
];

export const BrandGallery = () => {
  return (
    <section id="gallery" className="mb-16">
      <div className="space-y-10">
        {galleryItems.map((category, catIdx) => (
          <div key={catIdx}>
            <div className="flex items-center gap-3 mb-4">
              <category.icon className="w-5 h-5 text-primary" />
              <h3 className="font-ui font-semibold text-foreground">{category.category}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.items.map((item, itemIdx) => (
                <div key={itemIdx} className="group">
                  <div className={`rounded-lg overflow-hidden border border-slate-200 ${item.mockup}`}>
                    {item.content}
                  </div>
                  <div className="mt-2">
                    <h4 className="font-ui font-medium text-sm text-foreground">{item.title}</h4>
                    <p className="font-data text-xs text-slate-500">{item.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandGallery;
