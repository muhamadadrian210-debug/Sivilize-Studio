'use server'

import { PrismaClient, Role } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function inviteMember(
  workspaceId: string,
  email: string,
  role: Role
) {
  try {
    // 1. Check if user exists by email
    let user = await prisma.user.findUnique({ where: { email } })

    // If user doesn't exist, we ideally send an invite email here.
    // For this implementation, we'll create a placeholder user to satisfy DB relations.
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0], // Placeholder name
        },
      })
    }

    // 2. Add to WorkspaceMember
    await prisma.workspaceMember.upsert({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: user.id,
        },
      },
      update: { role },
      create: {
        workspaceId,
        userId: user.id,
        role,
      },
    })

    revalidatePath('/dashboard/team')
    return { success: true, message: `Invited ${email} as ${role}` }
  } catch (error: unknown) {
    console.error('Invite Error:', error)
    return { success: false, message: String(error) }
  }
}

export async function removeMember(workspaceId: string, userId: string) {
  try {
    await prisma.workspaceMember.delete({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId,
        },
      },
    })

    revalidatePath('/dashboard/team')
    return { success: true }
  } catch (error: unknown) {
    return { success: false, message: String(error) }
  }
}
