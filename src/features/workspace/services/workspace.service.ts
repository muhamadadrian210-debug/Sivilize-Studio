import { prisma } from "@/lib/database/prisma";

export class WorkspaceService {
  static async createWorkspace(name: string, ownerId: string) {
    return prisma.workspace.create({
      data: {
        name,
        ownerId,
        members: {
          create: {
            userId: ownerId,
            role: "OWNER",
          },
        },
      },
    });
  }

  static async getWorkspacesByUser(userId: string) {
    return prisma.workspace.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      include: {
        companies: true,
      },
    });
  }

  static async getWorkspaceById(id: string) {
    return prisma.workspace.findUnique({
      where: { id },
      include: {
        companies: true,
        members: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });
  }
}
