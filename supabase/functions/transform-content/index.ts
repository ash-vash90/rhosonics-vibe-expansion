import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TERMINOLOGY_MAP = `
TERMINOLOGY TRANSFORMATIONS (always apply these):
- "cutting-edge" → "proven"
- "revolutionary" → "ultrasonic measurement"
- "amazing" → "measurable"
- "instantly" → "in real-time"
- "game-changing" → "process-optimizing"
- "best-in-class" → "industrial-grade"
- "innovative" → "engineered"
- "breakthrough" → "precision"
- "state-of-the-art" → "current-generation"
- "world-class" → "industrial"
- "seamlessly" → "directly"
- "effortlessly" → "with minimal setup"
- "unique" → "specialized"
- "perfect" → "optimal"
- "accuracy" → "precision" (unless discussing technical specs)
- "monitoring" → "measurement"
- "commercial" → "industrial"
- "non-contact" → "non-invasive"
- "live" or "instant" → "real-time"
- "product" → "solution" (when discussing full systems)
- "install" → "deploy"
- "improve" → "optimize"
`;

const VOICE_PILLARS = `
VOICE PILLARS:
1. DIRECT - Cut to essential facts. No filler or unnecessary words.
2. TECHNICAL - Use precise terminology. Our audience understands engineering concepts.
3. CONFIDENT - State capabilities clearly. Avoid hedging language like "might" or "could."
4. PRACTICAL - Focus on real-world applications and measurable results.

AVOID:
- Marketing fluff and superlatives
- Vague claims without specifics
- Passive voice
- Consumer-focused language
- Exclamation marks
`;

const MODE_PROMPTS = {
  full: `You are a content transformation specialist for Rhosonics, an industrial technology company.

${TERMINOLOGY_MAP}

${VOICE_PILLARS}

Transform the given content completely:
1. Apply all terminology transformations
2. Adjust tone to match voice pillars
3. Remove marketing fluff
4. Make it direct and technical

Return a JSON object with:
- "transformed": the fully rewritten content
- "changes": array of objects with "original" and "transformed" showing key term changes made`,

  terminology: `You are a terminology specialist for Rhosonics.

${TERMINOLOGY_MAP}

ONLY swap terms according to the terminology map above. Do NOT change the sentence structure or tone.

Return a JSON object with:
- "transformed": the content with only terminology swaps
- "changes": array of objects with "original" and "transformed" showing each term swap made`,

  tone: `You are a tone adjustment specialist for Rhosonics.

${VOICE_PILLARS}

Keep the content structure and specific terms, but adjust the TONE to match these voice pillars:
- Make it more direct (remove filler words)
- Make it more confident (remove hedging)
- Make it more practical (focus on measurable outcomes)
- Remove exclamation marks and excessive enthusiasm

Return a JSON object with:
- "transformed": the tone-adjusted content
- "changes": array of objects with "original" and "transformed" showing key phrase changes`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = MODE_PROMPTS[mode as keyof typeof MODE_PROMPTS] || MODE_PROMPTS.full;

    console.log("Transforming content with mode:", mode);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Transform this content:\n\n${content}` },
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
    
    let result;
    try {
      result = JSON.parse(resultText);
    } catch {
      result = { transformed: resultText, changes: [] };
    }

    console.log("Content transformed successfully");

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in transform-content:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
