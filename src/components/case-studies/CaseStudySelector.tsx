import { MapPin, ArrowRight } from "lucide-react";

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

interface CaseStudySelectorProps {
  caseStudies: CaseStudy[];
  onSelect: (id: string) => void;
}

export const CaseStudySelector = ({ caseStudies, onSelect }: CaseStudySelectorProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {caseStudies.map((study, index) => (
        <button
          key={study.id}
          onClick={() => onSelect(study.id)}
          className="group text-left bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 hover:border-primary/30"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={study.heroImage} 
              alt={study.company}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rho-obsidian/80 via-rho-obsidian/20 to-transparent" />
            
            {/* Number badge */}
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="font-data text-white font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Location */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{study.location}</span>
            </div>

            {/* Stat */}
            <div className="absolute bottom-4 right-4 text-right">
              <div className="font-data text-2xl text-primary font-bold">
                {study.primaryStat.value}
              </div>
              <div className="label-tech-sm text-white/70">
                {study.primaryStat.label}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-0.5 bg-primary/10 text-primary label-tech-sm rounded">
                {study.industry}
              </span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 label-tech-sm rounded">
                {study.product}
              </span>
            </div>

            <h3 className="font-ui font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
              {study.company}
            </h3>

            <p className="text-sm text-slate-600 line-clamp-2 mb-4">
              {study.tagline}
            </p>

            <div className="flex items-center gap-2 text-primary font-medium text-sm">
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CaseStudySelector;
