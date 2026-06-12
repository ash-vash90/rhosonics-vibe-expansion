import mineralsImg from "@/assets/industries/minerals.jpg";
import dredgingImg from "@/assets/industries/dredging.jpg";
import wastewaterImg from "@/assets/industries/wastewater.jpg";
import miningImg from "@/assets/industries/mining.jpg";

interface IndustryThumbProps {
  id: string;
}

const IMAGES: Record<string, { src: string; alt: string }> = {
  minerals: { src: mineralsImg, alt: "Mineral concentrator with hydrocyclones and slurry piping" },
  semiconductor: { src: semiconductorImg, alt: "Semiconductor fab cleanroom slurry and ultrapure water delivery" },
  dredging: { src: dredgingImg, alt: "Trailing suction hopper dredger discharging slurry at sea" },
  wastewater: { src: wastewaterImg, alt: "Wastewater treatment plant clarifiers and digesters" },
  mining: { src: miningImg, alt: "Underground paste-fill pipeline in a mine" },
};

/**
 * IndustryThumb — real photographic thumbnail per industry.
 * Placeholder AI-generated imagery; swap with licensed photography later.
 * 16:9 aspect, no overlays — let the photo do the work.
 */
export const IndustryThumb = ({ id }: IndustryThumbProps) => {
  const img = IMAGES[id];
  if (!img) return null;

  return (
    <div className="relative w-full aspect-[16/9] bg-foreground overflow-hidden">
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        width={1280}
        height={720}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default IndustryThumb;
