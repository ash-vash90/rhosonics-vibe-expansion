/**
 * Export the current page as a truly static, self-contained HTML file
 * with all styles inlined directly on elements - no CSS dependencies
 */

import { ELEMENTS_TO_SKIP_SET } from "@/lib/constants";

const getInlineStyles = (element: Element): string => {
  const computed = window.getComputedStyle(element);
  const styles: string[] = [];
  
  // Get all relevant computed style properties
  const props = [
    'display', 'position', 'top', 'right', 'bottom', 'left',
    'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'border', 'border-width', 'border-style', 'border-color', 'border-radius',
    'background', 'background-color', 'background-image', 'background-size', 'background-position',
    'color', 'font-family', 'font-size', 'font-weight', 'font-style',
    'line-height', 'letter-spacing', 'text-align', 'text-decoration', 'text-transform',
    'flex', 'flex-direction', 'flex-wrap', 'justify-content', 'align-items', 'align-content',
    'gap', 'row-gap', 'column-gap',
    'grid-template-columns', 'grid-template-rows', 'grid-column', 'grid-row',
    'overflow', 'overflow-x', 'overflow-y',
    'opacity', 'visibility', 'z-index',
    'box-shadow', 'box-sizing',
    'white-space', 'word-break', 'word-wrap',
    'list-style', 'list-style-type',
    'cursor', 'pointer-events',
    'vertical-align', 'float', 'clear',
    'object-fit', 'object-position',
    'aspect-ratio', 'fill', 'stroke', 'stroke-width'
  ];
  
  for (const prop of props) {
    const value = computed.getPropertyValue(prop);
    if (value && value !== 'none' && value !== 'auto' && value !== 'normal' && value !== '0px') {
      styles.push(`${prop}: ${value}`);
    }
  }
  
  return styles.join('; ');
};

const processElement = (original: Element, clone: Element): void => {
  // Skip excluded elements
  if (ELEMENTS_TO_SKIP_SET.has(original.tagName)) return;
  
  // Skip elements marked for export exclusion
  if (original.hasAttribute('data-export-exclude')) {
    clone.remove();
    return;
  }
  
  // Apply inline styles
  const inlineStyles = getInlineStyles(original);
  if (inlineStyles && clone instanceof HTMLElement) {
    clone.setAttribute('style', inlineStyles);
  }
  
  // Remove React/framework specific attributes
  const attrsToRemove = ['class', 'className', 'data-radix-collection-item', 'data-state', 'data-orientation'];
  attrsToRemove.forEach(attr => clone.removeAttribute(attr));
  
  // Process children
  const originalChildren = Array.from(original.children);
  const cloneChildren = Array.from(clone.children);
  
  for (let i = 0; i < originalChildren.length; i++) {
    if (cloneChildren[i]) {
      processElement(originalChildren[i], cloneChildren[i]);
    }
  }
};

const convertImagesToBase64 = async (container: HTMLElement): Promise<void> => {
  const images = container.querySelectorAll('img');
  
  for (const img of images) {
    const src = img.getAttribute('src');
    if (!src || src.startsWith('data:')) continue;
    
    try {
      // Try to convert to base64
      const response = await fetch(src);
      const blob = await response.blob();
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
      img.setAttribute('src', base64);
    } catch (e) {
      // Keep original src if conversion fails
      console.warn('Could not convert image:', src);
    }
  }
};

const processSVGs = (container: HTMLElement): void => {
  const svgs = container.querySelectorAll('svg');
  
  svgs.forEach(svg => {
    // Get computed styles and apply inline
    const computed = window.getComputedStyle(svg);
    const width = computed.width;
    const height = computed.height;
    
    if (width !== 'auto') svg.setAttribute('width', width);
    if (height !== 'auto') svg.setAttribute('height', height);
    
    // Process SVG children
    svg.querySelectorAll('*').forEach(el => {
      const elComputed = window.getComputedStyle(el);
      const fill = elComputed.fill;
      const stroke = elComputed.stroke;
      
      if (fill && fill !== 'none') el.setAttribute('fill', fill);
      if (stroke && stroke !== 'none') el.setAttribute('stroke', stroke);
    });
  });
};

export const exportAsHTML = async (): Promise<string> => {
  const mainContent = document.querySelector('main');
  if (!mainContent) {
    throw new Error('Could not find main content');
  }

  // Clone the content
  const clone = mainContent.cloneNode(true) as HTMLElement;
  
  // Process all elements to inline styles
  processElement(mainContent, clone);
  
  // Process SVGs
  processSVGs(clone);
  
  // Convert images to base64
  await convertImagesToBase64(clone);
  
  // Remove any remaining elements with export-exclude
  clone.querySelectorAll('[data-export-exclude]').forEach(el => el.remove());
  clone.querySelectorAll('button').forEach(btn => {
    // Convert buttons to divs for static display
    const div = document.createElement('div');
    div.innerHTML = btn.innerHTML;
    div.setAttribute('style', btn.getAttribute('style') || '');
    btn.replaceWith(div);
  });

  // Build the complete HTML document
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rhosonics Brand Guidelines</title>
  <meta name="description" content="Complete brand guidelines and design system for Rhosonics ultrasonic measurement solutions.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Unbounded:wght@200..900&display=swap" rel="stylesheet">
  <style>
    /* Minimal base reset */
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    img { max-width: 100%; height: auto; }
    
    /* Print styles */
    @media print {
      body { background: white; }
      section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  ${clone.outerHTML}
</body>
</html>`;

  return html;
};

export const downloadHTML = async (): Promise<void> => {
  try {
    const html = await exportAsHTML();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rhosonics-brand-guidelines.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export HTML:', error);
    throw error;
  }
};
