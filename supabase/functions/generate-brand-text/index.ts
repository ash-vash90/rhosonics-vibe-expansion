import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BRAND_VOICE_PROMPT = `You are a copywriter for Rhosonics, an industrial technology company specializing in ultrasonic density measurement (SDM ECO technology).

VOICE PILLARS:
1. DIRECT - Cut to essential facts. No filler or unnecessary words.
2. TECHNICAL - Use precise terminology. Our audience understands engineering concepts.
3. CONFIDENT - State capabilities clearly. Avoid hedging language like "might" or "could."
4. PRACTICAL - Focus on real-world applications and measurable results.

TERMINOLOGY RULES - Always use:
- "Precision" NOT "accuracy" (unless discussing technical specs)
- "Measurement" NOT "monitoring" (we measure, not just monitor)
- "Industrial" NOT "commercial"
- "Non-invasive" NOT "non-contact"
- "Real-time" NOT "live" or "instant"
- "Solution" NOT "product" (when discussing full systems)
- "Deploy" NOT "install" (emphasizes action)
- "Optimize" NOT "improve" (implies data-driven)

AVOID:
- Marketing fluff and superlatives
- Vague claims without specifics
- Passive voice
- Consumer-focused language
- Exclamation marks

OUTPUT FORMAT: Return only the generated text, no explanations or meta-commentary.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const contextPrompt = context ? `\nCONTEXT: This is for ${context} content.` : "";

    console.log("Generating brand text with prompt:", prompt.substring(0, 100));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: BRAND_VOICE_PROMPT + contextPrompt },
          { role: "user", content: prompt },
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

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || "";

    console.log("Generated text successfully, length:", generatedText.length);

    return new Response(JSON.stringify({ text: generatedText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-brand-text:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
