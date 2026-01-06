import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { company, industry, product, tagline, existingChallenge, existingSolution, results, primaryStat } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `You are an expert case study writer for Rhosonics, a company specializing in ultrasonic measurement technology for industrial applications.

Context:
- Company: ${company}
- Industry: ${industry}
- Product: ${product}
- Tagline: ${tagline || "Not provided"}
- Existing challenge text: ${existingChallenge || "None"}
- Existing solution text: ${existingSolution || "None"}
- Results: ${JSON.stringify(results || [])}
- Primary stat: ${primaryStat?.value || "N/A"} ${primaryStat?.label || ""}

Generate professional case study content with:
1. A compelling "Challenge" paragraph (2-3 sentences) describing the customer's problem before Rhosonics
2. A compelling "Solution" paragraph (2-3 sentences) describing how Rhosonics solved it
3. A chart type recommendation based on the data/results

Use Rhosonics terminology:
- "precision" not "accuracy" 
- "deploy" not "install"
- "real-time measurement" where applicable
- Focus on measurable outcomes

Return JSON: {
  "challenge": "string",
  "solution": "string", 
  "chartRecommendation": {
    "type": "bar" | "line" | "grouped-bar" | "pie" | "radar",
    "reason": "short explanation why this chart type fits the data"
  }
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status === 402) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices?.[0]?.message?.content || "{}");

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-case-study-content:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});