import { prisma } from '@/lib/database/prisma'

const HOURLY_LIMIT_PER_COMPANY = 20

export async function enforceAIRateLimit(
  companyId: string,
  userId: string,
  requestType: string = 'text-generation'
): Promise<void> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

  // Count usage in the last hour
  const usageCount = await prisma.aIUsageLog.count({
    where: {
      companyId,
      timestamp: {
        gte: oneHourAgo,
      },
    },
  })

  if (usageCount >= HOURLY_LIMIT_PER_COMPANY) {
    throw new Error(
      `RATE_LIMIT_EXCEEDED: Batas penggunaan AI perusahaan Anda (${HOURLY_LIMIT_PER_COMPANY} permintaan per jam) telah tercapai. Harap tunggu beberapa saat untuk mencegah spam.`
    )
  }

  // Log this usage
  await prisma.aIUsageLog.create({
    data: {
      companyId,
      userId,
      requestType,
      tokenCount: 1, // Simplified metric
    },
  })
}
