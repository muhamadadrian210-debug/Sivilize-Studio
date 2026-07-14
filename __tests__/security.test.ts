// Polyfill setImmediate for Jest Prisma issues
if (typeof setImmediate === 'undefined') {
  // @ts-expect-error - Jest jsdom environment missing setImmediate
  global.setImmediate = (cb) => setTimeout(cb, 0)
}

import { PrismaClient } from '@prisma/client'
import { enforceAIRateLimit } from '../src/lib/security/rate-limit'

const prisma = new PrismaClient()

describe('Security Audit & Penetration Tests', () => {
  let testCompanyId = ''
  let testWorkspaceId = ''
  const testUserId = 'audit-test-user-id'

  beforeAll(async () => {
    // Setup mock data for the test
    const workspace = await prisma.workspace.create({
      data: {
        name: 'Audit Workspace',
        ownerId: testUserId,
      },
    })
    testWorkspaceId = workspace.id

    const company = await prisma.company.create({
      data: {
        name: 'Audit Company',
        workspaceId: testWorkspaceId,
      },
    })
    testCompanyId = company.id
  })

  afterAll(async () => {
    await prisma.aIUsageLog
      .deleteMany({
        where: { companyId: testCompanyId },
      })
      .catch(() => {})

    await prisma.company
      .delete({
        where: { id: testCompanyId },
      })
      .catch(() => {})

    await prisma.workspace
      .delete({
        where: { id: testWorkspaceId },
      })
      .catch(() => {})

    await prisma.$disconnect()
  })

  test('SQL Injection Prevention (IDOR Attempt)', async () => {
    // Attempting to inject SQL into Prisma's findUnique
    const maliciousPayload = "1' OR '1'='1"

    const doc = await prisma.document.findUnique({
      where: {
        id: maliciousPayload,
      },
    })

    // If Prisma is vulnerable to classic SQLi, it might return all documents or crash.
    // By design, Prisma uses parameterized queries and will just return null for a non-existent ID.
    expect(doc).toBeNull()
  })

  test('AI Rate Limiting (Anti-Spam Billing Protection)', async () => {
    // Simulate 20 successful AI generation requests within a single hour
    for (let i = 0; i < 20; i++) {
      await expect(
        enforceAIRateLimit(testCompanyId, testUserId, 'test-spam')
      ).resolves.not.toThrow()
    }

    // The 21st request should trigger the Rate Limiter Exception
    await expect(
      enforceAIRateLimit(testCompanyId, testUserId, 'test-spam')
    ).rejects.toThrow(/RATE_LIMIT_EXCEEDED/)
  }, 15000) // Increase timeout for loop
})
