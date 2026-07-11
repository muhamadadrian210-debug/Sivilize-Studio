"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateCompanyProfile(formData: FormData) {
  const companyId = formData.get("companyId") as string;
  const vision = formData.get("vision") as string;
  const mission = formData.get("mission") as string;
  const industry = formData.get("industry") as string;

  try {
    await prisma.company.update({
      where: { id: companyId },
      data: {
        industry: industry,
        profile: {
          upsert: {
            create: { vision, mission },
            update: { vision, mission }
          }
        }
      }
    });

    revalidatePath("/dashboard/company");
    return { success: true, message: "Company profile updated successfully." };
  } catch (error) {
    console.error("Failed to update company profile:", error);
    return { success: false, message: "Failed to update profile." };
  }
}
