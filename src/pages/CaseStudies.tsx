import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Shield, Gauge, CheckCircle2, Quote, ExternalLink } from "lucide-react";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { TechnologyComparisonChart } from "@/components/charts/TechnologyComparisonChart";

// Import images
import rioTintoInstallation from "@/assets/case-studies/rio-tinto-installation.jpg";
import rioTintoChart from "@/assets/case-studies/rio-tinto-chart.jpg";
import flottwegFlush from "@/assets/case-studies/flottweg-flush-system.png";
import flottwegInstallation from "@/assets/case-studies/flottweg-installation.jpg";
import weirMineralsHmi from "@/assets/case-studies/weir-minerals-hmi.jpg";
import weirMineralsChart from "@/assets/case-studies/weir-minerals-chart.jpg";

interface CaseStudy {
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

const caseStudies: CaseStudy[] = [
  {
    id: "rio-tinto",
    company: "Rio Tinto",
    location: "Gove, Australia",
    industry: "Alumina Extraction",
    product: "SDM Slurry Density Meter",
    heroImage: rioTintoInstallation,
    chartImage: rioTintoChart,
    tagline: "Replacing nuclear density meters with ultrasonic precision",
    challenge: "Rio Tinto Gove faced significant challenges with traditional radioactive density measurement methods. Safety hazards and operational limitations prompted the search for alternative solutions that could provide precise density measurements without compromising employee safety or process reliability.",
    solution: "The Rhosonics SDM was installed to measure mud density in the alumina extraction process, replacing traditional nuclear density meters. Real-time interpretation of trended data replaced labor-intensive sampling processes.",
    results: [
      "Better correlation with laboratory samples than nuclear meters",
      "Eliminated radioactive safety hazards",
      "Real-time data replaced manual sampling",
      "Improved process control and efficiency",
      "Reduced operational downtime"
    ],
    quote: {
      text: "The Rhosonics SDM matched better with the reference of laboratory samples compared to the nuclear density meter.",
      author: "Process Engineer",
      role: "Rio Tinto Gove"
    },
    specs: [
      { label: "Application", value: "Mud Extraction" },
      { label: "Comparison", value: "Nuclear vs SDM" },
      { label: "Test Duration", value: "7 Days" },
      { label: "Validation", value: "Lab Samples" }
    ],
    primaryStat: {
      value: "0%",
      label: "Radiation Risk"
    }
  },
  {
    id: "flottweg",
    company: "Flottweg",
    location: "Austria & Germany",
    industry: "Separation Technology",
    product: "SDM-4 with Flush System",
    heroImage: flottwegInstallation,
    chartImage: flottwegFlush,
    tagline: "Innovative flush system for challenging scaling conditions",
    challenge: "Flottweg faced challenges measuring density of a water/solids slurry due to scaling on the SDM-4 sensor. The buildup caused inaccurate readings as the sensor measured the scaling layer rather than the actual slurry medium.",
    solution: "Rhosonics R&D developed an innovative flush system integrated into the spool piece. This allows daily cleaning without removing the sensor. A Pt100 temperature sensor was also added to compensate for temperature fluctuations.",
    results: [
      "Density measurements stable within ±0.01 S.G. of manual readings",
      "Daily cleaning without sensor removal",
      "Temperature compensation for 15°C-26°C range",
      "System deployed across Austria and Germany",
      "Ongoing reliability in harsh conditions"
    ],
    quote: {
      text: "The flush spool in our last project is doing well. It is much better for the sensor with flushing, the data are more stable.",
      author: "Christine Bauer-Salomon",
      role: "Flottweg"
    },
    specs: [
      { label: "Pipe Diameter", value: "3 inch" },
      { label: "Pipe Material", value: "HDPE" },
      { label: "Density Range", value: "1080-1100 g/l" },
      { label: "Temperature", value: "15°C - 26°C" }
    ],
    primaryStat: {
      value: "±0.01",
      label: "S.G. Accuracy"
    }
  },
  {
    id: "weir-minerals",
    company: "Weir Minerals",
    location: "Finland & Australia",
    industry: "Rare Earth Elements",
    product: "SDM ECO",
    heroImage: weirMineralsHmi,
    chartImage: weirMineralsChart,
    tagline: "Triple technology comparison for critical REE mining",
    challenge: "Weir Minerals was tasked with conducting pipe loop test work for the Sokli project in Finland, establishing a regional European source of Rare Earth Elements crucial for wind turbine production. They needed to validate density measurement methods across three competing technologies.",
    solution: "Rhosonics was invited to test the SDM ECO sensor in the test loop alongside a Coriolis meter and nuclear density gauge. The non-nuclear SDM ECO was installed with a spool piece in a 3-6 inch pipe to handle high-density slurries up to 1900 g/l.",
    results: [
      "SDM ECO matched laboratory samples alongside Coriolis",
      "Outperformed nuclear density gauge accuracy",
      "Successfully handled 45-60 wt% solids",
      "Selected for Phase 2 testing in Melbourne, Australia",
      "Validated for high-density REE slurry applications"
    ],
    specs: [
      { label: "Pipe Diameter", value: "DN80-DN150" },
      { label: "Solids Content", value: "45-60 wt%" },
      { label: "Density Range", value: "1450-1900 g/l" },
      { label: "Temperature", value: "22°C - 26°C" }
    ],
    primaryStat: {
      value: "3",
      label: "Technologies Compared"
    }
  }
];

const CaseStudyCard = ({ study, index }: { study: CaseStudy; index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <article className="relative">
      {/* Section number */}
      <div className="absolute -left-4 md:-left-8 top-0 label-tech text-slate-300">
        {String(index + 1).padStart(2, '0')}
      </div>
      
      {/* Hero Section */}
      <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Image */}
        <div className={`relative group ${!isEven ? 'lg:order-2' : ''}`}>
          <div className="relative overflow-hidden rounded-xl bg-slate-800">
            <img 
              src={study.heroImage} 
              alt={`${study.company} installation`}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-rho-obsidian/80 via-transparent to-transparent" />
            
            {/* Location badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{study.location}</span>
            </div>
          </div>
          
          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-4 md:-right-6 card-obsidian p-4 md:p-6">
            <div className="text-3xl md:text-4xl font-bold text-primary font-data">
              {study.primaryStat.value}
            </div>
            <div className="label-tech-sm text-slate-400 mt-1">
              {study.primaryStat.label}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className={`${!isEven ? 'lg:order-1' : ''}`}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary label-tech-sm rounded-full border border-primary/20">
              {study.industry}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 label-tech-sm rounded-full">
              {study.product}
            </span>
          </div>
          
          <h2 className="font-ui font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 tracking-tight">
            {study.company}
          </h2>
          
          <p className="text-xl md:text-2xl text-primary font-medium mb-6">
            {study.tagline}
          </p>
          
          <p className="text-slate-600 text-lg leading-relaxed">
            {study.challenge}
          </p>
        </div>
      </div>
      
      {/* Details Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Challenge & Solution */}
        <div className="md:col-span-2 space-y-6">
          {/* Solution Card */}
          <div className="card-eco p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-ui font-semibold text-lg text-foreground">The Solution</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {study.solution}
            </p>
          </div>
          
          {/* Results */}
          <div className="card-metal p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="font-ui font-semibold text-lg text-foreground">Results</h3>
            </div>
            <ul className="space-y-3">
              {study.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-slate-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Specs & Quote */}
        <div className="space-y-6">
          {/* Technical Specs */}
          <div className="card-obsidian p-6">
            <div className="flex items-center gap-2 mb-4">
              <Gauge className="w-5 h-5 text-primary" />
              <h3 className="font-ui font-semibold text-base text-slate-100">Specifications</h3>
            </div>
            <div className="space-y-3">
              {study.specs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-700/50 last:border-0">
                  <span className="label-tech-sm text-slate-400">{spec.label}</span>
                  <span className="font-data text-sm text-slate-100">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chart Image if available */}
          {study.chartImage && (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <img 
                src={study.chartImage} 
                alt={`${study.company} data comparison`}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Quote Section */}
      {study.quote && (
        <div className="relative bg-gradient-to-br from-slate-50 to-eco-surface border-l-4 border-primary p-6 md:p-8 rounded-r-xl">
          <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
          <blockquote className="text-lg md:text-xl text-slate-700 italic mb-4 max-w-3xl">
            "{study.quote.text}"
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-ui font-bold text-primary">
                {study.quote.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="font-ui font-semibold text-foreground">{study.quote.author}</div>
              <div className="text-sm text-slate-500">{study.quote.role}</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Interactive Chart for Weir Minerals */}
      {study.id === "weir-minerals" && (
        <TechnologyComparisonChart />
      )}
    </article>
  );
};

const CaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-rho-obsidian border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
              <div className="w-7 h-7">
                <RhosonicsLogo variant="gradient" />
              </div>
              <span className="font-logo text-lg text-slate-100 tracking-tight hidden sm:inline">
                Rhosonics
              </span>
            </Link>
            
            <nav className="flex items-center gap-4">
              <Link 
                to="/tools" 
                className="text-sm text-slate-400 hover:text-primary transition-colors"
              >
                AI Tools
              </Link>
              <a 
                href="https://rhosonics.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
              >
                <span className="hidden sm:inline">Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative bg-rho-obsidian text-slate-100 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2333993c' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        {/* Gradient orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="label-tech text-primary mb-4">
              <span className="text-slate-400">06</span>
              <span className="mx-2">/</span>
              ANALYSIS
            </div>
            
            <h1 className="font-ui font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Case Studies
            </h1>
            
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
              Real-world applications proving the SDM advantage. From alumina extraction to separation technology, 
              our solutions deliver measurable results in the most demanding industrial environments.
            </p>
            
            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-slate-700/50">
              <div>
                <div className="font-data text-3xl text-primary">40+</div>
                <div className="label-tech-sm text-slate-400 mt-1">Years Experience</div>
              </div>
              <div>
                <div className="font-data text-3xl text-primary">6</div>
                <div className="label-tech-sm text-slate-400 mt-1">Continents</div>
              </div>
              <div>
                <div className="font-data text-3xl text-primary">1000+</div>
                <div className="label-tech-sm text-slate-400 mt-1">Installations</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Case Studies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-24 md:space-y-32">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-rho-lime text-rho-obsidian">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-ui font-bold text-2xl md:text-3xl mb-2">
                Ready to optimize your process?
              </h2>
              <p className="text-rho-obsidian/80 text-lg">
                Contact our team to discuss your measurement challenges.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:info@rhosonics.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rho-obsidian text-slate-100 font-semibold rounded-lg hover:bg-rho-obsidian/90 transition-colors"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="https://rhosonics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-rho-obsidian font-semibold rounded-lg hover:bg-white/30 transition-colors"
              >
                Learn More
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-rho-obsidian text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <RhosonicsLogo variant="gradient" />
              </div>
              <span className="font-logo text-slate-100">Rhosonics</span>
              <span className="text-sm">Proven Process Insights</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} Rhosonics. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CaseStudies;
