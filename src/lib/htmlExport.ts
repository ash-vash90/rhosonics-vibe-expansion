/**
 * Export the current page as a single self-contained HTML file
 * with all CSS inlined and minimal JS for interactivity
 */

export const exportAsHTML = async () => {
  // Get the main content
  const mainContent = document.querySelector('main');
  if (!mainContent) {
    throw new Error('Could not find main content');
  }

  // Clone the content to avoid modifying the original
  const clone = mainContent.cloneNode(true) as HTMLElement;
  
  // Remove any interactive elements that won't work in static HTML
  clone.querySelectorAll('button[data-export-exclude]').forEach(el => el.remove());
  
  // Get all stylesheets and inline them
  const styles = await getAllStyles();
  
  // Get custom fonts
  const fontLinks = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Unbounded:wght@200..900&display=swap" rel="stylesheet">
  `;

  // Build the complete HTML document
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rhosonics Brand Guidelines</title>
  <meta name="description" content="Complete brand guidelines and design system for Rhosonics ultrasonic measurement solutions.">
  ${fontLinks}
  <style>
    ${styles}
    
    /* Additional reset and base styles */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Instrument Sans', system-ui, sans-serif;
      background-color: hsl(60, 9%, 98%);
      color: hsl(180, 3%, 15%);
      line-height: 1.6;
    }
    
    main {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    /* Ensure images are responsive */
    img {
      max-width: 100%;
      height: auto;
    }
    
    /* Print styles */
    @media print {
      body {
        background: white;
      }
      
      main {
        padding: 0;
      }
      
      section {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <main>
    ${clone.innerHTML}
  </main>
  
  <script>
    // Minimal JS for accordion/collapsible functionality
    document.querySelectorAll('[data-accordion-trigger]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const content = trigger.nextElementSibling;
        if (content) {
          content.style.display = content.style.display === 'none' ? 'block' : 'none';
        }
      });
    });
  </script>
</body>
</html>`;

  return html;
};

const getAllStyles = async (): Promise<string> => {
  const styles: string[] = [];
  
  // Get inline styles from style tags
  document.querySelectorAll('style').forEach(style => {
    styles.push(style.textContent || '');
  });
  
  // Get computed styles for common elements
  const computedStyles = getComputedStylesCSS();
  styles.push(computedStyles);
  
  // Try to fetch external stylesheets
  const linkElements = document.querySelectorAll('link[rel="stylesheet"]');
  for (const link of linkElements) {
    const href = (link as HTMLLinkElement).href;
    if (href && !href.includes('fonts.googleapis.com')) {
      try {
        const response = await fetch(href);
        const css = await response.text();
        styles.push(css);
      } catch (e) {
        console.warn('Could not fetch stylesheet:', href);
      }
    }
  }
  
  return styles.join('\n\n');
};

const getComputedStylesCSS = (): string => {
  // Extract CSS custom properties from :root
  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);
  
  const cssVars: string[] = [];
  
  // Common CSS variables used in the design system
  const varNames = [
    '--background', '--foreground', '--card', '--card-foreground',
    '--popover', '--popover-foreground', '--primary', '--primary-foreground',
    '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
    '--accent', '--accent-foreground', '--destructive', '--destructive-foreground',
    '--border', '--input', '--ring', '--radius',
    '--sidebar-background', '--sidebar-foreground', '--sidebar-primary',
    '--sidebar-primary-foreground', '--sidebar-accent', '--sidebar-accent-foreground',
    '--sidebar-border', '--sidebar-ring',
    '--font-heading', '--font-body', '--font-mono'
  ];
  
  varNames.forEach(name => {
    const value = rootStyles.getPropertyValue(name).trim();
    if (value) {
      cssVars.push(`  ${name}: ${value};`);
    }
  });
  
  return `:root {\n${cssVars.join('\n')}\n}`;
};

export const downloadHTML = async () => {
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
