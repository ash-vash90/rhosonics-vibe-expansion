import { ArrowRight } from "@/lib/icons";
import { Link } from "react-router-dom";

interface CrossLink {
  label: string;
  to: string;
  description: string;
}

interface SectionCrossLinkProps {
  links: CrossLink[];
}

const SectionCrossLink = ({ links }: SectionCrossLinkProps) => (
  <div className="mt-16 pt-8 border-t border-border/50">
    <span className="font-data text-[10px] uppercase tracking-widest text-muted-foreground/60 block mb-4">
      See also
    </span>
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
        >
          <div className="flex-1 min-w-0">
            <span className="font-ui text-sm font-medium text-foreground block">{link.label}</span>
            <span className="text-xs text-muted-foreground">{link.description}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </Link>
      ))}
    </div>
  </div>
);

export default SectionCrossLink;
