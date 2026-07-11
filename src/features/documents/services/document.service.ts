import { prisma } from "@/lib/database/prisma";

export class DocumentService {
  static async createDocument(companyId: string, title: string, type: string, createdBy: string) {
    return prisma.document.create({
      data: {
        companyId,
        title,
        type,
        createdBy,
      },
    });
  }

  static async getDocumentsByCompany(companyId: string) {
    return prisma.document.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getDocumentById(id: string) {
    return prisma.document.findUnique({
      where: { id },
      include: {
        versions: {
          orderBy: { version: "desc" },
        },
      },
    });
  }

  static async saveNewVersion(documentId: string, content: string, createdBy: string) {
    const latestVersion = await prisma.documentVersion.findFirst({
      where: { documentId },
      orderBy: { version: "desc" },
    });

    const nextVersionNum = latestVersion ? latestVersion.version + 1 : 1;

    return prisma.documentVersion.create({
      data: {
        documentId,
        version: nextVersionNum,
        content,
        createdBy,
      },
    });
  }
}
