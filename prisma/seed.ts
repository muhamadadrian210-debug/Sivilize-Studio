import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Create a dummy user
  const user = await prisma.user.upsert({
    where: { email: "admin@sivilize.com" },
    update: {},
    create: {
      email: "admin@sivilize.com",
      name: "Adrian Sivilize",
    },
  });

  // 2. Create a workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: "Sivilize Corp Workspace",
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: "OWNER",
        },
      },
    },
  });

  // 3. Create a company
  const company = await prisma.company.create({
    data: {
      workspaceId: workspace.id,
      name: "Sivilize Corp Indonesia",
      industry: "IT & Software",
      profile: {
        create: {
          vision: "To be the leading Business Document OS",
        },
      },
      brandKit: {
        create: {
          primaryColor: "#000000",
        },
      },
    },
  });

  console.log("Database seeded successfully!");
  console.log("User:", user.email);
  console.log("Workspace:", workspace.name);
  console.log("Company:", company.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
