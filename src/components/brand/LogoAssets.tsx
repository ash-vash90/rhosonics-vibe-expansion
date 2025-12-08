import { RhosonicsLogo } from "../RhosonicsLogo";
import { Download, Check, X } from "lucide-react";

export const LogoAssets = () => {
  return (
    <section id="assets" className="mb-32">
      <h2 className="section-header">Logo Assets</h2>

      {/* Logo Contexts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {/* App Icon */}
        <div className="flex flex-col gap-3">
          <div className="card-base aspect-square flex items-center justify-center bg-brand-gradient border-none p-0">
            <div className="w-1/2 h-1/2">
              <RhosonicsLogo variant="white" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="label-tech text-muted-foreground">APP ICON</span>
            <button className="label-tech text-primary hover:underline flex items-center gap-1">
              <Download className="w-3 h-3" /> SVG
            </button>
          </div>
        </div>

        {/* Profile / Light BG */}
        <div className="flex flex-col gap-3">
          <div className="card-base aspect-square flex items-center justify-center p-0">
            <div className="w-1/2 h-1/2">
              <RhosonicsLogo variant="gradient" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="label-tech text-muted-foreground">LIGHT BACKGROUND</span>
            <button className="label-tech text-primary hover:underline flex items-center gap-1">
              <Download className="w-3 h-3" /> SVG
            </button>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="flex flex-col gap-3">
          <div className="card-obsidian aspect-square flex items-center justify-center p-0">
            <div className="w-1/2 h-1/2">
              <RhosonicsLogo variant="white" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="label-tech text-muted-foreground">DARK BACKGROUND</span>
            <button className="label-tech text-primary hover:underline flex items-center gap-1">
              <Download className="w-3 h-3" /> SVG
            </button>
          </div>
        </div>
      </div>

      {/* Social Media Contexts */}
      <h3 className="label-tech text-slate-500 mb-4">SOCIAL MEDIA USAGE</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {/* LinkedIn */}
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-brand-gradient flex items-center justify-center">
            <div className="w-10 h-10">
              <RhosonicsLogo variant="white" />
            </div>
          </div>
          <span className="label-tech text-slate-400">LinkedIn</span>
        </div>

        {/* Twitter/X */}
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-rho-obsidian flex items-center justify-center">
            <div className="w-10 h-10">
              <RhosonicsLogo variant="white" />
            </div>
          </div>
          <span className="label-tech text-slate-400">X / Twitter</span>
        </div>

        {/* YouTube */}
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-card border-2 border-primary flex items-center justify-center">
            <div className="w-10 h-10">
              <RhosonicsLogo variant="gradient" />
            </div>
          </div>
          <span className="label-tech text-slate-400">YouTube</span>
        </div>

        {/* Favicon */}
        <div className="card-base p-4 flex flex-col items-center gap-3">
          <div className="w-16 h-16 flex items-center justify-center">
            <div className="w-8 h-8 bg-brand-gradient rounded-sm flex items-center justify-center p-1">
              <RhosonicsLogo variant="white" />
            </div>
          </div>
          <span className="label-tech text-slate-400">Favicon</span>
        </div>
      </div>

      {/* Color Variations */}
      <h3 className="label-tech text-slate-500 mb-4">APPROVED COLOR VARIATIONS</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { bg: "bg-card", approved: true, label: "White BG" },
          { bg: "bg-rho-obsidian", approved: true, label: "Dark BG" },
          { bg: "bg-brand-gradient", approved: true, label: "Gradient BG" },
          { bg: "bg-slate-200", approved: true, label: "Grey BG" },
        ].map((item, i) => (
          <div key={i} className={`${item.bg} h-24 rounded-lg flex flex-col items-center justify-center gap-2 border border-border`}>
            <div className="w-8 h-8">
              <RhosonicsLogo variant={item.bg.includes('obsidian') || item.bg.includes('gradient') ? 'white' : 'gradient'} />
            </div>
            <div className="flex items-center gap-1">
              {item.approved ? (
                <Check className="w-3 h-3 text-primary" />
              ) : (
                <X className="w-3 h-3 text-destructive" />
              )}
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* File Formats */}
      <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-ui font-bold text-lg mb-4">Available File Formats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { format: "SVG", use: "Web, UI" },
            { format: "PNG", use: "General use" },
            { format: "PDF", use: "Print" },
            { format: "EPS", use: "Vector editing" },
          ].map((file) => (
            <div key={file.format} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                <span className="font-data text-xs text-primary">{file.format}</span>
              </div>
              <span className="text-sm text-muted-foreground">{file.use}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoAssets;
