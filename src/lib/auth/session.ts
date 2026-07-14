import { headers } from 'next/headers'
import { auth } from './auth'
import { prisma } from '../database/prisma'

/**
 * Returns the current authenticated session.
 * Throws an error or returns null if not authenticated.
 */
export async function getCurrentSession() {
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
