'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

export async function setupCompanyWorkspace(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const industry = formData.get('industry') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const address = formData.get('address') as string

    if (!name || !industry) {
      throw new Error('Company Name and Industry are required.')
    }

    // 1. Create a default owner user if not exists (for session demo simplicity)
    let user = await prisma.user.findFirst()
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email || 'owner@sivilize.com',
          name: 'Company Owner',
        },
      })
    }

    // 2. Create Workspace
    const workspace = await prisma.workspace.create({
      data: {
        name: `${name} Workspace`,
        ownerId: user.id,
      },
    })

    // 3. Create Workspace Member relation
    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: user.id,
        role: 'OWNER',
      },
    })

    // 4. Create Company
    await prisma.company.create({
      data: {
        workspaceId: workspace.id,
        name,
        industry,
        email,
        phone,
        address,
      },
    })
  } catch (error: unknown) {
    console.error('Onboarding Error:', error)
    return { success: false, message: String(error) }
  }

  // Redirect on success
  redirect('/dashboard')
}
