import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BRAND_STYLE_PROMPT = `You are generating images for Rhosonics, an industrial technology company.

BRAND COLOR PALETTE (use these colors prominently):
- Primary Green: #22c55e (HSL 142, 71%, 45%)
- Obsidian/Dark: #0a0f14 (near-black backgrounds)
- Slate tones: #334155, #475569, #64748b
- Earth/Ochre accent: #a69359 (warm amber-gold)
- Earth Amber: #c9a227 (golden highlight)

VISUAL STYLE:
- Industrial, technical, precision-focused
- Material aesthetics: brushed aluminum, metal textures
- Subtle ultrasonic wave patterns (concentric arcs emanating from origin)
- Clean, minimal compositions with generous negative space
- Professional photography style, not illustrative
- Workshop/engineering aesthetic, not corporate sterile

AVOID:
- Bright consumer-focused colors
- Cartoon or playful styles
- Stock photo clichés
- Cluttered compositions
- Generic tech imagery

Always incorporate the industrial measurement/precision theme subtly.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, aspectRatio = "1:1", referenceImages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const hasReferences = referenceImages && Array.isArray(referenceImages) && referenceImages.length > 0;
    const numReferences = hasReferences ? referenceImages.length : 0;

    let enhancedPrompt: string;
    if (numReferences > 1) {
      enhancedPrompt = `${prompt}. Blend and merge the ${numReferences} provided reference images together following this instruction. Apply Rhosonics brand style: ${BRAND_STYLE_PROMPT}. Output aspect ratio: ${aspectRatio}. Ultra high resolution.`;
    } else if (numReferences === 1) {
      enhancedPrompt = `${prompt}. Use the provided reference image as a style guide or base for transformation. Apply Rhosonics brand style: ${BRAND_STYLE_PROMPT}. Output aspect ratio: ${aspectRatio}. Ultra high resolution.`;
    } else {
      enhancedPrompt = `${prompt}. Style: ${BRAND_STYLE_PROMPT}. Aspect ratio: ${aspectRatio}. Ultra high resolution.`;
    }

    console.log("Generating brand image with prompt:", prompt.substring(0, 100));
    console.log("Number of reference images:", numReferences);

    // Build the message content based on whether we have reference images
    let messageContent: any;
    
    if (hasReferences) {
      // Multi-image mode - include all reference images
      const imageContents = referenceImages.map((img: string, index: number) => ({
        type: "image_url",
        image_url: {
          url: img,
        },
      }));
      
      messageContent = [
        {
          type: "text",
          text: enhancedPrompt,
        },
        ...imageContents,
      ];
    } else {
      // Pure generation mode
      messageContent = enhancedPrompt;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          { role: "user", content: messageContent },
        ],
        modalities: ["image", "text"],
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
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textResponse = data.choices?.[0]?.message?.content || "";

    if (!imageUrl) {
      throw new Error("No image generated");
    }

    console.log("Generated image successfully");

    return new Response(JSON.stringify({ imageUrl, description: textResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-brand-image:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});