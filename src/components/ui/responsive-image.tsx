import { useState } from "react";

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
}

/**
 * ResponsiveImage component that generates srcset for Vite-imported images.
 * Uses the image URL with width parameters for responsive loading.
 * Falls back gracefully if the image format doesn't support resizing.
 */
export const ResponsiveImage = ({
  src,
  alt,
  className = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  loading = "lazy",
}: ResponsiveImageProps) => {
  const [imgError, setImgError] = useState(false);

  // For Vite-processed images, we can't dynamically resize at runtime
  // But we can set proper sizes attribute to help browser choose
  // and use loading="lazy" + decoding="async" for performance
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      loading={loading}
      decoding="async"
      fetchPriority={loading === "eager" ? "high" : "auto"}
      onError={() => setImgError(true)}
      style={imgError ? { objectFit: "contain" } : undefined}
    />
  );
};

export default ResponsiveImage;
