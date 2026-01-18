import { Printer, FileText, CheckCircle } from "lucide-react";
import tradeshowBanner from "@/assets/brand/printed-tradeshow-banner.jpg";
import rollupBanner from "@/assets/brand/printed-rollup-banner.jpg";
import brochure from "@/assets/brand/printed-brochure.jpg";
import businessCards from "@/assets/brand/printed-business-cards.jpg";

const materials = [
  {
    id: "tradeshow",
    title: "Trade Show Backdrop",
    description: "Large-format exhibition graphics for booth presence",
    image: tradeshowBanner,
    specs: ["3m × 2.4m standard", "Dark slate background", "Lime accents at 15-20%"],
  },
  {
    id: "rollup",
    title: "Roll-Up Banners",
    description: "Portable vertical displays for events and offices",
    image: rollupBanner,
    specs: ["85cm × 200cm", "Wave pattern motif", "Logo at eye level"],
  },
  {
    id: "brochure",
    title: "Product Brochures",
    description: "Tri-fold technical collateral for distribution",
    image: brochure,
    specs: ["A4 tri-fold", "Technical diagrams", "QR to digital specs"],
  },
  {
    id: "cards",
    title: "Business Cards",
    description: "Corporate stationery for professional networking",
    image: businessCards,
    specs: ["90mm × 55mm", "Soft-touch matte", "Lime accent stripe"],
  },
];

const printGuidelines = [
  { text: "Use CMYK color profiles for all print production", icon: CheckCircle },
  { text: "Maintain 300 DPI minimum resolution for photography", icon: CheckCircle },
  { text: "Include 3mm bleed on all edges", icon: CheckCircle },
  { text: "Convert fonts to outlines before final submission", icon: CheckCircle },
];

const PrintedMaterials = () => {
  return (
    <div className="mt-16 md:mt-24">
      {/* Section Header */}
      <div className="mb-8 md:mb-12">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="font-data text-xs text-muted-foreground">09.3</span>
          <div className="h-px flex-1 bg-border max-w-12" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <Printer className="w-6 h-6 text-brand" />
          <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground">Printed Materials</h3>
        </div>
        <p className="text-base text-muted-foreground max-w-2xl">
          Physical brand touchpoints for trade shows, events, and corporate communications.
        </p>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {materials.map((material) => (
          <div
            key={material.id}
            className="group relative overflow-hidden rounded-lg border border-border bg-card"
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={material.image}
                alt={material.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Content */}
            <div className="p-5">
              <h4 className="font-ui text-lg font-semibold text-foreground mb-1">
                {material.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {material.description}
              </p>
              
              {/* Specs */}
              <div className="flex flex-wrap gap-2">
                {material.specs.map((spec, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-1 rounded bg-muted text-xs font-data text-muted-foreground"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Print Production Guidelines */}
      <div className="p-6 rounded-lg border border-border bg-muted/30">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-brand" />
          <h4 className="font-ui text-lg font-semibold text-foreground">Print Production Guidelines</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {printGuidelines.map((guideline, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <guideline.icon className="w-4 h-4 text-brand mt-0.5 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{guideline.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color Reference Note */}
      <div className="mt-6 p-4 rounded-lg bg-brand/5 border border-brand/20">
        <p className="text-sm text-foreground">
          <strong className="font-semibold">CMYK Reference:</strong>{" "}
          <span className="text-muted-foreground">
            Brand Green converts to approximately C35 M0 Y100 K0. Always request a proof before full production runs.
          </span>
        </p>
      </div>
    </div>
  );
};

export default PrintedMaterials;
