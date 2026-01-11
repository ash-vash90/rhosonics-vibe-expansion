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
    const { briefDescription, company, industry, product, keyResult } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = `You are an expert case study writer for Rhosonics, a company that manufactures ultrasonic measurement equipment for industrial process control.

Based on the following brief description, generate complete content for a professional case study document.

Brief Description: ${briefDescription}
${company ? `Company: ${company}` : ""}
${industry ? `Industry: ${industry}` : ""}
${product ? `Rhosonics Product: ${product}` : ""}
${keyResult ? `Key Result: ${keyResult}` : ""}

Generate content following the Rhosonics brand voice:
- Technical but accessible
- Confident without being boastful
- Focus on precision and reliability
- Emphasize measurable results

Return a JSON object with EXACTLY this structure:
{
  "heroTitle": "Short impactful title (max 8 words)",
  "heroSubtitle": "Subtitle explaining the success (max 15 words)",
  "company": "Company name or 'Leading [Industry] Company' if unknown",
  "location": "City, Country or Region",
  "industry": "Industry sector",
  "product": "Rhosonics product used",
  "tagline": "One compelling sentence capturing the transformation",
  "challenge": "2-3 sentences describing the problem they faced before Rhosonics",
  "solution": "2-3 sentences describing how Rhosonics technology solved the problem",
  "primaryStat": {
    "value": "A specific number with unit (e.g., '99.5%', '40%', '90 days')",
    "label": "What the stat measures (e.g., 'Measurement Accuracy', 'Cost Reduction')"
  },
  "specs": [
    { "label": "Measurement Type", "value": "e.g., Slurry Density" },
    { "label": "Medium", "value": "e.g., Iron Ore Slurry" },
    { "label": "Range", "value": "e.g., 1.1 - 2.0 kg/L" },
    { "label": "Accuracy", "value": "e.g., ±0.5%" }
  ],
  "results": [
    "Specific measurable result 1",
    "Specific measurable result 2",
    "Specific measurable result 3"
  ],
  "quote": {
    "text": "A realistic testimonial quote (2-3 sentences) from a customer perspective",
    "author": "First Last",
    "role": "Job Title, Company"
  },
  "ctaText": "Compelling call-to-action question"
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
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const contentString = data.choices?.[0]?.message?.content || "{}";
    const content = JSON.parse(contentString);

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-case-study-content-fill:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
