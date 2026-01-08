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
    const { imageBase64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!imageBase64) {
      throw new Error("No image provided");
    }

    console.log("Analyzing chart image...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this chart image and extract the data. This could be a simple bar chart or a complex time-series comparison chart.

Return a JSON object with:
1. "type": The chart type - one of:
   - "bar" for simple bar charts
   - "grouped-bar" for grouped/clustered bar charts  
   - "line" for simple line charts
   - "area" for area charts
   - "pie" for pie charts
   - "timeseries" for single-series time-based line charts
   - "timeseries-comparison" for multi-series time-based comparison charts (like comparing two measurement methods over time)

2. "title": The chart title if visible, or a descriptive title based on the data

3. "dataPoints": An array of objects. For time-series data, extract as many points as you can read (up to 100). Each object has:
   - "name": The label/category name or time label (e.g., "10:22:55 AM" or "Sample 1")
   - "value": The numeric value for the first/primary series
   - "value2": Second value if there are 2 series being compared (optional)
   - "value3": Third value if applicable (optional)
   - "timestamp": For time-series, the time string if readable

4. "labels": Object with:
   - "series1": Name of first series (e.g., "Rhosonics SDM ECO")
   - "series2": Name of second series if applicable (e.g., "Nuclear Density Meter")
   - "series3": Name of third series if applicable
   - "xAxis": X-axis label (e.g., "Time" or "Category")
   - "yAxis": Y-axis label (e.g., "Density (SG)" or "Value")

5. "yAxisRange": Object with:
   - "min": Minimum Y-axis value if visible
   - "max": Maximum Y-axis value if visible

IMPORTANT for time-series charts:
- Extract data points in chronological order
- If there are many data points, sample them evenly (extract ~30-50 representative points)
- For comparison charts, make sure to pair values at each time point
- Read axis scales carefully to estimate values accurately

Be precise with the values - read them from the chart axes/labels if visible.
Return ONLY valid JSON, no markdown or explanation.`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429 || response.status === 402) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    console.log("AI response:", content);

    // Clean up the response - remove markdown code blocks if present
    let jsonStr = content.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.slice(7);
    } else if (jsonStr.startsWith("```")) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith("```")) {
      jsonStr = jsonStr.slice(0, -3);
    }
    jsonStr = jsonStr.trim();

    const chartData = JSON.parse(jsonStr);

    // Validate the response structure
    if (!chartData.type || !chartData.dataPoints || !Array.isArray(chartData.dataPoints)) {
      throw new Error("Invalid chart data structure from AI");
    }

    // Ensure data points have required fields
    chartData.dataPoints = chartData.dataPoints.map((point: any, i: number) => ({
      name: point.name || point.timestamp || `Point ${i + 1}`,
      value: typeof point.value === "number" ? point.value : parseFloat(point.value) || 0,
      value2: point.value2 !== undefined ? (typeof point.value2 === "number" ? point.value2 : parseFloat(point.value2)) : undefined,
      value3: point.value3 !== undefined ? (typeof point.value3 === "number" ? point.value3 : parseFloat(point.value3)) : undefined,
      timestamp: point.timestamp || point.name,
    }));

    // Ensure labels exist for multi-series charts
    if ((chartData.type === "timeseries-comparison" || chartData.type === "grouped-bar") && !chartData.labels) {
      chartData.labels = {
        series1: "Series 1",
        series2: "Series 2",
      };
    }

    console.log("Extracted chart data:", chartData);

    return new Response(JSON.stringify(chartData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-chart-image:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
