import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed default groups
  await prisma.group.upsert({
    where: { id: "group-just-talk" },
    update: { isDefault: true, name: "just want to talk" },
    create: {
      id: "group-just-talk",
      name: "just want to talk",
      isDefault: true,
    },
  });

  await prisma.group.upsert({
    where: { id: "group-sleepless" },
    update: { isDefault: false, name: "sleepless night" },
    create: {
      id: "group-sleepless",
      name: "sleepless night",
      isDefault: false,
    },
  });

  await prisma.group.upsert({
    where: { id: "group-vulnerable" },
    update: { isDefault: false, name: "It's okay to be vulnerable" },
    create: {
      id: "group-vulnerable",
      name: "It's okay to be vulnerable",
      isDefault: false,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
