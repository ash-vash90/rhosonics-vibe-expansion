import { Check, X } from "lucide-react";

export const DosAndDonts = () => {
  return (
    <section id="dos-donts" className="space-y-16 pt-16">
      {/* General Guidelines - Side by side lists */}
      <div className="grid md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden">
        <div className="p-8 bg-eco-surface border-r border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </span>
            <h4 className="font-ui font-bold text-xl text-foreground">Always</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Maintain minimum clear space around the logo",
              "Use high contrast for data displays",
              "Include units with all measurements",
              "Use chamfered button shape for CTAs",
              "Apply brand colors from approved palette",
              "Use semantic font roles consistently"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8 bg-error-surface">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center">
              <X className="w-4 h-4" />
            </span>
            <h4 className="font-ui font-bold text-xl text-foreground">Never</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Add drop shadows or glows to the logo",
              "Use decorative or script fonts",
              "Apply gradient to body text",
              "Use Lime Accent as a standalone color",
              "Rotate or distort the logo",
              "Use Unbounded for anything except the wordmark"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DosAndDonts;