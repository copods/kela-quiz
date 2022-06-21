const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "test@user.com";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("testPassword", 10);

  await prisma.role.createMa({
    data: {
      name: "Test Creator",
    },
  });
  const role2 = await prisma.role.create({
    data: {
      name: "Recruiter",
    },
  });

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      firstName: "Test",
      lastName: "User",
      roleId: role2.id,
    },
  });

  await prisma.questionType.createMany({
    data: [
      { name: "SINGLE_CHOICE" },
      { name: "MULTIPLE_CHOICE" },
      { name: "TEXT" },
    ],
  });

  await prisma.optionType.createMany({
    data: [{ name: "TEXT" }, { name: "IMAGE" }],
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
