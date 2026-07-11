"use server";

import { generateDocumentLayout } from "@/lib/ai/layout-ai";

export async function generateAILayoutAction(documentType: string, prompt: string) {
  try {
    const layout = await generateDocumentLayout(documentType, prompt);
    return { success: true, layout };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    return { success: false, message: error.message };
  }
}

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export async function updateDocumentStatus(documentId: string, status: string) {
  try {
    await prisma.document.update({
      where: { id: documentId },
      data: { status }
    });
    revalidatePath(`/editor/${documentId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
