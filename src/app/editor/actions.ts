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
import { getTenantCompanyId, getCurrentSession } from '@/lib/auth/session'
const prisma = new PrismaClient()

async function verifyDocumentOwnership(documentId: string) {
  const companyId = await getTenantCompanyId()
  if (!companyId) return false
  const doc = await prisma.document.findUnique({
    where: { id: documentId, companyId },
  })
  return !!doc
}

export async function updateDocumentStatus(documentId: string, status: string) {
  try {
    const isOwner = await verifyDocumentOwnership(documentId)
    if (!isOwner) throw new Error('Unauthorized or document not found')

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
    const isOwner = await verifyDocumentOwnership(documentId)
    if (!isOwner) throw new Error('Unauthorized or document not found')

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
    const isOwner = await verifyDocumentOwnership(documentId)
    if (!isOwner) throw new Error('Unauthorized or document not found')

    const session = await getCurrentSession()
    if (!session || !session.user) throw new Error('Authentication required')

    const comment = await prisma.comment.create({
      data: {
        documentId,
        message,
        userId: session.user.id,
      },
    })

    const formattedComment = {
      ...comment,
      user: session.user.name,
    }

    revalidatePath(`/editor/${documentId}`)
    return { success: true, comment: formattedComment }
  } catch (error: unknown) {
    console.error('Add Comment Error:', error)
    return { success: false, message: String(error) }
  }
}
