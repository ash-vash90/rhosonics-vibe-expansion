import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error("Unauthorized");
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      throw new Error("No file provided");
    }

    const fileName = file.name.toLowerCase();
    const fileBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(fileBuffer);

    let extractedText = "";

    // Handle different file types
    if (fileName.endsWith(".txt") || fileName.endsWith(".md")) {
      // Plain text files
      extractedText = new TextDecoder().decode(uint8Array);
    } else if (fileName.endsWith(".pdf")) {
      // For PDFs, extract text using basic parsing
      // Convert to string and look for text streams
      const pdfText = new TextDecoder("latin1").decode(uint8Array);
      
      // Simple PDF text extraction - looks for text between BT and ET markers
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
      
      // If basic extraction fails, try stream-based extraction
      if (extractedText.length < 100) {
        const streamMatches = pdfText.matchAll(/stream\s*([\s\S]*?)\s*endstream/g);
        const streamTexts: string[] = [];
        
        for (const match of streamMatches) {
          const content = match[1];
          // Look for readable ASCII text
          const readableText = content.replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ").trim();
          if (readableText.length > 20) {
            streamTexts.push(readableText);
          }
        }
        
        if (streamTexts.length > 0) {
          extractedText = streamTexts.join("\n\n");
        }
      }
      
      if (!extractedText || extractedText.length < 50) {
        extractedText = "PDF text extraction was limited. The document may contain scanned images or complex formatting. Please copy and paste the text content manually for best results.";
      }
    } else if (fileName.endsWith(".docx")) {
      // DOCX files are ZIP archives with XML content
      // For simplicity, extract readable text from the raw bytes
      const docText = new TextDecoder("utf-8", { fatal: false }).decode(uint8Array);
      
      // Extract text from XML tags
      const textMatches = docText.matchAll(/<w:t[^>]*>([^<]+)<\/w:t>/g);
      const textParts: string[] = [];
      
      for (const match of textMatches) {
        textParts.push(match[1]);
      }
      
      extractedText = textParts.join(" ").replace(/\s+/g, " ").trim();
      
      if (!extractedText || extractedText.length < 20) {
        extractedText = "DOCX text extraction was limited. Please copy and paste the text content manually for best results.";
      }
    } else {
      throw new Error("Unsupported file type. Please upload PDF, DOCX, TXT, or MD files.");
    }

    console.log("Extracted text length:", extractedText.length);

    return new Response(JSON.stringify({ 
      text: extractedText,
      fileName: file.name,
      fileSize: file.size 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in parse-document:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
