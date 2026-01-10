import html2canvas from "html2canvas";
import { supabase } from "@/integrations/supabase/client";

/**
 * Generate a thumbnail from a DOM element and upload to Supabase storage
 * @param element - The DOM element to capture
 * @param documentId - The document ID to use in the filename
 * @param type - "case-study" or "presentation"
 * @returns The public URL of the uploaded thumbnail
 */
export async function generateAndUploadThumbnail(
  element: HTMLElement,
  documentId: string,
  type: "case-study" | "presentation"
): Promise<string | null> {
  try {
    // Capture the element as a canvas
    const canvas = await html2canvas(element, {
      scale: 0.5, // Lower resolution for smaller file size
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    // Convert to blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        0.7 // Quality
      );
    });

    if (!blob) {
      console.error("Failed to create thumbnail blob");
      return null;
    }

    // Create filename
    const filename = `thumbnails/${type}/${documentId}.jpg`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filename, blob, {
        cacheControl: "3600",
        upsert: true,
        contentType: "image/jpeg",
      });

    if (uploadError) {
      console.error("Failed to upload thumbnail:", uploadError);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("documents")
      .getPublicUrl(filename);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Thumbnail generation error:", error);
    return null;
  }
}

/**
 * Generate a thumbnail from the first page/slide content
 * This is meant to be called from the builder after rendering
 */
export async function captureFirstPageThumbnail(
  containerSelector: string,
  documentId: string,
  type: "case-study" | "presentation"
): Promise<string | null> {
  // Wait for render
  await new Promise((resolve) => setTimeout(resolve, 100));

  const element = document.querySelector(containerSelector) as HTMLElement;
  if (!element) {
    console.error("Container element not found:", containerSelector);
    return null;
  }

  return generateAndUploadThumbnail(element, documentId, type);
}

/**
 * Generate thumbnail from canvas without uploading (returns data URL)
 * Useful for preview generation before save
 */
export async function generateThumbnailDataUrl(
  element: HTMLElement
): Promise<string | null> {
  try {
    const canvas = await html2canvas(element, {
      scale: 0.3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
    });

    return canvas.toDataURL("image/jpeg", 0.6);
  } catch (error) {
    console.error("Thumbnail preview generation error:", error);
    return null;
  }
}
