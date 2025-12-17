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
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Normalize URL
    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = `https://${targetUrl}`;
    }

    console.log("Checking dependencies on:", targetUrl);

    // Fetch the page HTML
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RhosonicsDependencyChecker/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch page: ${response.status} ${response.statusText}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = await response.text();
    const htmlLower = html.toLowerCase();

    // Check for Billboard.js
    const hasBillboard = 
      htmlLower.includes("billboard.js") ||
      htmlLower.includes("billboard.min.js") ||
      htmlLower.includes("/billboard") ||
      /typeof\s+bb\s*!==?\s*['"]undefined['"]/.test(html) ||
      /bb\.generate\s*\(/.test(html);

    // Check for D3.js
    const hasD3 = 
      htmlLower.includes("d3.js") ||
      htmlLower.includes("d3.min.js") ||
      htmlLower.includes("/d3@") ||
      htmlLower.includes("d3-selection") ||
      /typeof\s+d3\s*!==?\s*['"]undefined['"]/.test(html);

    // Check for Instrument Sans font
    const hasInstrumentSans = 
      htmlLower.includes("instrument+sans") ||
      htmlLower.includes("instrument sans") ||
      html.includes("Instrument Sans") ||
      html.includes("Instrument+Sans");

    // Check for JetBrains Mono font
    const hasJetBrainsMono = 
      htmlLower.includes("jetbrains+mono") ||
      htmlLower.includes("jetbrains mono") ||
      html.includes("JetBrains Mono") ||
      html.includes("JetBrains+Mono");

    const result = {
      hasBillboard,
      hasD3,
      hasInstrumentSans,
      hasJetBrainsMono,
    };

    console.log("Detection results:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error checking page dependencies:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
