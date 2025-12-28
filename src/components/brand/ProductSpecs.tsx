import { Gauge, Waves, Thermometer, Zap } from "lucide-react";
import { DatasheetCard } from "./DatasheetCard";
import { RhosonicsLogo } from "../RhosonicsLogo";

const products = [
  {
    title: "SDM ECO Density Meter",
    subtitle: "Inline Slurry Measurement",
    icon: <Waves className="w-5 h-5" />,
    specs: [
      { label: "Measurement Range", value: "0.8 - 2.5 kg/L" },
      { label: "Accuracy", value: "±0.5%" },
      { label: "Pipe Diameter", value: "DN50 - DN600" },
      { label: "Max Pressure", value: "16 bar" },
      { label: "Temperature Range", value: "-10°C to 80°C" },
      { label: "Power Supply", value: "24 VDC" },
    ],
    diagram: (
      <div className="flex flex-col items-center gap-2">
        <RhosonicsLogo variant="gradient" className="w-16 h-16" />
        <span className="font-data text-xs text-slate-500 uppercase">SDM ECO Series</span>
      </div>
    ),
  },
  {
    title: "USM 100 Ultrasonic Meter",
    subtitle: "Non-Invasive Flow Sensing",
    icon: <Gauge className="w-5 h-5" />,
    specs: [
      { label: "Flow Range", value: "0.1 - 15 m/s" },
      { label: "Accuracy", value: "±1%" },
      { label: "Pipe Size", value: "DN15 - DN1000" },
      { label: "Response Time", value: "< 100ms" },
      { label: "Output", value: "4-20mA / RS485" },
      { label: "IP Rating", value: "IP68" },
    ],
    diagram: (
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
          <Gauge className="w-8 h-8 text-primary" />
        </div>
        <span className="font-data text-xs text-slate-500 uppercase">USM Series</span>
      </div>
    ),
  },
];

export const ProductSpecs = () => {
  return (
    <section id="product-specs" className="mb-20">
      <div className="flex items-center gap-3 mb-2">
        <Thermometer className="w-5 h-5 text-primary" aria-hidden="true" />
        <span className="font-data text-xs uppercase tracking-wider text-primary">SPECIFICATIONS</span>
      </div>
      <h2 className="section-header text-glitch">Product Datasheets</h2>
      <p className="text-slate-500 text-lg max-w-2xl mb-10">
        Technical specifications at a glance. Clean, scannable, engineer-approved.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {products.map((product) => (
          <DatasheetCard
            key={product.title}
            title={product.title}
            subtitle={product.subtitle}
            icon={product.icon}
            specs={product.specs}
            diagram={product.diagram}
          />
        ))}
      </div>

      {/* Feature callouts with accent bullets */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-ui font-semibold text-foreground">Key Features</h3>
          </div>
          <ul className="list-accent-bullets space-y-2 text-sm text-slate-600">
            <li>Non-invasive measurement technology</li>
            <li>Real-time density monitoring</li>
            <li>Industrial-grade durability</li>
            <li>Low maintenance design</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-earth-ochre/10 flex items-center justify-center">
              <Waves className="w-5 h-5 text-earth-ochre" />
            </div>
            <h3 className="font-ui font-semibold text-foreground">Applications</h3>
          </div>
          <ul className="list-accent-bullets space-y-2 text-sm text-slate-600">
            <li>Dredging operations</li>
            <li>Mining & mineral processing</li>
            <li>Wastewater treatment</li>
            <li>Chemical processing</li>
          </ul>
        </div>

        <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
              <Gauge className="w-5 h-5 text-slate-600" />
            </div>
            <h3 className="font-ui font-semibold text-foreground">Certifications</h3>
          </div>
          <ul className="list-accent-bullets space-y-2 text-sm text-slate-600">
            <li>CE marked</li>
            <li>ATEX Zone 2 available</li>
            <li>ISO 9001 certified production</li>
            <li>Marine-grade options</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;
