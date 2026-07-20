import { NextResponse } from 'next/server'
import { prisma } from '@/lib/database/prisma'
import crypto from 'crypto'

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Not allowed in production' },
      { status: 403 }
    )
  }

  // 1. Create or get user
  let user = await prisma.user.findUnique({
    where: { email: 'e2e@example.com' },
  })
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'e2e@example.com',
        name: 'E2E Tester',
        emailVerified: true,
      },
    })
  }

  // 2. Create workspace if not exists
  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: { userId: user.id },
  })
  let workspaceId = workspaceMember?.workspaceId

  if (!workspaceMember) {
    const workspace = await prisma.workspace.create({
      data: { name: 'E2E Workspace', ownerId: user.id },
    })
    workspaceId = workspace.id
    await prisma.workspaceMember.create({
      data: { workspaceId: workspace.id, userId: user.id, role: 'OWNER' },
    })
  }

  // 3. Create company if not exists
  const company = await prisma.company.findFirst({
    where: { workspaceId: workspaceId },
  })
  if (!company) {
    await prisma.company.create({
      data: { name: 'E2E Company', workspaceId: workspaceId! },
    })
  }

  // 4. Create Better Auth session
  const token = crypto.randomBytes(32).toString('hex')
  await prisma.session.create({
    data: {
      userId: user.id,
      token: token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      ipAddress: '127.0.0.1',
      userAgent: 'E2E-Tester',
    },
  })

  // 5. Set Cookie and redirect
  const res = NextResponse.redirect(
    new URL('/dashboard/documents/baru', 'http://localhost:3000')
  )
  res.cookies.set('better-auth.session_token', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
  })

  return res
}
