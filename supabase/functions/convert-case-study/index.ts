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
    const { text, fileName } = await req.json();

    if (!text) {
      throw new Error("No text provided");
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `You are an expert at extracting structured case study information from raw document text. 
Extract information from the provided case study document and return it as JSON matching this exact structure:

{
  "company": "Company name",
  "location": "City, Country or Region",
  "industry": "One of: Mining, Minerals Processing, Food & Beverage, Chemical, Wastewater, Oil & Gas, Pharmaceutical, Pulp & Paper",
  "product": "One of: SDM ECO, SDM PRO, Model 9690, Model 9670, SDM Compact",
  "tagline": "A catchy headline or summary (max 100 chars)",
  "challenge": "2-3 paragraphs describing the customer's challenge",
  "solution": "2-3 paragraphs describing the Rhosonics solution",
  "results": ["Key result 1", "Key result 2", "Key result 3"],
  "primaryStat": {
    "value": "e.g., 99.2% or 50%",
    "label": "e.g., Accuracy or Cost Reduction"
  },
  "specs": [
    { "label": "Application", "value": "e.g., Slurry density monitoring" },
    { "label": "Media", "value": "e.g., Iron ore slurry" },
    { "label": "Range", "value": "e.g., 1.0-2.5 SG" }
  ],
  "quote": {
    "text": "Customer quote if available, otherwise null",
    "author": "Name",
    "role": "Job title"
  }
}

If certain fields cannot be determined from the text, use reasonable defaults or leave as empty string.
Return ONLY valid JSON, no markdown or explanation.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Convert this case study document to structured JSON:\n\nFile: ${fileName}\n\n${text.substring(0, 15000)}` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error("Failed to process document with AI");
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Parse the JSON response
    let caseStudy;
    try {
      // Remove any markdown code blocks if present
      const jsonStr = content.replace(/```json?\n?/g, "").replace(/```\n?/g, "").trim();
      caseStudy = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse structured case study data");
    }

    // Ensure required fields exist
    const structured = {
      id: crypto.randomUUID(),
      company: caseStudy.company || "",
      location: caseStudy.location || "",
      industry: caseStudy.industry || "",
      product: caseStudy.product || "",
      heroImage: null,
      chartImage: null,
      tagline: caseStudy.tagline || "",
      challenge: caseStudy.challenge || "",
      solution: caseStudy.solution || "",
      results: Array.isArray(caseStudy.results) ? caseStudy.results : [""],
      primaryStat: {
        value: caseStudy.primaryStat?.value || "",
        label: caseStudy.primaryStat?.label || "",
      },
      specs: Array.isArray(caseStudy.specs) ? caseStudy.specs : [{ label: "", value: "" }],
      quote: caseStudy.quote?.text ? caseStudy.quote : undefined,
    };

    return new Response(JSON.stringify({ caseStudy: structured }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in convert-case-study:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
