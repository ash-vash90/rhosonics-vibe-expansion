import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Comprehensive case study generation prompt following the 10-section structure
const COMPREHENSIVE_PROMPT = `You are a technical content writer for Rhosonics, an industrial technology company specializing in ultrasonic density measurement (SDM ECO technology).

You are creating a comprehensive, 10-section case study following Rhosonics' strict format. Generate professional, detailed content for each section based on the provided inputs.

## BRAND VOICE
- Direct and technical, not salesy
- Focus on measurable outcomes and proof
- Use industry-specific terminology confidently
- Be practical and credible, not promotional

## TERMINOLOGY RULES (MANDATORY)
- Use "precision" NOT "accuracy"
- Use "measurement" NOT "monitoring"
- Use "deploy" NOT "install"
- Use "optimize" NOT "improve"
- Use "real-time" NOT "live"
- Use "S.G." or "kg/L" for density units

## 10-SECTION STRUCTURE

1. **Executive Snapshot** - The "Why should I care?" (5-7 bullets for managers/execs)
2. **Process Context** - What's actually happening (for engineers)
3. **The Real Problem** - Frame in business/operational terms, not just "needed accuracy"
4. **Success Criteria** - How the customer judged success (CRITICAL - often missing)
5. **Solution Architecture** - Technical details of implementation
6. **Commissioning & Validation** - Proof, not claims (this is where credibility lives)
7. **Results** - Split into Technical Results AND Operational/Business Impact
8. **Customer Voice** - Mandatory quote
9. **Why This Worked** - Transferable insight for future customers
10. **What's Next** - Future intent and call to action

## OUTPUT FORMAT
Return a JSON object with the full comprehensive case study structure. Expand brief user inputs into professional, detailed content while preserving technical accuracy.

For any field the user left empty, generate appropriate content based on context. For narrative sections, write 2-4 sentences minimum.

Also include suggested assets:
- imageryStyle: "field" (harsh industrial), "lab" (clean precision), or "mixed"
- imageryPrompts: 2-3 prompts for AI image generation matching brand guidelines
- recommendedGraphs: suggested data visualizations
- iconRecommendations: relevant icons from brand library`;

// Simple case study generation (legacy support)
const SIMPLE_PROMPT = `You are a technical content writer for Rhosonics, an industrial technology company specializing in ultrasonic density measurement (SDM ECO technology).

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
    const body = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Check if this is a comprehensive or simple request
    const isComprehensive = body.mode === "comprehensive";
    
    let userPrompt: string;
    let systemPrompt: string;
    
    if (isComprehensive) {
      const { caseStudyData } = body;
      systemPrompt = COMPREHENSIVE_PROMPT;
      userPrompt = `Generate a comprehensive 10-section case study with these inputs:

## PROVIDED DATA
${JSON.stringify(caseStudyData, null, 2)}

## INSTRUCTIONS
1. Expand all brief inputs into professional, detailed content
2. For empty fields, generate appropriate content based on context
3. Maintain technical credibility throughout
4. Focus on the "Real Problem" being business/operational, not just technical
5. Make "Success Criteria" explicit and measurable
6. Ensure "Customer Voice" quote feels authentic
7. "Why This Worked" should provide transferable insights

Return the complete case study as a JSON object matching the ComprehensiveCaseStudy TypeScript interface.`;
    } else {
      // Legacy simple mode
      const { industry, primaryStat, primaryLabel, metrics, context } = body;
      systemPrompt = SIMPLE_PROMPT;
      userPrompt = `Generate a case study with these inputs:

INDUSTRY: ${industry}
PRIMARY METRIC: ${primaryStat} - ${primaryLabel}
SUPPORTING METRICS: ${metrics.map((m: any) => `${m.label}: ${m.value}`).join(", ")}
CONTEXT: ${context}

Generate a compelling, technical case study that showcases the value of SDM ECO density measurement technology in this ${industry} application.`;
    }

    console.log("Generating case study, mode:", isComprehensive ? "comprehensive" : "simple");

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
      console.error("Failed to parse AI response:", resultText);
      throw new Error("Failed to parse case study response");
    }

    console.log("Case study generated successfully");

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
