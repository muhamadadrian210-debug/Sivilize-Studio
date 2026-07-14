import { PrismaClient } from '@prisma/client'
import { generateDocumentAction } from '../src/app/dashboard/documents/baru/actions'
import { encrypt, decrypt } from '../src/lib/security/encryption'

// Polyfill setImmediate for Jest Prisma issues
if (typeof setImmediate === 'undefined') {
  // @ts-expect-error - Jest jsdom environment missing setImmediate
  global.setImmediate = (cb) => setTimeout(cb, 0)
}

// Mock Auth Session and Gemini AI
jest.mock('../src/lib/auth/session', () => ({
  getCurrentSession: jest.fn().mockResolvedValue({
    user: { id: 'test-user-id', name: 'Test User' },
  }),
  getTenantCompanyId: jest.fn().mockResolvedValue('test-company-id'),
}))

jest.mock('../src/lib/ai/text-generation', () => ({
  generateText: jest
    .fn()
    .mockResolvedValue(
      'DRAFT HASIL AI MOCK: Ini adalah teks yang dibuat secara rahasia.'
    ),
}))

// We must also mock next/cache to prevent errors in server actions
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}))

const prisma = new PrismaClient()

describe('E2E Full Workflow: Creation to Encryption', () => {
  let testCompanyId = ''

  beforeAll(async () => {
    const workspace = await prisma.workspace.create({
      data: { name: 'E2E Workspace', ownerId: 'test-user-id' },
    })
    const company = await prisma.company.create({
      data: {
        name: 'E2E Company',
        workspaceId: workspace.id,
        id: 'test-company-id',
      },
    })
    testCompanyId = company.id
  })

  afterAll(async () => {
    // Clean up created document
    await prisma.documentVersion.deleteMany({
      where: { document: { companyId: 'test-company-id' } },
    })
    await prisma.document.deleteMany({
      where: { companyId: 'test-company-id' },
    })
    await prisma.company.deleteMany({ where: { id: 'test-company-id' } })
    await prisma.workspace.deleteMany({ where: { ownerId: 'test-user-id' } })
    await prisma.aIUsageLog.deleteMany({
      where: { companyId: 'test-company-id' },
    })
    await prisma.$disconnect()
  })

  test('Should create a document successfully with E2E Encryption', async () => {
    // 1. Simulate form submission (Pembuatan Surat)
    const formData = new FormData()
    formData.append('documentType', 'SPH')
    formData.append('targetName', 'Investor A')
    formData.append('targetPosition', 'CEO')
    formData.append('subjectName', 'Proyek Unicorn')
    formData.append('price', 'Rp 10.000.000')

    const response = await generateDocumentAction(formData)

    // Assert Action Success
    expect(response.success).toBe(true)
    expect(response.message).toContain('berhasil dibuat')

    // 2. Fetch the newly created document from database directly (RAW)
    const rawDocument = await prisma.document.findFirst({
      where: { companyId: testCompanyId },
      include: { versions: true },
    })

    expect(rawDocument).toBeDefined()
    expect(rawDocument?.title).toBe('SPH - Proyek Unicorn')
    expect(rawDocument?.status).toBe('Draft')

    const rawVersion = rawDocument?.versions[0]
    expect(rawVersion).toBeDefined()

    // 3. Verify that the raw content is ENCRYPTED (should not contain plaintext)
    expect(rawVersion?.content).not.toContain('DRAFT HASIL AI MOCK')

    // The encrypted string format is "iv:authTag:encryptedContent"
    const parts = rawVersion?.content.split(':')
    expect(parts?.length).toBe(3) // Ensure AES-256-GCM format is present

    // 4. Verify Decryption (Hasil Akhir di Editor)
    const decryptedText = decrypt(rawVersion!.content)
    expect(decryptedText).toBe(
      'DRAFT HASIL AI MOCK: Ini adalah teks yang dibuat secara rahasia.'
    )
  })
})
