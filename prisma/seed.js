const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seed() {
  const email = "careers@copods.co";

  const hashedPassword = await bcrypt.hash("kQuiz@copods", 10);

  const roles = [
    {
      id: "cl4xvj89a000209jp4qtlfyii",
      name: "Admin",
    },
    {
      id: "cl4xvj89a000209jp4qtlfyih",
      name: "Test Creator",
    },
    {
      id: "cl4xvjdqs000309jp3rwiefp8",
      name: "Recruiter",
    },
  ];

  const createRoles = () => {
    roles.forEach(async (role) => {
      await prisma.role.upsert({
        where: {
          id: role.id,
        },
        update: {
          id: role.id,
          name: role.name,
        },
        create: {
          id: role.id,
          name: role.name,
        },
      });
    });
  };

  const createMasterAdmin = async () => {
    await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        email,
      },
      create: {
        email,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        firstName: 'Copods',
        lastName: 'Careers',
        roleId: roles[0].id,
      },
    })
  }

  const questionType = [
    {
      displayName: "Single Choice",
      value: "SINGLE_CHOICE",
    },
    {
      displayName: "Multiple Choice",
      value: "MULTIPLE_CHOICE",
    },
    {
      displayName: "Text",
      value: "TEXT",
    },
  ];

  const createQuestionType = () => {
    questionType.forEach(async (questionName) => {
      await prisma.questionType.upsert({
        where: {
          value: questionName.value,
        },
        update: {
          displayName: questionName.displayName,
          value: questionName.value,
        },
        create: {
          displayName: questionName.displayName,
          value: questionName.value,
        },
      })
    })
  }

  await createRoles()
  await createMasterAdmin()
  await createQuestionType()

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
