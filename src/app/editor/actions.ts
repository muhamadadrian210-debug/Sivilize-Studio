'use server'

import { generateDocumentLayout } from '@/lib/ai/layout-ai'

export async function generateAILayoutAction(
  documentType: string,
  prompt: string
) {
  try {
    const layout = await generateDocumentLayout(documentType, prompt)
    return { success: true, layout }
  } catch (error: unknown) {
    console.error('AI Action Error:', error)
    return { success: false, message: String(error) }
  }
}

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
const prisma = new PrismaClient()

export async function updateDocumentStatus(documentId: string, status: string) {
  try {
    await prisma.document.update({
      where: { id: documentId },
      data: { status },
    })
    revalidatePath(`/editor/${documentId}`)
    return { success: true }
  } catch (error: unknown) {
    return { success: false, message: String(error) }
  }
}
export async function getComments(documentId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { documentId },
      orderBy: { createdAt: 'asc' },
    })
    return { success: true, comments }
  } catch (error: unknown) {
    return { success: false, message: String(error) }
  }
}

export async function addComment(documentId: string, message: string) {
  try {
    // In a real app we'd get the userId from session
    // For now, we'll mock the userId with a system default or find the first user
    let user = await prisma.user.findFirst()
    if (!user) {
      user = await prisma.user.create({
        data: { name: 'Admin', email: 'admin@sivilize.com' },
      })
    }

    const comment = await prisma.comment.create({
      data: {
        documentId,
        message,
        userId: user.id,
      },
    })

    // We optionally include user data to mimic client needs
    const formattedComment = {
      ...comment,
      user: user.name,
    }

    revalidatePath(`/editor/${documentId}`)
    return { success: true, comment: formattedComment }
  } catch (error: unknown) {
    console.error('Add Comment Error:', error)
    return { success: false, message: String(error) }
  }
}
