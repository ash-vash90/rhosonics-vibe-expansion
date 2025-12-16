import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BRAND_VOICE = `
VOICE PILLARS:
1. DIRECT - Cut to essential facts. No filler or unnecessary words.
2. TECHNICAL - Use precise terminology. Our audience understands engineering concepts.
3. CONFIDENT - State capabilities clearly. Avoid hedging language.
4. PRACTICAL - Focus on real-world applications and measurable results.

TERMINOLOGY:
- Use "precision" not "accuracy"
- Use "measurement" not "monitoring"
- Use "deploy" not "install"
- Use "optimize" not "improve"
- Use "real-time" not "live"
- Use "solution" not "product" (for systems)

AVOID:
- Marketing fluff and superlatives
- Vague claims without specifics
- Passive voice
- Consumer-focused language
- Exclamation marks
`;

const TEMPLATE_PROMPTS: Record<string, string> = {
  datasheet: `Generate a product datasheet for an industrial measurement device. Include:
- Product name and brief description
- Key specifications in a structured format
- Applications/use cases
- Technical highlights

Format as clean, scannable text with clear sections.`,

  specification: `Generate a technical specification document. Include:
- Component/system overview
- Detailed technical requirements
- Operating conditions and limits
- Interface specifications
- Compliance standards

Format as formal technical documentation.`,

  sales_email: `Generate a professional B2B sales email. Include:
- Subject line
- Personalized opening addressing the industry pain point
- Brief value proposition (2-3 sentences)
- Specific, relevant benefit
- Clear call to action

Keep it concise (under 150 words for body). No pushy language.`,

  support: `Generate a professional customer support response. Include:
- Acknowledgment of the issue
- Clear explanation of the cause (if known)
- Step-by-step resolution
- Prevention tips for the future
- Offer for further assistance

Be helpful and technically precise.`,

  linkedin: `Generate a LinkedIn post for a B2B industrial technology company. Include:
- Attention-grabbing opening line
- Key insight or value proposition (2-3 sentences)
- Relevant hashtags (3-5)
- Call to action

Keep it under 200 words. Professional but engaging tone.`,

  press_release: `Generate a press release for an industrial technology company. Include:
- Headline
- Subheadline
- Lead paragraph (who, what, when, where, why)
- Supporting details and quotes
- Boilerplate about company

Follow standard press release format.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { templateType, fields } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const templatePrompt = TEMPLATE_PROMPTS[templateType];
    if (!templatePrompt) {
      throw new Error(`Unknown template type: ${templateType}`);
    }

    const fieldData = fields.map((f: any) => `${f.label}: ${f.value}`).join("\n");

    const systemPrompt = `You are a content writer for Rhosonics, an industrial technology company specializing in ultrasonic density measurement (SDM ECO technology).

${BRAND_VOICE}

${templatePrompt}`;

    const userPrompt = `Generate content using these details:\n\n${fieldData}`;

    console.log("Generating template:", templateType);

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

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    console.log("Template generated successfully, length:", content.length);

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-template:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
