"use server";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function createDocument() {
  return createDocumentWithType("Proposal", "Untitled Document");
}

export async function createDocumentWithType(type: string, title: string) {
  const company = await prisma.company.findFirst();
  if (!company) throw new Error("No company found");

  const doc = await prisma.document.create({
    data: {
      companyId: company.id,
      title,
      type,
      status: "Draft",
      createdBy: "admin",
    }
  });

  redirect(`/editor/${doc.id}`);
}
