import { headers } from 'next/headers'
import { auth } from './auth'
import { prisma } from '../database/prisma'

/**
 * Returns the current authenticated session.
 * Throws an error or returns null if not authenticated.
 */
export async function getCurrentSession() {
  if (process.env.NODE_ENV === 'development') {
    // 🚧 DEV MOCK: Always return a valid session for local testing
    return {
      user: {
        id: 'e2e-user-id',
        name: 'Tester',
        email: 'tester@example.com',
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      session: {
        id: 'mock-session-id',
        userId: 'e2e-user-id',
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        token: 'mock-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }
  }

  const reqHeaders = await headers()
  const session = await auth.api.getSession({
    headers: reqHeaders,
  })
  return session
}

/**
 * Ensures strict multi-tenant data isolation.
 * Returns the active companyId for the logged in user.
 * If the user has no company, it throws an error or returns null.
 */
export async function getTenantCompanyId() {
  const session = await getCurrentSession()

  if (!session || !session.user) {
    return null
  }

  if (process.env.NODE_ENV === 'development') {
    // 🚧 DEV MOCK: Always return a mock company ID
    // We will auto-create this mock company if it doesn't exist to prevent Foreign Key constraint errors
    const mockCompany = await prisma.company.findFirst({
      where: { id: 'mock-company-id' },
    })
    if (!mockCompany) {
      const mockWorkspace = await prisma.workspace
        .create({
          data: {
            id: 'mock-workspace-id',
            name: 'Dev Workspace',
            ownerId: 'e2e-user-id',
          },
        })
        .catch(() => null)
      await prisma.company
        .create({
          data: {
            id: 'mock-company-id',
            workspaceId: 'mock-workspace-id',
            name: 'Dev Company',
          },
        })
        .catch(() => null)
    }
    return 'mock-company-id'
  }

  // Find the first workspace the user belongs to
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: session.user.id },
    include: { workspace: true },
  })

  if (!workspaceMember) {
    return null
  }

  // Find the company associated with this workspace
  const company = await prisma.company.findFirst({
    where: { workspaceId: workspaceMember.workspaceId },
  })

  return company?.id || null
}
