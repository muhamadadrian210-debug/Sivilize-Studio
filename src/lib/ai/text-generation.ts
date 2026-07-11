import { genAI, AI_MODELS } from "./gemini";

/**
 * AI Text Generation Service using Google Gemini
 */
export async function generateText(prompt: string, modelType: keyof typeof AI_MODELS = "TEXT"): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: AI_MODELS[modelType] });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Text Generation Error:", error);
    throw new Error("Gagal menghasilkan teks dari AI.");
  }
}

/**
 * Expand or rewrite a specific paragraph based on tone
 */
export async function rewriteText(text: string, tone: "Professional" | "Casual" | "Persuasive" | "Formal"): Promise<string> {
  const prompt = `Rewrite the following text in a ${tone} tone. Keep the core message intact but improve the flow and vocabulary. Return only the revised text without any markdown or extra comments.\n\nText to rewrite: "${text}"`;
  return generateText(prompt);
}
