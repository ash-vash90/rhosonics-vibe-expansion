import mineralsImg from "@/assets/industries/minerals.jpg";
import semiconductorImg from "@/assets/industries/semiconductor.jpg";
import flatpanelImg from "@/assets/industries/flatpanel.jpg";
import chemicalsImg from "@/assets/industries/chemicals.jpg";

interface IndustryThumbProps {
  id: string;
}

const IMAGES: Record<string, { src: string; alt: string }> = {
  minerals: {
    src: mineralsImg,
    alt: "Mineral processing plant with hydrocyclones and slurry piping",
  },
  semiconductor: {
    src: semiconductorImg,
    alt: "Semiconductor fab cleanroom with slurry and ultrapure water delivery",
  },
  flatpanel: {
    src: flatpanelImg,
    alt: "Flat panel display fab with substrate handling robots",
  },
  chemicals: {
    src: chemicalsImg,
    alt: "Chemical processing plant with stainless reactors and inline sensors",
  },
};

/**
 * IndustryThumb — real photographic thumbnail per industry.
 * Placeholder AI-generated imagery; swap with licensed photography later.
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
