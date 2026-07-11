import { genAI, AI_MODELS } from "./gemini";
import { SYSTEM_PROMPTS } from "./prompts";

/**
 * AI Layout Generation Service
 * Returns a strict JSON structure for the Canva-like editor to render.
 */
export async function generateDocumentLayout(documentType: string, userPrompt: string) {
  const prompt = `
${SYSTEM_PROMPTS.LAYOUT_ENGINE}

Document Type: ${documentType}
User Request: ${userPrompt}

Return ONLY the valid JSON structure. Do not include markdown code block formatting.
`;

  try {
    const model = genAI.getGenerativeModel({ model: AI_MODELS.TEXT });
    const result = await model.generateContent(prompt);
    let rawText = await result.response.text();
    
    // Clean up potential markdown formatting if AI hallucinates it
    rawText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(rawText);
  } catch (error) {
    console.error("Gemini Layout Generation Error:", error);
    throw new Error("Gagal merancang layout dokumen dari AI.");
  }
}
