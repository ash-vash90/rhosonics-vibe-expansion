import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CHART_STYLE_PROMPT = `You are generating Recharts JSX code for Rhosonics brand charts.

EXACT STYLING REQUIREMENTS:

COLORS (use these chart color variables):
- chart-1: hsl(142 71% 32%) - Primary green
- chart-2: hsl(45 70% 48%) - Earth amber
- chart-3: hsl(215 20% 45%) - Slate
- chart-4: hsl(142 71% 25%) - Dark green
- chart-5: hsl(45 40% 35%) - Muted ochre

TYPOGRAPHY:
- All axis labels: font-family: 'JetBrains Mono', monospace
- Font size for labels: 11px
- Font size for axis: 12px
- Color: hsl(215, 19%, 45%) - slate-500

GRID & AXES:
- Grid stroke: hsl(215, 19%, 25%) - slate-700
- Grid strokeDasharray: "3 3"
- Axis line stroke: hsl(215, 19%, 35%) - slate-600

TOOLTIP:
- Background: hsl(213, 32%, 8%) - obsidian
- Border: 1px solid hsl(215, 19%, 25%)
- Border radius: 8px
- Font: JetBrains Mono

BAR CHARTS:
- Border radius: 4px on top corners
- Bar gap: 4

RADAR CHARTS:
- polarGrid stroke: hsl(215, 19%, 25%)
- polarAngleAxis tick font: JetBrains Mono, 11px

Generate ONLY valid JSX code that can be directly rendered. Include all necessary imports from 'recharts'.
The code should be a complete, self-contained component.
Use the exact color values provided, not CSS variables.`;

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
    } = chartConfig;

    const userPrompt = `Generate a ${chartType} chart with these specifications:

TITLE: ${title}
${description ? `DESCRIPTION: ${description}` : ""}
X-AXIS LABEL: ${xAxisLabel || "Category"}
Y-AXIS LABEL: ${yAxisLabel || "Value"}

DATA:
${JSON.stringify(data, null, 2)}

Return ONLY the JSX code wrapped in a React component called BrandChart. Include the data array inline.
The component should use ResponsiveContainer with 100% width and 400px height.
Export the component as default.`;

    console.log("Generating chart code for:", title);

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
    code = code.replace(/```jsx?\n?/g, "").replace(/```\n?/g, "").trim();

    console.log("Generated chart code successfully");

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
