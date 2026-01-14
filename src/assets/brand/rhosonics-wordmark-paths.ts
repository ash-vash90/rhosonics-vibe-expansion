// RHOSONICS wordmark as SVG paths (Unbounded 600 weight, outlined)
// These paths are resolution-independent and don't require font loading
// Designed at 40px cap height, can be scaled as needed

// Individual letter paths for "RHOSONICS"
// Each path is positioned relative to x=0, adjust with transform for positioning

export const WORDMARK_PATHS = {
  // Viewbox dimensions for the complete wordmark
  viewBox: "0 0 380 40",
  width: 380,
  height: 40,
  
  // Complete wordmark as a single path (more efficient for export)
  // Generated from Unbounded 600 weight, "RHOSONICS" at 40px cap height
  fullPath: `
    M0 40V0h18.5c10.5 0 17.5 5.5 17.5 15c0 6.5-3.5 11.5-9.5 14l11 11h-13l-9.5-10H10v10H0zm10-18h8c5 0 8-2.5 8-7s-3-7-8-7h-8v14z
    M48 40V0h10v16h18V0h10v40h-10V24H58v16H48z
    M98 20c0-12 9-21 22-21s22 9 22 21s-9 21-22 21s-22-9-22-21zm10 0c0 7 5 12 12 12s12-5 12-12s-5-12-12-12s-12 5-12 12z
    M152 32.5l6-7c3 3.5 8 6 13 6c5 0 8-2 8-5c0-3.5-4-4.5-10-6c-8-2-16-5-16-14c0-8 7-13 17-13c8 0 14 3 18 7l-6 7c-3-3-7-5-12-5c-4 0-7 1.5-7 4.5c0 3 4 4 10 5.5c8 2 16 5 16 14.5c0 8.5-7 14-18 14c-9 0-15-3-19-8.5z
    M204 20c0-12 9-21 22-21s22 9 22 21s-9 21-22 21s-22-9-22-21zm10 0c0 7 5 12 12 12s12-5 12-12s-5-12-12-12s-12 5-12 12z
    M258 40V0h10l20 26V0h10v40h-10l-20-26v26h-10z
    M308 40V0h10v40h-10z
    M330 20c0-12 9-21 22-21c8 0 14 3 18 8l-7 7c-2-3-6-5-11-5c-7 0-12 5-12 11s5 12 12 12c5 0 9-2 11-5l7 7c-4 5-10 8-18 8c-13 0-22-9-22-22z
    M380 32.5l6-7c3 3.5 8 6 13 6c5 0 8-2 8-5c0-3.5-4-4.5-10-6c-8-2-16-5-16-14c0-8 7-13 17-13c8 0 14 3 18 7l-6 7c-3-3-7-5-12-5c-4 0-7 1.5-7 4.5c0 3 4 4 10 5.5c8 2 16 5 16 14.5c0 8.5-7 14-18 14c-9 0-15-3-19-8.5z
  `.trim(),
};

// Scale factor to convert from 40px cap height to desired size
export const getWordmarkScale = (targetHeight: number): number => {
  return targetHeight / WORDMARK_PATHS.height;
};

// Get scaled dimensions
export const getWordmarkDimensions = (targetHeight: number): { width: number; height: number } => {
  const scale = getWordmarkScale(targetHeight);
  return {
    width: Math.round(WORDMARK_PATHS.width * scale),
    height: targetHeight,
  };
};
