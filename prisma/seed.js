const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function seed() {
  const ownerEmail = "copods.demo.sendgrid@gmail.com"
  const recruiterEmail = "copods.demo.sendgrid+1@gmail.com"
  const adminEmail = "copods.demo.sendgrid+2@gmail.com"

  const hashedPassword = await bcrypt.hash("kQuiz@copods", 10)

  let user = {}

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
  ]

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
      })
    })
  }

  const createMasterAdmin = async () => {
    user = await prisma.user.upsert({
      where: {
        email: ownerEmail,
      },
      update: {
        email: ownerEmail,
      },
      create: {
        email: ownerEmail,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        workspace: {
          create: {
            name: "Default Workspace",
          },
        },
        firstName: "Copods",
        lastName: "Careers",
        roleId: roles[0].id,
      },
      include: {
        workspace: true,
      },
    })
    await prisma.userWorkspace.upsert({
      where: {
        workspaceId_userId: {
          userId: user.id,
          workspaceId: user.workspace[0].id,
        },
      },
      update: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        workspaceId: user.workspace[0].id,
        roleId: user?.roleId,
        isDefault: true,
      },
    })
    await prisma.workspace.update({
      where: {
        id: user.workspace[0].id,
      },
      data: {
        ownerId: user.workspace[0].createdById,
      },
    })
  }

  const createRecruiter = async () => {
    const recruiter = await prisma.user.upsert({
      where: {
        email: recruiterEmail,
      },
      update: {
        email: recruiterEmail,
      },
      create: {
        email: recruiterEmail,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        firstName: "Copods",
        lastName: "Recruiter",
        roleId: roles[2].id,
      },
    })
    await prisma.userWorkspace.upsert({
      where: {
        workspaceId_userId: {
          userId: recruiter.id,
          workspaceId: user.workspace[0].id,
        },
      },
      update: {
        userId: recruiter.id,
      },
      create: {
        userId: recruiter.id,
        workspaceId: user.workspace[0].id,
        roleId: roles[2].id,
        isDefault: false,
      },
    })
  }

  const createAdmin = async () => {
    const admin = await prisma.user.upsert({
      where: {
        email: adminEmail,
      },
      update: {
        email: adminEmail,
      },
      create: {
        email: adminEmail,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        firstName: "Copods",
        lastName: "Admin",
        roleId: roles[0].id,
      },
    })
    await prisma.userWorkspace.upsert({
      where: {
        workspaceId_userId: {
          userId: admin.id,
          workspaceId: user.workspace[0].id,
        },
      },
      update: {
        userId: admin.id,
      },
      create: {
        userId: admin.id,
        workspaceId: user.workspace[0].id,
        roleId: roles[0].id,
        isDefault: false,
      },
    })
  }

  const createRecruiter = async () => {
    const recruiter = await prisma.user.upsert({
      where: {
        email: recruiterEmail,
      },
      update: {
        email: recruiterEmail,
      },
      create: {
        email: recruiterEmail,
        password: {
          create: {
            hash: hashedPassword,
          },
        },
        firstName: "Copods",
        lastName: "Recruiter",
        roleId: roles[2].id,
      },
    })
    await prisma.userWorkspace.upsert({
      where: {
        workspaceId_userId: {
          userId: recruiter.id,
          workspaceId: user.workspace[0].id,
        },
      },
      update: {
        userId: recruiter.id,
      },
      create: {
        userId: recruiter.id,
        workspaceId: user.workspace[0].id,
        roleId: roles[2].id,
        isDefault: false,
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
  ]

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
  await createRecruiter()
  await createQuestionType()
  await createAdmin()

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
