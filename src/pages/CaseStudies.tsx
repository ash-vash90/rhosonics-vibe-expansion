import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, LogIn, LogOut } from "@/lib/icons";
import { RhosonicsLogo } from "@/components/RhosonicsLogo";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
// Import images
import rioTintoInstallation from "@/assets/case-studies/rio-tinto-installation.jpg";
import flottwegInstallation from "@/assets/case-studies/flottweg-installation.jpg";
import weirMineralsHmi from "@/assets/case-studies/weir-minerals-hmi.jpg";

interface CaseStudy {
  id: string;
  company: string;
  location: string;
  industry: string;
  product: string;
  heroImage: string;
  tagline: string;
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
    tagline: "Replacing nuclear density meters with ultrasonic precision",
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
    tagline: "Innovative flush system for challenging scaling conditions",
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
    tagline: "Triple technology comparison for critical REE mining",
    primaryStat: {
      value: "3",
      label: "Technologies Compared"
    }
  }
];

const CaseStudies = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out" });
  };

  return (
    <div className="min-h-screen bg-slate-100">
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
              <a 
                href="https://rhosonics.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
              >
                <span className="hidden sm:inline">Visit Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-slate-400 hover:text-white gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
              )}
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
              Real-world applications proving the SDM advantage. Explore customer success stories from around the globe.
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
      
      {/* Case Study Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="label-tech text-slate-500 mb-2">FEATURED CASE STUDIES</h2>
          <p className="text-slate-600">
            Learn how leading companies use Rhosonics technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <div 
              key={study.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={study.heroImage} 
                  alt={study.company}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="label-tech-sm text-primary">{study.industry}</span>
                  <h3 className="font-ui font-bold text-lg text-white mt-1">{study.company}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{study.tagline}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-data text-2xl text-primary">{study.primaryStat.value}</span>
                    <span className="label-tech-sm text-slate-400 ml-2">{study.primaryStat.label}</span>
                  </div>
                  <span className="label-tech-sm text-slate-400">{study.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-rho-lime text-rho-obsidian">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-ui font-bold text-2xl md:text-3xl mb-2">
                Ready to see how SDM can help you?
              </h2>
              <p className="text-rho-obsidian/70">
                Contact us to discuss your specific application needs
              </p>
            </div>
            <a 
              href="https://rhosonics.com/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-rho-obsidian text-rho-obsidian hover:bg-rho-obsidian hover:text-white">
                Get in Touch
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
