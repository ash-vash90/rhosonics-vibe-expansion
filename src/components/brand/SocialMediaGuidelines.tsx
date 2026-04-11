import { Download } from "@/lib/icons";

import linkedinPostProduct from "@/assets/social/linkedin-post-product.jpg";
import linkedinAdProduct from "@/assets/social/linkedin-ad-product.jpg";
import linkedinAdBanner from "@/assets/social/linkedin-ad-banner.jpg";
import linkedinCarousel1 from "@/assets/social/linkedin-carousel-1.jpg";
import linkedinCarousel2 from "@/assets/social/linkedin-carousel-2.jpg";
import linkedinCarousel3 from "@/assets/social/linkedin-carousel-3.jpg";
import linkedinCarouselProduct from "@/assets/social/linkedin-carousel-product.jpg";

const formats = [
  { label: "Single Post", size: "1200 × 1200 px", ratio: "1:1" },
  { label: "Carousel Slide", size: "1080 × 1350 px", ratio: "4:5" },
  { label: "Ad / Sponsored", size: "1200 × 628 px", ratio: "1.91:1" },
  { label: "Cover Banner", size: "1584 × 396 px", ratio: "4:1" },
];

const downloadImage = (src: string, name: string) => {
  const a = document.createElement("a");
  a.href = src;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const AssetCard = ({ src, label, filename }: { src: string; label: string; filename: string }) => (
  <div className="group relative rounded-lg overflow-hidden border border-border bg-card">
    <img src={src} alt={label} loading="lazy" className="w-full h-auto" />
    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
      <button
        onClick={() => downloadImage(src, filename)}
        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-data text-xs uppercase tracking-wider"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
    <div className="p-3 border-t border-border">
      <span className="text-xs font-data text-muted-foreground">{label}</span>
    </div>
  </div>
);

export const SocialMediaGuidelines = () => (
  <section className="space-y-16">
    {/* Intro */}
    <div>
      <h2 className="text-2xl md:text-3xl font-ui font-semibold text-foreground mb-4">
        Social Media Assets
      </h2>
      <p className="text-base text-muted-foreground font-ui max-w-2xl">
        Ready-to-use LinkedIn templates featuring the SDM Eco. All assets follow the brand colour
        palette, typography rules, and layout principles defined in this system.
      </p>
    </div>

    {/* Format specs */}
    <div>
      <h3 className="label-tech text-muted-foreground mb-6">LINKEDIN FORMAT SPECS</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {formats.map((f) => (
          <div key={f.label} className="p-4 rounded-lg border border-border bg-card">
            <span className="block font-ui font-semibold text-foreground text-sm mb-1">{f.label}</span>
            <span className="block font-data text-xs text-primary">{f.size}</span>
            <span className="block font-data text-xs text-muted-foreground">{f.ratio}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Single posts */}
    <div>
      <h3 className="label-tech text-muted-foreground mb-6">SINGLE POSTS — 1200 × 1200</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AssetCard src={linkedinPostProduct} label="Product Feature Post" filename="rhosonics-linkedin-post-product.jpg" />
      </div>
    </div>

    {/* Ads */}
    <div>
      <h3 className="label-tech text-muted-foreground mb-6">ADS — 1200 × 628</h3>
      <div className="grid grid-cols-1 gap-6">
        <AssetCard src={linkedinAdProduct} label="SDM Eco — Product Ad" filename="rhosonics-linkedin-ad-product.jpg" />
        <AssetCard src={linkedinAdBanner} label="Slurry Monitoring — Awareness Ad" filename="rhosonics-linkedin-ad-banner.jpg" />
      </div>
    </div>

    {/* Carousel */}
    <div>
      <h3 className="label-tech text-muted-foreground mb-6">CAROUSEL SLIDES — 1080 × 1350</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <AssetCard src={linkedinCarouselProduct} label="Cover — Product" filename="rhosonics-carousel-cover.jpg" />
        <AssetCard src={linkedinCarousel1} label="Cover — Text" filename="rhosonics-carousel-cover-text.jpg" />
        <AssetCard src={linkedinCarousel2} label="Slide 01 — Density" filename="rhosonics-carousel-slide-01.jpg" />
        <AssetCard src={linkedinCarousel3} label="Slide 02 — Waste" filename="rhosonics-carousel-slide-02.jpg" />
      </div>
    </div>

    {/* Guidelines */}
    <div className="p-6 rounded-lg border border-border bg-card space-y-4">
      <h3 className="font-ui font-bold text-foreground">Layout Rules</h3>
      <ul className="list-disc list-inside text-sm text-muted-foreground font-ui space-y-2">
        <li>Always use the obsidian (#111522) background — never white backgrounds for LinkedIn.</li>
        <li>Primary green (#33993c) for accents, CTAs, and number highlights only.</li>
        <li>Headline text in white, body text in light grey. Never green body text.</li>
        <li>Product photography should occupy ~40-50% of the composition.</li>
        <li>Include the Rhosonics wordmark on every asset — top-left for ads, top-center for carousels.</li>
        <li>Minimum 48px safe zone from all edges for text content.</li>
      </ul>
    </div>
  </section>
);

export default SocialMediaGuidelines;
