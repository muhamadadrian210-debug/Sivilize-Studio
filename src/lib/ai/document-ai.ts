import { generateText } from "./text-generation";
import { SYSTEM_PROMPTS } from "./prompts";

interface CompanyContext {
  name: string;
  industry: string | null;
  description: string | null;
  vision: string | null;
  mission: string | null;
  values: string | null;
}

/**
 * Generates document text using Company Data context
 */
export async function generateDocumentContent(
  documentType: string,
  userRequest: string,
  companyCtx: CompanyContext
) {
  const contextString = `
Company Name: ${companyCtx.name}
Industry: ${companyCtx.industry}
Description: ${companyCtx.description}
Vision: ${companyCtx.vision}
Mission: ${companyCtx.mission}
Values: ${companyCtx.values}
  `;

  const prompt = `
${SYSTEM_PROMPTS.DOCUMENT_GENERATOR}

[COMPANY CONTEXT]
${contextString}

[DOCUMENT REQUEST]
Document Type: ${documentType}
Details: ${userRequest}

Write the content professionally based on the context above.
  `;

  return generateText(prompt);
}
