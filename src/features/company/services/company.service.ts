import { prisma } from "@/lib/database/prisma";
import type { CompanySetupInput, CompanyProfileInput } from "@/lib/validations/company";

export class CompanyService {
  static async createCompany(workspaceId: string, data: CompanySetupInput) {
    return prisma.company.create({
      data: {
        workspaceId,
        name: data.name,
        industry: data.industry,
        email: data.email,
        phone: data.phone,
        address: data.address,
        brandKit: {
          create: {},
        },
        profile: {
          create: {},
        },
      },
    });
  }

  static async getCompanyById(id: string) {
    return prisma.company.findUnique({
      where: { id },
      include: {
        brandKit: true,
        profile: true,
      },
    });
  }

  static async updateCompanyProfile(companyId: string, data: CompanyProfileInput) {
    return prisma.companyProfile.update({
      where: { companyId },
      data,
    });
  }
}
