import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CHART_STYLE_PROMPT = `You are generating Billboard.js configuration code for Rhosonics brand charts.

IMPORTANT: Generate vanilla JavaScript code that can be copy-pasted into ANY website (WordPress, static HTML, etc.)

CRITICAL REQUIREMENTS FOR LAZY LOADING:

1. The code MUST check if Billboard.js is already loaded before loading CDN scripts
2. The code MUST use Intersection Observer to lazy load the chart only when visible
3. Use this exact pattern for script loading check and lazy initialization:

\`\`\`javascript
(function() {
  var container = document.getElementById('rhosonics-chart');
  
  function initChart() {
    // Chart initialization code goes here with bb.generate()
  }
  
  function loadBillboard(callback) {
    // Check if already loaded
    if (typeof bb !== 'undefined') {
      callback();
      return;
    }
    
    // Load D3 first, then Billboard
    var d3Script = document.createElement('script');
    d3Script.src = 'https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js';
    d3Script.onload = function() {
      var bbScript = document.createElement('script');
      bbScript.src = 'https://cdn.jsdelivr.net/npm/billboard.js@3/dist/billboard.min.js';
      bbScript.onload = callback;
      document.head.appendChild(bbScript);
      
      // Also load CSS if not present
      if (!document.querySelector('link[href*="billboard"]')) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://cdn.jsdelivr.net/npm/billboard.js@3/dist/billboard.min.css';
        document.head.appendChild(css);
      }
    };
    document.head.appendChild(d3Script);
  }
  
  // Intersection Observer for lazy loading
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        observer.disconnect();
        loadBillboard(initChart);
      }
    });
  }, { rootMargin: '200px' });
  
  observer.observe(container);
})();
\`\`\`

EXACT STYLING REQUIREMENTS:

COLORS (use the provided colors from the request):
- Primary color for main data series
- Secondary color for second series (if multi-series)
- Tertiary color for third series (if multi-series)

TYPOGRAPHY (CSS must be included):
- Axis ticks and labels: font-family: 'JetBrains Mono', monospace; font-size: 11px
- Legend: font-family: 'Instrument Sans', sans-serif; font-size: 12px
- Tooltip: font-family: 'JetBrains Mono', monospace

GRID & AXES:
- Grid lines: stroke-dasharray: "3 3"

TOOLTIP:
- Border radius: 8px
- Font: JetBrains Mono

BAR CHARTS:
- Use bar.radius: { ratio: 0.15 }

Generate COMPLETE, SELF-CONTAINED code that includes:
1. CSS for Rhosonics brand styling (fonts, tooltip styling)
2. HTML container element with id "rhosonics-chart"
3. The JavaScript IIFE pattern shown above with the chart config inside initChart()

DO NOT include separate CDN script tags in <head> - the lazy loader handles this.
The code should work when copy-pasted into any HTML page. Use the exact color values provided in the request.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chartConfig } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const {
      title,
      description,
      chartType,
      xAxisLabel,
      yAxisLabel,
      data,
      colors,
    } = chartConfig;

    const userPrompt = `Generate Billboard.js code for a ${chartType} chart with these specifications:

TITLE: ${title}
${description ? `DESCRIPTION: ${description}` : ""}
X-AXIS LABEL: ${xAxisLabel || "Category"}
Y-AXIS LABEL: ${yAxisLabel || "Value"}

COLORS:
- Primary: ${colors?.primary || "hsl(125, 50%, 40%)"}
- Secondary: ${colors?.secondary || "hsl(45, 70%, 48%)"}
- Tertiary: ${colors?.tertiary || "hsl(215, 20%, 45%)"}

DATA:
${JSON.stringify(data, null, 2)}

Generate a complete, standalone HTML snippet that includes:
1. CDN links for billboard.js (https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.js) and d3 (https://cdn.jsdelivr.net/npm/d3/dist/d3.min.js)
2. Billboard.js CSS (https://cdn.jsdelivr.net/npm/billboard.js/dist/billboard.min.css)
3. Custom CSS for Rhosonics typography (JetBrains Mono for data, Instrument Sans for UI)
4. A container div with id "rhosonics-chart"
5. The bb.generate() configuration with the data inline

Chart type mapping:
- bar → type: bar()
- horizontal-bar → type: bar() with axis.rotated: true
- grouped-bar → type: bar() with multiple columns
- stacked-bar → type: bar() with data.groups
- line → type: line()
- multi-line → type: line() with multiple columns
- area → type: area()
- stacked-area → type: area() with data.groups
- composed → type: bar() with types: { "Series 2": line() }
- radar → type: radar()
- pie → type: pie()
- scatter → type: scatter()

The output should be ready to copy-paste into WordPress or any HTML page.`;

    console.log("Generating Billboard.js code for:", title);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: CHART_STYLE_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const responseData = await response.json();
    let code = responseData.choices?.[0]?.message?.content || "";
    
    // Clean up the code - remove markdown code blocks if present
    code = code.replace(/```html?\n?/g, "").replace(/```\n?/g, "").trim();

    console.log("Generated Billboard.js code successfully");

    return new Response(JSON.stringify({ code }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-brand-chart:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
