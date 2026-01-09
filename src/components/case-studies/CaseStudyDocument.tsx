import { MapPin, CheckCircle2, Gauge, Quote, Phone, Mail, Globe, ImageIcon, BarChart3 } from "lucide-react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { TechnologyComparisonChart } from "@/components/charts/TechnologyComparisonChart";
import { BrandChart } from "@/components/tools/BrandChart";
import { TimeSeriesChartPreview } from "@/components/case-study-builder/TimeSeriesChartPreview";
import { ChartBuilderData } from "@/types/visualCaseStudy";

export interface CaseStudy {
  id: string;
  company: string;
  location: string;
  industry: string;
  product: string;
  heroImage: string;
  chartImage?: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
  specs: {
    label: string;
    value: string;
  }[];
  primaryStat: {
    value: string;
    label: string;
  };
}

interface CaseStudyDocumentProps {
  study: CaseStudy;
  printMode?: boolean;
  editMode?: boolean;
  chartData?: ChartBuilderData;
}

export const CaseStudyDocument = ({ 
  study, 
  printMode = false, 
  editMode = false,
  chartData,
}: CaseStudyDocumentProps) => {
  const isPlaceholder = (value: string) => value.startsWith("[") && value.endsWith("]");
  
  // Convert chartData to BrandChart format
  const buildChartData = () => {
    if (!chartData) return null;
    return chartData.dataPoints.map(dp => ({
      name: dp.name,
      value: dp.value,
      value2: dp.value2,
      value3: dp.value3,
    }));
  };

  const chartDataForBrand = buildChartData();

  return (
    <div className="case-study-document flex flex-col items-center gap-8 py-8 px-4">
      {/* Page 1 - Cover & Introduction */}
      <article className={`bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] relative overflow-hidden flex flex-col print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm] ${printMode ? "print-page" : ""}`}>
        {/* Header Bar */}
        <div className="bg-rho-obsidian px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <div>
              <span className="font-logo text-white text-lg tracking-wide uppercase">RHOSONICS</span>
              <span className="label-tech-sm text-slate-400 block">ULTRASONIC MEASUREMENT SOLUTIONS</span>
            </div>
          </div>
          <div className="label-tech text-primary">CASE STUDY</div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[280px] overflow-hidden flex-shrink-0">
          {study.heroImage ? (
            <img 
              src={study.heroImage} 
              alt={`${study.company} installation`}
              className="w-full h-full object-cover"
              loading={printMode ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                <span className="text-sm">{editMode ? "Upload hero image" : "No image"}</span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-rho-obsidian/90 via-rho-obsidian/40 to-transparent" />
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 label-tech-sm rounded ${isPlaceholder(study.industry) ? "bg-slate-500/50 text-white/70" : "bg-primary text-white"}`}>
                {study.industry}
              </span>
              <span className={`px-3 py-1 backdrop-blur label-tech-sm rounded ${isPlaceholder(study.product) ? "bg-slate-500/50 text-white/70" : "bg-white/20 text-white"}`}>
                {study.product}
              </span>
            </div>
            <h1 className={`font-ui font-bold text-4xl mb-2 ${isPlaceholder(study.company) ? "text-white/50" : "text-white"}`}>
              {study.company}
            </h1>
            <div className={`flex items-center gap-2 ${isPlaceholder(study.location) ? "text-white/40" : "text-white/80"}`}>
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{study.location}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Tagline */}
          <p className={`text-xl font-semibold mb-6 border-l-4 border-primary pl-4 ${isPlaceholder(study.tagline) ? "text-slate-400 italic" : "text-primary"}`}>
            {study.tagline}
          </p>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-8 flex-1">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h2 className="label-tech text-slate-500 mb-2">THE CHALLENGE</h2>
                <p className={`text-sm leading-relaxed ${isPlaceholder(study.challenge) ? "text-slate-400 italic" : "text-slate-700"}`}>
                  {study.challenge}
                </p>
              </div>

              <div>
                <h2 className="label-tech text-slate-500 mb-2">OUR SOLUTION</h2>
                <p className={`text-sm leading-relaxed ${isPlaceholder(study.solution) ? "text-slate-400 italic" : "text-slate-700"}`}>
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Primary Stat Card */}
              <div className="bg-rho-obsidian p-6 rounded-lg text-center">
                <div className={`font-data text-4xl mb-1 ${study.primaryStat.value === "—" ? "text-slate-500" : "text-primary"}`}>
                  {study.primaryStat.value}
                </div>
                <div className={`label-tech-sm ${isPlaceholder(study.primaryStat.label) ? "text-slate-500" : "text-slate-400"}`}>
                  {study.primaryStat.label}
                </div>
              </div>

              {/* Specifications */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="label-tech text-slate-500 mb-3 flex items-center gap-2">
                  <Gauge className="w-4 h-4" />
                  SPECIFICATIONS
                </h3>
                <div className="space-y-2">
                  {study.specs.length > 0 ? (
                    study.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between text-sm py-1 border-b border-slate-200 last:border-0">
                        <span className="text-slate-500">{spec.label || "[Label]"}</span>
                        <span className="font-data text-slate-800">{spec.value || "[Value]"}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 italic">[Add specifications]</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-8 py-3 flex items-center justify-between text-xs text-slate-500">
          <span>www.rhosonics.com</span>
          <span>Page 1 of 2</span>
        </div>
      </article>

      {/* Page 2 - Results & Data */}
      <article className={`bg-white shadow-2xl w-full max-w-[210mm] min-h-[297mm] relative overflow-hidden flex flex-col print:shadow-none print:max-w-none print:w-[210mm] print:h-[297mm] ${printMode ? "print-page" : ""}`}>
        {/* Header Bar */}
        <div className="bg-rho-obsidian px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <RhosonicsLogo variant="gradient" />
            </div>
            <span className="font-logo text-white text-lg tracking-wide uppercase">RHOSONICS</span>
          </div>
          <div className="label-tech text-slate-400">
            {(isPlaceholder(study.company) ? "COMPANY" : study.company).toUpperCase()} — RESULTS
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Results Section */}
          <div className="mb-8">
            <h2 className="label-tech text-slate-500 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              KEY RESULTS
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {study.results.length > 0 && study.results.some(r => r.trim()) ? (
                study.results.map((result, i) => (
                  <div key={i} className="flex items-start gap-3 bg-eco-surface p-3 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="font-data text-xs text-primary">{i + 1}</span>
                    </div>
                    <span className={`text-sm ${result.trim() ? "text-slate-700" : "text-slate-400 italic"}`}>
                      {result || "[Key result]"}
                    </span>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-sm text-slate-400 italic p-3 bg-eco-surface rounded-lg">
                  [Add key results]
                </div>
              )}
            </div>
          </div>

          {/* Chart Section - Builder Chart Data */}
          {chartData && chartDataForBrand && !printMode && (
            <div className="mb-8">
              <h2 className="label-tech text-slate-500 mb-4">
                {chartData.title || "MEASUREMENT DATA"}
              </h2>
              {(chartData.type === "timeseries" || chartData.type === "timeseries-comparison") ? (
                <TimeSeriesChartPreview data={chartData} height={240} printMode={printMode} />
              ) : (
                <div className={`rounded-lg p-4 h-[240px] overflow-hidden ${chartData.background === "dark" ? "bg-rho-obsidian" : "bg-slate-50 border border-slate-200"}`}>
                  <BrandChart
                    chartType={chartData.type}
                    data={chartDataForBrand}
                    colors={{
                      primary: chartData.colors.primary,
                      secondary: chartData.colors.secondary || "#73B82E",
                      tertiary: chartData.colors.tertiary || "#a69359",
                    }}
                    isLightBg={chartData.background === "light"}
                  />
                </div>
              )}
            </div>
          )}

          {/* Chart Section - Static Image */}
          {study.chartImage && !chartData && study.id !== "weir-minerals" && (
            <div className="mb-8">
              <h2 className="label-tech text-slate-500 mb-4">MEASUREMENT DATA</h2>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <img 
                  src={study.chartImage} 
                  alt={`${study.company} comparison data`}
                  className="w-full object-contain max-h-48"
                />
              </div>
            </div>
          )}

          {/* Chart Placeholder for Builder */}
          {!chartData && !study.chartImage && editMode && (
            <div className="mb-8">
              <h2 className="label-tech text-slate-500 mb-4">DATA VISUALIZATION</h2>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 flex flex-col items-center justify-center text-slate-400 h-[200px]">
                <BarChart3 className="w-10 h-10 mb-2" />
                <span className="text-sm">Generate or upload a chart</span>
              </div>
            </div>
          )}

          {/* Interactive Chart for Weir Minerals (legacy) */}
          {study.id === "weir-minerals" && !chartData && (
            <div className="mb-8 flex-1">
              <h2 className="label-tech text-slate-500 mb-4">TECHNOLOGY COMPARISON</h2>

              {printMode ? (
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <img
                    src={study.chartImage}
                    alt={`${study.company} technology comparison chart`}
                    className="w-full object-contain max-h-64"
                    loading="eager"
                  />
                </div>
              ) : (
                <>
                  <div className="pdf-only hidden border border-slate-200 rounded-lg overflow-hidden">
                    <img
                      src={study.chartImage}
                      alt={`${study.company} technology comparison chart`}
                      className="w-full object-contain max-h-64"
                    />
                  </div>

                  <div className="no-pdf">
                    <div className="bg-rho-obsidian rounded-lg p-4 h-[280px] overflow-hidden">
                      <TechnologyComparisonChart />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Quote Section */}
          {study.quote ? (
            <div className="bg-gradient-to-br from-slate-50 to-eco-surface border-l-4 border-primary p-6 rounded-r-lg mb-8">
              <Quote className="w-6 h-6 text-primary/30 mb-2" />
              <blockquote className={`text-base italic mb-3 ${study.quote.text ? "text-slate-700" : "text-slate-400"}`}>
                "{study.quote.text || "[Enter quote text]"}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-ui font-bold text-primary text-xs">
                    {study.quote.author ? study.quote.author.split(' ').map(n => n[0]).join('') : "?"}
                  </span>
                </div>
                <div>
                  <div className={`font-ui font-semibold text-sm ${study.quote.author ? "text-slate-800" : "text-slate-400"}`}>
                    {study.quote.author || "[Author name]"}
                  </div>
                  <div className={`text-xs ${study.quote.role ? "text-slate-500" : "text-slate-400"}`}>
                    {study.quote.role || "[Role]"}
                  </div>
                </div>
              </div>
            </div>
          ) : editMode ? (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 mb-8 text-center text-slate-400">
              <Quote className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm">[Optional: Add customer quote]</span>
            </div>
          ) : null}

          {/* Contact CTA */}
          <div className="mt-auto bg-rho-obsidian rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-ui font-semibold text-white mb-1">
                  Ready to optimize your process?
                </h3>
                <p className="text-sm text-slate-400">
                  Contact our team to discuss your measurement challenges.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="tel:+31341370073" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  +31 341 37 00 73
                </a>
                <a href="mailto:info@rhosonics.com" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                  info@rhosonics.com
                </a>
                <a href="https://rhosonics.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors">
                  <Globe className="w-4 h-4" />
                  www.rhosonics.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-8 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>Hoge Eng West 30, 3882 TR Putten, Netherlands</span>
          </div>
          <span>Page 2 of 2</span>
        </div>
      </article>
    </div>
  );
};

export default CaseStudyDocument;
