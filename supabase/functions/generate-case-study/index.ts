import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CASE_STUDY_PROMPT = `You are a technical content writer for Rhosonics, an industrial technology company specializing in ultrasonic density measurement (SDM ECO technology).

Generate a case study based on the provided inputs. Follow these guidelines:

VOICE:
- Direct and technical
- Focus on measurable outcomes
- Use industry-specific terminology
- No marketing fluff

STRUCTURE:
- Title: Clear, descriptive (e.g., "North Sea Sediment Monitoring")
- Description: 2-3 sentences explaining the challenge and solution, technical but readable
- Metrics should reinforce the primary stat

TERMINOLOGY:
- Use "precision" not "accuracy"
- Use "measurement" not "monitoring"
- Use "deploy" not "install"
- Use "optimize" not "improve"
- Use "real-time" not "live"

Return a JSON object with this exact structure:
{
  "title": "Case study title",
  "description": "2-3 sentence technical description",
  "industry": "The industry name",
  "stat": "The primary statistic (e.g., 42%)",
  "statLabel": "What the stat represents",
  "metrics": [
    { "label": "Metric 1 label", "value": "Metric 1 value" },
    { "label": "Metric 2 label", "value": "Metric 2 value" },
    { "label": "Metric 3 label", "value": "Metric 3 value" }
  ]
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { industry, primaryStat, primaryLabel, metrics, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Generate a case study with these inputs:

INDUSTRY: ${industry}
PRIMARY METRIC: ${primaryStat} - ${primaryLabel}
SUPPORTING METRICS: ${metrics.map((m: any) => `${m.label}: ${m.value}`).join(", ")}
CONTEXT: ${context}

Generate a compelling, technical case study that showcases the value of SDM ECO density measurement technology in this ${industry} application.`;

    console.log("Generating case study for industry:", industry);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: CASE_STUDY_PROMPT },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
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

    const data = await response.json();
    const resultText = data.choices?.[0]?.message?.content || "{}";
    
    let caseStudy;
    try {
      caseStudy = JSON.parse(resultText);
    } catch {
      throw new Error("Failed to parse case study response");
    }

    console.log("Case study generated successfully:", caseStudy.title);

    return new Response(JSON.stringify({ caseStudy }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-case-study:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
