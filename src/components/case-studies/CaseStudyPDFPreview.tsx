import { MapPin, CheckCircle2, Quote, Phone } from "lucide-react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";

interface CaseStudy {
  id: string;
  company: string;
  location: string;
  industry: string;
  product: string;
  heroImage: string;
  chartImage?: string;
  tagline: string;
  primaryStat: {
    value: string;
    label: string;
  };
}

interface CaseStudyPDFPreviewProps {
  study: CaseStudy;
}

export const CaseStudyPDFPreview = ({ study }: CaseStudyPDFPreviewProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Two-page preview side by side */}
      <div className="flex gap-4 justify-center flex-wrap">
        {/* Page 1 Preview */}
        <div className="w-[140px] bg-white rounded shadow-lg overflow-hidden border border-slate-200 aspect-[210/297]">
          {/* Header */}
          <div className="bg-rho-obsidian px-2 py-1 flex items-center gap-1">
            <div className="w-2 h-2">
              <RhosonicsLogo variant="gradient" />
            </div>
            <div>
              <p className="text-[4px] font-bold text-white tracking-wide">Rhosonics</p>
            </div>
            <p className="text-[3px] text-primary ml-auto">CASE STUDY</p>
          </div>

          {/* Hero Image */}
          <div className="relative h-[35px] overflow-hidden">
            <img
              src={study.heroImage}
              alt={`${study.company} preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rho-obsidian/90 via-rho-obsidian/40 to-transparent" />
            
            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-1">
              <div className="flex gap-0.5 mb-0.5">
                <span className="px-1 py-0.5 bg-primary text-white text-[3px] rounded">
                  {study.industry}
                </span>
              </div>
              <p className="font-bold text-[5px] text-white">{study.company}</p>
              <div className="flex items-center gap-0.5 text-white/80">
                <MapPin className="w-1.5 h-1.5" />
                <span className="text-[3px]">{study.location}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-1.5 space-y-1">
            {/* Tagline */}
            <p className="text-[3px] text-primary font-medium border-l border-primary pl-1 leading-tight">
              {study.tagline.slice(0, 40)}...
            </p>

            {/* Two Column */}
            <div className="grid grid-cols-2 gap-1">
              {/* Left - Challenge/Solution blocks */}
              <div className="space-y-1">
                <div>
                  <p className="text-[2.5px] text-slate-500 font-medium">THE CHALLENGE</p>
                  <div className="space-y-0.5 mt-0.5">
                    <div className="h-[2px] w-full bg-slate-100 rounded" />
                    <div className="h-[2px] w-full bg-slate-100 rounded" />
                    <div className="h-[2px] w-3/4 bg-slate-100 rounded" />
                  </div>
                </div>
                <div>
                  <p className="text-[2.5px] text-slate-500 font-medium">OUR SOLUTION</p>
                  <div className="space-y-0.5 mt-0.5">
                    <div className="h-[2px] w-full bg-slate-100 rounded" />
                    <div className="h-[2px] w-5/6 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>

              {/* Right - Stat + Specs */}
              <div className="space-y-1">
                <div className="bg-rho-obsidian p-1 rounded text-center">
                  <p className="font-data text-[6px] text-primary">{study.primaryStat.value}</p>
                  <p className="text-[2.5px] text-slate-400">{study.primaryStat.label}</p>
                </div>
                <div className="bg-slate-50 p-1 rounded">
                  <p className="text-[2.5px] text-slate-500 font-medium mb-0.5">SPECIFICATIONS</p>
                  <div className="space-y-0.5">
                    <div className="h-[2px] w-full bg-slate-200 rounded" />
                    <div className="h-[2px] w-full bg-slate-200 rounded" />
                    <div className="h-[2px] w-full bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-1.5 py-0.5 flex justify-between mt-auto">
            <p className="text-[2.5px] text-slate-500">www.rhosonics.com</p>
            <p className="text-[2.5px] text-slate-500">Page 1 of 2</p>
          </div>
        </div>

        {/* Page 2 Preview */}
        <div className="w-[140px] bg-white rounded shadow-lg overflow-hidden border border-slate-200 aspect-[210/297]">
          {/* Header */}
          <div className="bg-rho-obsidian px-2 py-1 flex items-center gap-1">
            <div className="w-2 h-2">
              <RhosonicsLogo variant="gradient" />
            </div>
            <p className="text-[4px] text-white">Rhosonics</p>
            <p className="text-[3px] text-slate-400 ml-auto">{study.company.toUpperCase()} — RESULTS</p>
          </div>

          {/* Content */}
          <div className="p-1.5 space-y-1.5">
            {/* Results */}
            <div>
              <div className="flex items-center gap-0.5 mb-0.5">
                <CheckCircle2 className="w-1.5 h-1.5 text-primary" />
                <p className="text-[2.5px] text-slate-500 font-medium">KEY RESULTS</p>
              </div>
              <div className="grid grid-cols-2 gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-0.5 bg-eco-surface p-0.5 rounded">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-data text-[2px] text-primary">{i}</span>
                    </div>
                    <div className="h-[2px] w-full bg-slate-200 rounded mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Placeholder */}
            {study.chartImage && (
              <div>
                <p className="text-[2.5px] text-slate-500 font-medium mb-0.5">MEASUREMENT DATA</p>
                <div className="border border-slate-200 rounded overflow-hidden h-[25px]">
                  <img
                    src={study.chartImage}
                    alt="Chart preview"
                    className="w-full h-full object-cover opacity-60"
                  />
                </div>
              </div>
            )}

            {/* Quote */}
            <div className="bg-gradient-to-br from-slate-50 to-eco-surface border-l border-primary p-1 rounded-r">
              <Quote className="w-1.5 h-1.5 text-primary/30 mb-0.5" />
              <div className="space-y-0.5">
                <div className="h-[2px] w-full bg-slate-200 rounded" />
                <div className="h-[2px] w-3/4 bg-slate-200 rounded" />
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-rho-obsidian rounded p-1 flex items-center justify-between">
              <div>
                <p className="text-[3px] text-white font-medium">Ready to optimize?</p>
                <p className="text-[2px] text-slate-400">Contact our team</p>
              </div>
              <div className="flex items-center gap-0.5 text-slate-300">
                <Phone className="w-1.5 h-1.5" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-100 px-1.5 py-0.5 flex justify-between mt-auto">
            <p className="text-[2.5px] text-slate-500">Hoge Eng West 30, Putten</p>
            <p className="text-[2.5px] text-slate-500">Page 2 of 2</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 text-center">
        A4 format • 2 pages • Branded headers & footers
      </p>
    </div>
  );
};

export default CaseStudyPDFPreview;
