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
    const { slideIndex, slideContent, presentationName, totalSlides } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Analyze current slide content
    const existingBlocks = slideContent?.blocks?.map((b: any) => b.type) || [];
    const existingText = slideContent?.blocks
      ?.filter((b: any) => b.content?.text)
      .map((b: any) => b.content.text)
      .join(" ") || "";

    const prompt = `You are a presentation design expert for Rhosonics, a precision measurement technology company.

Analyze this slide and suggest 2-3 content additions that would make it more impactful.

Presentation: "${presentationName}"
Slide ${slideIndex + 1} of ${totalSlides}
Current block types: ${existingBlocks.join(", ") || "none"}
Current text content: "${existingText.substring(0, 200)}"

Slide position context:
- Slide 1 = Title slide (focus on impact, branding)
- Middle slides = Content slides (focus on key messages, data, evidence)
- Last slide = Closing/CTA (focus on action, summary)

Suggest blocks that would complement existing content. For technical presentations:
- stat-card: For key metrics (precision %, cost savings, etc.)
- spec-table: For technical specifications
- bullet-list: For features or benefits
- quote: For customer testimonials
- callout: For important notes or warnings

Return JSON: {
  "suggestions": [
    {
      "title": "Short action title",
      "description": "Why this helps (max 15 words)",
      "blockType": "stat-card|spec-table|bullet-list|quote|callout",
      "content": { ... matching content for the block type }
    }
  ]
}

Content examples:
- stat-card content: { "stat": { "value": "99.5%", "label": "Measurement Precision" } }
- spec-table content: { "specs": [{ "label": "Range", "value": "0-100%" }] }
- bullet-list content: { "items": ["Benefit one", "Benefit two"] }
- quote content: { "quote": { "text": "Quote here", "author": "Name", "role": "Title" } }
- callout content: { "callout": { "type": "info", "title": "Note", "text": "Details" } }`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status === 402) {
        return new Response(JSON.stringify({ suggestions: [] }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices?.[0]?.message?.content || '{"suggestions":[]}');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in generate-slide-suggestions:", error);
    return new Response(JSON.stringify({ suggestions: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});