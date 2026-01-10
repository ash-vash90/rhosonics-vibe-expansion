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
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      throw new Error("No file provided");
    }

    const fileName = file.name.toLowerCase();
    const fileBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(fileBuffer);

    // Extract text from file
    let extractedText = "";

    if (fileName.endsWith(".txt") || fileName.endsWith(".md")) {
      extractedText = new TextDecoder().decode(uint8Array);
    } else if (fileName.endsWith(".pdf")) {
      const pdfText = new TextDecoder("latin1").decode(uint8Array);
      const textMatches = pdfText.matchAll(/\(([^)]+)\)/g);
      const textParts: string[] = [];
      
      for (const match of textMatches) {
        const text = match[1]
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "")
          .replace(/\\t/g, " ")
          .replace(/\\\(/g, "(")
          .replace(/\\\)/g, ")")
          .replace(/\\\\/g, "\\");
        
        if (text.trim() && text.length > 1 && !/^[\x00-\x1F]+$/.test(text)) {
          textParts.push(text);
        }
      }
      
      extractedText = textParts.join(" ").replace(/\s+/g, " ").trim();
      
      if (extractedText.length < 100) {
        const streamMatches = pdfText.matchAll(/stream\s*([\s\S]*?)\s*endstream/g);
        const streamTexts: string[] = [];
        
        for (const match of streamMatches) {
          const content = match[1];
          const readableText = content.replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ").trim();
          if (readableText.length > 20) {
            streamTexts.push(readableText);
          }
        }
        
        if (streamTexts.length > 0) {
          extractedText = streamTexts.join("\n\n");
        }
      }
    } else if (fileName.endsWith(".docx") || fileName.endsWith(".pptx")) {
      const docText = new TextDecoder("utf-8", { fatal: false }).decode(uint8Array);
      
      // Extract text from XML tags (works for both DOCX and PPTX)
      const textMatches = docText.matchAll(/<[aw]:t[^>]*>([^<]+)<\/[aw]:t>/g);
      const textParts: string[] = [];
      
      for (const match of textMatches) {
        textParts.push(match[1]);
      }
      
      extractedText = textParts.join(" ").replace(/\s+/g, " ").trim();
    } else {
      throw new Error("Unsupported file type. Please upload PDF, PPTX, DOCX, TXT, or MD files.");
    }

    if (!extractedText || extractedText.length < 20) {
      extractedText = "Unable to extract sufficient text from the document. The document may be scanned or contain complex formatting.";
    }

    console.log("Extracted text length:", extractedText.length);

    // Use Lovable AI to convert content to presentation structure
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert presentation designer for Rhosonics, an industrial measurement technology company. 
Your task is to convert raw document text into a structured presentation with branded slides.

Each slide should contain blocks of content. Available block types:
- "heading": Large title text (content: { text: "...", level: 1|2|3 })
- "subheading": Section header (content: { text: "..." })
- "paragraph": Body text (content: { text: "..." })
- "bullet-list": Bulleted list (content: { items: ["...", "..."] })
- "stat-card": Single metric (content: { stat: { value: "99%", label: "Accuracy" } })
- "stat-grid": Multiple metrics (content: { stats: [{ value: "50+", label: "Customers" }, ...] })
- "quote": Testimonial (content: { quote: { text: "...", author: "...", role: "..." } })
- "callout": Important note (content: { callout: { type: "info|warning|success", title: "...", text: "..." } })
- "divider": Visual separator (content: { dividerStyle: "line|gradient|wave" })
- "cta": Call to action (content: { cta: { text: "...", buttonLabel: "..." } })

Create a professional presentation structure with:
1. Title slide (dark background with heading + subheading)
2. Problem/Challenge slide
3. Solution/Approach slides
4. Key metrics/results (use stat-grid or stat-card blocks)
5. Quotes/testimonials if available
6. Call to action/next steps

Use these background presets for slides:
- Dark slides: { type: "gradient", value: "linear-gradient(180deg, hsl(225 40% 10%) 0%, hsl(225 30% 18%) 100%)" }
- Light slides: { type: "solid", value: "hsl(0 0% 100%)" }
- Brand gradient: { type: "gradient", value: "linear-gradient(135deg, hsl(125 50% 40%) 0%, hsl(85 60% 45%) 100%)" }

Respond ONLY with a valid JSON object matching this structure:
{
  "name": "Presentation Title",
  "slides": [
    {
      "blocks": [
        { "type": "heading", "content": { "text": "...", "level": 1 }, "style": { "alignment": "center" } },
        ...
      ],
      "background": { "type": "gradient", "value": "..." }
    },
    ...
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Convert the following document content into a Rhosonics-branded presentation:\n\n${extractedText.slice(0, 15000)}` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response
    let presentationData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      presentationData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI response as JSON");
    }

    // Add IDs to slides and blocks
    const presentation = {
      id: crypto.randomUUID(),
      name: presentationData.name || "Imported Presentation",
      slides: (presentationData.slides || []).map((slide: any) => ({
        id: crypto.randomUUID(),
        blocks: (slide.blocks || []).map((block: any) => ({
          id: crypto.randomUUID(),
          type: block.type,
          content: block.content || {},
          style: block.style,
        })),
        background: slide.background || { type: "solid", value: "hsl(0 0% 100%)" },
        notes: slide.notes,
      })),
      theme: {
        colors: {
          primary: "hsl(125 50% 40%)",
          secondary: "hsl(225 40% 10%)",
          accent: "hsl(42 40% 40%)",
          background: "hsl(0 0% 100%)",
          foreground: "hsl(225 40% 10%)",
        },
        fonts: {
          heading: "font-logo",
          body: "font-ui",
          data: "font-data",
        },
      },
      aspectRatio: "16:9",
      metadata: {
        author: "Imported",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    console.log("Generated presentation with", presentation.slides.length, "slides");

    return new Response(JSON.stringify({ presentation, extractedText: extractedText.slice(0, 500) }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in convert-presentation:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
